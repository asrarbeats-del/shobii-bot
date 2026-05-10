// ╔════════════════════════════════════════════╗
// ║         SHOBII BOT - Main Entry            ║
// ║      Bismillah ir-Rahman ir-Rahim          ║
// ╚════════════════════════════════════════════╝

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = require('@whiskeysockets/baileys')

const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const config = require('./config')
const handler = require('./handler')

// Silence pino logs
const logger = pino({ level: 'silent' })

// In-memory store
const store = makeInMemoryStore({ logger })

async function startShobiiBot() {
  console.log(chalk.green(`
╔══════════════════════════════════════════╗
║                                          ║
║    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم         ║
║                                          ║
║         🤖  SHOBII BOT  🤖              ║
║         Powered by Shobii               ║
║                                          ║
╚══════════════════════════════════════════╝
  `))

  const { state, saveCreds } = await useMultiFileAuthState('./sessions')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: !config.sessionId,
    auth: state,
    browser: ['SHOBII-BOT', 'Chrome', '1.0.0'],
    syncFullHistory: false,
    markOnlineOnConnect: true,
  })

  store.bind(sock.ev)

  // ── Connection Updates ──
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      console.log(chalk.yellow('\n📱 QR Code Ready! Scan karo WhatsApp se.\n'))
    }

    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
      console.log(chalk.red(`❌ Connection closed. Reason: ${reason}`))

      if (reason === DisconnectReason.badSession) {
        console.log(chalk.red('⚠️ Bad Session! sessions folder delete karo aur dobara shuru karo.'))
        process.exit(1)
      } else if (reason === DisconnectReason.connectionClosed ||
                 reason === DisconnectReason.connectionLost ||
                 reason === DisconnectReason.restartRequired ||
                 reason === DisconnectReason.timedOut) {
        console.log(chalk.yellow('🔄 Reconnecting...'))
        startShobiiBot()
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red('🚪 Logged out! Session delete karo aur dobara login karo.'))
        process.exit(1)
      } else {
        console.log(chalk.yellow('🔄 Unknown reason, reconnecting...'))
        startShobiiBot()
      }
    }

    if (connection === 'open') {
      console.log(chalk.green('\n✅ SHOBII BOT Connected! Alhamdulillah!\n'))
      
      // Send startup message to owner
      for (const owner of config.ownerNumber) {
        try {
          await sock.sendMessage(owner + '@s.whatsapp.net', {
            text: `*بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم*\n\n✅ *SHOBII BOT Online Ho Gaya!*\n\n🤖 Bot: ${config.botName}\n⏰ Time: ${new Date().toLocaleString('ur-PK')}\n\nAlhamdulillah! Bot ready hai. 🤍`
          })
        } catch (e) {}
      }
    }
  })

  // ── Save Credentials ──
  sock.ev.on('creds.update', saveCreds)

  // ── Messages ──
  sock.ev.on('messages.upsert', async (m) => {
    await handler(sock, m, store)
  })

  // ── Call Reject ──
  sock.ev.on('call', async (calls) => {
    if (!config.rejectCalls) return
    for (const call of calls) {
      if (call.status === 'offer') {
        await sock.rejectCall(call.id, call.from)
        await sock.sendMessage(call.from, { text: config.callMsg })
      }
    }
  })

  return sock
}

// Start server for Koyeb keep-alive
const express = require('express')
const app = express()
app.get('/', (req, res) => res.json({
  status: 'online',
  bot: 'SHOBII BOT',
  by: 'Shobii',
  uptime: process.uptime()
}))
app.listen(config.port, () => {
  console.log(chalk.cyan(`🌐 Server running on port ${config.port}`))
})

startShobiiBot()

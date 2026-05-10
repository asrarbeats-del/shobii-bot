// ── SHOBII BOT Handler (Final) ──
const config = require('./config')
const fs = require('fs')
const path = require('path')

const plugins = new Map()

function loadPlugins() {
  const pluginDir = path.join(__dirname, 'plugins')
  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'))
  for (const file of files) {
    try {
      delete require.cache[require.resolve(`./plugins/${file}`)]
      const rawPlugin = require(`./plugins/${file}`)
      const pluginList = Array.isArray(rawPlugin) ? rawPlugin : [rawPlugin]
      for (const plugin of pluginList) {
        if (!plugin.command) continue
        const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
        for (const cmd of cmds) plugins.set(cmd.toLowerCase(), plugin)
      }
    } catch (e) { console.error(`Plugin load error (${file}):`, e.message) }
  }
  console.log(`✅ ${plugins.size} commands loaded!`)
}

loadPlugins()

const spamMap = new Map()
function isSpam(jid) {
  const now = Date.now()
  const last = spamMap.get(jid) || 0
  if (now - last < 800) return true
  spamMap.set(jid, now)
  return false
}

function hasLink(text) {
  return /https?:\/\/|wa\.me\/|bit\.ly/i.test(text)
}

async function handler(sock, { messages, type }, store) {
  if (type !== 'notify') return
  for (const msg of messages) {
    try {
      if (!msg.message) continue
      if (msg.key.fromMe) continue
      const from = msg.key.remoteJid
      if (!from) continue
      const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || ''
      const isGroup = from.endsWith('@g.us')
      const sender = isGroup ? msg.key.participant : from
      const senderNumber = sender?.replace('@s.whatsapp.net', '')
      const isOwner = config.ownerNumber.includes(senderNumber)
      if (config.autoReaction) {
        const emoji = config.reactionEmojis[Math.floor(Math.random() * config.reactionEmojis.length)]
        try { await sock.sendMessage(from, { react: { text: emoji, key: msg.key } }) } catch {}
      }
      if (config.antiSpam && !isOwner && isSpam(sender)) continue
      if (config.antiLink && isGroup && hasLink(body) && !isOwner) {
        try { await sock.sendMessage(from, { delete: msg.key }) } catch {}
        await sock.sendMessage(from, { text: `⚠️ @${senderNumber} link allowed nahi!\n_SHOBII BOT 🛡️_`, mentions: [sender] })
        continue
      }
      if (!body.startsWith(config.prefix)) continue
      const args = body.slice(config.prefix.length).trim().split(/\s+/)
      const command = args.shift()?.toLowerCase()
      const text = args.join(' ')
      if (config.mode === 'private' && !isOwner) return await sock.sendMessage(from, { text: `🔒 Bot private mode mein hai!` }, { quoted: msg })
      const plugin = plugins.get(command)
      if (!plugin) {
        if (!isGroup) await sock.sendMessage(from, { text: `❓ Unknown command! *${config.prefix}menu* type karo 🤍` }, { quoted: msg })
        continue
      }
      if (plugin.ownerOnly && !isOwner) return await sock.sendMessage(from, { text: `🔒 Sirf owner ke liye!` }, { quoted: msg })
      if (plugin.groupOnly && !isGroup) return await sock.sendMessage(from, { text: `👥 Sirf groups mein!` }, { quoted: msg })
      await plugin.execute({ sock, msg, from, sender, senderNumber, isOwner, isGroup, args, text, command, config, store, body, quoted: msg.message?.extendedTextMessage?.contextInfo?.quotedMessage || null })
    } catch (err) { console.error('Handler error:', err.message) }
  }
}

module.exports = handler

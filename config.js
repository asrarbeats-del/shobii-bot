require('dotenv').config()

const config = {
  // Bot Identity
  botName: process.env.BOT_NAME || 'SHOBII-BOT',
  botNumber: process.env.BOT_NUMBER || '',
  ownerNumber: (process.env.OWNER_NUMBER || '923270321760').split(','),
  
  // Session
  sessionId: process.env.SESSION_ID || '',
  
  // Settings
  prefix: process.env.PREFIX || '.',
  mode: process.env.MODE || 'public', // public / private
  businessMode: process.env.BUSINESS_MODE === 'true',
  
  // Auto Features
  autoReaction: process.env.AutoReaction === 'true',
  statusView: process.env.STATUSVIEW === 'true',
  statusLikes: process.env.StatusLikes === 'true',
  statusMsg: process.env.STATUS_MSG || 'Assalamualaikum! Aapka status dekha ♥️',
  autoRead: process.env.AUTOREAD === 'true',
  
  // Anti Features
  antiLink: process.env.ANTI_LINK === 'true',
  antiDelete: process.env.antidelete || 'all',
  antiSpam: process.env.ANTISPAM === 'true',
  rejectCalls: process.env.REJECTSCALLS === 'true',
  callMsg: process.env.CALLMSG || 'Maafi chahta hun, abhi calls allow nahi hain',
  
  // Islamic
  dailyHadees: process.env.DAILY_HADEES === 'true',
  dailyAyah: process.env.DAILY_AYAH === 'true',
  
  // Sticker
  packName: process.env.PACK_NAME || 'SHOBII♥️',
  authorName: process.env.AUTHOR_NAME || 'Powered by SHOBII BOT',
  
  // Emojis
  ownerEmoji: process.env.owner_react_emojie || '🤍',
  reactionEmojis: (process.env.autoreactions_emojies || '♥️,🤗,❤️,💞').split(','),
  statusEmojis: (process.env.StatusEmojies || '♥️,🌸,💫').split(','),
  
  // Menu
  menuImage: process.env.MENU_IMAGE || '',
  
  // Server
  port: process.env.PORT || 3000,
}

module.exports = config

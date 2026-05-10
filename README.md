# 🤖 SHOBII BOT
### *بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم*

> Powerful WhatsApp Bot — Made by **Shobii** 🤍

---

## ✨ Features

| Category | Commands |
|---|---|
| 📖 Islamic | Quran, Hadees, Dua, Namaz Timings, Asmaul Husna, Tasbeeh |
| 🤖 AI | Chat AI, Wikipedia, Dictionary, Calculator, Weather, Translate |
| 📥 Downloader | YouTube, YouTube MP3, TikTok, Instagram, Facebook, Twitter |
| 🎨 Sticker | Image→Sticker, Video→Sticker, Sticker→Image |
| 😂 Fun | Jokes, Quotes, Truth, Dare, 8Ball, Roast, WYR |
| 👥 Group | Kick, Add, Promote, Demote, Mute, Unmute, Tag All |
| 👑 Owner | Broadcast, Block, Mode, Restart |
| ⚙️ Auto | Anti-Link, Anti-Spam, Auto-React, Status View |

---

## 🚀 Koyeb par Deploy karo (Free)

### Step 1 — Session ID Lo

👉 Pair Code site par jao aur session lo

### Step 2 — GitHub par Upload karo

```bash
git init
git add .
git commit -m "SHOBII BOT initial commit"
git remote add origin https://github.com/TUMHARA_USERNAME/shobii-bot.git
git push -u origin main
```

### Step 3 — Koyeb Deploy

1. https://app.koyeb.com par jao
2. **New App** → **GitHub** connect karo
3. Apni repo select karo
4. **Builder: Dockerfile** select karo
5. **Environment Variables** mein yeh daalo:

| Variable | Value |
|---|---|
| `SESSION_ID` | (pair code se mila session) |
| `OWNER_NUMBER` | `923XXXXXXXXX` |
| `BOT_NAME` | `SHOBII-BOT` |
| `PREFIX` | `.` |
| `MODE` | `public` |

6. **Deploy** dabao! ✅

---

## 💻 Local Run karne ke liye

```bash
# 1. Clone karo
git clone https://github.com/TUMHARA_USERNAME/shobii-bot
cd shobii-bot

# 2. Install karo
npm install

# 3. .env banao
cp sample.env .env
# .env mein apna info daalo

# 4. Shuru karo
node index.js
```

---

## 📱 Session ID kaise len?

1. Yahan jao: https://prince-bot-pair-code.koyeb.app
2. Apna number daalo (923XXXXXXXXX format mein)
3. 6-digit code milega
4. WhatsApp → Linked Devices → Link with phone number → Code daalo
5. SESSION_ID copy karo

---

## 📋 Commands List

Sab commands dekhne ke liye WhatsApp mein type karo:
```
.menu
```

---

## ⚠️ Note

- Bot sirf **Node.js 18+** par kaam karta hai
- Sticker ke liye **ffmpeg** install hona chahiye
- Session ek baar connect hone ke baad automatically save hota hai

---

**JazakAllah Khair! 🤍**  
*Made with ❤️ by Shobii*

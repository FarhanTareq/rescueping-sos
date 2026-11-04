# RescuePing SOS (Vercel)

## What it does
A person opens the HTTPS website, taps SOS, grants browser location permission, and the site sends their coordinates to the configured Telegram chat through a Vercel Function.

## Deploy
1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. In Vercel > Project > Settings > Environment Variables, add:
   - `TELEGRAM_BOT_TOKEN` = your newly generated BotFather token
   - `TELEGRAM_CHAT_ID` = your Telegram numeric chat ID
4. Redeploy after adding variables.

No build command is needed. Keep the project root as the Root Directory.

## Important
- The bot owner must send `/start` to the bot before the bot can message them.
- The SOS user must tap the button and grant location permission. This does not silently track anyone.
- GPS/location services and internet are required.
- This is a prototype, not a guaranteed emergency service. The public endpoint can be abused by people who know the URL; add rate limiting/abuse protection before relying on it for critical safety.
- Never commit `.env` or expose your bot token.

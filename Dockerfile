FROM node:18-alpine

# Install ffmpeg for sticker support
RUN apk add --no-cache ffmpeg python3 make g++

WORKDIR /app

COPY package.json .
RUN npm install --production

COPY . .

# Create required directories
RUN mkdir -p sessions tmp media

EXPOSE 3000

CMD ["node", "index.js"]

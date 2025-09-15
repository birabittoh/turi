FROM node:22-alpine

# Install build dependencies for native modules
RUN apk add --no-cache pnpm ffmpeg

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json pnpm-lock.json* ./

# Install dependencies (including devDependencies for ts-node)
RUN pnpm i

COPY tsconfig.json ./
COPY src ./src

# Default command
CMD ["pnpm", "start"]

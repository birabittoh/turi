FROM node:22-alpine

# Install build dependencies for native modules
RUN apk add --no-cache pnpm ffmpeg

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json pnpm-lock.json* ./

# Install dependencies (including devDependencies for ts-node)
RUN pnpm i

# Copy all source files except .env
COPY src ./src
COPY tsconfig.json ./

# Default command
CMD ["pnpm", "start"]

FROM node:20.10.0-alpine3.19 AS base

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 

FROM base AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build 

FROM base AS runner

WORKDIR /app
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/node_modules ./node_modules
COPY . .

CMD if [ $NODE_ENV = "production" ]; then pnpm start; else pnpm dev; fi
# ── build stage ──────────────────────────
FROM docker.io/oven/bun:latest AS builder
WORKDIR /app

COPY . .
RUN bun install \
&& bun run db:generate \
&& bun build --compile --minify --sourcemap src/index.tsx --outfile bifrost.server

# ── runtime stage ─────────────────────────
FROM docker.io/oven/bun:latest
WORKDIR /app

ENV BUN_ENV=production

COPY --from=builder /app/bifrost.server /usr/local/bin/bifrost.server
COPY --from=builder /app/src /app/src
COPY --from=builder /app/drizzle /app/drizzle
COPY --from=builder /app/public /app/public

RUN chmod +x /usr/local/bin/bifrost.server

EXPOSE 3000
ENTRYPOINT ["sh", "-c", "bun run ./src/db/migrate.ts && /usr/local/bin/bifrost.server"] 
#!/usr/bin/env sh
set -euo pipefail

echo "🔧 Bootstrapping runtime deps if needed..."
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules 2>/dev/null || true)" ]; then
  echo "📦 node_modules no existe → instalando deps de runtime con npm install --omit=dev"
  npm install --omit=dev
  echo "🧬 Generando Prisma Client..."
  npx prisma generate
fi

echo "🔎 Checking Prisma migrations..."
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null || true)" ]; then
  echo "📦 Applying migrations (deploy)..."
  npx prisma migrate deploy
else
  echo "🛠  No migrations found → pushing schema (db push)..."
  npx prisma db push
fi

# Seed: soporta tanto prisma db seed como script en dist
if [ -f "dist/prisma/seed.js" ] || npm run | grep -q "^  seed$"; then
  echo "🌱 Seeding database..."
  # Si tienes "prisma": { "seed": "ts-node prisma/seed.ts" } o similar en package.json:
  if npm run | grep -q "^  seed$"; then
    npm run seed || true
  else
    # fallback al estándar prisma db seed si está configurado
    npx prisma db seed || true
  fi
fi

echo "🚀 Starting service..."
exec node dist/src/index.js

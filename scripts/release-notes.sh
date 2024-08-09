if [ ! -d "scripts/release-notes/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/release-notes
fi

cd scripts/release-notes
pnpm -s tsx release-notes.ts

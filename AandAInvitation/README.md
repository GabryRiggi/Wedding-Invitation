# Wedding Invitation (Vite + React)

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local` with your Google Apps Script values:

```env
VITE_SCRIPT_URL=...
VITE_SCRIPT_KEY=...
```

4. Start dev server:

```bash
npm run dev
```

## Deploy on GitHub Pages

This repository includes workflow `.github/workflows/deploy-pages.yml`.

1. In GitHub repo settings, enable Pages with source set to GitHub Actions.
2. Add repository variable `VITE_SCRIPT_URL`.
3. Add repository secret `VITE_SCRIPT_KEY`.
4. Push to `main` to trigger deployment.

Notes:

- Vite base path is automatically configured in CI using repository name.
- Local env files are ignored by git.

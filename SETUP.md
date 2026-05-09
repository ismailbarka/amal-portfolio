# Local Development Setup

Get the ABS Design portfolio running on your local machine in 5 minutes.

## Prerequisites

- Node.js 18+ (preferably 20 LTS)
- pnpm (recommended) or npm
- Git
- VS Code (recommended)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd abs-design-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` - automatically redirects to `/fr` (French)

## Project Structure

The code follows a clean architecture pattern:

```
app/                    # Pages and routes
├── [locale]/          # Locale-prefixed routes
│   ├── page.tsx       # Home page (/fr, /en)
│   ├── about/         # About page
│   ├── services/      # Services page
│   ├── portfolio/     # Portfolio grid
│   ├── contact/       # Contact form
│   └── references/    # Client references

components/            # React components
├── layout/           # Header, footer
├── shared/           # Reusable components

core/                 # Business logic
├── lib/              # i18n, utilities
├── utils/            # Helper functions
├── types/            # TypeScript types
└── constants/        # Project data

locales/              # Translations
├── fr.json          # French
└── en.json          # English
```

## Development Commands

```bash
# Start dev server (hot reload)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint            # Run ESLint with auto-fix
pnpm lint:check      # Check without fixing

# Code formatting
pnpm format          # Format all files
pnpm format:check    # Check formatting

# Type checking
pnpm build           # Also does type checking
```

## Code Quality

### ESLint & Prettier
- ESLint: TypeScript linting
- Prettier: Code formatting
- Both configured automatically

### Git Hooks
- **Pre-commit hook** runs via Husky
- Automatically lints and formats staged files
- Prevents commits with linting errors
- Configure in `.lintstagedrc.json`

### VS Code Setup

**Recommended Extensions:**
- ESLint
- Prettier - Code Formatter
- EditorConfig for VS Code

**Workspace Settings** (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

After installing extensions, restart VS Code. Code will auto-format on save.

## Multilingual Setup

The site supports **French (default) and English**.

### Language Switching
- Use the language switcher in the header (top right)
- URLs: `/fr/...` for French, `/en/...` for English
- Root path `/` redirects to `/fr`

### Adding a New Language
1. Create `locales/[lang].json` with translations
2. Update `core/lib/i18n-config.ts`:
   ```typescript
   export const locales = ['fr', 'en', 'es'] as const
   ```
3. Update imports in `core/lib/get-dictionary.ts`
4. Rebuild with `pnpm build`

## Common Issues & Solutions

### Port 3000 already in use
```bash
# Use different port
pnpm dev -- -p 3001
```

### Build fails with import errors
- Check file paths use kebab-case
- Verify `@/` imports are correct
- Ensure all files moved to new structure

### Prettier/ESLint not working in VS Code
- Restart VS Code
- Run `pnpm lint` in terminal to verify setup
- Check `.eslintrc.json` and `.prettierrc.json` exist

### Git pre-commit hook not running
```bash
# Reinitialize Husky
pnpm prepare
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on push
4. Set environment variables in Vercel dashboard

### Other Platforms
```bash
# Build production bundle
pnpm build

# Start server
pnpm start
```

## Environment Variables

Create `.env.local` in project root:

```env
# Base URL for absolute links
NEXT_PUBLIC_BASE_URL=https://absdesignepro.com
```

## Key Files

- **`app/[locale]/layout.tsx`**: Locale layout with metadata
- **`core/lib/i18n-config.ts`**: Locale configuration
- **`locales/fr.json`**: French translations
- **`middleware.ts`**: i18n routing
- **`next.config.mjs`**: Next.js config

## Architecture Reference

See `ARCHITECTURE.md` for detailed information on:
- Directory structure
- Naming conventions
- Import paths
- Component patterns
- Type system

## Troubleshooting

### TypeScript errors in VS Code
- Reload window: `Cmd/Ctrl + Shift + P` → "Reload Window"
- Restart TS server: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

### Changes not reflected
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `pnpm dev`

### Import resolution issues
- Check `tsconfig.json` has `@/` path alias
- Verify paths use `/` not `\`
- Files must use kebab-case

## Support

For issues or questions, refer to:
- `ARCHITECTURE.md` - Project structure
- `README.md` - Project overview
- TypeScript files - Inline comments

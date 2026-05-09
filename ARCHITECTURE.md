# Clean Architecture Guide - ABS Design Portfolio

This document outlines the clean architecture structure of the ABS Design portfolio website.

## Directory Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Locale-prefixed routes (/fr, /en)
│   │   ├── layout.tsx           # Locale layout with metadata
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── services/            # Services page
│   │   ├── portfolio/           # Portfolio grid page
│   │   │   └── [slug]/          # Dynamic project detail pages
│   │   ├── references/          # References/clients page
│   │   └── contact/             # Contact page
│   ├── layout.tsx               # Root layout (minimal)
│   ├── page.tsx                 # Root redirect to /fr
│   ├── globals.css              # Global styles
│   ├── sitemap.ts               # XML sitemap
│   ├── robots.ts                # robots.txt
│   └── not-found.tsx            # 404 page
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── locale-header.tsx    # Header with navigation
│   │   └── locale-footer.tsx    # Footer with links
│   └── shared/                  # Shared/reusable components
│       ├── header.tsx           # Legacy header (for reference)
│       ├── footer.tsx           # Legacy footer (for reference)
│       └── locale-switcher.tsx  # Language switcher
│
├── core/                         # Core business logic & utilities
│   ├── lib/                     # Libraries & utilities
│   │   ├── i18n-config.ts       # i18n configuration
│   │   └── get-dictionary.ts    # Translation dictionary loader
│   ├── utils/                   # Utility functions
│   │   ├── index.ts             # Common utilities (cn, etc.)
│   │   └── locale-utils.ts      # Locale-specific utilities
│   ├── types/                   # TypeScript types/interfaces
│   │   └── index.ts             # Core type definitions
│   └── constants/               # Constants & configuration
│       ├── projects.ts          # Project data
│       └── services.ts          # Services data
│
├── locales/                      # Translation files
│   ├── fr.json                  # French translations
│   └── en.json                  # English translations
│
├── public/                       # Static assets
│   └── images/                  # Project images
│
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── .editorconfig                # Editor configuration
├── .lintstagedrc.json           # Lint-staged configuration
├── .husky/                      # Git hooks
│   └── pre-commit               # Pre-commit hook
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
├── middleware.ts                # i18n middleware
├── package.json                 # Dependencies & scripts
└── README.md                    # Project documentation
```

## Naming Conventions

All files and folders use **kebab-case**:
- ✅ `locale-header.tsx`, `i18n-config.ts`, `get-dictionary.ts`
- ❌ `LocaleHeader.tsx`, `I18nConfig.ts`, `GetDictionary.ts`

## Architecture Layers

### 1. **App Layer** (`/app`)
- Contains Next.js pages and routes
- Uses locale-based routing (`/fr`, `/en`)
- Each page imports from core and components
- Minimal business logic

### 2. **Components Layer** (`/components`)
- `layout/`: Layout components (header, footer)
- `shared/`: Reusable components (locale switcher)
- Purely presentational, no business logic
- All components accept props from parent pages

### 3. **Core Layer** (`/core`)
- **lib**: i18n and utility libraries
- **utils**: Locale utilities, path helpers
- **types**: TypeScript interfaces and types
- **constants**: Project data, services, configuration
- Pure functions, no React components

### 4. **Localization** (`/locales`)
- JSON translation files per language
- `fr.json` (French - default)
- `en.json` (English)
- Loaded dynamically via `getDictionary()`

## Development Workflow

### Scripts

```bash
# Development
pnpm dev           # Start dev server

# Building
pnpm build         # Production build
pnpm start         # Run production server

# Code Quality
pnpm lint          # Run ESLint with auto-fix
pnpm lint:check    # Run ESLint without changes
pnpm format        # Format code with Prettier
pnpm format:check  # Check formatting without changes
```

### Git Workflow with Pre-commit Hooks

1. **Make changes** (files are automatically formatted on commit)
2. **Commit your changes** - Husky runs lint-staged automatically
3. **If checks fail**, commit is blocked - fix and try again

## VS Code Setup

For the best development experience:

1. **Install Extensions**
   - ESLint
   - Prettier - Code Formatter
   - EditorConfig for VS Code

2. **Configure Workspace** (`.vscode/settings.json`)
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

3. **EditorConfig** automatically enforces consistent settings

## Import Paths

All imports use the `@/` alias:

```typescript
// ✅ Correct
import { getDictionary } from '@/core/lib/get-dictionary'
import { projects } from '@/core/constants/projects'
import type { Locale } from '@/core/lib/i18n-config'
import { LocaleHeader } from '@/components/layout/locale-header'
```

## Code Quality Tools

- **ESLint**: Linting with Next.js + TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Lint-staged**: Runs linting on staged files only
- **EditorConfig**: Consistent editor settings

## Production Ready

This project is configured for immediate production deployment:
- ✅ All dependencies installed
- ✅ ESLint/Prettier configured
- ✅ Git hooks ready
- ✅ TypeScript strict mode enabled
- ✅ SEO optimization in place
- ✅ Multilingual support (FR/EN)
- ✅ Clean architecture implemented

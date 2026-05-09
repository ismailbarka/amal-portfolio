# Project Download Checklist

Use this checklist to verify you have everything needed after downloading the project.

## Before You Start

- [ ] Node.js 18+ installed (`node --version`)
- [ ] pnpm installed (`pnpm --version`) or npm/yarn
- [ ] Git installed (`git --version`)
- [ ] VS Code installed (optional but recommended)

## After Downloading

- [ ] Extract/clone the project to your local machine
- [ ] Navigate to project directory: `cd abs-design-portfolio`
- [ ] Run: `pnpm install` (installs all dependencies)
- [ ] Run: `pnpm dev` (starts dev server at localhost:3000)
- [ ] Browser opens to `/fr` (French homepage) ✅

## Configuration Files Present

- [ ] `.eslintrc.json` - ESLint configuration
- [ ] `.prettierrc.json` - Prettier configuration
- [ ] `.editorconfig` - Editor consistency settings
- [ ] `.lintstagedrc.json` - Pre-commit lint config
- [ ] `.husky/pre-commit` - Git pre-commit hook
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `next.config.mjs` - Next.js configuration

## Directory Structure

- [ ] `app/` - Next.js routes and pages
- [ ] `app/[locale]/` - Locale-prefixed routes (/fr, /en)
- [ ] `components/` - React components
- [ ] `core/` - Business logic and utilities
  - [ ] `core/lib/` - i18n configuration
  - [ ] `core/utils/` - Helper functions
  - [ ] `core/types/` - TypeScript types
  - [ ] `core/constants/` - Static data
- [ ] `locales/` - Translation files (fr.json, en.json)
- [ ] `public/images/` - Project images

## Documentation Files

- [ ] `README.md` - Project overview
- [ ] `ARCHITECTURE.md` - Technical architecture guide
- [ ] `SETUP.md` - Local development setup
- [ ] `REFACTOR_SUMMARY.md` - What was refactored

## First Development Steps

1. **Install Extensions in VS Code**
   ```
   - ESLint
   - Prettier - Code Formatter
   - EditorConfig for VS Code
   ```

2. **Configure VS Code Settings**
   Create `.vscode/settings.json` in project root:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

3. **Verify Code Quality**
   ```bash
   pnpm lint          # Check linting
   pnpm format:check  # Check formatting
   ```

4. **Make a Test Commit** (to verify git hooks)
   ```bash
   echo "test" > test.txt
   git add test.txt
   git commit -m "test: verify git hooks"
   rm test.txt
   ```

## Key Scripts to Know

```bash
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm start          # Run production build
pnpm lint           # Fix linting issues
pnpm lint:check     # Check linting without fixes
pnpm format         # Format all code
pnpm format:check   # Check formatting without changes
```

## File Naming Convention

All files use **kebab-case**:
- ✅ `locale-header.tsx`, `i18n-config.ts`
- ❌ `LocaleHeader.tsx`, `I18nConfig.ts`

When creating new files, follow this convention!

## Import Paths

Always use the `@/` alias:
```typescript
// ✅ Correct
import { getDictionary } from '@/core/lib/get-dictionary'
import { projects } from '@/core/constants/projects'

// ❌ Don't do this
import { getDictionary } from '../../../core/lib/get-dictionary'
```

## Multilingual Features

- **Default Language**: French (`/fr`)
- **Alternative**: English (`/en`)
- **Files**: `locales/fr.json` and `locales/en.json`
- **Switch**: Use header language switcher (top right)
- **Redirect**: Root path `/` automatically redirects to `/fr`

## Project Status

- **Build Status**: ✅ Passing
- **Type Safety**: ✅ TypeScript strict mode enabled
- **Code Quality**: ✅ ESLint + Prettier configured
- **Git Hooks**: ✅ Pre-commit hooks active
- **SEO**: ✅ Multilingual SEO optimized
- **Production Ready**: ✅ Yes

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `pnpm dev -- -p 3001` |
| ESLint not working | Restart VS Code |
| Import errors | Check kebab-case filenames |
| Build fails | Delete `.next`, run `pnpm build` again |
| Git hooks not running | Run `pnpm prepare` |

## Next: Read These Files

1. **SETUP.md** - Detailed local development guide
2. **ARCHITECTURE.md** - Code structure and patterns
3. **REFACTOR_SUMMARY.md** - What changed in the refactor

## Questions?

Refer to:
- `ARCHITECTURE.md` for technical questions
- `SETUP.md` for development setup issues
- Inline TypeScript comments in source code
- VS Code IntelliSense for API documentation

---

**Everything ready?** Run `pnpm dev` and start building!

Last Updated: May 8, 2026

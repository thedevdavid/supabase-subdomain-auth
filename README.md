# Supabase subdomain auth with Next.js cookie-based apex domain redirect

Set this up using Turborepo. I might make it a full starter. TBD. Let me know on Twitter if you want this at @thedevdavid

## Usage

### Apps and Packages

- `dash`: a [Next.js](https://nextjs.org/) app (app dashboard)
- `www`: another [Next.js](https://nextjs.org/) app (marketing page)
- `@repo/supabase`: Supabase config, client libraries, and queries built to share with apps.
- `@repo/ui`: shared React component library. Not built.
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
bun build
```

### Develop

To develop all apps and packages, run the following command:

```
bun dev
```

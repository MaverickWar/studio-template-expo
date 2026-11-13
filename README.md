# Studio template: React Native (Expo)

The starter Universal App Studio copies when someone picks **React Native (Expo)** while setting up a new project.

It's Expo's default starter (`npx create-expo-app@latest --template default`), with the type and lint errors in Expo's own starter fixed so the checks are green. Don't run `npm run reset-project`: it removes the design wiring. Notes for AI builders from Expo are in `docs/STACK-NOTES.md`. It has one change: **the look comes from `design/tokens.json`**.

- `design/tokens.json` holds the colours, fonts, corners and spacing. Studio replaces it with the project's own design straight after copying this template.
- `design/adapters/` reads those tokens in this stack's own language. See `design/adapters/README.md` once Studio has added it, or the comments at the top of each adapter.
- Style everything from the tokens. Change the look in Studio, never by typing colours into the code.

## Running it

```
npm install
npx expo start
```

Open the app in Expo Go on your phone (scan the QR code), or press w for the web version.

## Checks

```
npm run typecheck
npm run lint
npx expo export --platform web
```

The same checks run on GitHub for every push and pull request (`.github/workflows/checks.yml`).

# Pokédex

A Pokédex app on [PokeAPI](https://pokeapi.co/docs/v2) that follows the course Figma design. What it does: `specs/product.md` and `specs/features/`. Colours, font, sizes and icons: `specs/design.md`.

## Stack

- Expo SDK 58, Expo Router, TanStack Query, expo-sqlite. Must run in Expo Go.
- Ask me before you add a dependency. Install with `npx expo install`. Nothing with native code that Expo Go does not include.

## Structure

A screen renders, a hook gets data, a service talks to the API or the database. Nothing does two of those.

- `src/app/`: screens and routes only. No `fetch`, no SQL.
- `src/components/`: reusable UI. Gets its data through props.
- `src/hooks/`: TanStack Query hooks. One hook per endpoint.
- `src/services/`: API calls and response types (`pokeapi.ts`), SQL (`*-db.ts`).
- `src/utils/`: plain functions without React (formatting, filtering, comparing).

## Shared setup

Reuse what is listed here, never add a second one. When you set up something new that other features will use, add a line here: what it is and where it lives.

- Query client: `src/app/_layout.tsx`.
- Theme: `src/constants/theme.ts`. Every colour, spacing, radius and font name. No hex codes anywhere else. Read colours with `useTheme()`.
- Error state: `src/components/error-view.tsx`.
- Icons: `assets/icons/*.png` (72 × 72, show at 24 × 24, tint with `tintColor`). Fonts: `assets/fonts/`.
- Fonts: Rubik, loaded with `useFonts` in `src/app/_layout.tsx`. Use the names in `Fonts` from `src/constants/theme.ts`, not `fontWeight`.
- Light mode only: `useTheme()` always returns the one palette. Never read the colour scheme.
- Pokémon card (badge, sprite, name, ⋮): `src/components/pokemon-card.tsx`.
- All Pokémon names and ids (list and search): `usePokemonList()` in `src/hooks/use-pokemon-list.ts`. Sprite URL: `getSpriteUrl(id)` in `src/services/pokeapi.ts`.
- Name, number and id-from-url formatting: `src/utils/pokemon.ts`.
- `staleTime` for PokeAPI queries: `ONE_HOUR` in `src/constants/query.ts`.
- One Pokémon from `/pokemon/{id}` (types, stats, height, weight, abilities, species id): `usePokemon(id)` in `src/hooks/use-pokemon.ts`. Official artwork URL: `getArtworkUrl(id)` in `src/services/pokeapi.ts`.
- Number badge (`001`): `src/components/number-badge.tsx`. Type chip (dot + name): `src/components/type-chip.tsx`, colour from `getTypeColor(type)` in `src/constants/theme.ts`.
- Header button (icon, optional label): `src/components/header-button.tsx`. On iOS 26, pass it through `unstable_headerLeftItems` / `unstable_headerRightItems` with `hidesSharedBackground: true` to hide the glass pill, and through `headerLeft` / `headerRight` for Android.
- Stat name and bar length (relative to 255): `formatStatName` and `getStatRatio` in `src/utils/pokemon.ts`.

## Rules

- Data through TanStack Query hooks. No `useEffect` + `fetch`. The query key contains every id it depends on.
- `isPending` for the first spinner, not `isLoading`. Check `data` before `error`.
- Every load has a loading state and an error state with a "Try again" button that calls `refetch`.
- SQL always with `?` placeholders.
- `Pressable`, not `TouchableOpacity`. `FlatList` for long lists. Short fixed lists inside a scroll view (stats, an evolution chain) can use `map`.
- Images shown where you cannot set a size (like tab bar icons) need the `@3x` suffix in the file name (`pokeball@3x.png`), or they show at 72 pt instead of 24.
- No `any`, no `as` casts (except `as const`), no `@ts-ignore`. No `console.log`.
- Keep changes small. Do not refactor what the issue does not ask for.

## How we work

- One issue per chat.
- Before you write code for an issue: post a plan (which files, how, what you are unsure about) and a `- [ ]` task list as one comment on the issue with `gh issue comment`. Wait for my go. Tick off tasks with `gh issue comment --edit-last` while you build.
- Done means `npx expo lint` and `npx tsc --noEmit` are clean. I test on my phone and commit with `closes #<issue>`.

---

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

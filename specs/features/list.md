# Pokémon list

## Goal

See every Pokémon in a two-column grid, as in the design, so I can browse
them and open one.

## Constraints

- Home screen `src/app/(tabs)/index.tsx`, title "All Pokémon". Tab bar item "Pokémons" with the pokéball icon.
- One request: `/pokemon?limit=100000`. The id comes from the `url` of each result. Image URLs are built from the id, no request per Pokémon.
- All API code in `src/services/pokeapi.ts`, the query in a hook in `src/hooks/`. `staleTime` of one hour: the list does not change.
- Names formatted: every word capitalised, `-` becomes a space (`mr-mime` → "Mr Mime").
- `FlatList` with `numColumns={2}`. The card is a component in `src/components/`, so search, favorites and compare reuse it.
- This feature sets up the shared parts: colour tokens and font names in `src/constants/theme.ts` from [design.md](../design.md), Rubik loaded with Expo Font in `src/app/_layout.tsx`, the icons in `assets/icons/`, the splash screen (Pokémon logo on `daylight`, set in `app.json`).
- The ⋮ icon is shown but does nothing yet (feature "Options menu").

## Acceptance Criteria

- [ ] On start the splash screen shows the logo, then the list.
- [ ] The grid shows every Pokémon (~1350) with number badge, pixel sprite and name, as in the design, in Rubik.
- [ ] A Pokémon without a sprite shows an empty image area, no broken image icon.
- [ ] Scrolling to the end is smooth.
- [ ] A spinner while loading. An error message with a "Try again" button when it fails (airplane mode).
- [ ] Tapping a card opens the detail screen of that Pokémon.

## Out of Scope

- Search (own feature).
- Types in the cards: the list endpoint does not give them.
- Pagination, filters, sorting.
- Pull to refresh.

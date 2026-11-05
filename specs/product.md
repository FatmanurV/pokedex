# Pokédex

A Pokédex for iPhone and Android, built on live data from PokeAPI. Browse all
Pokémon, find one by name, see its details and evolutions, keep favorites,
share one with a friend and put two side by side. For Pokémon fans who want a
quick reference on their phone. It follows the course Figma design: colours, font, sizes and icons are in
[design.md](./design.md).

## Core action

Look up a Pokémon.

## Features

1. [Pokémon list](./features/list.md): all Pokémon in a two-column grid, fast and smooth.
2. [Search by name](./features/search.md): results while you type, part of the name is enough.
3. [Detail](./features/detail.md): artwork, types, and the tabs About, Stats and Evolution.
4. [Favorites](./features/favorites.md): save a Pokémon, own tab, still there after a restart.
5. [Options menu](./features/options-menu.md): the ⋮ menu on every card: open, (un)favorite, share, compare.
6. [Compare](./features/compare.md): two Pokémon side by side, per stat who is stronger.

## Data

- **API**: [PokeAPI](https://pokeapi.co/docs/v2). Public, no key, no login.
- **Endpoints**:
  - `/pokemon?limit=100000`: every Pokémon name and id in one call. Used for the list and for search.
  - `/pokemon/{id}`: types, stats, height, weight, base experience, abilities. Detail and compare.
  - `/pokemon-species/{id}`: only for the link to the evolution chain.
  - `/evolution-chain/{id}`: the evolution chain.
  - Images, built from the id (no request needed):
    - Pixel sprite for cards and the evolution list: `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
    - Official artwork for the detail screen: `.../sprites/pokemon/other/official-artwork/{id}.png`
- **Stored on the phone**: table `favorites` in SQLite: `id` (Pokémon id, primary key), `name`, `created_at`.

## Technical choices

- **Stored in SQLite**: the favorites, only id and name. The image URLs are
  built from the id and the details come live from the API, so nothing gets
  out of date. SQLite, not AsyncStorage (key-value), because I sort
  favorites by date added and the primary key on `id` prevents duplicates
  for free.
- **Native feature**: Share, in the options menu of a card. It opens the
  native share sheet with the name, number, types and a link as text, so it
  works in every chat app. React Native's built-in `Share`, no extra
  dependency. Alternative: haptics on the favorite button. Not chosen,
  because it gives the user nothing they can see or use.
- **Search**: PokeAPI has no search endpoint. The list call already returns
  every name, so search filters that list on the phone. No request per
  keystroke, and it finds Pokémon you have not scrolled to.

## Technical core

- [ ] Runs in Expo Go
- [ ] Live data through TanStack Query
- [ ] At least 2 screens with Expo Router
- [ ] Something in SQLite that survives a restart
- [ ] Loading and error state on every load
- [ ] One native feature: Share, in the options menu
- [ ] TypeScript and ESLint without errors
- [ ] UI, data and logic in separate files

## Optional

- [ ] Three different Reanimated animations, each with a purpose
- [ ] Dark mode: every screen looks right, all colours from the theme
- [ ] Pagination: page by page while you scroll, not all at once
- [ ] Clean TypeScript: no `any`, no `as` casts, no `@ts-ignore`
- [ ] Localization: two languages
- [ ] No warnings: no `console.log`, none in the terminal or on screen
- [ ] Offline: works in airplane mode with the last data
- [ ] Tests: one per feature on the logic, `npm test` passes
- [ ] CI: lint and tsc on every push
- [ ] Accessibility: button labels, largest text size
- [ ] Optimistic update

## Out of scope

- Accounts or sync between phones.
- Dark mode (the design is light only).
- Moves, items, locations, forms and variants.
- Filters or sorting by type or generation.
- A web version.

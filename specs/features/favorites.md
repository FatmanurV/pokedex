# Favorites

## Goal

Keep the Pokémon I like on their own tab, also after I close the app.

## Constraints

- SQLite with `expo-sqlite`, table `favorites`: `id INTEGER PRIMARY KEY`, `name TEXT NOT NULL`, `created_at TEXT DEFAULT CURRENT_TIMESTAMP`.
- All SQL in `src/services/favorites-db.ts`, `?` placeholders. Screens use hooks from `src/hooks/use-favorites.ts`: a query for the list, a query for "is this one a favorite", a mutation to toggle that invalidates `['favorites']`.
- New tab `src/app/(tabs)/favorites.tsx`, title "My favorites", tab bar item "Favorites" with the heart icon. The active tab bar item is purple with the filled icon.
- Reuses the card and the grid from the list.

## Acceptance Criteria

- [ ] The heart on the detail screen adds or removes the Pokémon. Empty heart when it is not a favorite, filled red heart when it is.
- [ ] The Favorites tab shows them, newest first, and updates at once after a change.
- [ ] Still there after closing and reopening the app.
- [ ] No favorites shows "No favorites yet" with a short hint.
- [ ] Tapping a favorite opens its detail.

## Out of Scope

- Sorting or grouping favorites.
- Sync between phones.

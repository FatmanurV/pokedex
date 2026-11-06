# Explanation - Pokédex

**Route:** Pokédex. **Tools:** Claude Code (VS Code).

## 1. Your technical choices

My favorites live in SQLite (`src/services/favorites-db.ts:13`), not
AsyncStorage, because I sort them by date added and the primary key on `id`
stops duplicates (`INSERT OR IGNORE`, line 43). This changed while building:
the agent kept `CURRENT_TIMESTAMP`, which only stores seconds. I asked for
milliseconds (line 16) so the order is always right, and updated the spec.

The native feature is Share, in the ⋮ menu of every card
(`src/hooks/use-pokemon-options.ts:68`). It sends the name, number, types and
a link as text, so it works in every chat app. I chose it over haptics because
the user gets something they can actually use. This did not change.

## 2. Pick one feature and explain how it works, from API call to screen.

The Pokémon list. `usePokemonList` (`src/hooks/use-pokemon-list.ts`) calls
`getPokemonList` in `src/services/pokeapi.ts:15`, which gets all Pokémon in one
request. TanStack caches it for an hour under `['pokemon-list']`, so search
uses the same data and going back does not reload. `src/app/(tabs)/index.tsx`
shows a spinner while it loads, the two-column grid when it has data, and an
error with a "Try again" button if the call fails.

## 3. Name a suggestion from the agent that you rejected or changed.

In the plan for issue 5 (the options menu), the agent wanted to copy about 30
lines of menu wiring into both the list screen and the favorites screen. I
read the plan and said no: the same logic in two places means two places to
fix when something changes, and `AGENTS.md` says to reuse shared setup. I
asked for one hook instead, `usePokemonOptions` in
`src/hooks/use-pokemon-options.ts`. Now each screen only calls it once
(`src/app/(tabs)/index.tsx:24` and `src/app/(tabs)/favorites.tsx:21`).
Plan: the comment on issue 5. Commit: "Add the options menu with share on
every card, closes #5".

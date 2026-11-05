# Search by name

## Goal

Find a Pokémon by typing part of its name, also one I have not scrolled to.

## Constraints

- Search field at the top of the home screen, above "All Pokémon", as in the design: white, search icon, placeholder "Search for Pokémon..". No new screen.
- No new requests: filter the list the list feature already loaded (same hook, same query key).
- The filter is a plain function in `src/utils/`, without React, so it can be tested on its own.
- Results use the same card and grid as the list.

## Acceptance Criteria

- [ ] Results update while I type.
- [ ] Part of the name, in any case, is enough: "pika" and "PIKA" find Pikachu, "ch" finds Charmander and Pikachu.
- [ ] Finds every Pokémon in the list, also far down (for example "zacian").
- [ ] Tapping a result opens its detail.
- [ ] No match shows "No Pokémon found".
- [ ] Clearing the field shows the full list again.

## Out of Scope

- Search by number or by type.
- Search history or suggestions.
- Typo tolerance (fuzzy search).

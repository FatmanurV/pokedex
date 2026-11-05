# Detail

## Goal

See everything about one Pokémon: what it looks like, its types, the basics,
its stats and how it evolves.

## Constraints

- Screen `src/app/pokemon/[id].tsx`, pushed on the root stack. Header: back button "Vorige" left (back icon), nothing in the middle, heart right.
- Data: `/pokemon/{id}` for everything on screen, `/pokemon-species/{id}` only for the evolution chain url, then `/evolution-chain/{id}`. One hook per endpoint, query key with the id. `staleTime` one hour.
- Layout as in the design: name (32, bold) and `#001` (faint) on one line, type chips, official artwork. Top part on `daylight`, the lower part white. The whole screen scrolls, the header stays on top.
- The tabs are component state (`useState`) in the screen. Each tab is its own component in `src/components/`.
- The heart is shown, its action comes with the feature "Favorites".

## Acceptance Criteria

- [ ] Name, number, official artwork, and the types as chips with a dot in the type colour.
- [ ] Tabs About, Stats, Evolution. The active tab is purple and underlined. Switching is instant, no new loading.
- [ ] About: Name, ID (`001`), Base (`64 XP`), Weight (`6.9 kg`, from hectograms), Height (`0.7 m`, from decimetres), Types and Abilities (comma separated, formatted names).
- [ ] Stats: HP, Attack, Defense, Special Attack, Special Defense, Speed, each with its value and a purple bar. The bar is the value relative to 255, the highest base stat.
- [ ] Evolution: the whole chain from top to bottom as cards (sprite, number badge, name) with a dotted line between them. A branching chain (Eevee) shows every branch in the list. Tapping a card opens that Pokémon's detail.
- [ ] Loading and error state (with "Try again") for the Pokémon, and separately for the evolution chain inside its tab.

## Out of Scope

- Description text, moves, locations, forms.
- The blur on the header while scrolling.
- Drawing branching chains as a tree.

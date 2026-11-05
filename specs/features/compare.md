# Compare

## Goal

Put two Pokémon side by side and see who is stronger on which stat. Figma has
no screen for this, so it follows the style of the detail screen.

## Constraints

- Screen `src/app/compare.tsx`, opened with "Compare" in the options menu: that Pokémon is the first one (`/compare?first=25`). Header with "Vorige", as on the detail screen.
- The second one is picked on the same screen with the search field and cards from the search feature (same filter function, same list query).
- Stats from `/pokemon/{id}`: the same hook and cache as the detail screen.
- Who wins per stat is a plain function in `src/utils/`, without React.
- Colours, font and chips as on the detail screen.

## Acceptance Criteria

- [ ] At the top both Pokémon with artwork, name, number and type chips. Until the second one is picked, its side says "Pick a Pokémon" and the search shows below.
- [ ] Per stat (HP, Attack, Defense, Special Attack, Special Defense, Speed) both values; the higher one is bold and purple. A tie highlights neither.
- [ ] A row "Total" with the sum of the six stats, highlighted the same way.
- [ ] A "Change" button lets me pick another second Pokémon.
- [ ] Loading and error state (with "Try again") for each Pokémon.

## Out of Scope

- Type matchups or a battle prediction.
- More than two Pokémon.
- Swapping first and second.

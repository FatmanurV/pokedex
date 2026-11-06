# Compare

## Goal

Put two Pokémon side by side and see who is stronger on which stat. Figma has
no screen for this, so it follows the style of the detail screen.

## Constraints

- Screen `src/app/compare.tsx`, opened with "Compare" in the options menu: that Pokémon is the first one (`/compare?first=25`). Header with "Vorige", as on the detail screen, and no title. As on the detail screen, the two halves sit on `daylight` and the stats (or the picker) sit below on `white`.
- The second one is picked on the same screen with the search field and cards from the search feature (same filter function, same list query).
- In the picker, tapping a card makes it the second Pokémon (it does not open the detail). The cards have no ⋮ there, so there is no options menu on the compare screen. `PokemonCard` gets an optional prop to hide the ⋮.
- With an empty search field the picker shows the full list in the two-column grid, as on the home screen. Typing filters it, and no match shows "No Pokémon found".
- The first Pokémon is left out of the picker list, so it cannot be picked as the second one.
- The second one lives in the URL: picking sets `second` on the same screen with `router.setParams` (`/compare?first=25&second=4`), so nothing is pushed. "Vorige" always goes back to where Compare was opened from.
- A `second` that is missing, not a whole number or the same as `first` counts as not picked.
- Scrolling while picking: the picker grid is a `FlatList`, and the two halves are its header, so they scroll up with the grid. The search field stays pinned at the top once it gets there. Once both are picked, the halves and the stats are one `ScrollView`.
- Stats from `/pokemon/{id}`: the same hook and cache as the detail screen (`usePokemon`), one query per Pokémon.
- Who wins per stat is a plain function in `src/utils/`, without React: `getStatWinner(first, second)` returns `'first'`, `'second'` or `'tie'`, and `getStatTotal(stats)` returns the sum. Both go in `src/utils/pokemon.ts`, next to `getStatRatio`.
- Colours, font and chips as on the detail screen. The stat name and "Total" are 16 SemiBold `midnight`. Values are 16 Regular `textMuted`, and the higher value is 16 Bold `purple`.
- One new colour token, `barMuted`: `#0E0940` at 20%, for the lower side's stat bar. It goes into `src/constants/theme.ts` and gets a row in the colour table in `specs/design.md`.

## Acceptance Criteria

- [ ] At the top both Pokémon with artwork, name, number and type chips. Until the second one is picked, its side says "Pick a Pokémon" and the search shows below.
- [ ] Each half of the top (first left, second right) is centred: square artwork, half the width, on `daylight`. Below it the name in 18 SemiBold, ending in `..` when it is too long, with `#025` next to it in `textFaint`. Then the type chips.
- [ ] Before the second one is picked, the right half has a square the size of the artwork with the `pokeball` icon centred in it (tinted `textFaint`, larger than 24 but at most 72 so it stays sharp). "Pick a Pokémon" sits below it where the name would be, so the two halves line up.
- [ ] Per stat (HP, Attack, Defense, Special Attack, Special Defense, Speed) both values; the higher one is bold and purple. A tie highlights neither.
- [ ] Each stat row has the full stat name (`formatStatName`) centred on its own line. Below it, one bar per side starts at the centre of the screen and grows outward (first Pokémon to the left, second to the right), with the value at the outer end of its bar. Bar length is value / 255, the same `getStatRatio` as the detail screen. Bars sit on the `track` colour. The higher side's bar is `purple` and the lower side's bar is `barMuted`; in a tie both bars are `barMuted`.
- [ ] A row "Total" with the sum of the six stats, highlighted the same way. It sits below a `divider` line, with "Total" in the middle and the two sums on the sides, and has no bars.
- [ ] A "Change" button lets me pick another second Pokémon. It is a small text button below the second Pokémon's type chips: "Change" in 14 SemiBold `purple`. Tapping it clears `second`, so that side shows "Pick a Pokémon" again and the picker takes the place of the stats.
- [ ] While picking, I can scroll the whole list, and the search field stays reachable at the top.
- [ ] Loading and error state (with "Try again") for each Pokémon, in its own half. While it loads, a spinner sits in that half's artwork square. On error, `ErrorView` (message and "Try again", which calls that Pokémon's `refetch`) takes the place of the artwork, name and chips.
- [ ] The stats section shows only when both Pokémon are loaded, with a spinner in its place until then. If either one failed to load, the stats section is empty: the error and "Try again" show only in that half.
- [ ] The picker list has its own loading and error state (spinner, and `ErrorView` with "Try again"), as on the home screen.

## Out of Scope

- Type matchups or a battle prediction.
- More than two Pokémon.
- Swapping first and second.
- Picking the first Pokémon on this screen: it always comes from the options menu.

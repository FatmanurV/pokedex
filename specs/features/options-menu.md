# Options menu and share

## Goal

Do the most common things with a Pokémon straight from its card, and send it
to a friend.

## Constraints

- Opens from the ⋮ on every card (list, search results, favorites).
- One shared component in `src/components/`, built with React Native's `Modal`: a grey overlay and a sheet at the bottom, as in the "Options" screen in the design. Works on iOS and Android (not `ActionSheetIOS`: no icons and iOS only).
- Uses React Native's `Share`. No new dependency.
- Favorite uses the hooks from the feature "Favorites". Compare opens the screen from the feature "Compare".
- The text to share is built by a plain function in `src/utils/`.

## Acceptance Criteria

- [ ] Items with their icon: "Open Pokémon", "Add to favorites" (or "Remove from favorites" with a filled heart when it is one), "Share", "Compare". Below them a separate "Cancel" button.
- [ ] Open Pokémon opens the detail.
- [ ] Add or remove changes the favorite and the menu closes. The Favorites tab and the detail heart show the change.
- [ ] Share opens the native share sheet with `Pikachu #025 – Electric` and the Bulbapedia link of the Pokémon (`https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pokémon)`).
- [ ] Cancel or tapping the overlay closes the menu.

## Out of Scope

- Long press on a card.
- Sharing an image.

# Design reference

Values from the course Figma file. Every colour goes into `src/constants/theme.ts`
as a token. No hex codes anywhere else.

## Colours

| Token | Value | Used for |
|---|---|---|
| `midnight` | `#0E0940` | All main text, icons |
| `purple` | `#5631E8` | Number badge, active tab, tab underline, stat bars |
| `red` | `#FF4F68` | Filled heart |
| `daylight` | `#EDF6FF` | Screen background, top of the detail screen |
| `white` | `#FFFFFF` | Card bottom, search field, lower part of the detail screen, evolution cards |
| `cardImage` | `#F6F6FF` | Image area of a card, image area of an evolution card |
| `chip` | `#0E0940` at 8% | Background of a type chip |
| `textMuted` | `#0E0940` at 65% | Values in About, placeholder |
| `textFaint` | `#0E0940` at 30% | The `#001` next to the name |
| `tabInactive` | `#0E0940` at 50% | Inactive tab label, inactive tab bar item |
| `divider` | `#0E0940` at 15% | Line under the detail tabs |
| `track` | `#0E0940` at 5% | Background of a stat bar |
| `barMuted` | `#0E0940` at 20% | The lower side's stat bar on the compare screen |

### Type colours (dot in the type chip)

| Type | Value | Type | Value |
|---|---|---|---|
| normal | `#9099A2` | water | `#4D90D6` |
| fighting | `#CE3F6A` | grass | `#64BC55` |
| flying | `#93A9E2` | electric | `#FFCF00` |
| poison | `#AB6AC8` | psychic | `#830CB9` |
| ground | `#D87645` | ice | `#7DE0D0` |
| rock | `#C4BA85` | dragon | `#0670BE` |
| bug | `#8FBF2B` | dark | `#5B5265` |
| ghost | `#546AA6` | fairy | `#EB90E6` |
| steel | `#5A8FA1` | shadow | `#5C5262` |
| fire | `#FF4F68` | unknown | `#B6B6B6` |

## Font

Rubik, from the course `fonts.zip`, loaded with Expo Font. Files in `assets/fonts/`.

| Text | Size | Weight |
|---|---|---|
| Name on the detail screen | 32 | Bold |
| Screen title ("All Pokémon", "My favorites") | 24 | Bold |
| Card name, evolution name | 18 | SemiBold |
| Detail tabs | 14 | SemiBold |
| About label | 16 | SemiBold |
| About value, stat value | 16 | Regular |
| `#001` next to the name | 32 | Regular |
| Number badge | 12 | SemiBold, white |
| Tab bar label | 12 | Medium |

## Layout

- Screen side padding 24. Screen width in Figma 390.
- Cards: two columns, gap 16. Image area square, pixel sprite centred. Name row below, name left and the ⋮ icon right, long names end in `..`.
- Number badge top left on the image: padding 6 horizontal and 2 vertical, small radius, three digits (`001`, `025`; `1025` and `10001` as they are).
- Type chip: pill shape, coloured dot left, type name right.
- Cards, search field and evolution cards: white with a soft shadow.

## Icons

PNG, 3x (72 × 72, shown at 24 × 24), in `assets/icons/`. Single colour, so they
can be tinted with `tintColor`.

`search`, `back`, `close`, `open`, `share`, `more` (⋮), `heart`, `heart-filled`,
`pokeball`, `pokeball-filled`. Splash logo: `assets/images/pokemon-logo.png`.

## Copy

The design mixes Dutch and English. We follow it: the back button says
**"Vorige"**, everything else is English.

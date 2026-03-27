# UI Overhaul Plan - AI-Client.js

## Architecture Understanding

The menu system uses an **iframe** rendered from `getFrameContent()` which combines:
- `styles_default` - CSS (inside iframe)
- `Header_default` - header bar HTML
- `Navbar_default` - sidebar nav HTML  
- `Home_default` through `Devtool_default` - page content HTML
- `Game_default` + `Store_default` - CSS injected into main page

The chatlog (`createChatLog()`) is on the **main page**, not the iframe.

---

## Part 1: Chatlog Redesign

**Target**: Replace the current chatlog CSS in `createChatLog()` with Abyss-style design.

**Reference**: `abyss.user.js` `#ChatBodyBox` style (L795):
- Dark glass background with gradient
- Rounded corners (16px)
- Tabs for different log types
- Proper scrolling with custom scrollbar
- Fade animations

**Implementation**: Replace the style block inside `createChatLog()` with Abyss-inspired CSS:
- Glass dark background: `linear-gradient(180deg, rgba(18,18,18,.92), rgba(10,10,10,.86))`
- Border: `1px solid rgba(255,255,255,.10)`
- Border-radius: `16px`
- Proper scrollbar styling
- Color-coded message types matching Abyss theme
- Auto-hide when idle, show on hover

---

## Part 2: Menu CSS Redesign

**Target**: Update `styles_default` to make the iframe menu look modern/sleek.

**Reference**: `abyss.user.js` `#z-menu` style (L797):
- `border-radius: 24px`
- `background: linear-gradient(180deg, #181818, #242424)`
- Purple accent color `#9B5CFF`
- Glass header with text-shadow glow
- Smooth transitions
- Rounded option rows
- Custom scrollbar with purple thumb

**Key CSS changes in `styles_default`**:
1. `#menu-container` - add border-radius: 20px, glass background
2. `header` - gradient background, glow text
3. `.section` - rounded corners, subtle borders
4. `.content-option` - rounded rows with hover effect
5. `.switch-checkbox` - purple accent toggle
6. Scrollbar - purple themed
7. `.menu-page` - smooth transitions
8. Inputs/buttons - rounded, glass effect

---

## Part 3: Bot Loadout Selector

**Target**: Add upgrade path selection for bots in the Misc menu page.

**Reference**: `Robotis.js` uses `Loadout` type options in menu for hat/weapon selection.

**Implementation approach**: 
Since the menu HTML is a template string, add a new section to `Misc_default` or `Home_default` with bot loadout dropdowns. The bot upgrade system uses `sendUpgrade(index)` with hardcoded item IDs - we need to make these configurable.

**Current bot upgrade path** (in `Ref/Zclient.js` / the original code):
The bots currently auto-upgrade using a fixed sequence. We need to expose this as a setting.

**Plan**:
1. Add `_botLoadout` setting to `Settings_default` storing the upgrade path
2. Add UI in Misc page with primary/secondary weapon selector
3. Hook the bot upgrade handler to use the selected loadout

---

## Implementation Order

1. **Chatlog CSS** - smallest scope, update `createChatLog()` style block
2. **Menu CSS** - update `styles_default` string  
3. **Bot loadout** - add to Misc_default + Settings_default + upgrade handler

## Key Constraints
- Template strings are single-line escaped - edits must preserve the escaping
- `styles_default` is used inside an iframe so it's isolated CSS
- Bot loadout needs to communicate between iframe menu and main script context

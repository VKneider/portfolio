# Imposter Game Architecture

This folder is a reference implementation of a Slice.js game that uses ContextManager as the single source of truth. Views are cached and manually updated because there is no router managing lifecycle or re-rendering.

## Goals
- Keep game state in a single shared context (`ImposterGameContextService`).
- Keep UI components stateless or with only ephemeral UI state.
- Avoid localStorage for game state; use context persistence instead.
- Make view transitions explicit and predictable.

## High-level flow
1. `TheImposterGame` creates the context service (singleton).
2. `GameSetup` reads/writes game config to context.
3. `WordReveal` receives props from context and computes imposter indexes for the round.
4. `GameFlow` renders final results; reset/play-again update context and return to setup.

## Components and responsibilities

### `TheImposterGame`
- Orchestrator that switches between setup/reveal/flow views.
- Creates context service once and reuses it.
- Caches components and calls `update()` manually (no router).
- Holds only ephemeral state: `imposterIndexes` for the current round.

### `ImposterGameContextService`
- Single source of truth for `imposter:game-config`.
- Persists context via `slice.context` (not via direct localStorage use for game state).
- Provides `getGameConfig`, `updateGameConfig`, `resetGameConfig`, and watchers.

### `GameSetup`
- Owns setup UI and writes to context on change.
- No localStorage fallback for game state.
- Uses context to rehydrate values when returning from later steps.

### `WordReveal`
- Stateless regarding game config (reads props only).
- Holds ephemeral reveal flow state (`currentPlayer`, `imposterIndexes`).
- Emits `revelation-finished` so the orchestrator can advance the step.

### `GameFlow`
- Stateless regarding game config (reads props only).
- Emits `reset-game` and `play-again-same` to update context and return to setup.

## Data model
Context name: `imposterGameConfig`

Key fields:
- `step`: setup | reveal | playing
- `players`, `imposters`, `names`
- `mode`: automatic | manual
- `useNames`, `useSavedNames`, `namesSource`
- `customWord`, `selectedListId`, `activeNames`
- `word`, `category`

## Lifecycle notes
- `TheImposterGame` caches `GameSetup`, `WordReveal`, `GameFlow` and calls their `update()` methods manually when context changes or when returning to the view.
- Because there is no router, manual updates are required to keep the UI in sync.
- `imposterIndexes` is intentionally local and recomputed each round.

## Storage policy
- Game state is persisted only through context (`slice.context` with `persist: true`).
- LocalStorage is used only for user preferences or libraries that already depend on it:
  - audio settings
  - lists/categories data
  - game stats

## Extension tips
- When adding new game state, update `ImposterGameContextService.defaultGameConfig` and write to context from the responsible view.
- If a view needs to react to state changes, use context watchers and re-render locally.

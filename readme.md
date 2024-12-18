# ana-cli

## Setup

### Build & Install

1. `npm install`
2. `npm run build`
3. `npm link`

### Config setup

1. `cp config.example.yml config.yml`
2. fill in the config params in the yml file

### Install requirements

[**fzf**](https://github.com/junegunn/fzf): Fuzzy searching utility

```bash
brew install fzf
```

## How to extend with more commands

`ana` cli is built on `yargs` so you can create an write additional commands anywhere in the codebase, preferably another directory parallel to the `commands/defaults` and import it in to `index.ts`

e.g.

```ts
// index.ts
import { myCustomCommand } from './commands/extensions/my-custom`;
// ...
myCustomCommand(ana);
// ...
```

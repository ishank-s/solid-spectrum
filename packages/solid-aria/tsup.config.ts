import { defineConfig } from 'tsup-preset-solid'

export default defineConfig(
  {
    entry: 'index.ts',
    devEntry: true,
  },
  {
    // Enable this to write export conditions to package.json
    // writePackageJson: true,
    dropConsole: true,
  },
)
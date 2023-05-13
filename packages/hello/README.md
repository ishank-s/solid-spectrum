<a href="https://github.com/your-author-name/solid-spectrum/tree/main/packages/hello#readme">
<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-spectrum&background=tiles&project=Hello" alt="solid-spectrum Hello">
</p>

# Hello

Example hello world package in the solid-spectrum repository.

## Installation

```bash
npm install @solid-spectrum/hello
# or
yarn add @solid-spectrum/hello
# or
pnpm add @solid-spectrum/hello
```

## How to use it

```ts
import { createHello } from '@solid-spectrum/hello'

const [hello, setHello] = createHello()

hello() // => "Hello World!"

setHello('Solid')

hello() // => "Hello Solid!"
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

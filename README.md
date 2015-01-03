# require-fresh

<!-- [![build status][1]][2] [![dependency status][3]][4]

[![browser support][5]][6] -->

Ensure require stays fresh for an entire directory

## Example

Useful for javascript templates. When any file in the templates
    folder changes we clear the entire templates folder from
    require cache so that none of the templates are stale.

```js
var path = require("path")
var NODE_ENV = require("node-env")

var loadTemplate = require("require-fresh")({
    dir: path.join(__dirname, "templates"),
    watch: false,
    force: true
})

var templ = loadTemplate("./main.js", { fresh: true })
```

## Installation

`npm install require-fresh`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/require-fresh.png
  [2]: https://travis-ci.org/Raynos/require-fresh
  [3]: https://david-dm.org/Raynos/require-fresh.png
  [4]: https://david-dm.org/Raynos/require-fresh
  [5]: https://ci.testling.com/Raynos/require-fresh.png
  [6]: https://ci.testling.com/Raynos/require-fresh

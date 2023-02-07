# vscode Uri

```
  foo://example.com:8042/over/there?name=ferret#nose
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
   |   _____________________|__
  / \ /                        \
  urn:example:animal:ferret:nose
```

```js
import { URI } from "vscode-uri"

// parse an URI from string

let uri = URI.parse(
  "https://code.visualstudio.com/docs/extensions/overview#frag"
)

assert.ok(uri.scheme === "https")
assert.ok(uri.authority === "code.visualstudio.com")
assert.ok(uri.path === "/docs/extensions/overview")
assert.ok(uri.query === "")
assert.ok(uri.fragment === "frag")
assert.ok(
  uri.toString() ===
    "https://code.visualstudio.com/docs/extensions/overview#frag"
)

// create an URI from a fs path

let uri = URI.file("/users/me/c#-projects/")

assert.ok(uri.scheme === "file")
assert.ok(uri.authority === "")
assert.ok(uri.path === "/users/me/c#-projects/")
assert.ok(uri.query === "")
assert.ok(uri.fragment === "")
assert.ok(uri.toString() === "file:///users/me/c%23-projects/")
```

## extension

```js
import { Uri, StatusBarAlignment } from "vscode"
// STATIC
// parse, file, from,
// joinPath(base: Uri, ...pathSegments: string[])

let uri = Uri.parse(`${VIEW_DB_KEY_SCHEME}:${id}.json`)
const { path, query, scheme, fsPath, fragment, authority } = uri

let file = Uri.parse("before:some/file/path")
let other = file.with({ scheme: "after" })  // Derive a new Uri from this Uri.
assert.ok(other.toString() === "after:some/file/path")

// Uri.file(path) is not the same as Uri.parse('file://' + path)
const good = URI.file("/coding/c#/project1")
good.scheme === "file"
good.path === "/coding/c#/project1"
good.fragment === ""

const bad = URI.parse("file://" + "/coding/c#/project1")
bad.scheme === "file"
bad.path === "/coding/c" // path is now broken
bad.fragment === "/project1"

// Create a new uri which path is the result of joining the path of the base uri with the provided path segments.
// The base uri must have a path
joinPath(Uri.file("file:///c:/root"), "../../other").fsPath === "c:/other" // true
```

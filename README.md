# sass.dev.js

Client side parser for development purposes.

## Delcaring SASS/SCSS stylesheets

```
<link rel="stylesheet/sass" href="path/to/sass/file" />
<link rel="stylesheet/scss" href="path/to/scss/file" />
```

While you can use both SASS and SCSS in a project, it is strongly recommended to pick one for one single project.

By default, the path to the SASS/SCSS files should be placed in `../css` relative to `sass.dev.js` file.

Use `rel` attribute to indicate the format:

- `stylesheet/sass`

- `stylesheet/scss`

## Loading the development script

You will need 3 files in total:

1. sass.dev.js

2. sass.js

3. sass.worker.js

`sass.js` and `sass.worker.js` is taken from the original [sass.js](https://github.com/medialize/sass.js) project. `sass.dev.js` enables client side automatic compilation.

All 3 files has to be in the same folder, and you only need to load `sass.dev.js` file.

```
<script src="path/to/sass.dev.js"></script>
```

You must load `sass.dev.js` **AFTER** declaring SASS/SCSS stylesheets.


### Data Attributes

You can use data attributes to provide custom options to the compiler:

```
<script src="path/to/sass.dev.js" data-custom-attribute="custom-value"></script>
```

`data-import-path` - define a custom `@import` path to be used, defaults to `../css`.

# rollup-plugin-folder-input
## Overview
[Rollup](https://github.com/rollup/rollup) plugin to allow specification of 'input' array using globs, e.g. `input:'./**/*.js'`

### Motivation
Maintaining arrays of input files in the Rollup config requires additional thinking when adding a file to a site.  

Wouldn't it be great if we could just set Rollup to look at a folder and run for every file that happens to be in there?  

This plugin allows exactly that.

#### What it's not
This plugin is not a way of specifying that multiple files should be merged into one file, for that the [multientry](https://github.com/rollup/plugins/tree/master/packages/multi-entry) plugin already exists.

## Install
Using npm:

```console
npm install --save-dev rollup-plugin-folder-input
```

__*note__: if you don't have [Rollup](https://github.com/rollup/rollup) installed yet, go do that first.

## Usage
In the rollup.config.js file add
```js
import { folderInput } from 'rollup-plugin-folder-input'
```
and make sure the plugin is added at the very start of your plugin list.
```js
  plugins: [
      folderInput(), 
      /* other plugins here */
  ],
```
then you can use standard Globs in your input specification, e.g.
```js
  input: './src/*.js',
```

### complete example config
Create `rollup.config.js` with the following:
```js
import { folderInput } from 'rollup-plugin-folder-input'

export default {
  input: './src/*.js',
  plugins: [folderInput()],
  output: {
    dir: './dist',
    format: 'es',
    plugins: []
  }
}
```
Run from the command line with
```console
npx rollup -c rollup.config.js
``` 

For details on the glob format see the [fast-glob documentation](https://github.com/mrmlnc/fast-glob#pattern-syntax)

## Contributing
Bug reports and pull requests welcomed - please be sure to include passing specification tests in any PR.

The tests are run using [Jest](https://jestjs.io/) and written in Jasmine style (describe/it) using ECMAScript modules.

A handy list of matchers is here: https://jestjs.io/docs/expect

### NPM Commands
* `npm run build` - to build the library  
* `npm test` - to run the tests and update the coverage report

To view the code coverage report after running the tests open [`./coverage/lcov-report/index.html`](./coverage/lcov-report/index.html) in a browser.


## Changelog
See the [Releases](https://github.com/dgkimpton/rollup-plugin-folder-input/releases) page for changelog for each release version.

## License
This software is released under the terms of the [MIT license](https://choosealicense.com/licenses/mit/).

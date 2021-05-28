# rollup-plugin-folder-input
## Overview
[Rollup](https://github.com/rollup/rollup) plugin to allow specification of 'input' array using globs

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

## Note for contributors

The tests are written in Jasmine and themselves use rollup in a pre-build step to make sure they run on Node.

To run the unit tests on save the vscode plugin https://github.com/pucelle/vscode-run-on-save is needed.
On Windows, you need to make sure to configure the correct shell path in the global vscode settings, e.g.
```
	"runOnSave.shell": "C:\\Program Files\\Git\\bin\\bash.exe",
```

## Contributing
Bug reports and pull requests welcomed.

## Changelog
See the [Releases section of our GitHub project][github_releases] for changelog for each release version.

## License
This software is released under the terms of the MIT license.

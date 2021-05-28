import fg from 'fast-glob'

export default function folderInput () {
  return {
    name: 'folderInput',
    options (options) {
      options = options || {}

      if (!options.input) {
        throw new Error('no input folder, provide "input" element in rollup config using globs')
      }

      if (typeof options.input === 'string') {
        const found = fg.sync([options.input])
        options.input = (found.length === 1) ? found[0] : found
      }
    }
  }
}

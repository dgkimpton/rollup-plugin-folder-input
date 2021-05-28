export default function folderInput () {
  return {
    name: 'folderInput',
    options (options) {
      options = options || {}

      if (!options.input) {
        throw new Error('no input folder, provide "input" element in rollup config using globs')
      }
    }
  }
}

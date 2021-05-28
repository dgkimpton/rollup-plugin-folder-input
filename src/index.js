export default function folderInput () {
  return {
    options (options) {
      options = options || {}

      if (!options.input) {
        throw new Error('no input folder, provide "input" element in rollup config using globs')
      }
    }
  }
}

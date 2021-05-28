import fg from 'fast-glob'

export function folderInput () {
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
        return
      }

      if (Array.isArray(options.input)) {
        options.input = fg.sync(options.input)
        return
      }

      if (typeof options.input !== 'object') {
        throw new Error('failed to understand "input" field in rollup config')
      }

      const keys = Object.getOwnPropertyNames(options.input)

      if (keys.length === 0) {
        throw new Error('failed to understand "input" field in rollup config, no keys')
      }

      keys.forEach(k => {
        const source = options.input[k]

        if (typeof source === 'string') {
          const found = fg.sync([source])
          options.input[k] = (found.length === 1) ? found[0] : found
        } else if (Array.isArray(source)) {
          options.input[k] = fg.sync(source)
        } else {
          throw new Error(`failed to understand 'input["${k}"]' field in rollup config`)
        }
      })
    }
  }
}

export default [
  {
    input: './src/index.js',
    output: {
      file: './lib/index.mjs',
      format: 'esm',
      name: 'bundle'
    },
    plugins: []
  },
  {
    input: './src/index.js',
    output: {
      file: './lib/index.cjs',
      format: 'cjs'
    },
    plugins: []
  }
]

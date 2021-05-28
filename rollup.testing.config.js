export default {
  input: './spec/plugin.spec.js',
  plugins: [],
  external: [
    'fast-glob'
  ],
  output: {
    dir: '.tests',
    format: 'cjs',
    sourcemap: false,
    compact: false,
    plugins: []
  }
}

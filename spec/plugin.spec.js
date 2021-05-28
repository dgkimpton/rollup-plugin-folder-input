/* eslint-env jasmine */

import folderInput from '../src/index.js'

describe('folder import plugin function', function () {
  it('is a function', function () {
    expect(typeof folderInput).toBe('function')
  })

  it('takes no configuration', function () {
    expect(folderInput.length).toBe(0)
  })

  it('returns a plugin object', function () {
    expect(typeof folderInput()).toBe('object')
  })
})

describe('folder input plugin', function () {
  let plugin
  beforeEach(function () {
    plugin = folderInput()
  })

  it('is named', function () {
    expect(plugin.name).toEqual('folderInput')
  })

  it('processes the options hook', function () {
    expect(plugin.options).toBeDefined()
  })

  describe('options hook', function () {
    let hook
    beforeEach(function () {
      hook = folderInput().options
    })

    it('takes one parameter', function () {
      expect(hook.length).toBe(1)
    })

    it('fails when no input option is provided', function () {
      expect(() => { hook() }).toThrowError()
    })

    describe('when provided a string input that is a filename', function () {
      it('doesn\'t change the input object', function () {
        const opt = { input: 'README.md' }
        hook(opt)
        expect(opt.input).toBe('README.md')
      })
    })

    describe('when provided a string input that is a glob', function () {
      let opt
      beforeEach(function () {
        opt = { input: './spec/glob-test/**' }
        hook(opt)
      })

      it('changes the input into an array', function () {
        expect(Array.isArray(opt.input)).toBeTrue()
      })

      it('removes the original input string', function () {
        expect(opt.input).not.toContain('./spec/glob-test/**')
      })

      it('adds strings for each of the matched files', function () {
        expect(opt.input).toContain('./spec/glob-test/a.js')
        expect(opt.input).toContain('./spec/glob-test/b.js')
      })
    })

    describe('when provided with an array of inputs', function () {
      let opt
      beforeEach(function () {
        opt = { input: ['./spec/glob-test/**', 'README.md', './spec/array-test/**'] }
        hook(opt)
      })

      it('leaves input as an array', function () {
        expect(Array.isArray(opt.input)).toBeTrue()
      })

      it('leaves the original raw filenames in the array', function () {
        expect(opt.input).toContain('README.md')
      })

      it('removes the original glob input strings', function () {
        expect(opt.input).not.toContain('./spec/glob-test/**')
        expect(opt.input).not.toContain('./spec/array-test/**')
      })

      it('adds the set of all matched filenames', function () {
        expect(opt.input).toContain('./spec/glob-test/a.js')
        expect(opt.input).toContain('./spec/glob-test/b.js')
        expect(opt.input).toContain('./spec/array-test/c.js')
        expect(opt.input).toContain('./spec/array-test/d.js')
      })
    })

    describe('when provided with an object of input specifications', function () {
      let opt
      beforeEach(function () {
        opt = {
          input: {
            x: './spec/glob-test/**',
            y: 'README.md',
            'z/t': ['./spec/array-test/**', 'LICENSE']
          }
        }
        hook(opt)
      })

      it('keys with individual filenames to remain unchanged', function () {
        expect(opt.input.y).toBe('README.md')
      })

      it('keys with globs to have been expanded to be arrays', function () {
        expect(Array.isArray(opt.input.x)).toBeTrue()
        expect(opt.input.x).toContain('./spec/glob-test/a.js')
        expect(opt.input.x).toContain('./spec/glob-test/b.js')
      })

      it('keys with globs to not contain the glob anymore', function () {
        expect(opt.input.y).not.toContain('./spec/glob-test/**')
      })

      it('keys with globs and individual filenames to have been expanded to be include files matched by the glob', function () {
        expect(Array.isArray(opt.input['z/t'])).toBeTrue()
        expect(opt.input['z/t']).toContain('./spec/array-test/c.js')
        expect(opt.input['z/t']).toContain('./spec/array-test/d.js')
        expect(opt.input['z/t']).toContain('LICENSE')
      })

      it('keys with globs and individual filenames to no longer contain the globs', function () {
        expect(opt.input['z/t']).not.toContain('./spec/array-test/**')
      })
    })
  })
})

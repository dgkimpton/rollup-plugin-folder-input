/* eslint-env jasmine */

import { folderInput } from '../src/index.js'

const sampleFolder = './spec.sample-data/'

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
        const opt = { input: sampleFolder + 'single-file.js' }
        hook(opt)
        expect(opt.input).toBe(sampleFolder + 'single-file.js')
      })
    })

    describe('when provided a string input that is a glob', function () {
      let opt
      beforeEach(function () {
        opt = { input: sampleFolder + 'glob-test/**' }
        hook(opt)
      })

      it('changes the input into an array', function () {
        expect(Array.isArray(opt.input)).toBeTrue()
      })

      it('removes the original input string', function () {
        expect(opt.input).not.toContain(sampleFolder + 'glob-test/**')
      })

      it('adds strings for each of the matched files', function () {
        expect(opt.input).toContain(sampleFolder + 'glob-test/a.js')
        expect(opt.input).toContain(sampleFolder + 'glob-test/b.js')
      })
    })

    describe('when provided with an array of inputs', function () {
      let opt
      beforeEach(function () {
        opt = { input: [sampleFolder + 'glob-test/**', sampleFolder + 'single-file.js', sampleFolder + 'array-test/**'] }
        hook(opt)
      })

      it('leaves input as an array', function () {
        expect(Array.isArray(opt.input)).toBeTrue()
      })

      it('leaves the original raw filenames in the array', function () {
        expect(opt.input).toContain(sampleFolder + 'single-file.js')
      })

      it('removes the original glob input strings', function () {
        expect(opt.input).not.toContain(sampleFolder + 'glob-test/**')
        expect(opt.input).not.toContain(sampleFolder + 'array-test/**')
      })

      it('adds the set of all matched filenames', function () {
        expect(opt.input).toContain(sampleFolder + 'glob-test/a.js')
        expect(opt.input).toContain(sampleFolder + 'glob-test/b.js')
        expect(opt.input).toContain(sampleFolder + 'array-test/c.js')
        expect(opt.input).toContain(sampleFolder + 'array-test/d.js')
      })
    })

    describe('when provided with an object of input specifications', function () {
      let opt
      beforeEach(function () {
        opt = {
          input: {
            x: sampleFolder + 'glob-test/**',
            y: sampleFolder + 'single-file.js',
            'z/t': [sampleFolder + 'array-test/**', sampleFolder + 'second-file.js']
          }
        }
        hook(opt)
      })

      it('keys with individual filenames to remain unchanged', function () {
        expect(opt.input.y).toBe(sampleFolder + 'single-file.js')
      })

      it('keys with globs to have been expanded to be arrays', function () {
        expect(Array.isArray(opt.input.x)).toBeTrue()
        expect(opt.input.x).toContain(sampleFolder + 'glob-test/a.js')
        expect(opt.input.x).toContain(sampleFolder + 'glob-test/b.js')
      })

      it('keys with globs to not contain the glob anymore', function () {
        expect(opt.input.y).not.toContain(sampleFolder + 'glob-test/**')
      })

      it('keys with globs and individual filenames to have been expanded to be include files matched by the glob', function () {
        expect(Array.isArray(opt.input['z/t'])).toBeTrue()
        expect(opt.input['z/t']).toContain(sampleFolder + 'array-test/c.js')
        expect(opt.input['z/t']).toContain(sampleFolder + 'array-test/d.js')
        expect(opt.input['z/t']).toContain(sampleFolder + 'second-file.js')
      })

      it('keys with globs and individual filenames to no longer contain the globs', function () {
        expect(opt.input['z/t']).not.toContain(sampleFolder + 'array-test/**')
      })
    })
  })
})

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
  })
})

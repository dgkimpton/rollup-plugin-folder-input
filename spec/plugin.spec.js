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
  it('processes the options hook', function () {
    expect(folderInput().options).toBeDefined()
  })
  describe('options hook', function () {
    it('takes one parameter', function () {
      expect(folderInput().options.length).toBe(1)
    })
    it('fails when no input option is provided', function () {
      expect(() => { folderInput().options() }).toThrowError()
    })
  })
})

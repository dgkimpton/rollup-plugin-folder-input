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
  })
})

import expect from 'expect'
import { transform } from 'babel-core'

import plugin from '../src'

describe('babel-plugin-auto-import', () => {
  const transformOpts = {
    presets: [ 'react' ],
    plugins: [
      [ plugin, [] ]
    ]
  }

  it('runs', () => {
    const code = `
    import React, { Component } from 'react'

    function test() {
      if (true) {
        const foo = <Foo />
        const bar = <Bar />
      }
    }

    `
    const result = transform(code, transformOpts)

    expect(result.code).toEqual('var utils = require("./src/mylib/subfolder/utils");')
  })
})

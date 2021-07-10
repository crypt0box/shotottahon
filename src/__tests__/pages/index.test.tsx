import React from 'react'
import HomePage from 'src/pages'
import { render } from '../utils'

test('ホームページ', () => {
  const { container } = render(<HomePage />)
  expect(container).toMatchSnapshot()
})
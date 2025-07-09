import * as _ from 'radashi'

test('escapeHTML', () => {
  expect(_.escapeHTML('&<>"\'')).toMatchInlineSnapshot(
    `"&amp;&lt;&gt;&quot;&#39;"`,
  )
})

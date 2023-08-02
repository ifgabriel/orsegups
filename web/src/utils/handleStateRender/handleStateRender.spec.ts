import handleStateRender from '.'

describe('handleStateRender', () => {
  it('should return loading', () => {
    expect(handleStateRender(false, undefined)).toBe('loading')
  })

  it('should return view', () => {
    expect(handleStateRender(true, [{ content: 'data' }])).toBe('view')
  })

  it('should return error', () => {
    expect(handleStateRender(true, undefined)).toBe('error')
  })

  it('should return empty', () => {
    expect(handleStateRender(true, [], [].length === 0)).toBe('empty')
  })
})
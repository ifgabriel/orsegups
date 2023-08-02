import joinClassNames from '.'

describe('joinClassNames', () => {
  it('should generate the class with the junction of the parameters', () => {
    const firstClass = 'Container'
    const secondClass = 'List'
    const expectClass = 'Container List'
    expect(joinClassNames(firstClass, secondClass)).toEqual(expectClass)
  })
})

import buildUrl from '.'

describe('buildUrl', () => {
  it('should generate the correct URL with values and params', () => {
    const route = '/tasks/:id/:email'
    const params = { id: '123', email: 'foo@example.com' }
    const queryParams = {
      name: 'Gabriel',
      age: 25,
      tags: ['javascript', 'programming'],
    }
    const expectedUrl =
      '/tasks/123/foo@example.com?name=Gabriel&age=25&tags=javascript,programming'
    expect(buildUrl({ route, params, queryParams })).toEqual(expectedUrl)
  })

  it('should generate the correct URL with values only', () => {
    const route = '/tasks/:id/:email'
    const params = { id: '123', email: 'foo@example.com' }
    const expectedUrl = '/tasks/123/foo@example.com'
    expect(buildUrl({ route, params })).toEqual(expectedUrl)
  })

  it('should generate the correct URL with queryParams only', () => {
    const route = '/tasks/:id/:email'
    const queryParams = {
      name: 'Gabriel',
      age: 25,
      tags: ['javascript', 'programming'],
    }
    const expectedUrl =
      '/tasks/:id/:email?name=Gabriel&age=25&tags=javascript,programming'
    expect(buildUrl({ route, queryParams })).toEqual(expectedUrl)
  })

  it('should generate the correct URL without values or params', () => {
    const route = '/tasks/:id/:email'
    const expectedUrl = '/tasks/:id/:email'
    expect(buildUrl({ route })).toEqual(expectedUrl)
  })

  it('should generate the correct URL with an array param', () => {
    const route = '/tasks/:id/:email'
    const queryParams = { tags: ['javascript', 'programming'] }
    const expectedUrl = '/tasks/:id/:email?tags=javascript,programming'
    expect(buildUrl({ route, queryParams })).toEqual(expectedUrl)
  })
})

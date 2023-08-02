interface BuildUrlProps {
  route: string
  params?: Record<string, unknown>
  queryParams?: Record<string, unknown>
}

const buildUrl = ({ route, params = {}, queryParams = {} }: BuildUrlProps) => {
  for (const [key, value] of Object.entries(params)) {
    route = route.replace(`:${key}`, String(value))
  }

  const queryString =
    Object.entries(queryParams)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          value = value.join(',')
        }

        return `${key}=${value}`
      })
      .join('&') ?? ''

  return `${route}${queryString && `?${queryString}`}`
}

export default buildUrl

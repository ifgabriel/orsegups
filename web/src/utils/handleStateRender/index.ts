const handleStateRender = (
  isFetched: boolean,
  data: unknown,
  canEmpty?: boolean,
) => {
  if (isFetched && !data) {
    return 'error'
  }

  if (isFetched && canEmpty) {
    return 'empty'
  }

  if (isFetched && data) {
    return 'view'
  }

  return 'loading'
}

export default handleStateRender

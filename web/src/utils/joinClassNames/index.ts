type ClassName = string | undefined

const joinClassNames = (...classNames: ClassName[]) => {
  return classNames.join(' ')
}

export default joinClassNames

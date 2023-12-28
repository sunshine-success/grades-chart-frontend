export const calculateMedianGrade = (param: number[]) => {
  const length = param.length
  if (length % 2) return param[(length - 1) / 2]
  else return (param[length / 2] + param[length / 2 - 1]) / 2
}

export const calculateAverageGrade = (param: number[]) => {
  const sum: number = param.reduce((total, value) => (total += value), 0)
  const length: number = param.length
  return Math.round(sum / length)
}

export const calculateIndexByDeciles = (param: number) => {
  const index: number = Math.floor(param / 10)
  if (index === 10) return 9
  else return index
}

export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  if (Object.keys(obj).length) return false
  else return true
}

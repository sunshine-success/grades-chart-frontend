export type StudentGradesData = Record<string, Record<string, number>>

export type StudentGrades = {
  Alex: number
  Michael: number
  John: number
  Oliver: number
  Alice: number
  Ashley: number
  Max: number
  Jenny: number
  Grace: number
  Jason: number
  Samantha: number
  Julia: number
}

export type SubjectGrades = {
  math: number
  history: number
  english: number
  physics: number
  geography: number
  chemistry: number
  biology: number
}

export type SubjectTotalGrades = {
  math: number[]
  history: number[]
  english: number[]
  physics: number[]
  geography: number[]
  chemistry: number[]
  biology: number[]
}

export type StudentForExcel = {
  studentName: string
  math: number
  history: number
  english: number
  physics: number
  geography: number
  chemistry: number
  biology: number
}

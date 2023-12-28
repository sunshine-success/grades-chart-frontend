import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { fetchGrades, updateGrades } from '@/services/gradesData'
import type {
  StudentGrades,
  SubjectGrades,
  StudentGradesData,
  SubjectTotalGrades
} from '@/utils/types'
import {
  calculateMedianGrade,
  calculateAverageGrade,
  calculateIndexByDeciles
} from '@/utils/functions'

export const useGradesStore = defineStore('grades', () => {
  const state = reactive({
    gradesData: {} as StudentGradesData
  })

  const fetchGradesData = async () => {
    state.gradesData = await fetchGrades()
  }

  const updateGradesData = async (param: StudentGradesData) => {
    await updateGrades(param)
  }

  const getGrades = async () => {
    if (Object.keys(state.gradesData).length === 0) await fetchGradesData()
    return state.gradesData
  }

  const getStudentAverageGrades = async () => {
    if (Object.keys(state.gradesData).length === 0) await fetchGradesData()
    const studentAverageGrades = {} as StudentGrades
    Object.entries(state.gradesData).map(([studentName, subjectGrades]) => {
      studentAverageGrades[studentName as keyof StudentGrades] = calculateAverageGrade(
        Object.values(subjectGrades)
      )
    })
    return studentAverageGrades as StudentGrades
  }

  const getSubjectAverageAndMedianGrades = async () => {
    if (Object.keys(state.gradesData).length === 0) await fetchGradesData()
    const subjectTotalGrades = {} as SubjectTotalGrades
    const subjectMedianGrades = {} as SubjectGrades
    const subjectAverageGrades = {} as SubjectGrades
    Object.values(state.gradesData).map((subjectGrades) => {
      Object.entries(subjectGrades).map(([subjectName, grade]) => {
        if (!subjectTotalGrades[subjectName as keyof SubjectTotalGrades])
          subjectTotalGrades[subjectName as keyof SubjectTotalGrades] = []
        subjectTotalGrades[subjectName as keyof SubjectTotalGrades].push(grade)
      })
    })
    Object.entries(subjectTotalGrades).map(([subjectName, grades]) => {
      subjectMedianGrades[subjectName as keyof SubjectGrades] = calculateMedianGrade(grades)
      subjectAverageGrades[subjectName as keyof SubjectGrades] = calculateAverageGrade(grades)
    })
    return { subjectAverageGrades, subjectMedianGrades }
  }

  const getPersonalGrades = async (studentName: string) => {
    if (Object.keys(state.gradesData).length === 0) await fetchGradesData()
    return state.gradesData[studentName]
  }

  const getDistributionData = async (subjectName: string) => {
    if (Object.keys(state.gradesData).length === 0) await fetchGradesData()
    const distributionData: number[] = Array(10).fill(0)
    Object.values(state.gradesData).map((personalGrades) => {
      distributionData[calculateIndexByDeciles(personalGrades[subjectName])]++
    })
    return distributionData
  }

  const changeGrades = async (updatedData: StudentGradesData) => {
    await updateGradesData(updatedData)
    await fetchGradesData()
  }

  return {
    changeGrades,
    getGrades,
    getSubjectAverageAndMedianGrades,
    getStudentAverageGrades,
    getPersonalGrades,
    getDistributionData
  }
})

import type { StudentGradesData } from '@/utils/types'

export const fetchGrades = async (): Promise<StudentGradesData> => {
  try {
    const response = await fetch('http://localhost:3000/grades')
    if (!response.ok) {
      throw new Error(`Failed to fetch grades. Status: ${response.status}`)
    }
    const data: StudentGradesData = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching grades:', error)
    throw error
  }
}

export const updateGrades = async (param: StudentGradesData): Promise<StudentGradesData> => {
  try {
    console.log('Grades updated successfully:', param)
    const apiUrl = `http://localhost:3000/grades`
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
    return param
  } catch (error) {
    console.error('Error updating grades:', error)
    throw error
  }
}

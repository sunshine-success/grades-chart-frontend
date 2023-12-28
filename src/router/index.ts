import { createRouter, createWebHistory } from 'vue-router'
import {
  StudentAverageView,
  StudentView,
  SubjectAverageView,
  SubjectView,
  EditView
} from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student/:studentName',
      name: 'personal',
      component: StudentView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentAverageView
    },
    {
      path: '/subject/:subjectName',
      name: 'distribution',
      component: SubjectView
    },
    {
      path: '/subject',
      name: 'subject',
      component: SubjectAverageView
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditView
    }
  ]
})

export default router

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useGradesStore } from '@/stores/grades'
import type { StudentForExcel, StudentGradesData } from '@/utils/types'
import { isObjectEmpty } from '@/utils/functions'
import { CustomBtn } from '@/components'

const gradesData = ref([] as StudentForExcel[])
const updatedData = ref({} as StudentGradesData)
const gradesStore = useGradesStore()

const onUpdate = (records: any) => {
  const { keys, name, newVal } = records[0]
  const [studentName] = keys
  if (!updatedData.value[studentName]) {
    updatedData.value[studentName] = {}
  }
  updatedData.value[studentName][name] = Number(newVal)
}

const onSubmit = () => {
  if (!isObjectEmpty(updatedData.value)) gradesStore.changeGrades(updatedData.value)
}

onMounted(async () => {
  const originalData: StudentGradesData = await gradesStore.getGrades()
  gradesData.value = Object.entries(originalData).map(
    ([studentName, subjectGrades]) =>
      ({
        studentName,
        ...subjectGrades
      }) as StudentForExcel
  )
})

onBeforeUnmount(async () => onSubmit())
</script>

<template>
  <vue-excel-editor v-model="gradesData" autocomplete filter-row @update="onUpdate">
    <vue-excel-column
      field="studentName"
      label="Name"
      type="string"
      key-field
      autoFillWidth
      readonly
    />
    <vue-excel-column field="math" label="Math" type="number" autoFillWidth />
    <vue-excel-column field="history" label="History" type="number" autoFillWidth />
    <vue-excel-column field="english" label="English" type="number" autoFillWidth />
    <vue-excel-column field="physics" label="Physics" type="number" autoFillWidth />
    <vue-excel-column field="geography" label="Geography" type="number" autoFillWidth />
    <vue-excel-column field="chemistry" label="Chemistry" type="number" autoFillWidth />
    <vue-excel-column field="biology" label="Biology" type="number" autoFillWidth />
  </vue-excel-editor>
  <div class="button-wrapper">
    <CustomBtn :label="`Submit`" @click="onSubmit" />
  </div>
</template>

<style scoped>
.button-wrapper {
  padding-top: 30px;
  padding-right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>

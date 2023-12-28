<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGradesStore } from '@/stores/grades'
import { CustomBtn } from '@/components'
import type { SubjectGrades } from '@/utils/types'
import * as _ from 'lodash'

const series = ref([
  {
    name: 'Grade',
    data: [] as number[]
  }
])
const chartOptions = ref({
  chart: {
    animations: {
      enabled: false
    },
    type: 'bar',
    zoom: {
      type: 'xy',
      enabled: false,
      autoScaleYaxis: false
    },
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true
  },
  grid: {
    borderColor: 'transparent',
    row: {
      colors: ['#D2D5D8', 'transparent'],
      opacity: 0.3
    }
  },
  title: {
    text: '' as string,
    align: 'center'
  },
  xaxis: {
    categories: [] as string[],
    title: {
      text: '' as string
    }
  },
  yaxis: {
    title: {
      text: 'Grade'
    },
    min: 0,
    max: 100
  }
})

const route = useRoute()
const router = useRouter()
const navigateToOtherRoute = () => {
  router.push(`/student`)
}

const personalGrades = ref({} as SubjectGrades)
const gradesStore = useGradesStore()

onMounted(async () => {
  const studentName = route.params.studentName as string
  personalGrades.value = (await gradesStore.getPersonalGrades(studentName)) as SubjectGrades
  chartOptions.value.title.text = `Grades of ${studentName}`
  chartOptions.value.xaxis.title.text = studentName
  Object.entries(personalGrades.value).map(([subjectName, grade]) => {
    chartOptions.value.xaxis.categories.push(subjectName[0].toUpperCase() + subjectName.slice(1))
    series.value[0].data.push(grade)
  })
  chartOptions.value = _.cloneDeep(chartOptions.value)
  series.value = _.cloneDeep(series.value)
})
</script>

<template>
  <div class="chart-wrapper">
    <div id="chart">
      <apexchart height="500" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
  <div class="button-wrapper">
    <CustomBtn :label="`Back`" @click="navigateToOtherRoute" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
}
.button-wrapper {
  padding-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>

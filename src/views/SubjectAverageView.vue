<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGradesStore } from '@/stores/grades'
import type { SubjectGrades } from '@/utils/types'
import * as _ from 'lodash'

const series = ref([
  {
    color: '#008FFB',
    name: 'Average Grades',
    data: [] as number[]
  },
  {
    color: '#FF4664',
    name: 'Median Grades',
    data: [] as number[]
  }
])
const chartOptions = ref({
  chart: {
    animations: {
      enabled: false
    },
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    },
    zoom: {
      type: 'xy',
      enabled: false,
      autoScaleYaxis: false
    },
    events: {
      click: (event: MouseEvent, chartContext: any, config: any) => {
        navigateToOtherRoute(
          `subject/${Object.keys(subjectAverageGrades.value)[config.dataPointIndex]}`
        )
      }
    }
  },
  colors: [],
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Average and Median Grades by Subjects',
    align: 'center'
  },
  grid: {
    borderColor: 'transparent',
    row: {
      colors: ['#D2D5D8', 'transparent'],
      opacity: 0.3
    }
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: [] as string[],
    title: {
      text: 'Subjects'
    }
  },
  yaxis: {
    title: {
      text: 'Grade'
    },
    min: 0,
    max: 100
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
})

const router = useRouter()
const navigateToOtherRoute = (param: string) => {
  router.push(`/${param}`)
}

const subjectMedianGrades = ref({} as SubjectGrades)
const subjectAverageGrades = ref({} as SubjectGrades)
const gradesStore = useGradesStore()

onMounted(async () => {
  const subjectData = await gradesStore.getSubjectAverageAndMedianGrades()
  subjectMedianGrades.value = subjectData.subjectMedianGrades
  subjectAverageGrades.value = subjectData.subjectAverageGrades
  Object.entries(subjectAverageGrades.value).map(([subjectName, averageGrade]) => {
    series.value[0].data.push(averageGrade)
    series.value[1].data.push(subjectMedianGrades.value[subjectName as keyof SubjectGrades])
    chartOptions.value.xaxis.categories.push(subjectName[0].toUpperCase() + subjectName.slice(1))
  })
  chartOptions.value = _.cloneDeep(chartOptions.value)
  series.value = _.cloneDeep(series.value)
})
</script>

<template>
  <div class="chart-wrapper">
    <div id="chart">
      <apexchart height="500" type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>

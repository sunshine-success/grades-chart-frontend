<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGradesStore } from '@/stores/grades'
import { CustomBtn } from '@/components'
import * as _ from 'lodash'

const series = ref([
  {
    name: 'Persons',
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
    categories: [
      '0~10',
      '10~20',
      '20~30',
      '30~40',
      '40~50',
      '50~60',
      '60~70',
      '70~80',
      '80~90',
      '90~100'
    ],
    title: {
      text: 'Grade Range'
    }
  },
  yaxis: {
    title: {
      text: 'Persons'
    },
    min: 0,
    max: 10
  }
})

const route = useRoute()
const router = useRouter()
const navigateToOtherRoute = () => {
  router.push(`/subject`)
}

const distributionData = ref([] as number[])
const gradesStore = useGradesStore()

onMounted(async () => {
  const subjectName = route.params.subjectName
  distributionData.value = await gradesStore.getDistributionData(subjectName as string)
  chartOptions.value.title.text = subjectName[0].toUpperCase() + subjectName.slice(1)
  series.value[0].data = distributionData.value
  chartOptions.value.yaxis.max =
    _.cloneDeep(distributionData.value).sort()[9] > 10 ? distributionData.value.sort()[9] + 1 : 10
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

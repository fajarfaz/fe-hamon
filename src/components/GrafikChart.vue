<template>
  <Line class="h-[300px]" :height="height"  :chart-options="chartOptions" :chart-data="chartData" />

</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,

} from 'chart.js'

ChartJS.register(Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale)

export default {
  name: 'BarChart',
  components: { Line },
  props: ['dataSet'],
  watch: {
    dataSet(val) {
      
      var dates = []
      var prices = []
      for (var n in val) {
        var d = new Date(val[n].created_at)
        dates.push(d.toLocaleDateString('id-ID'))
        prices.push(val[n].price)
      }
      this.chartData = {
        labels: dates,
        datasets: [
          {
            label: val[0].hardware.name,
            backgroundColor: '#f87979',
            data: prices
          }
        ]
      }
      this.chartOptions = {
        tooltips: {
          callbacks: {
            label: function (t, d) {
              var xLabel = d.datasets[t.datasetIndex].label;
              var yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
              return xLabel + ': ' + yLabel;
            }
          }
        }
      }
      // console.log(this.chartData)


    }
  },
  data() {
    return {
      height: 150,
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agt', 'Sept', 'Oct', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40, 10, 40, 39, 80, 20]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
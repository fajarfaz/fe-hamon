<template>
    <div>
        <h1 class="font-bold">
            Hardware Monitoring
            {{ hardwares }}
        </h1>
        <GrafikChartVue />
    </div>
</template>
<script>
import axios from 'axios';
import GrafikChartVue from '../../components/GrafikChart.vue';
export default {
    components: { GrafikChartVue },
    data() {
        return {
            loading: true,
            hardwares: 'null'
        }
    },
    async mounted() {
        await axios.get('hardware')
            .then(response => (this.hardwares = response.data))
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    },
}

</script>
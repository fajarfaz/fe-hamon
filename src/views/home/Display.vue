
<template>
    <div>
        <h1 class="font-bold">
            Hardware Monitoring
          
        </h1>
        <div class="flex items-center">
          
            <v-select :options="nameList" label="title" class="w-full"></v-select>
        </div>
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
            hardwares: 'null',
            nameList: []
        }
    },
    async mounted() {
        await axios.get('hardware')
            .then(response => (this.hardwares = response.data))
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => {
                this.loading = false
                
                for (var n in this.hardwares){

                    this.nameList.push(
                        this.hardwares[n].name
                    )
                }

                
            })
    },
}

</script>
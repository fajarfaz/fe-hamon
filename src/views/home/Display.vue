
<template>
    <div>
        <h1 class="font-bold">
            Hardware Monitoring

        </h1>
        <div class="flex items-center">
            <v-select :options="nameList" label="title" class="w-full" :reduce="nameList => nameList.code"
                v-model="selected" @input="changeChart('hi')"></v-select>
        </div>

        <GrafikChartVue v-bind:dataSet="data" />
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
            nameList: [],
            selected: 'hi',
            data: {}
        }
    },
    // methods: {
    //     changeChart(h) {
    //         console.log(h)
    //     }

    // },
    watch: {
        async selected(val) {
            
            await axios.get('monitoring/'+val)
                .then(response => (this.data = response.data))
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => { })

             
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

                for (var n in this.hardwares) {
                    if (this.hardwares[n].name != 'Categories') {
                        this.nameList.push({
                            'code': this.hardwares[n].id_ori,
                            'title': this.hardwares[n].name
                        }
                        )
                    }
                }


            })
    },
}

</script>
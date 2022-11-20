
<template>
    <div>
        <h1 class="font-bold text-4xl text-center text-gray-600 mb-20 uppercase tracking-widest">
            <span class="text-blue-400 font-bold">Ha</span>rdware <span class="text-blue-400 font-bold">Mon</span>itoring
        </h1>
        <div class="flex flex-col space-y-2 mb-8">
            <label class="font-semibold text-lg text-gray-500">Fluctuating Hardware Price</label>
            <div class="flex items-center space-x-4">
                <div class="border rounded-xl w-[260px] h-[260px] overflow-auto" v-for="n in 5">
                    <img src="" alt="" class="bg-red-200 h-[120px] w-full bg-cover overflow-hidden">
                    <div class="flex flex-col px-4 py-2">
                        <label class="text-lg">Device Name</label>
                        <label class="text-sm">New Price</label>
                        <label class="text-xs text-green-500">Persentase naik/turun</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col space-y-2 mb-8">
            <label class="font-semibold text-lg text-gray-500">Price Graph</label>
            <div class="flex items-center space-x-2">
                <label for="">Searching</label>
                <v-select :options="nameList" label="title" class="w-full" :reduce="nameList => nameList.code"
                    v-model="selected" @input="changeChart('hi')"></v-select>
            </div>
            <GrafikChartVue v-bind:dataSet="data" />
        </div>
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

            await axios.get('monitoring/' + val)
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
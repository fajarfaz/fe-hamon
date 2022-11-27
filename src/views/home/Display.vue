
<template>
    <div>
        <h1 class="font-bold text-4xl text-center text-gray-600 mb-20 uppercase tracking-widest">
            <span class="text-blue-400 font-bold">Ha</span>rdware <span
                class="text-blue-400 font-bold">Mon</span>itoring
        </h1>
        <div class="flex flex-col space-y-2 mb-8">
            <label class="font-semibold text-lg text-gray-500">We Have <span class="text-blue-500 font-semibold"
                    v-if="loading.trend == false">{{ trends.length }}</span> Fluctuating Hardware Price</label>
            <div class="flex items-center space-x-2 text-xs">
                <div :class="uft ? 'bg-gray-500 text-gray-100 shadow-lg': 'text-gray-200 bg-gray-700'" class="flex items-center space-x-2 text-gray-200 bg-gray-700 py-1.5 px-3 rounded-lg hover:shadow-lg cursor-pointer duration-300 hover:bg-gray-600"
                    @click="downPriceFilter()">
                    <span class="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                    <label for=""> Harga Turun </label>
                    <label class="text-white"> {{ downPrice.length }}</label>
                </div>
                <div :class="dft ? 'bg-gray-500 text-gray-100 shadow-lg': 'text-gray-200 bg-gray-700'" @click="upPriceFilter" class="flex items-center space-x-2 text-gray-300 bg-gray-700 py-1.5 px-3 rounded-lg">
                    <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                    <label for=""> Harga Naik </label>
                    <label class="text-white"> {{ upPrice.length }}</label>
                </div>
            </div>
            <div class="flex items-center space-x-4 py-4 overflow-x-auto overflow-y-hidden">
                <a :href="trend.info.link"
                    class="flex flex-col hover:shadow-lg duration-300 cursor-pointer space-y-2 shrink-0 border rounded-xl w-[200px] h-[300px] py-4"
                    v-for="trend in trends">
                    <div class="flex items-center space-x-2 px-4">
                        <img :src="trend.info.image ? trend.info.image[0] : '-' " alt=""
                            class="bg-red-200 h-[60px] w-[60px] mx-auto rounded-full bg-cover overflow-hidden">
                        <div class="flex flex-col space-y-1 text-xs items-center">
                            <label class="bg-green-100 text-center rounded-lg px-2 py-1 text-green-500"
                                v-if="trend.percentage < 0">{{ trend.percentage }}%</label>
                            <label class="bg-red-100 text-center rounded-lg px-2 py-1 text-red-500" v-else>{{
                                    trend.percentage
                            }}%</label>
                            <label class="font-medium truncate" v-if="trend.range > 0">+{{ trend.range.toLocaleString()
                            }}</label>
                            <label class="font-medium truncate" v-else>{{ trend.range.toLocaleString() }}</label>
                        </div>
                    </div>

                    <div class="flex flex-col px-4 pt-2 text-xs justify-between h-full">
                        <div class="flex flex-col ">
                            <text-clamp class="text-sm" :text="trend.info.name" :max-lines="2" />
                            <label class="bg-gray-200 py-0.5 mx-auto mt-1 px-2 text-[11px] rounded-md w-max">{{trend.info.category}}</label>
                            <div class="mt-2 bg-gray-100 py-1 px-4 -mx-4 flex items-center justify-between">
                                <label class="">New Price</label>
                                <label class="">Rp. {{ trend.new_price.toLocaleString() }}</label>
                            </div>
                            <div
                                class="bg-gray-00 py-1 px-4 -mx-4 flex items-center justify-between text-[11px] text-gray-500">
                                <label class="">Old Price</label>
                                <label class="">Rp. {{ trend.old_price.toLocaleString() }}</label>
                            </div>
                        </div>
                        <div
                            class="bg-gray-00 py-1 px-4 -mx-4 flex items-center justify-between text-[11px] text-gray-400">
                            <label class="">Last Update</label>
                            <label class="font-medium ">{{ trend.last_update }}</label>
                        </div>

                    </div>
                </a>
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
            loading: {
                trend: true,
                hardware: true
            },
            hardwares: null,
            nameList: [],
            selected: 'hi',
            trends: null,
            data: {},
            uft: false,
            dft: false
        }
    },
    methods: {
        downPriceFilter() {
            this.dft = !this.dft
            this.uft = false
            if (this.dft) {
                if (Array.isArray(this._trends)) {
                    var tes = this._trends.filter(item => {
                        return item.percentage < 0

                    })
                    this.trends = tes
                }

            }else{
                this.trends = this._trends
            }
        },
        upPriceFilter() {
            this.uft = !this.uft
            this.dft = false
            if (this.uft) {
                if (Array.isArray(this._trends)) {
                    var tes = this._trends.filter(item => {
                        return item.percentage > 0

                    })
                    this.trends = tes
                }

            }else{
                this.trends = this._trends
            }
        }

    },
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
    computed: {
        downPrice() {
            var down = []
            for (var f in this.trends) {
                if (this.trends[f].percentage < 0) {
                    down.push({ 'percent': this.trends[f].percentage })
                }

            }
            return down
        },
        upPrice() {
            var up = []
            for (var f in this.trends) {
                if (this.trends[f].percentage > 0) {
                    up.push({ 'percent': this.trends[f].percentage })
                }
            }
            return up
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
                this.loading.hardware = false

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

        await axios.get('hardware/trend')
            .then(response => (this.trends = response.data))
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => {
                this.loading.trend = false
                this._trends = this.trends
            })
    },
}

</script>
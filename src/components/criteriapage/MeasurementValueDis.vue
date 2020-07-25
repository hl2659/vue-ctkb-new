<template>
    <el-row style="width: 80%; flex: auto; margin: auto; padding: 10px">
        <el-col :span="24" style="padding-right: 2px;">

            <el-card v-loading="loading" class="box-card shadow mb-4">
                <div slot="header" class="clearfix">
                    <h5 class="m-0 font-weight-bold text-primary">Criteria Value Distribution</h5>
                    <div class="col-auto">
                        <el-popover placement="top" trigger="hover" title="Help"
                                    content="Frequency of measurement values across all trials where this concept is used as an eligibility criterion">
                            <i slot="reference" class="el-icon-question" style="font-size: 1.5em"></i>
                        </el-popover>
                    </div>
                </div>

                <!-- Card Body -->
                <div v-if="showFlag" class="card-body">
                    <div class="chart-area" style="width:1000px;height:550px;left:0px">
                        <v-chart :options="valueOps" :init-options="initOps" theme="infographic" autoresize/>
                    </div>
                </div>

            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/dataZoom'
    import 'echarts/theme/shine'
    import 'echarts/theme/macarons'
    import 'echarts/theme/azul'
    import 'echarts/theme/roma'
    import 'echarts/theme/sakura'
    import 'echarts/theme/infographic'
    import axios from "axios";
    import storage from "../../storage/storage";
    import {mapMutations} from "vuex";



    let initOps = {
        title: {
            text: 'Measurement Value Distribution',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false, lang: ['Data view', 'Close', 'Refresh'], title: 'View data'},
                magicType: {
                    show: true,
                    type: ['line', 'bar'],
                    title: {line: 'Switch to Line chart', bar: 'Switch to Bar chart'}
                },
                restore: {show: true, title: 'Reset'},
                saveAsImage: {show: true, title: 'Save as image'}
            }
        },
        calculable: true,
        xAxis: {
            data: [],
            name: 'Measurement value',
            nameLocation: 'middle',
            nameGap: 40
        },
        yAxis:
            {
                name: 'Counts',
                nameLocation: 'middle',
                nameGap: 50
            },
        dataZoom: [
            {
                show: true,
                start: 10,
                end: 90
            },
            {
                type: 'inside',
                start: 10,
                end: 90
            },
            {
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 35,
                height: '80%',
                showDataShadow: false,
                left: '90%'
            }
        ],
        series: [{
            // 根据名字对应到相应的系列
            name: 'CT_Counts',
            type: 'line',
            data: []
        }]
    };

    export default {
        name: "MeasurementValueDis",
        components: {
            'v-chart': ECharts
        },
        data() {
            return {
                criteriaId: '',
                criteriaName: '',
                xAxis_data: {},
                series_data: {},
                initOps: initOps,
                valueOps: {},
                showFlag: false,
                loading: true,
            }
        },
        computed:{
            criteriaChange(){
                return this.$store.state.criteriaId;
            }
        },
        watch:{
            criteriaChange(val, oldVal) {
                console.log( 'criteria id updated to: '+val + ' from '+oldVal);
                this.criteriaId = this.$store.state.criteriaId;
                this.criteriaName = this.$store.state.criteria;
                this.updateData(this.criteriaId);
            },
        },
        methods:{
            ...mapMutations(['updateCriteriaID','updateCriteria']),
            getCriteriaIdAndSearch(){
                if (!Boolean(this.criteriaId)) {
                    this.criteriaId = this.$store.state.criteriaId;
                    this.criteriaName = this.$store.state.criteria;
                    if(Boolean(this.criteriaId)){
                        console.log("measurement get state stored criteria id: "+this.criteriaId);
                    }
                    else{
                        if(Boolean(storage.get('criteriaId')) && storage.get('criteriaId').length > 0){
                            console.log("measurement get local stored criteria id: "+storage.get('criteriaId'));
                            this.criteriaId = storage.get('criteriaId');
                            this.criteriaName = storage.get('criteriaName');
                        }
                    }
                }
                this.updateData(this.criteriaId);
            },
            updateData(criteria) {
                this.loading = true;
                this.showFlag = false;
                console.log('Measurement get criteria Id: '+ criteria);
                // criteria = '4285271';
                var result = [];
                var userMax = -1.0;
                var userMin = -1.0;

                console.log("Search measurement by criteria: " + criteria);
                axios.get(this.$apiUrl + "/measurement/values/concept_id/" + criteria + "/" + userMax + "/" +userMin)
                    .then(response => {
                        // console.log(response.data);
                        result = response.data;
                        this.loading = false;
                        this.updateChart(criteria, result);
                    })
                    .catch(function (err) {
                        console.log(err);
                        this.loading = false;
                    });
                return result;

            },
            updateChart(criteria, data) {
                var bin_list = data['bin_list'];
                var count_list = data['count_list'];
                if (!Array.isArray(bin_list) || !bin_list.length) {
                    this.showFlag = false;
                    alert("Sorry, not enough measurement data to display!");
                } else if (!Array.isArray(count_list) || !count_list.length) {
                    this.showFlag = false;
                    alert("Sorry, not enough measurement data to display!");
                } else {
                    this.showFlag = true;
                    console.log("Process Measurement: " + criteria);

                    var series_data = [];
                    var xAxis_data = [];


                    series_data = series_data.concat(count_list);
                    xAxis_data = xAxis_data.concat(bin_list);
                    // console.log(series_data);
                    // console.log(xAxis_data);


                    this.valueOps = this.prepareOps(xAxis_data, series_data);
                }
            },
            prepareOps(xAxis_data, series_data){
                var option = {
                    title: {
                        text: this.criteriaName + ' Value Distribution',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }},
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false, lang: ['Data view', 'Close', 'Refresh'], title: 'View data'},
                            magicType: {
                                show: true,
                                type: ['line', 'bar'],
                                title: {line: 'Switch to Line chart', bar: 'Switch to Bar chart'}
                            },
                            restore: {show: true, title: 'Reset'},
                            saveAsImage: {show: true, title: 'Save as image'}
                        }
                    },
                    calculable: true,
                    xAxis: {
                        data: xAxis_data,
                        name: 'Measurement value',
                        nameLocation: 'middle',
                        nameGap: 40
                    },
                    yAxis:
                        {
                            name: 'Counts',
                            nameLocation: 'middle',
                            nameGap: 50
                        },
                    dataZoom: [
                        {
                            show: true,
                            start: 10,
                            end: 90
                        },
                        {
                            type: 'inside',
                            start: 10,
                            end: 90
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 35,
                            height: '80%',
                            showDataShadow: false,
                            left: '90%'
                        }
                    ],
                    series: [{
                        // 根据名字对应到相应的系列
                        name: 'CT_Counts',
                        type: 'line',
                        data: series_data
                    }]
                };
                return option;

            },

        },
        created() {
            this.getCriteriaIdAndSearch();
        },
    }

</script>

<style scoped>

    .clearfix {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
    }

    /**
* The default size is 600px×400px, for responsive charts
* you may need to set percentage values as follows (also
* don't forget to provide a size for the container).
*/
    .echarts {
        width: 100%;
        height: 100%;
    }

    .chart-area {
        width: 1050px;
        height: 550px;
    }

    .card-body {
        display: flex;
        flex: auto;
        margin: auto;
    }

</style>

<style>

    .el-card__header {
        background-color: rgba(0, 0, 0, 0.03);
    }
</style>
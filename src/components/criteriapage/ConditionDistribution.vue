<template xmlns="http://www.w3.org/1999/html">
    <el-row style="width: 80%; flex: auto; margin: auto; padding: 10px">
        <el-col :span="24" style="padding-right: 2px;">

            <el-card class="box-card shadow mb-4">
                <div slot="header" class="clearfix">
                    <h5 class="m-0 font-weight-bold text-primary">Disease Concept Distribution</h5>
                    <div class="col-auto">
                        <el-popover placement="top" trigger="hover" title="Help"
                                    content="Frequency of medical concept used as inclusion criterion across diseases, ordered by inclusion criteria count">
                            <i slot="reference" class="el-icon-question" style="font-size: 1.5em"></i>
                        </el-popover>
                    </div>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                    <div v-loading="loading" class="chart-area" style="width:1000px;height:550px;left:0px">
                        <v-chart :options="inclusionOps" :init-options="initOps" theme="azul" autoresize/>
                    </div>
                </div>

            </el-card>
        </el-col>
        <el-col :span="24" style="padding-right: 2px;">

            <el-card class="box-card shadow mb-4">
                <div slot="header" class="clearfix">
                    <h5 class="m-0 font-weight-bold text-primary">Disease Concept Distribution</h5>
                    <div class="col-auto">
                        <el-popover placement="top" trigger="hover" title="Help"
                                    content="Frequency of medical concept used as exclusion criterion across diseases, ordered by exclusion criteria count">
                            <i slot="reference" class="el-icon-question" style="font-size: 1.5em"></i>
                        </el-popover>
                    </div>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                    <div v-loading="loading" class="chart-area" style="width:1000px;height:550px;left:0px">
                        <v-chart :options="exclusionOps" :init-options="initOps" theme="macarons2" autoresize/>
                    </div>
                </div>

            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/dataZoom'
    import 'echarts/theme/shine'
    import 'echarts/theme/macarons'
    import 'echarts/theme/azul'
    import 'echarts/theme/roma'
    import 'echarts/theme/sakura'
    import 'echarts/theme/macarons2'
    import axios from "axios";
    import storage from "../../storage/storage";


    let initOps = {
        title: {
            text: 'Condition Distribution',
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
                restore: {show: true, title: 'Refresh'},
                saveAsImage: {show: true, title: 'Save as image'}
            }
        },
        calculable: true,
        legend: {
            data: ['Counts', 'Inclusion Criteria Counts', 'Exclusion Criteria Counts'],
            itemGap: 5,
            top: 30
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: []
    };


    export default {
        name: "ConditionDistribution",
        components: {
            'v-chart': ECharts
        },
        data() {
            return {
                criteria: '',
                inclusionOps: {},
                exclusionOps: {},
                initOps: initOps,
                loading: false,
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
                    this.updateData(this.criteriaId, 1);
                    this.updateData(this.criteriaId, 0);
                },
        },
        mounted() {
            this.criteria = this.getCriteriaId();
            this.updateData(this.criteria, 1);
            this.updateData(this.criteria, 0);
        },
        methods: {
            getCriteriaId(){
                if (!Boolean(this.criteria)) {
                    this.criteria = this.$store.state.criteriaId;
                    if(Boolean(this.criteria)){
                        return this.criteria;
                    }else{
                        return storage.get('criteriaId');
                    }
                }
                else{
                    return this.criteria;
                }
            },
            updateData(criteria, include) {
              this.loading = true;
                console.log(criteria);
                // criteria = '4285271';
                var result = -1;
                console.log("Search Condition by criteria: " + criteria);
                axios.get(this.$apiUrl + "/common-condition/get-conditions-id/" + criteria + "/" + include)
                    .then(response => {
                        // console.log(response.data);
                        result = response.data;
                        this.updateChart(criteria, include, result);
                      this.loading = false;

                    })
                    .catch(function (err) {
                        console.log(err);

                    });
                return result;

            },
            updateChart(criteria, include, data) {
                var series_data = [];
                var xAxis_cond_names = [];

                for (var o in data) {
                    xAxis_cond_names.push(data[o].conditionConceptName);
                    series_data.push(data[o].conceptCount)
                }
                // console.log(xAxis_cond_names);
                // console.log(series_data);

                if (include == 1) {
                    this.inclusionOps = this.prepareOps(xAxis_cond_names, series_data, include);
                } else {
                    this.exclusionOps = this.prepareOps(xAxis_cond_names, series_data, include);
                }

            },
            prepareOps(xAxis_cond_names, series_data, include) {
                var name = (include == 1 ? 'Inclusion Criteria Counts' : 'Exclusion Criteria Counts');
                return {
                    title: {
                        text: 'Condition Distribution',
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
                            dataView: {
                                show: true,
                                readOnly: false,
                                lang: ['Data view', 'Close', 'Refresh'],
                                title: 'View data'
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar'],
                                title: {line: 'Switch to Line chart', bar: 'Switch to Bar chart'}
                            },
                            restore: {show: true, title: 'Refresh'},
                            saveAsImage: {show: true, title: 'Save as image'}
                        }
                    },
                    calculable: true,
                    legend: {
                        data: ['Counts', 'Inclusion Criteria Counts', 'Exclusion Criteria Counts'],
                        itemGap: 5,
                        top: 30
                    },
                    xAxis: {
                        data: xAxis_cond_names,
                        name: 'Conditions',
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
                            start: 0,
                            end: 5
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 20,
                            height: '80%',
                            showDataShadow: false,
                            left: '90%'
                        }
                    ],
                    series: [{
                        // 根据名字对应到相应的系列
                        name: name,
                        type: 'bar',
                        data: series_data
                    }]
                }
            }


        }
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
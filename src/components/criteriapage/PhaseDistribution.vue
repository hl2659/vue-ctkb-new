<template>
    <el-row style="width: 80%; flex: auto; margin: auto; padding: 10px">
        <el-col :span="12" style="padding-right: 4px">
            <el-card class="box-card shadow mb-4" >
                <div slot="header" class="clearfix">
                    <h5 class="m-0 font-weight-bold text-primary" style="font-size: large">Phase Distribution as Inclusion Criterion</h5>
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Distribution of trial phase in trials that use this concept as an inclusion criterion">
                        <i slot="reference" class="el-icon-question" style="font-size: 1.5em;" ></i>
                    </el-popover>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                    <div id="box2" class="chart-area">
                        <v-chart :options="inclusionChartOps" theme="azul" autoresize/>
                    </div>
                </div>
            </el-card>

        </el-col>
        <el-col :span="12" style="padding-right: 2px;">
            <el-card class="box-card shadow mb-4" >
                <div slot="header" class="clearfix">
                    <h6 class="m-0 font-weight-bold text-primary" style="font-size: large">Phase Distribution as Exclusion Criterion</h6>
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Distribution of trial phase in trials that use this concept as an exclusion criterion">
                        <i slot="reference" class="el-icon-question" style="font-size: 1.5em;" ></i>
                    </el-popover>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                    <div class="chart-area">
                        <v-chart :options="exclusionChartOps" theme="macarons" autoresize/>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/toolbox'
    import 'echarts/theme/shine'
    import 'echarts/theme/macarons'
    import 'echarts/theme/azul'
    import 'echarts/theme/roma'
    import 'echarts/theme/sakura'
    import 'echarts/theme/macarons2'
    import axios from "axios";
    import storage from "../../storage/storage";

    export default {
        name: "PhaseDistribution",
        components:{
            'v-chart': ECharts
        },
        data () {
            return {
                criteria:'',
                inclusionChartOps: '',
                exclusionChartOps: '',

            }
        },
        created(){

        },
        computed:{
            criteriaChange(){
                return this.$store.state.criteriaId;
            }
        },
        watch:{
            criteriaChange(val, oldVal) {
                console.log( 'phase criteria id updated to: '+val + ' from '+oldVal);
                this.criteriaId = this.$store.state.criteriaId;
                this.getPhaseData(this.criteriaId, 1);
                this.getPhaseData(this.criteriaId, 0);
            },
        },
        mounted() {
            this.criteria = this.getCriteriaId();
            this.getPhaseData(this.criteria, 0);
            this.getPhaseData(this.criteria, 1);

        },
        methods:{
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
            getPhaseData(criteria, include){

                console.log("Search criteria: "+ criteria);
                axios.get(this.$apiUrl+"/common-criteria-stats/criteria-phase/"+ criteria +"/"+ include)
                    .then(response => {
                        console.log(response.data);

                        var map = response.data;

                        if(include == 1){
                            this.inclusionChartOps = this.updateChart(map);
                        }else{
                            this.exclusionChartOps = this.updateChart(map);
                        }

                        return map;
                    })
                    .catch(function (err) {
                        console.log(err);
                        return -1;
                    })

            },
            updateChart(data){
                console.log(data);
                var myjson = [];
                for (var key in data) {
                    myjson.push({value:parseInt(data[key]), name:String(key)});
                }

                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'top',
                        textStyle:{fontSize: 16},
                        formatter: function(name) {
                            var data = option.series[0].data;
                            var total = 0;
                            var tarValue;
                            for (var i = 0, l = data.length; i < l; i++) {
                                total += data[i].value;
                                if (data[i].name == name) {
                                    tarValue = data[i].value;
                                }
                            }
                            var p = (tarValue / total * 100).toFixed(2);
                            return name + ' ' + ' ' + '(' + p + '%)';
                        },
                        data: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: false},
                            dataView : {show: true, readOnly: false, lang: ['Data view', 'Close', 'Refresh'], title : 'View data'},
                            restore : {show: false},
                            saveAsImage : {show: true, title : 'Download',
                                type : 'png',
                                lang : ['Save']}
                        }
                    },
                    series: [
                        {
                            name: 'Phase',
                            type: 'pie',
                            center : ['50%', '50%'],
                            radius: 100,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{d}%',
                                    textStyle : {
                                        align : 'center',
                                        baseline : 'middle',
                                        fontSize : 15,
                                        fontWeight : 'bolder'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '26',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: myjson
                        }
                    ]
                };
                return option;
            },
        }
    }
</script>

<style scoped>

    .clearfix{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }

    /**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.card-body{
    display: flex;
    flex: auto;
    margin: auto;
}
.echarts {
    width: 100%;
    height: 100%;
}

.chart-area{
    width: 510px;
    height: 400px;
}
</style>

<style>

    .el-card__header{
        background-color: rgba(0, 0, 0, 0.03);
    }
</style>
<template>
    <div class="summaryPanel">
        <el-row>
            <TotalTrials :criTotalCount="total_count"/>
            <InclusionTotal v-on:criInclusionCount="getCriInclusionCount"></InclusionTotal>
            <ExclusionTotal v-on:criExclusionCount="getCriExclusionCount"/>
            <CriRanking/>
        </el-row>
    </div>
</template>

<script>
    import TotalTrials from "./TotalTrials";
    import InclusionTotal from "./InclusionTotal";
    import ExclusionTotal from "./ExclusionTotal";
    import CriRanking from "./CriRanking";

    export default {
        name: "SummaryPanel",
        components: {
            TotalTrials,
            InclusionTotal,
            ExclusionTotal,
            CriRanking,
        },
        data(){
            return{
                inc_count: 0,
                exc_count: 0,
                total_count:0,
            }
        },
        methods:{
            getCriInclusionCount(value){
                this.inc_count = value;
                console.log('parent get inc count: '+ this.inc_count);
                this.getCriTotalCount();
            },
            getCriExclusionCount(value){
                this.exc_count = value;
                console.log('parent get exc count: '+ this.exc_count);
                this.getCriTotalCount();
            },
            getCriTotalCount(){
                this.total_count = this.inc_count + this.exc_count;
            }
        }

    }
</script>

<style scoped>

    .summaryPanel{
        width: 80%;
        flex: auto;
        margin: auto;
        padding: 10px;
    }
</style>
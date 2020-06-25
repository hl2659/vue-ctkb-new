<template>
    <div class="summaryPanel">
        <el-row>
            <TotalTrials/>
            <InclusionTotal/>
            <ExclusionTotal/>
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
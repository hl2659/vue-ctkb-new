<template>
    <div style="width:80%; margin: auto">
            <CriteriaSearchBox/>
            <SummaryPanel/>
            <ValueDistribution/>
            <ConditionDistribution/>
            <PhaseDistribution/>
    </div>
</template>

<script>
    import CriteriaSearchBox from '../components/criteriapage/CriteriaSearchBox'
    import SummaryPanel from "../components/criteriapage/SummaryPanel";
    import ValueDistribution from "../components/criteriapage/ValueDistribution";
    import ConditionDistribution from "../components/criteriapage/ConditionDistribution";
    import PhaseDistribution from "../components/criteriapage/PhaseDistribution";

    export default {
        name: "SearchCriteria",
        components: {
            CriteriaSearchBox,
            SummaryPanel,
            ValueDistribution,
            ConditionDistribution,
            PhaseDistribution,
        }
    }
</script>

<style scoped>

</style>
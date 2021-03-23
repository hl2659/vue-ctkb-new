<template>

    <div style="width:80%; margin: auto">
          <div style="font-size: 32px; padding: 10px">
            <span><b>Criteria Summary</b> </span>
          </div>
          <CriteriaSearchBox/>
          <SummaryPanel/>
          <ValueDistribution/>
          <MeasurementValueDis/>
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
    import MeasurementValueDis from "../components/criteriapage/MeasurementValueDis";

    export default {
        name: "SearchCriteria",
        components: {
            CriteriaSearchBox,
            SummaryPanel,
            ValueDistribution,
            ConditionDistribution,
            PhaseDistribution,
            MeasurementValueDis,
        }
    }
</script>

<style scoped>

</style>
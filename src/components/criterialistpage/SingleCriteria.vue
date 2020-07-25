<template>

<!--    <div class="list-group">-->
        <el-card style="padding: 5px; margin: 10px">
        <p v-if="criteriaObj.include===1" class="list-group-item list-group-item-success">
            <span class="glyphicon glyphicon-ok"></span>
            <strong> {{criteriaObj.criteriaName}} </strong>
            <el-button type="info" @click="deleteIncCriteriaObj" style="float: right; padding: 3px 0"> Delete</el-button>
        </p>


        <p v-else class="list-group-item list-group-item-danger">
            <span class="glyphicon glyphicon-ok"></span>
            <strong> {{criteriaObj.criteriaName}} </strong>
            <el-button type="info" @click="deleteExcCriteriaObj" style="float: right; padding: 3px 0"> Delete</el-button>
        </p>

        <p v-if="criteriaObj.include===1" class="list-group-item">
            <strong> Used as Inclusion Criterion in {{convertP(this.criteriaRatio)}}% of {{this.criteriaObj.conditionName}} trials</strong>
        </p>
        <p v-else class="list-group-item">
            <strong> Used as Exclusion Criterion in {{convertP(this.criteriaRatio)}}% of {{this.criteriaObj.conditionName}} trials</strong>
        </p>

        <p v-if="sum > 0 " class="list-group-item">
            <strong> {{this.criteriaObj.p1}} of trials are Phase 1; </strong>
            <strong> {{this.criteriaObj.p2}} of trials are Phase 2; </strong>
            <strong> {{this.criteriaObj.p3}} of trials are Phase 3; </strong>
            <strong> {{this.criteriaObj.p4}} of trials are Phase 4; </strong>
        </p>
        <p v-else class="list-group-item">
            <strong> Phase count is not available. </strong>
        </p>

<!--        <p class="list-group-item">-->
<!--            <strong> {{this.criteriaObj.conditionName}} </strong>-->
<!--        </p>-->
        </el-card>
<!--    </div>-->
</template>

<script>
    import axios from "axios";

    export default {
        name: "SingleCriteria",
        props: {
            index: {
                type: Number,
                required: true
            },
            itemC: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                criteriaObj: {
                    id: '',
                    criteriaId: '',
                    criteriaName: '',
                    p1: '',
                    p2: '',
                    p3: '',
                    p4: '',
                    example: '',
                    include: '',
                    domain: '',
                    conditionId: '',
                    conditionName: '',
                },
                sum: 0,
                criteriaRatio: 0.0,
            }
        },
        computed:{

        },
        methods: {
            convertP(num) {
                var pn = num * 100;
                return pn.toFixed(2);
            },
            deleteIncCriteriaObj: function () {
                this.$emit('deleteIncIndex', this.index)
            },
            deleteExcCriteriaObj: function () {
                this.$emit('deleteExcIndex', this.index)
            },
            getPhaseCount(){
                console.log("Search criteria id: "+ this.criteriaObj.criteriaId);
                axios.get(this.$apiUrl+"/common-criteria-stats/criteria-phase/"+ this.criteriaObj.conditionId + "/"+ this.criteriaObj.criteriaId + "/"+ this.criteriaObj.include)
                    .then(response => {
                        console.log(response.data);

                        var map = response.data;
                        this.criteriaObj.p1 = map['Phase 1'];
                        this.criteriaObj.p2 = map['Phase 2'];
                        this.criteriaObj.p3 = map['Phase 3'];
                        this.criteriaObj.p4 = map['Phase 4'];
                        this.sum = this.criteriaObj.p1 + this.criteriaObj.p2+ this.criteriaObj.p3+ this.criteriaObj.p4;
                    })
                    .catch(function (err) {
                        console.log(err);
                        return -1;
                    })
            },
            getCriteriaRatio(){
                console.log("Search criteria id: "+ this.criteriaObj.criteriaId);
                axios.get(this.$apiUrl+"/common-condition/"+ this.criteriaObj.conditionId + "/"+ this.criteriaObj.criteriaId + "/"+ this.criteriaObj.include)
                    .then(response => {
                        console.log(response.data);
                        var map = response.data;
                        this.criteriaRatio = map[0].conceptCount/map[0].totalCount;
                    })
                    .catch(function (err) {
                        console.log(err);
                        return -1;
                    })
            },

        },
        created() {
            console.log("here ");
            console.log(this.itemC);
            this.criteriaObj.criteriaName = this.itemC.criteriaConceptName;
            this.criteriaObj.criteriaId = this.itemC.criteriaConceptId;
            this.criteriaObj.include = this.itemC.include;
            this.criteriaObj.domain = this.itemC.criteriaDomain;
            this.criteriaObj.conditionName = this.itemC.conditionConceptName;
            this.criteriaObj.conditionId = this.itemC.conditionConceptId;

            this.getPhaseCount();
            this.getCriteriaRatio();

        }


    }
</script>

<style scoped>

</style>
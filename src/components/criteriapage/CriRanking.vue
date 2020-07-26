<template>
    <el-col :span="6" style="padding-right: 2px">
        <div class="grid-content bg-purple">
            <el-card v-loading="loading" class="border-dark" style="border-width: 2px">
                <div>
                    <strong>Criteria Ranking</strong>
                </div>
                <div>
                    {{Number(cri_rank).toLocaleString()}}
                </div>
                <el-divider >
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Count of individual trials in ClinicalTrials.gov that use this concept as an eligibility criterion (inclusion and/or exclusion)">
                        <i slot="reference" class="el-icon-s-order" style="font-size: 40px"/>
                    </el-popover>
                </el-divider>
            </el-card>
        </div>
    </el-col>
</template>

<script>

    import axios from "axios";
    import storage from "../../storage/storage";
    export default {
        name: "CriRanking",
        data() {
            return {
                criteriaId: '',
                cri_rank: 123456,
                loading: true,
            }
        },
        computed:{
            criteriaChange(){
                return this.$store.state.criteriaId;
            },

        },
        watch:{
            criteriaChange(val, oldVal) {
                console.log( 'criteria id updated to: '+val + ' from '+oldVal);
                this.criteriaId = this.$store.state.criteriaId;
                this.cri_rank = this.getCriRank(this.criteriaId);
            },
        },
        methods:{
            getCriteriaIdAndSearch(){
                if (!Boolean(this.criteriaId)) {
                    this.criteriaId = this.$store.state.criteriaId;
                    if(Boolean(this.criteriaId)){
                        console.log("inc get state stored criteria id: "+this.criteriaId);
                        this.criteriaId = storage.get('criteriaId');
                    }
                    else{
                        if(Boolean(storage.get('criteriaId')) && storage.get('criteriaId').length > 0){
                            console.log("inc get local stored criteria id: "+storage.get('criteriaId'));
                            this.criteriaId = storage.get('criteriaId');

                        }
                    }
                }
                this.cri_rank = this.getCriRank(this.criteriaId);
            },
            getCriRank(criteria){
                this.loading = true;
                console.log('search rank by cri id: '+criteria);
                axios.get(this.$apiUrl + "/criterion-rank/" + criteria)
                    .then(response => {
                        console.log(response.data);
                        var result = response.data;
                        console.log( 'Result found: '+result);
                        this.cri_rank = result;
                        this.loading = false;
                    })
                    .catch(function (err) {
                        console.log(err);
                        this.loading = false;
                    });
            },

        },
        created() {
            this.getCriteriaIdAndSearch();
        }
    }
</script>

<style scoped>

</style>
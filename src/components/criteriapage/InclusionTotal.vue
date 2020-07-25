<template>
    <el-col :span="6" style="padding-right: 2px">
        <div class="grid-content bg-purple">
            <el-card v-loading="loading" class="border-info" style="border-width: 2px">
                <div>
                    <strong>Inclusion  Total Trials Used </strong>
                </div>
                <div>
                    {{Number(inc_count).toLocaleString()}}
                </div>

                <el-divider >
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Count of individual trials in ClinicalTrials.gov that use this concept as an eligibility criterion (inclusion and/or exclusion)">
                        <i slot="reference" class="el-icon-s-operation" style="font-size: 40px"/>
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
        name: "InclusionTotal",
        data() {
            return {
                criteriaId: '',
                inc_count: 123456,
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
                this.inc_count = this.getCriCount(this.criteriaId, 1);
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
                this.inc_count = this.getCriCount(this.criteriaId, 1);
            },
            getCriCount(criteria, include){
                this.loading = true;
                console.log('search inc count by cri id: '+criteria);
                axios.get(this.$apiUrl + "/all-criteria/get-cri-count/" + criteria + "/" + include)
                    .then(response => {
                        console.log(response.data);
                        var result = response.data;
                        console.log( 'Result found: '+result);
                        this.inc_count = result;
                        this.loading = false;
                        this.$emit('criInclusionCount', this.inc_count);
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
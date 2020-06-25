<template>

    <div>
        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">

                <div style="font-size: 24px; padding: 10px">
                    <span>Search a criteria: <b>{{criteria}}</b> </span>
                </div>


                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="Please input a Condition:">
                            <el-input v-model="criteria" placeholder="e.g. HbA1c"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">Search</el-button>
                        </el-form-item>
                    </el-form>



            </el-card>


        </el-container>





    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import storage from "../../storage/storage";
    import axios from "axios";
    export default {
        name: "CriteriaSearchBox",
        data() {
            return {
                criteriaName:'',
                criteriaId:'',
            }
        },
        computed:{

        },
        methods: {
            ...mapActions['updateCri', 'updateCriID'],
            onSubmit() {
                this.$store.dispatch("updateCriID", this.criteriaId);
                console.log('submit!');
                this.searchCriteria();
            },
            searchCriteria(){

                if (!this.criteriaId.length) {
                    console.log("null found")
                    if(!storage.get('criteriaId')){
                        console.log(storage.get('criteriaId'))
                        this.$store.dispatch("updateCriID", storage.get('criteriaId'))
                    }
                }

                if (!this.criteria.length) {
                    console.log("Search criteria: "+ this.criteria);
                    axios.get(this.$apiUrl+"/criteria/page/concept_name/" + this.criteria)
                        .then(response => {
                            console.log(response.data.size);
                            console.log(response.data.current);
                            this.$store.dispatch('updateCri',response.data.records);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                }

            },
        }
    }
</script>

<style scoped>

</style>
<template>

    <div>
        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">

                <div style="font-size: 24px; padding: 10px">
                    <span>Search for a Condition {{condition}}</span>
                </div>


                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="Please input a Condition:">
                            <el-input v-model="condition" placeholder="e.g. Type 2 diabetes mellitus"></el-input>
                        </el-form-item>
                        <el-form-item label="Select Domains">
                            <el-select v-model="domain" placeholder="Condition">
                                <el-option label="Condition" value="Condition"></el-option>
                                <el-option label="Measurement" value="Measurement"></el-option>
                                <el-option label="Drug" value="Drug"></el-option>
                                <el-option label="Procedure" value="Procedure"></el-option>
                                <el-option label="Observation" value="Observation"></el-option>
                            </el-select>
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
        name: "ConditionSearchBox",
        data() {
            return {
                    domain: '',
                condition:''
            }
        },
        computed:{

        },
        methods: {
            ...mapActions['updateCond', 'updateConds'],
            onSubmit() {
                this.$store.dispatch("updateCond", this.condition);
                console.log('submit!');
                this.searchCondition();
            },
            searchCondition(){

                if (!this.condition.length) {
                    console.log("null found")
                    if(!storage.getCondition()){
                        console.log(storage.getCondition())
                        this.$store.dispatch("updateCond", storage.getCondition())
                    }
                }

                if (this.condition.length!=0) {
                    console.log("Search condition: "+ this.condition);
                    axios.get(this.$apiUrl+"/condition/page/concept_name/" + this.condition)
                        .then(response => {
                            console.log(response.data.size);
                            console.log(response.data.current);
                            this.$store.dispatch('updateConds',response.data.records);
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
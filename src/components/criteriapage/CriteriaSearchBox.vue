<template>

    <div>
        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">

                <div style="font-size: 24px; padding: 10px">
                    <span>Search a criteria: <b>{{criteriaName}}</b> </span>
                </div>


                    <el-form :inline="true"  class="demo-form-inline">

                        <el-form-item label="Please input a criterion:">
                            <el-autocomplete

                                    class="inline-input"
                                    v-model="criteriaName"
                                    :fetch-suggestions="querySearch"
                                    placeholder="e.g. HbA1c"
                                    :trigger-on-focus="false"
                                    @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>

<!--                        <el-form-item label="Please input a Condition:">-->
<!--                            <el-input v-model="criteriaName" placeholder="e.g. HbA1c"></el-input>-->
<!--                        </el-form-item>-->

                        <el-form-item>
                            <el-button :disabled="isDisabled" type="primary" @click="onSubmit">Search</el-button>
                        </el-form-item>
                    </el-form>
            </el-card>

        </el-container>


    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import storage from "../../storage/storage";
    import axios from "axios";
    export default {
        name: "CriteriaSearchBox",
        data() {
            return {
                criteriaName:'',
                criteriaId:'',
                criteriaList:[],
                isDisabled: false,
            }
        },
        computed:{

        },
        created() {
            this.searchCriteria();
        },
        methods: {
            ...mapMutations(['updateCriteriaID','updateCriteria']),
            onSubmit() {
                this.updateCriteria(this.criteriaName);
                this.updateCriteriaID(this.criteriaId);
                console.log('submit!' + this.criteriaId);
                this.searchCriteria();
            },
            querySearch(queryString, cb) {
                if(queryString.length>=2){
                    var links = this.criteriaList;
                    var results = queryString ? links.filter(this.createFilter(queryString)) : links;
                    // call callback function to return suggestions
                    cb(results);
                }

            },
            createFilter(queryString) {
                return (link) => {
                    return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.isDisabled = true;
                console.log(item.value);
                this.criteriaName = item.value;
                this.updateCriteria(this.criteriaName);
                storage.set('criteriaName', this.criteriaName);
                axios.get(this.$apiUrl+"/common-condition/get-criterion-id-by-name/"+item.value)
                    .then(response => {
                        console.log("got criterion id: "+response.data);
                        if (Boolean(response.data)){
                            this.criteriaId = response.data;
                            this.isDisabled = false;
                            // console.log("now criteria id changes to "+this.criteriaId);
                        }
                    }).catch(function (err) {
                        console.log(err);
                        this.isDisabled = false;
                })
            },
            searchCriteria(){
                console.log("search criteria id: "+ this.criteriaId);
                if (Boolean(this.criteriaId)) {
                    this.updateCriteriaID(this.criteriaId);
                    storage.set('criteriaId', this.criteriaId);
                    console.log('local storage changes to:'+storage.get('criteriaId'));
                }
                else{
                    if(Boolean(storage.get('criteriaId')) && storage.get('criteriaId').length > 0){
                        console.log('get criteria id from local storage: '+storage.get('criteriaId'));
                        this.updateCriteriaID(storage.get('criteriaId'));
                        this.criteriaId = storage.get('criteriaId');
                    }else{
                        this.criteriaId = '3038553';
                        this.criteriaName = 'Body mass index (BMI)';
                        console.log('set default id to: '+ this.criteriaId);
                        this.updateCriteriaID(this.criteriaId);
                        this.updateCriteria(this.criteriaName);
                        storage.set('criteriaId', this.criteriaId);
                        storage.set('criteriaName', this.criteriaName);
                        console.log('local storage changes to default: '+storage.get('criteriaId'));

                    }
                }
            },
            getAllCriteriaNames(){
                axios.get(this.$apiUrl+"/common-condition/get-all-criteria-names")
                    .then(response => {
                        // console.log("query all criteria: ");
                        // console.log(response.data);
                        response.data.forEach(
                            item=>{
                                this.criteriaList.push({"value": String(item)});
                            });

                        // this.criteriaList = response.data;
                    }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getAllCriteriaNames();
        },

    }
</script>

<style scoped>

</style>
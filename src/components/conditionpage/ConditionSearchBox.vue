<template>

    <div>
        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">

                <div style="font-size: 24px; padding: 10px">
                    <span>Search for a Condition: {{condition}}</span>
                </div>


                    <el-form :inline="true"  class="demo-form-inline">
<!--                        <el-form-item label="Please input a Condition:">-->
<!--                            <el-input v-model="condition" placeholder="e.g. Type 2 diabetes mellitus"></el-input>-->
<!--                        </el-form-item>-->
                        <el-form-item label="Please input a condition:">
                            <el-autocomplete

                                    class="inline-input"
                                    v-model="condition"
                                    :fetch-suggestions="querySearch"
                                    placeholder="e.g. Type 2 diabetes mellitus"
                                    :trigger-on-focus="false"
                                    @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>

                        <el-form-item label="Select Domains">
                            <el-select v-model="domain" placeholder="All">
                                <el-option label="All" value="All"></el-option>
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
    import {mapGetters, mapMutations} from 'vuex'
    import storage from "../../storage/storage";
    import axios from "axios";
    export default {
        name: "ConditionSearchBox",
        data() {
            return {
                domain: '',
                condition:'',
                conditionId:'',
                conditionList:[],
            }
        },computed:{
            conditionChange(){
                return this.$store.state.conditionId;
            },
        },
        watch:{
            conditionChange(val, oldVal) {
                console.log( 'condition id updated to: '+val + ' from '+oldVal);
                this.conditionId = this.$store.state.conditionId;
                this.conditionId = this.$store.state.condition;
                console.log('update condition id to: ' + this.conditionId);
            },
        },
        methods: {
            ...mapMutations(['updateCondition', 'updateConditionID']),
            onSubmit() {
                this.updateCondition(this.condition);
                this.updateConditionID(this.conditionId);
                console.log('submit!' + this.conditionId);
                this.searchCondition();
            },
            getAllConditionNames(){
                axios.get(this.$apiUrl+"/common-condition/get-all-condition-names")
                    .then(response => {
                        // console.log("query all condition: ");
                        // console.log(response.data);
                        response.data.forEach(
                            item=>{
                                this.conditionList.push({"value": String(item)});
                            });

                        // this.conditionList = response.data;
                    }).catch(function (err) {
                    console.log(err);
                })
            },
            querySearch(queryString, cb) {
                if(queryString.length>=2){
                    var links = this.conditionList;
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
                console.log(item.value);
                this.condition = item.value;
                this.updateCondition(this.condition);
                storage.set('conditionName', this.condition);
                axios.get(this.$apiUrl+"/common-condition/get-condition-id-by-name/"+item.value)
                    .then(response => {
                        console.log("got condition id: "+response.data);
                        if (Boolean(response.data)){
                            this.conditionId = response.data;
                            // console.log("now criteria id changes to "+this.criteriaId);
                        }
                    }).catch(function (err) {
                    console.log(err);
                })
            },
            searchCondition(){
                if (Boolean(this.conditionId)) {
                    console.log("get existing condition id: "+ this.conditionId);
                    this.updateConditionID(this.conditionId);
                    // this.updateCondition(this.condition);
                    storage.set('conditionId', this.conditionId);
                    // storage.set('conditionName', this.condition);
                    console.log('local storage changes to:'+storage.get('conditionId'));
                }
                else{
                    if(Boolean(storage.get('conditionId')) && storage.get('conditionId').length > 0){
                        console.log("get local stored condition id: "+storage.get('conditionId'));
                        this.conditionId = storage.get('conditionId');
                        this.updateConditionID(this.conditionId);
                        this.updateCondition(this.condition);
                    }else {
                        this.conditionId = '201826';
                        this.condition = 'Type 2 diabetes mellitus';
                        console.log('set default id to: ' + this.conditionId);
                        console.log('set default condition to: ' + this.condition);
                        this.updateConditionID(this.conditionId);
                        this.updateCondition(this.condition);
                        storage.set('conditionId', this.conditionId);
                        storage.set('conditionName', this.condition);
                        console.log('local storage changes to default: '+storage.get('conditionId'));
                        console.log('local storage changes to default: '+storage.get('conditionName'));
                    }
                }
                return this.conditionId;

            },
        },
        mounted() {
            this.getAllConditionNames();

        },
        created() {
            this.searchCondition();
        }
    }
</script>

<style scoped>

</style>
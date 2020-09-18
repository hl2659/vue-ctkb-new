<template>

    <div>
        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">

                <div style="font-size: 24px; padding: 10px">
                  <span>Search a condition: <b>{{condition}}</b> </span>
                </div>


                    <el-form :inline="true"  class="demo-form-inline">
<!--                        <el-form-item label="Please input a Condition:">-->
<!--                            <el-input v-model="condition" placeholder="e.g. Type 2 diabetes mellitus"></el-input>-->
<!--                        </el-form-item>-->
                        <el-form-item label="Please input a condition:" >
                            <el-autocomplete
                                    style="width: 300px;"
                                    class="inline-input"
                                    v-model="condition"
                                    :fetch-suggestions="querySearch"
                                    placeholder="e.g. Diabetes mellitus, Type 2"
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
                            <el-button :disabled="isDisabled" :loading="isDisabled" type="primary" @click="onSubmit">Search</el-button>
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
                isDisabled: false,
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
                this.condition = this.$store.state.condition;
                console.log('update condition id to: ' + this.conditionId);
                console.log('update condition to: ' + this.condition);
            },
        },
        methods: {
            ...mapMutations(['updateCondition', 'updateConditionID']),
            onSubmit() {
                this.updateCondition(this.condition);
                this.updateConditionID(this.conditionId);
                console.log('submit!' + this.conditionId);
                this.$emit('childObj', this.conditionId, this.domain);
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
                this.isDisabled = true;
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
                        this.isDisabled = false;
                    }).catch(function (err) {
                    console.log(err);
                    this.isDisabled = false;
                })
            },
          getCondition(){

              this.condition = this.$store.state.condition;
              this.conditionId = this.$store.state.conditionId;
            console.log("In condition search box con id is: "+this.conditionId);
            console.log("In condition search box con is: "+this.condition);
          },
        },
        mounted() {
            this.getAllConditionNames();

        },
        created() {
          // this.searchCondition();
          this.getCondition();
        }
    }
</script>

<style scoped>

</style>
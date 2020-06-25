<template>
    <div style="width: 80%; flex: auto; margin: auto; padding: 10px">

        <ConditionSearchBox/>

        <el-container style="width: 80%; flex: auto; margin: auto; padding: 10px">
            <el-card style="flex: auto">
                <div style="flex: auto">
                    <span>Inclusions: </span>
                </div>

                <el-table
                        ref="multipleTable"
                        :data="conditions"
                        tooltip-effect="dark"
                        style="width: 100%"
                        max-height="350"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="nctid"
                            label="NCTID"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="conceptName"
                            label="Concept Name"
                            sortable
                            >
                    </el-table-column>
                    <el-table-column
                            prop="conceptId"
                            label="Concept ID"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="domain"
                            label="Domain"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="entitySourceText"
                            label="Text"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                </el-pagination>
                <div style="margin-top: 20px">
                    <el-button @click="toggleSelection([conditions[1], conditions[2]])">Check 2 and 3</el-button>
                    <el-button @click="toggleSelection()">Unselect All</el-button>
                </div>


            </el-card>
        </el-container>
        <router-view/>
    </div>
</template>

<script>
    import ConditionSearchBox from '../components/conditionpage/ConditionSearchBox'
    import axios from 'axios'
    import {mapState, mapActions, mapGetters} from 'vuex'
    import storage from "../storage/storage"

    export default {
        name: "SeachCondition",
        components:{
            ConditionSearchBox,
        },
        data(){
            return {
                multipleSelection: [],
                currentPage1: 1,

            }
        },
        created(){
            this.getRouterData(),
                this.searchCondition()
        },
        computed:{
            ...mapState(['condition','conditions']),
            ...mapGetters(['getCondition', 'getSearchedConditions'])

        },
        methods: {
            getFromLocalStorge(){
                console.log(storage.getCondition());
                return storage.getCondition();
            },

            ...mapActions(['updateCond', 'updateConds']),
            getRouterData(){
                const param = this.$route.params;
                console.log("Param Condition: "+ param.condition) //{condition}
            },
            searchCondition(){

                if (!this.condition) {
                    console.log("null found")
                    if(!storage.getCondition()){
                        console.log(storage.getCondition())
                        this.$store.dispatch("updateCond", storage.getCondition())
                    }
                }

                if (!this.condition) {
                    console.log("Search condition: "+ this.condition);
                    axios.get(this.$apiUrl+"/common-condition/criteria/" + this.condition)
                        .then(response => {
                            console.log(response.data.size);
                            console.log(response.data.current);
                            this.conditions = response.data.records;
                            // this.$store.dispatch('updateConds',response.data.records);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                }

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`Each page ${val} record`);
            },
            handleCurrentChange(val) {
                console.log(`Current Page: ${val}`);
            }

        },
        mounted() {

            window.onbeforeunload = function (e) {
                e = e || window.event;


                // 兼容IE8和Firefox 4之前的版本
                if (e) {
                    e.returnValue = 'Close Warning';
                }

                // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                return 'Close Warning';
            };
        }
    }
</script>

<style scoped>

</style>
<template>
    <el-container style="width: 80%; margin: auto; padding: 10px; display: flex; flex-direction: column;">
            <el-header>

                <h4 id="querycondition" style="margin-top: 15px">
                    Criteria Selected for: {{condition}}
                </h4>
            </el-header>
            <el-main>
                <div id="includelist">

                    <SingleCriteria v-for="(item, index) in inclist"
                                :key="item.id"
                                :index="index"
                                :itemC="item"
                                @deleteIncIndex="delInc">
                    </SingleCriteria>

                </div>

                <div id="excludelist">
                    <SingleCriteria v-for="(item, index) in exclist"
                                    :key="item.id"
                                    :index="index"
                                    :itemC="item"
                                    @deleteExcIndex="delExc">
                    </SingleCriteria>

                </div>
            </el-main>


<!--            <el-button-group style="padding: 40px">-->
                <!--  <a class="btn btn-info" id="nextstep" role="button" data-toggle="modal" data-target="#myModal">&nbsp;&nbsp;See More&nbsp;&nbsp;</a>-->
        <el-row style="margin-top: 10px; display: flex; margin-left: 30px">
                <el-button type="success" id="ehrprojection" round style="margin-right: 5px">Estimate Recruitment with EHR</el-button>
                <el-button type="warning" id="download" round style="margin-right: 5px">Download JSON Format</el-button>
                <el-button type="primary" id="generate" round style="margin-right: 5px">Generate Human Readable Text</el-button>
<!--            </el-button-group>-->
        </el-row>

    </el-container>
</template>

<script>
    import SingleCriteria from "../components/criterialistpage/SingleCriteria";

    export default {
        name: "CriteriaList",
        components:{SingleCriteria},
        data(){
            return {
                condition:'Testing',
                inclist:[],
                exclist:[]
            }
        },
        methods:{
            getList(){
                this.inclist = this.$route.params.inclist;
                this.exclist = this.$route.params.exclist;
            },
            // delete criteria
            delInc(index) {
                this.inclist.splice(index, 1);
                // console.log('deleted: ', JSON.stringify(this.inclist));
            },
            delExc(index) {
                console.log('deleted index: '+ index);
                this.exclist.splice(index, 1);
                // console.log('deleted: ', JSON.stringify(this.exclist));
            },
        },
        created() {
            this.getList();
            this.condition = this.$store.state.condition;
            console.log('get condition: ' + this.condition);
            console.log('get include list: ' + this.inclist);
            console.log('get exclude list: ' + this.exclist);
        }
    }
</script>

<style scoped>

</style>
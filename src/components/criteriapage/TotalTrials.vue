<template>
    <el-col :span="6" style="padding-right: 2px">
        <div class="grid-content bg-purple">

            <el-card v-loading="totalLoading" class="border-primary" style="border-width: 2px">
                <div>
                    <strong>Total Trials Used</strong>
                </div>
                <div>
                    {{Number(criTotalCount).toLocaleString()}}
                </div>
                <el-divider >
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Count of individual trials in ClinicalTrials.gov that use this concept as an eligibility criterion (inclusion and/or exclusion)">
                            <i slot="reference" class="el-icon-s-data" style="font-size: 40px"/>
                    </el-popover>
                </el-divider>
            </el-card>

        </div>


<!--        <div class="box">-->
<!--            <div class="img">-->
<!--                <img src="../../assets/img/icons/beOnDutyStatement.png" alt="">-->
<!--            </div>-->
<!--        </div>-->

    </el-col>
</template>

<script>
    import storage from "../../storage/storage";
    export default {
        name: "TotalTrials",
        props:{
            'criTotalCount':[Number, String, Object],
            'totalLoading': Boolean,
        },
        data() {
            return {
                // totalLoading: true,
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
                this.setLoading(true);
            },
        },
        methods:{
            setLoading(value){
                this.totalLoading = value;
            }

        }

    }
</script>

<style scoped>

    .box{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        align-content: center;
        /*width: 100px;*/
        /*height: 140px;*/
        /*margin: 20px;*/
    }
    .box .img{
        width: 100px;
        height: 100px;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
        -18px -18px 30px rgba(255, 255, 255, 1);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efeeee;
        transition: box-shadow .2s ease-out;
        position: relative;
    }

    .box .img  img{
        width: 60px;
        transition: width 0.2s ease-out;
    }
    .box p{
        color: slategrey;
    }
    .box .img:hover{
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
        0px 0px 0px rgba(255, 255, 255, 0.8),
        inset 18px 18px 30px rgba(0, 0, 0, 0.1),
        inset -18px -18px 30px rgba(255, 255, 255, 1);
        transition: box-shadow .2s ease-out;
    }
    .box .img:hover img{
        width: 58px;
        transition: width 0.2s ease-out;
    }
</style>
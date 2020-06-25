<template>
    <el-col :span="6" style="padding-right: 2px">
        <div class="grid-content bg-purple">
            <el-card class="border-danger" style="border-width: 2px">
                <div>
                    Exclusion Total Trials Used
                </div>
                <div>
                    123,456
                </div>
                <el-divider >
                    <el-popover placement="top-end" trigger="hover" title="Help" content="Count of individual trials in ClinicalTrials.gov that use this concept as an eligibility criterion (inclusion and/or exclusion)">
                        <i slot="reference" class="el-icon-s-marketing" style="font-size: 40px"/>
                    </el-popover>
                </el-divider>
            </el-card>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: "ExclusionTotal"
    }
</script>

<style scoped>

</style>
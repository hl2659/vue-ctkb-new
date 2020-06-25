<template>
    <el-row style="width: 80%; flex: auto; margin: auto; padding: 10px; display: none">
        <el-col :span="24">
            <div class="row" id="valueDisRow" style="display: flex;">
                <!-- Area Chart -->
                <div class="col-xl-12 col-lg-12">
                    <div class="card w-200 shadow mb-4 ">
                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Measurement Value Distribution</h6>
                            <div class="col-auto">
                                <span data-container="body" data-toggle="popover" data-placement="top"
                                      data-trigger="hover focus" title="Help"
                                      data-content="Frequency of measurement values across all trials where this concept is used as an eligibility criterion"><i
                                        class="fas fa-question-circle fa-1x" style="font-size: 1.5em"></i></span>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="card-body">
                            <div id="valueDisFig" class="chart-area" style="width:1000px;height:550px;left:0px"></div>
                        </div>
                        <div class="card-footer">
                            <div class="float-right">
                                <span>Min:</span><input class="input-sm" type="text" id="min" value=""
                                                        data-container="body" data-toggle="popover" data-placement="top"
                                                        data-content="Help?" data-trigger="manual">
                                <span>Max:</span><input class="input-sm" type="text" id="max" value=""
                                                        data-container="body" data-toggle="popover" data-placement="top"
                                                        data-content="Help?" data-trigger="manual">
                                <button class="btn btn-primary btn-sm" id="rangeUpdate" role="button"
                                        @click="updateRange(this.id)">Update range
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ValueDistribution"
    }
</script>

<style scoped>

</style>
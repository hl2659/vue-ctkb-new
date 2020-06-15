<template>
    <div>
        <!-- Icons Grid -->
        <section class="features-icons bg-light text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toCriStats();return false;">
                                <i class="icon-basket m-auto text-primary"></i>
                            </div>
                            <h3>Criteria Library</h3>
                            <p class="lead mb-0">Support your design of eligibility criteria using historical data from over
                                200,000 trials</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" onclick="toCriteriaLibrary();return false;">
                                <i class="icon-calculator m-auto text-primary"></i>
                            </div>
                            <h3>Recruitment Projection</h3>
                            <p class="lead mb-0">Leverage our entire Knowledge Base to ensure the fastest possible patient
                                recruitment</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toDquest();return false;">
                                <i class="icon-question m-auto text-primary"></i>
                            </div>
                            <h3>Online Trial Finder</h3>
                            <p class="lead mb-0">Find the clinical trial perfect for you by answering a few medical
                                questions</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toC2q();return false;">
                                <i class="icon-people m-auto text-primary"></i>
                            </div>
                            <h3>Find Patients in your EHR</h3>
                            <p class="lead mb-0">Identify eligible patients inside your hospital using the OHDSI Data
                                Network</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex">
                                <i class="icon-layers m-auto text-primary"></i>
                            </div>
                            <h3>Adverse Event Monitoring</h3>
                            <p class="lead mb-0">[ Under Development ]</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toCriStats();return false;">
                                <i class="icon-check m-auto text-primary"></i>
                            </div>
                            <h3>TBD</h3>
                            <p class="lead mb-0">[ Under Development ]</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "HomeFeatureIcons",
        methods:{
            toDquest(){
                var url = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
                window.open(url,'_blank');
                // window.location.href = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
            },
            toC2q(){
                var url = 'http://www.ohdsi.org/web/criteria2query/';
                window.open(url,'_blank');
                // window.location.href = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
            },
        }
    }
</script>

<style scoped>

    .features-icons {
        padding-top: 2rem;
        padding-bottom: 2rem
    }

    .features-icons .features-icons-item {
        max-width: 20rem
    }

    .features-icons .features-icons-item .features-icons-icon {
        height: 7rem
    }

    .features-icons .features-icons-item .features-icons-icon i {
        font-size: 4.5rem
    }

    .features-icons .features-icons-item:hover .features-icons-icon i {
        font-size: 5rem
    }

</style>
<template>
    <div>
        <!-- Call to Action -->
        <section class="call-to-action text-white text-center">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-xl-9 mx-auto">
                        <h2 class="mb-4">Leave your email below to begin collaborating!</h2>
                    </div>
                    <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                        <form>
                            <div class="form-row">
                                <div class="col-12 col-md-9 mb-2 mb-md-0">
                                    <input type="email" class="form-control form-control-lg" placeholder="Enter your email...">
                                </div>
                                <div class="col-12 col-md-3">
                                    <button type="submit" class="btn btn-block btn-lg btn-primary">Collaborate</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "HomeCallAction"
    }
</script>

<style scoped>

    .call-to-action {
        position: relative;
        background-color: #343a40;
        background: url('~@/assets/img/home_bkgd_4.jpg') no-repeat center center;
        background-size: cover;
        padding-top: 7rem;
        padding-bottom: 7rem
    }

    .call-to-action .overlay {
        position: absolute;
        background-color: #212529;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: .3
    }

</style>
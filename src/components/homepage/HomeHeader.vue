<template>
    <div>
        <header class="masthead text-white text-center">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-xl-9 mx-auto">
                        <h1 class="mb-5">Support, Facilitate, and Improve your Clinical Trial Research!</h1>
                    </div>
                    <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                        <form>
                            <div class="form-row">
                                <div class="col-12 col-md-9 mb-2 mb-md-0">
                                    <input type="text" id="searchCondition" name="searchCondition"
                                           class="form-control form-control-lg"
                                           placeholder="Please input any conditions..."
                                            v-model = "condition">
                                </div>
                                <div class="col-12 col-md-3">
                                    <button type="submit" id="search" name="search"
                                            class="btn btn-block btn-lg btn-primary"
                                            @click="toSearch()">Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader",
        data() {
            return {
                condition: 'Hypertension',
            }

        },
        methods: {
            toSearch() {
                console.log(this.condition);
                this.$router.push({name: 'SearchCondition', params:{condition: this.condition}})
            }
        }
    }
</script>

<style scoped>
    h1, h2, h3, h4, h5, h6 {
        font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700
    }

    header.masthead {
        position: relative;
        background-color: #343a40;
        background: url('~@/assets/img/home_bkgd_1.jpg') no-repeat center center;
        background-size: cover;
        padding-top: 8rem;
        padding-bottom: 8rem
    }

    header.masthead .overlay {
        position: absolute;
        background-color: #212529;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: .3
    }

    header.masthead h1 {
        font-size: 2rem
    }

    @media ( min-width: 768px) {
        header.masthead {
            padding-top: 12rem;
            padding-bottom: 12rem
        }

        header.masthead h1 {
            font-size: 3rem
        }
    }
</style>
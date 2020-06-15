<template>
    <div>
        <HomeHeader/>
        <HomeFeatureIcons/>
        <HomeShowcase/>
        <HomeCallAction/>
    </div>
</template>

<script>
    import HomeHeader from "../homepage/HomeHeader";
    import HomeShowcase from "../homepage/HomeShowcase";
    import HomeCallAction from "../homepage/HomeCallAction";
    import HomeFeatureIcons from "../homepage/HomeFeatureIcons";

    export default {
        name: "CTKBMainPage",
        components: {HomeFeatureIcons, HomeCallAction, HomeShowcase, HomeHeader},
        comments:{
            HomeHeader,
            HomeShowcase,
            HomeCallAction,
            HomeFeatureIcons
        }
    }
</script>

<style scoped>

    h1, h2, h3, h4, h5, h6 {
        font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700
    }

</style>
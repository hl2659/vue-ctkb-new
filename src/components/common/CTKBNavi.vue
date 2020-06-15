<template>
    <div>
        <!-- Navigation -->
        <nav class="navbar navbar-light bg-light static-top">
            <div class="container">
                <!-- javascript expression using `v-bind` -->
<!--                <router-link :to="{name: 'Home'}" >Clinical Trial Knowledge Base</router-link>-->
                <router-link :to="'/'" class="navbar-brand">Clinical Trial Knowledge Base</router-link>
<!--                <a class="navbar-brand" href="/">Clinical Trial Knowledge Base</a>-->
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        name: "CTKBNavi"
    }
</script>

<style scoped>

</style>
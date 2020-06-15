<template>
    <div>
        <h3> This is condition page for: {{condition}}</h3>
    </div>
</template>

<script>
    export default {
        name: "SeachCondition",
        data(){
            return {
                condition:"",
            }
        },
        created(){
            this.getRouterData()
        },
        methods: {
            getRouterData(){

                const param = this.$route.params;
                console.log("Condition: "+ param.condition) //{condition}
                this.condition = param.condition;
            }
        },
    }
</script>

<style scoped>

</style>
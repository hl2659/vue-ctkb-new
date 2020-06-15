<template>
  <div class="home">

    <CTKBMainPage/>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CTKBMainPage from "../components/common/CTKBMainPage"

export default {
  name: 'Home',
  components: {
    HelloWorld,
    CTKBMainPage,
  }
}
</script>

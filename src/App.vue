<template>
  <div id="app">
    <meHeader></meHeader>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import meHeader from '@/components/header/header.vue'

export default {
  name: 'App',
  components:{
    meHeader
  }
}
</script>

<style lang="scss" type="text/css">
/* 样式重置 */
@import "../src/global/helper/_normalize.scss"

</style>

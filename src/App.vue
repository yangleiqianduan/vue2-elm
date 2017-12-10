<template>
	<div class="wrap">
		<transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  	export default {

  	}

</script>

<style lang="scss">
  @import './style/common';
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .wrap {
    width: 100%;
  }
  @media screen and (min-width: 769px) {
    .wrap {
      width: 950px;
      margin: 0 auto;
    }
  }
</style>

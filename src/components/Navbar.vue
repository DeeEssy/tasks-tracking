<template>
  <nav class="nav">
    <div class="nav-wrapper">
      <router-link class="brand-logo" to="/">Tasks</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" exact active-class="active" to="/"><a>Home</a></router-link>
        <router-link tag="li" active-class="active" to="/list"><a>List</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
    .nav {
        padding: 0 20px;
    }
</style>
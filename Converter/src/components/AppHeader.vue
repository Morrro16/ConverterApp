<template>
  <div class="container">
    <div class="header">
      <img src="/src/assets/images/Logo Converter.svg" alt="strelochki" class="Logo" @click="reload">
    </div>
  </div>
</template>

<script>   
export default {
methods: {
  reload() {
    window.location.reload();
  }
}
  }
</script>

<style scoped>
.header {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
}

.Logo {
  width: 100px;
  height: auto;
  opacity: 0.8;
  transition: 0.2s;
  cursor: pointer;
  position: fixed;
}

.Logo:hover {
  opacity: 1;
  transform: scale(1.05);
}
</style>
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
.container {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
}

.header {
  display: flex;
  align-items: center;
}

.Logo {
  width: 100px;
  height: auto;
  opacity: 0.8;
  transition: 0.2s;
  cursor: pointer;
}

.Logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .container {
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
  }

  .Logo {
    width: 84px;
    opacity: 0.96;
  }
}

@media (max-width: 480px) {
  .container {
    top: 12px;
  }

  .Logo {
    width: 76px;
  }
}
</style>

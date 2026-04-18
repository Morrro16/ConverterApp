<template>
  <AppHeader />
  <Converter />
</template>

<script>
import Converter from './components/ConverterValue.vue';
import AppHeader from './components/AppHeader.vue';

  export default {
    components: {
      Converter,
      AppHeader,
    }
  }
</script>

<style>
</style>

<script setup lang="ts">
const props = defineProps({
  label: String
})
</script>

<template>
  <button class="back-button">{{ props.label }}</button>
</template>

<style scoped>
.back-button {
  background-color: rgba(0, 143, 251, 0.85);
  color: rgb(44, 62, 80);
  font-size: 15px;
  font-weight: 400;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
.back-button:hover {
  background-color: rgba(0, 143, 251, 0.6);
}
</style>

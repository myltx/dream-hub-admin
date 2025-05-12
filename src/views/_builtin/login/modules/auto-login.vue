<script setup lang="ts">
import { logtoSignIn } from '@/logto/logto.auth';

logtoSignIn();
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="ml-4 h-6 w-6 animate-spin border-4 border-primary border-t-transparent rounded-full border-solid"></div>
  </div>
</template>

<style scoped></style>

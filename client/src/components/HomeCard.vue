<template>
  <div class="container">
    <button class="btn btn-primary" @click.prevent="singlePlayer">Single Player</button>
    <button class="btn btn-primary m-2">MultiPlayer</button>
  </div>
</template>

<script>
export default {
  methods: {
    singlePlayer() {
      this.$router.push({ path: '/plays' });
    },
  },
};
</script>

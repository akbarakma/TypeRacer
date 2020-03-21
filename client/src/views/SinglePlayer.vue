<template>
  <div>
    <h1>Single Player Mode</h1>
    <h2>{{ quote.quoteText }}</h2>
    <input type="text" v-model="userText" style="width: 800px;">
    <h2>{{ userText }}</h2>
    <h2>{{ count }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userText: '',
      count: 0,
      userCheck: true,
    };
  },
  computed: mapState(['quote']),
  watch: {
    userText() {
      this.checkWin();
    },
  },
  created() {
    this.$store.dispatch('getQuote');
  },
  methods: {
    checkWin() {
      const panjang = this.userText.length - 1;
      if (this.userText[panjang] === this.quote.quoteText[panjang]) {
        this.count += 1;
      }
    },
  },
};
</script>

<template v-cloak>
  <QuickNotes />
</template>

<script>
import QuickNotes from './views/QuickNotes.vue';

export default {
  name: 'app',
  components: {
    QuickNotes,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

*,
*::after,
::before {
  margin: 0;
  padding: 0;
}

*::after,
*::before {
  box-sizing: inherit;
}

html {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;

  background-color: $bg-color;
}

input,
textarea,
select,
button,
::placeholder {
  font-family: inherit;
}

[v-cloak] {
  display: hidden;
}
</style>

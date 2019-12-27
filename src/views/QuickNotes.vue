<template>
  <section class="quicknotes">
    <Statistics />
    <Notes />
  </section>
</template>

<script>
import Statistics from '../components/Statistics.vue';
import Notes from '../components/Notes.vue';

export default {
  components: {
    Statistics,
    Notes,
  },
};
</script>

<style lang="scss" scoped>
.quicknotes {
  margin: 0 10px;
}

@media screen and (min-width: 1024px) {
  .quicknotes {
    margin: 0 50px;
  }
}
</style>

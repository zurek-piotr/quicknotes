<template>
  <section class="statistics">
    <div class="statistics__counterWrapper">
      <span class="statistics__counterWrapper__header">
        Total
      </span>
      <span class="statistics__counterWrapper__counter">
        {{ TotalCounter }}
      </span>
    </div>
    <div class="statistics__counterWrapper">
      <span class="statistics__counterWrapper__header">
        Completed
      </span>
      <span class="statistics__counterWrapper__counter">
        {{ CompletedCounter }}
      </span>
    </div>
    <div class="statistics__counterWrapper">
      <span class="statistics__counterWrapper__header">
        Not completed
      </span>
      <span class="statistics__counterWrapper__counter">
        {{ NewCounter }}
      </span>
    </div>
  </section>
</template>

<script>
import store from '../store/index';

export default {
  computed: {
    NewCounter() {
      const newNotes = store.state.notes.filter(note => note.status === 'New');
      return newNotes.length;
    },
    CompletedCounter() {
      const completedNotes = store.state.notes.filter(note => note.status === 'Completed');
      return completedNotes.length;
    },
    TotalCounter() {
      return store.state.notes.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin: 25px 0;
  width: 80vw;
  padding: 30px;
  background: $bgCounter-color;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);

  &__counterWrapper {
    display: flex;
    flex-direction: column;
    font-weight: 300;

    &__header {
      white-space: nowrap;
      color: grey;
      font-size: 14px;
    }
    &__counter {
      font-size: 24px;
    }
  }
}
@media screen and (min-width: 768px) {
  .statistics {
    column-gap: 20px;
    width: 40vw;
  }
}

@media screen and (min-width: 1024px) {
  .statistics {
    column-gap: 30px;
    width: 40vw;
  }
}
@media screen and (min-width: 1440px) {
  .statistics {
    width: 30vw;
  }
}
@media screen and (min-width: 2560px) {
  .statistics {
    width: 20vw;
  }
}
</style>

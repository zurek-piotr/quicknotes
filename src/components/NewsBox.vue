<template>
  <section class="news">
    <form @submit.prevent="AddNote()" class="news__wrapper">
      <h2 class="news__wrapper__header">News</h2>

      <input
        class="news__wrapper__field news__wrapper__field--title"
        type="text"
        v-model="title"
        placeholder="Add title"
        required
      />

      <textarea
        class="news__wrapper__field news__wrapper__field--content"
        v-model="content"
        placeholder="Add content"
        required
      >
      </textarea>

      <div class="news__wrapper__buttonWrapper">
        <input
          type="submit"
          value="Save"
          class="news__wrapper__buttonWrapper__button news__wrapper__buttonWrapper__button--save"
          :disabled="isEmpty"
        />
        <input
          type="reset"
          value="Cancel"
          class="news__wrapper__buttonWrapper__button news__wrapper__buttonWrapper__button--cancel"
          @click="HideNews()"
        />
      </div>
    </form>
  </section>
</template>

<script>
import store from '../store/index';

export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    AddNote() {
      try {
        store
          .dispatch('AddNote', { title: this.title, content: this.content });
        this.ClearFields();
      } catch (error) {
        console.error(error);
      }
    },
    HideNews() {
      this.ClearFields();
      this.$emit('hideNews');
    },
    ClearFields() {
      this.title = '';
      this.content = '';
    },
  },
  computed: {
    isEmpty() {
      if (this.title.length === 0) {
        return true;
      }
      if (this.content.length === 0) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
  margin: 20px 0;
  width: 95vw;
  background: white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

  &__wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;

    &__header {
      margin: 10px 0 5px 0;
      font-size: 20px;
      font-weight: 500;
    }
    &__field {
      border: 1px solid transparentize(grey, 0.5);
      box-shadow: inset 0 0 2px transparentize(grey, 0.5);
      border-radius: 2px;
      padding: 5px;

      &--title {
        margin: 10px 0;
        height: 20px;
      }
      &--content {
        min-height: 100px;
        padding-top: 10px;
        resize: none;
      }
    }

    &__buttonWrapper {
      &__button {
        margin: 10px 0;
        border: none;
        border-radius: 2px;
        cursor: pointer;

        &--save {
          background: $btnPrimary-color;
          color: white;
          width: 80px;
          height: 2em;

          &:focus,
          &:hover {
            background-color: lighten($btnPrimary-color, 5%);
          }
        }
        &--cancel {
          background: white;
          color: $btnPrimary-color;
          width: 80px;
          height: 2em;

          &:focus,
          &:hover {
            color: lighten($btnPrimary-color, 10%);
          }
        }
        &:disabled {
          color: lightgrey;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .news {
    width: 45vw;
  }
}
@media screen and (min-width: 1024px) {
  .news {
    width: 30vw;
  }
}
@media screen and (min-width: 1440px) {
  .news {
    width: 25vw;
  }
}
@media screen and (min-width: 2560px) {
  .news {
    width: 15vw;
  }
}
</style>

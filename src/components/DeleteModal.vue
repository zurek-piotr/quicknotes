<template>
  <div class="deleteModal">
    <div class="deleteModal__message">
      <svg
        class="deleteModal__message__sign"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25.76 21.91"
      >
        <path
          class="cls-1"
          d="M11.31,1.05a1.71,1.71,0,0,1,3.15,0L25.24,
              18.5c1.17,1.88.32,3.41-1.89,3.41H2.41c-2.2,
              0-3.05-1.52-1.89-3.41Zm1.57,13.86a1,1,0,0,0,1-1v-6a1,1,0,0,
              0-1-1,1,1,0,0,0-1,1v6A1,1,0,0,0,12.88,14.91Zm0,4a1,
              1,0,1,0-1-1A1,1,0,0,0,12.88,18.91Z"
        />
      </svg>
      <span class="deleteModal__message__text"
        >Do you want to delete this news?</span
      >
    </div>
    <div class="deleteModal__buttonsWrapper">
      <button
        class="deleteModal__buttonsWrapper__button deleteModal__buttonsWrapper__button--reject"
        @click="RemoveSelection()"
      >
        No
      </button>
      <button
        class="deleteModal__buttonsWrapper__button deleteModal__buttonsWrapper__button--accept"
        @click="DeleteNotes()"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  props: ['selected'],
  methods: {
    DeleteNotes() {
      try {
        store
          .dispatch('DeleteNotes', this.selected)
          .then(this.RemoveSelection());
      } catch (error) {
        console.error(error);
      }
    },
    RemoveSelection() {
      this.$emit('RemoveSelection');
    },
  },
};
</script>

<style lang="scss" scoped>
.deleteModal {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 10px;
  bottom: 80px;
  height: 40px;
  width: 95vw;
  padding: 0 10px;
  background: $bgWarning-color;
  border-radius: 3px;

  &__message {
    display: flex;
    align-items: center;

    &__sign {
      height: 20px;
      width: 20px;
      fill: white;
      margin-right: 10px;
    }
    &__text {
      font-size: 12px;
      font-weight: 300;
      color: white;
    }
  }
  &__buttonsWrapper {
    &__button {
      height: 28px;
      width: 40px;
      border: none;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
      transition: transform 0.5s;
      will-change: transform;

      &--reject {
        background: $bgWarning-color;
        color: white;
        border: 1px solid transparentize(white, 0.3);
        font-weight: 300;
      }
      &--accept {
        margin-left: 10px;
        background: white;
        color: $bgWarning-color;
        font-weight: 500;
      }
      &:focus,
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
@media screen and (min-width: 375px) {
  .deleteModal {
    width: 90vw;

    &__buttonsWrapper {
      &__button {
        width: 50px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .deleteModal {
    right: 20px;
    width: 45vw;

    &__buttonsWrapper {
      &__button {
        width: 50px;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .deleteModal {
    right: 20px;
    width: 50vw;

    &__buttonsWrapper {
      &__button {
        width: 70px;
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .deleteModal {
    right: 250px;
    width: 50vw;
  }
}
@media screen and (min-width: 2560px) {
  .deleteModal {
    right: 30%;
    bottom: 20%;
    width: 30vw;
  }
}
</style>

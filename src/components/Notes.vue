<template>
  <section class="notes">
    <table class="notes__table">
      <thead class="notes__table__header">
        <tr>
          <th class="notes__table__header__checkbox">
            <input type="checkbox" class="checkbox" v-model="selectAll" />
          </th>
          <th>
            <div class="notes__table__header__cellWrapper">
              ID
              <div class="sorting">
                <button
                  class="sorting__button sorting__button--desc"
                  @click="SortTable('id', 'desc')"
                ></button>
                <button
                  class="sorting__button sorting__button--asc"
                  @click="SortTable('id', 'asc')"
                ></button>
              </div>
            </div>
          </th>
          <th>
            <div class="notes__table__header__cellWrapper">
              Title
              <div class="sorting">
                <button
                  class="sorting__button sorting__button--desc"
                  @click="SortTable('title', 'desc')"
                ></button>
                <button
                  class="sorting__button sorting__button--asc"
                  @click="SortTable('title', 'asc')"
                ></button>
              </div>
            </div>
          </th>
          <th>
            <div class="notes__table__header__cellWrapper">
              Content
              <div class="sorting">
                <button
                  class="sorting__button sorting__button--desc"
                  @click="SortTable('content', 'desc')"
                ></button>
                <button
                  class="sorting__button sorting__button--asc"
                  @click="SortTable('content', 'asc')"
                ></button>
              </div>
            </div>
          </th>
          <th>
            <div class="notes__table__header__cellWrapper">
              Status
              <div class="sorting">
                <button
                  class="sorting__button sorting__button--desc"
                  @click="SortTable('status', 'desc')"
                ></button>
                <button
                  class="sorting__button sorting__button--asc"
                  @click="SortTable('status', 'asc')"
                ></button>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="notes__table__row"
          v-for="note in sortedNotes"
          :key="note.id"
        >
          <td>
            <input
              type="checkbox"
              class="checkbox"
              v-model="selected"
              :value="note.id"
              number
            />
          </td>
          <td class="notes__table__row__element notes__table__row__element--id">
            {{ note.id }}
          </td>
          <td class="notes__table__row__element">{{ note.title }}</td>
          <td class="notes__table__row__element">{{ note.content }}</td>
          <td class="notes__table__row__element">{{ note.status }}</td>
        </tr>
      </tbody>
    </table>
    <button class="notes__addButton" @click="newsActive = true">Add</button>
    <transition name="fade">
      <DeleteModal
        :selected.sync="selected"
        @RemoveSelection="RemoveSelection()"
        v-show="selected.length != 0"
      />
    </transition>
    <transition name="fade">
      <NewsBox @hideNews="newsActive = false" v-show="newsActive" />
    </transition>
  </section>
</template>

<script>
import orderby from 'lodash.orderby';
import { mapState } from 'vuex';
import store from '../store/index';
import DeleteModal from './DeleteModal.vue';
import NewsBox from './NewsBox.vue';

export default {
  data() {
    return {
      selected: [],
      sortingOrder: 'asc',
      sortingColumn: 'id',
      newsActive: false,
    };
  },
  methods: {
    RemoveSelection() {
      this.selected = [];
    },
    SortTable(column, order) {
      this.sortingColumn = column;
      this.sortingOrder = order;
    },
  },
  computed: {
    ...mapState(['notes']),
    sortedNotes() {
      return orderby(this.notes, this.sortingColumn, this.sortingOrder);
    },
    selectAll: {
      get() {
        return (this.selected.length === this.notes.length);
      },
      set(val) {
        if (val) {
          this.selected = [];
          this.notes
            .forEach(note => this.selected.push(note.id));
        } else {
          this.selected = [];
        }
      },
    },
  },
  mounted() {
    try {
      store
        .dispatch('GetNotes');
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    DeleteModal,
    NewsBox,
  },
};
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  flex-direction: column;
  max-width: 80vw;

  &__table {
    table-layout: auto;
    width: 100%;
    border-collapse: collapse;

    &__header {
      text-align: left;
      color: white;
      background: $tableHeader-color;

      &__checkbox {
        width: 35px;
      }

      &__cellWrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 40px;
        padding: 10px;
        font-size: 14px;
        font-weight: 300;
        border-right: 1px solid transparentize($bg-color, 0.6);
      }
    }
    &__row {
      background: white;
      border-bottom: 2px solid $bg-color;
      font-size: 14px;

      &__element {
        padding: 10px;

        &--id {
          color: $btnPrimary-color;
        }
      }
    }
  }
  &__addButton {
    background: $btnPrimary-color;
    color: white;
    width: 150px;
    height: 30px;
    margin-top: 10px;
    border: none;
    border-radius: 2px;
    font-weight: 300;
    align-self: center;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: lighten($btnPrimary-color, 5%);
    }
  }
}

.sorting {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__button {
    background: none;
    border: solid white;
    border-width: 0 1.5px 1.5px 0;
    display: inline-block;
    padding: 2px;
    cursor: pointer;

    &--desc {
      transform: rotate(-135deg);
    }
    &--asc {
      border-color: lightgrey;
      transform: rotate(45deg);
    }
    &:focus,
    &:hover {
      border-color: $btnPrimary-color;
    }
  }
}

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  margin: 5px 10px;
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid $tableHeader-color;
  box-shadow: inset 0 0 1px $tableHeader-color;
  background: white;
  cursor: pointer;

  &:checked::after {
    position: absolute;
    content: "\2714";
    color: $btnPrimary-color;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 375px) {
  .notes {
    max-width: 95vw;
    &__table {
      &__header {
        &__cellWrapper {
          min-width: 30px;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .notes {
    &__addButton {
      align-self: flex-end;
    }
  }
}
@media screen and (min-width: 1024px) {
  .notes {
    max-width: 80vw;

    &__table {
      &__header {
        &__cellWrapper {
          min-width: 60px;
        }
      }
    }
  }
}
@media screen and (min-width: 2560px) {
  .notes {
    max-width: 70vw;
  }
}
</style>

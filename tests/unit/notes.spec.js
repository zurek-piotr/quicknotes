import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Notes from '@/components/Notes.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import NewsBox from '@/components/NewsBox.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Notes.vue', () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      notes: [
        {
          id: 1,
          title: 'delectus aut autem',
          content: 'Lorem ipsum',
          status: 'New',
        },
      ],
    };
    store = new Vuex.Store({
      state,
    });
  });

  test('if the data is retrieved from the API, the notes table is not empty', () => {
    const wrapper = mount(Notes, { store, localVue });
    expect(wrapper.find('.notes__table__row__element').text()).toBe('1');
  });

  test('if the data is not retrieved from the API, the notes table is empty', () => {
    state = { notes: [{}] };
    store = new Vuex.Store({ state });

    const wrapper = mount(Notes, { store, localVue });
    expect(wrapper.find('.notes__table__row__element').text()).toBe('');
  });

  test('if the none of the checkbox is selected, the Delete modal is hidden', () => {
    const wrapper = mount(Notes, { store, localVue });
    expect(wrapper.find(DeleteModal).isVisible()).toBe(false);
  });

  test('if the checkbox is selected, the Delete modal is visible', () => {
    const wrapper = mount(Notes, { store, localVue });
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.setChecked();
    expect(wrapper.find(DeleteModal).isVisible()).toBe(true);
  });

  test('if the add button is clicked, the News dialog is visible', () => {
    const wrapper = mount(Notes, { store, localVue });
    const button = wrapper.find('.notes__addButton');
    button.trigger('click');
    expect(wrapper.find(NewsBox).isVisible()).toBe(true);
  });

  test('if the add button is not clicked, the News dialog is hidden', () => {
    const wrapper = mount(Notes, { store, localVue });
    expect(wrapper.find(NewsBox).isVisible()).toBe(false);
  });
});

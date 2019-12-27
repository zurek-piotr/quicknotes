import { mount } from '@vue/test-utils';

import NewsBox from '@/components/NewsBox.vue';


describe('NewsBox.vue', () => {
  test('if all fields are filled, the AddNote method is called', () => {
    const wrapper = mount(NewsBox);

    wrapper.vm.AddNote = jest.fn();

    wrapper.find('.news__wrapper__field--title').setValue('Lorem');
    wrapper.find('.news__wrapper__field--content').setValue('Ipsum');
    wrapper.find('.news__wrapper__buttonWrapper__button--save').trigger('submit');

    expect(wrapper.vm.AddNote).toBeCalled();
  });

  test('if all fields are not filled, the AddNote method is not called', () => {
    const wrapper = mount(NewsBox);

    wrapper.vm.AddNote = jest.fn();

    wrapper.find('.news__wrapper__buttonWrapper__button--save').trigger('submit');

    expect(wrapper.vm.AddNote).not.toBeCalled();
  });
});

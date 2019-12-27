import { mount } from '@vue/test-utils';
import Statistics from '@/components/Statistics.vue';

describe('Statisics.vue', () => {
  test('if the data is retrieved from the API, the counter is not empty', () => {
    const wrapper = mount(Statistics);
    expect(wrapper.find('.statistics__counterWrapper__counter').isEmpty()).toBe(false);
  });
});

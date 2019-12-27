import Vue from 'vue';
import Vuex from 'vuex';

import mutations from '@/store/mutations';
import actions from '@/store//actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: 'http://www.mocky.io/v2/5dfe3220310000ed1ac96ee9',
    notes: [],
  },
  mutations,
  actions,
});

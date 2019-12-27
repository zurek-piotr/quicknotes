const axios = require('axios');

export default {

  GetNotes({ state, commit }) {
    axios
      .get(state.API)
      .then(json => json.data)
      .then((notes) => { commit('AddNotes', notes); })
      .catch(err => console.error(err));
  },

  AddNote({ state, commit }, { title, content }) {
    let id = Math.max(...state.notes.map(note => note.id)) + 1;
    if (id === -Infinity) { id = 1; }

    axios
      .post(state.API, {
        id, title, content, status: 'New',
      })
      .then(commit('AddNote', { id, title, content }))
      .catch(err => console.error(err));
  },

  DeleteNotes({ state, commit }, selected) {
    try {
      selected.forEach(note => axios
        .delete(state.API, { id: note })
        .catch(err => console.error(err)));

      const newNotesArray = state.notes
        .filter(note => selected.every(noteSelected => noteSelected !== note.id));

      commit('AddNotes', newNotesArray);
    } catch (error) {
      console.error(error);
    }
  },
};

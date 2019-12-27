export default {
  AddNotes(state, notes) {
    state.notes = notes;
  },
  AddNote(state, { id, title, content }) {
    state.notes.push({
      id, title, content, status: 'New',
    });
  },
};

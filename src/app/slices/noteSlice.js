import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {},
  reducers: {
    setSize: (state, action) => {
      // later on you can make the 0'th index dynamic
      state[action.payload.noteId].size.x = action.payload.x
      state[action.payload.noteId].size.y = action.payload.y
    },
    setPosition: (state, action) => {
      state[action.payload.noteId].position.x = action.payload.x
      state[action.payload.noteId].position.y = action.payload.y
    },
    addNote: (state, action) => {
      state[action.payload.noteId] = {
        size: {x: 100, y: 100},
        position: {x: 0, y: 0}
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSize, setPosition, addNote } = noteSlice.actions

export default noteSlice.reducer
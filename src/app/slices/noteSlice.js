import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      state[action.payload.noteId] = {
        topLeft: {x: 0, y: 0},
        topRight: {x: 100, y: 0},
        bottomLeft: {x: 0, y: 100},
        bottomRight: {x: 100, y: 100}
      }
    },
    setPosition: (state, action) => {
      state[action.payload.noteId].topLeft.x += action.payload.x
      state[action.payload.noteId].topLeft.y += action.payload.y
      state[action.payload.noteId].topRight.x += action.payload.x
      state[action.payload.noteId].topRight.y += action.payload.y
      state[action.payload.noteId].bottomLeft.x += action.payload.x
      state[action.payload.noteId].bottomLeft.y += action.payload.y
      state[action.payload.noteId].bottomRight.x += action.payload.x
      state[action.payload.noteId].bottomRight.y += action.payload.y
    },
    setTopLeft: (state, action) => {
      // move dragged corner
      state[action.payload.noteId].topLeft.x += action.payload.x
      state[action.payload.noteId].topLeft.y += action.payload.y
      // adjust dependant corners
      state[action.payload.noteId].topRight.y += action.payload.y
      state[action.payload.noteId].bottomLeft.x += action.payload.x
    },
    setTopRight: (state, action) => {
      state[action.payload.noteId].topRight.x += action.payload.x
      state[action.payload.noteId].topRight.y += action.payload.y
      state[action.payload.noteId].topLeft.y += action.payload.y
      state[action.payload.noteId].bottomRight.x += action.payload.x
    },
    setBottomLeft: (state, action) => {
      state[action.payload.noteId].bottomLeft.x += action.payload.x
      state[action.payload.noteId].bottomLeft.y += action.payload.y
      state[action.payload.noteId].topLeft.x += action.payload.x
      state[action.payload.noteId].bottomRight.y += action.payload.y
    },
    setBottomRight: (state, action) => {
      state[action.payload.noteId].bottomRight.x += action.payload.x
      state[action.payload.noteId].bottomRight.y += action.payload.y
      state[action.payload.noteId].topRight.x += action.payload.x
      state[action.payload.noteId].bottomLeft.y += action.payload.y
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNote, setPosition, setTopLeft, setTopRight, setBottomLeft, setBottomRight } = noteSlice.actions

export default noteSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      state[uuidv4()] =
        {
          x: 50,
          y: 50,
          z: action.payload.z,
          height: 250,
          width: 200,
          minimized: false,
          content: ''
        }
    },
    deleteNote: (state, action) => {
      delete state[action.payload.uuid]
    },
    setContent: (state, action) => {
      state[action.payload.uuid].content = action.payload.content
    },
    setZIndex: (state, action) => {
      state[action.payload.uuid].z = action.payload.z
    },
    setSize: (state, action) => {
      state[action.payload.uuid].height = action.payload.height
      state[action.payload.uuid].width = action.payload.width
    },
    setPosition: (state, action) => {
      state[action.payload.uuid].x = action.payload.x
      state[action.payload.uuid].y = action.payload.y
    },
    setMinimized: (state, action) => {
      state[action.payload.uuid].minimized = action.payload.minimized
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, setContent, setZIndex, setSize, setPosition, setMinimized } = noteSlice.actions

export default noteSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      const uuid = uuidv4()
      state[uuid] =
        {
          uuid: uuid,
          x: 50,
          y: 50,
          z: action.payload.z,
          height: 250,
          prevHeight: 250,
          width: 200,
          prevWidth: 200,
          minimized: false,
          content: '' ,
          timestamp: Date.now() + 1000,
        }
    },
    deleteNote: (state, action) => {
      delete state[action.payload.uuid]
    },
    setContent: (state, action) => {
      state[action.payload.uuid].content = action.payload.content
    },
    setSize: (state, action) => {
      state[action.payload.uuid].height = action.payload.height
      state[action.payload.uuid].prevHeight = action.payload.prevHeight
      state[action.payload.uuid].width = action.payload.width
      state[action.payload.uuid].prevWidth = action.payload.prevWidth
    },
    setPosition: (state, action) => {
      state[action.payload.uuid].x = action.payload.x
      state[action.payload.uuid].y = action.payload.y
    },
    setMinimized: (state, action) => {
      state[action.payload.uuid].minimized = action.payload.minimized
    },
    setZ: (state, action) => {
      state[action.payload.uuid].z = action.payload.z
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, setContent, setZIndex, setSize, setPosition, setMinimized, setZ } = noteSlice.actions

export default noteSlice.reducer
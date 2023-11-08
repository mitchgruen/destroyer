import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/noteSlice'

export default configureStore({
  reducer: {
    notes: noteReducer
  }
})
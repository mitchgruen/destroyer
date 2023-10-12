import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/noteSlice'

export default configureStore({
  reducer: {
    note: noteReducer
  }
})
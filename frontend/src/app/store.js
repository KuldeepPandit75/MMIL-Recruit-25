import mmilReducer from '../features/slice.js'
import { configureStore } from '@reduxjs/toolkit'

const store=configureStore({
    reducer: mmilReducer,
})

export default store
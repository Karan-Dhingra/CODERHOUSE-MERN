import { configureStore } from '@reduxjs/toolkit'
import auth from './auth_slice'

export const store = configureStore({
    reducer: {
        auth,
    },
})
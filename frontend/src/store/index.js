import { configureStore } from '@reduxjs/toolkit'
import auth from './auth_slice'
import activate from './activation_slice'

export const store = configureStore({
    reducer: {
        auth,
        activate
    },
})
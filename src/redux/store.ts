import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/baseApi';

/* const redirectMiddleware = (store) => (next) => (action) => {
      if (
            action.type.endsWith('/rejected') &&
            action.payload?.status === 401 &&
            window.location.pathname !== '/auth/login' // Avoid redirection loop
      ) {
            window.location.href = '/auth/login';
      }
      return next(action);
}; */

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
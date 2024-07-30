import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsAPI } from "./apis/albumsAPI";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    // albums: albumsAPI.reducer // only the name given in reducerPath of API has to be used as the property name
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsAPI.middleware);
  },
});

setupListeners(store.dispatch);

// this is only required when we want a central communication point bw redux store and react application
export { useFetchAlbumsQuery, useAddAlbumMutation } from "./apis/albumsAPI";
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";

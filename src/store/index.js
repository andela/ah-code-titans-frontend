import configureStore from "./configureStore";
import initialState from "./initialState";

export const { store, persistor } = configureStore(initialState);

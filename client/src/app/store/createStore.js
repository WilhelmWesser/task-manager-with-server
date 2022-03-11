import userReducer from "./user";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    user: userReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

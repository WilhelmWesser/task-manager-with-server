import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false
      };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true;
        },
        userRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.isLoggedIn = true;
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
        },
        userUpdateRequested: (state) => {
            state.isLoading = true;
        },
        userUpdateSucceded: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const {
    userRequested,
    userRecieved,
    userRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdateRequested,
    userUpdateSucceded,
    userUpdateFailed
} = actions;

const authRequested = createAction("user/authRequested");
const userCreationRequested = createAction("user/userCreationRequested");
const userCreationFailed = createAction("user/userCreationFailed");

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(createUser({ _id: data.localId, email, ...rest }));
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreationRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/myTasks");
        } catch (error) {
            dispatch(userCreationFailed(error.message));
        }
    };
}

export function updateUser(updateData) {
    return async function (dispatch) {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(updateData);
            dispatch(userUpdateSucceded(content));
            history.push("/myProfile");
        } catch (error) {
            dispatch(userUpdateFailed(error.message));
        }
    };
}

export const loadUser = () => async (dispatch, getState) => {
    dispatch(userRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(userRecieved(content));
    } catch (error) {
        dispatch(userRequestFailed());
    }
};

export const getCurrentUserData = () => (state) => {
    return state.user.entities ? state.user.entities : null;
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getCurrentUserId = () => (state) => {
    return state.user.auth ? state.user.auth.userId : null;
};
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getAuthErrors = () => (state) => state.user.error;
export default userReducer;

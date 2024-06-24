import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  profileImage:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return {...state, isLoggedIn: true, ...action.payload};
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload.firstName;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: (state, action) => {
      return initialState;
    },
  },
});

export const {updateFirstName, resetUser, login, updateToken} = User.actions;

export default User.reducer;

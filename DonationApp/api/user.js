import auth from '@react-native-firebase/auth';
import {updateToken} from '../redux/reducers/User';
import store from '../redux/store';

export const createUser = async (fullName, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: fullName});
    return user;
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return {error: 'That email address is already in use.'};
    } else if (err.code === 'auth/invalid-email') {
      return {error: 'Please enter a valid email address.'};
    }

    return {error: 'Something went wrong with you request.'};
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();

    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (err) {
    console.log("🚀 ~ loginUser ~ response:", err)
    if (err.code === 'auth/invalid-credential') {
      return {status: false, error: 'Please enter correct email or password.'};
    }

    return {
      status: false,
      error: 'Something went wrong with you request.',
    };
  }
};

export const logOut = async () => {
  await auth().signOut();
};

export const checkToken = async () => {
  try {
    let response = await auth().currentUser.getIdToken(true);
    store.dispatch(updateToken(response));
    return response;
  } catch (err) {
    return err;
  }
};

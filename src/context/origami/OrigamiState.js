import { useReducer } from "react";
import OrigamiApi from "../../api/OrigamiApi";
import {
  GET_ALL_POSTS,
  GET_PRIVATE_POSTS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";
import OrigamiContext from "./origamiContext";
import OrigamiReducer from "./origamiReducer";

const OrigamiState = (props) => {
  const initialState = {
    isLoggedIn: false,
    publicPosts: [],
    userData: {},
    privatePosts: [],
    linkItems: [
      {
        id: 1,
        title: "Post",
        url: "/",
      },
      {
        id: 2,
        title: "Register",
        url: "/register",
      },
      {
        id: 3,
        title: "Login",
        url: "/login",
      },
    ],
  };

  const [state, dispatch] = useReducer(OrigamiReducer, initialState);

  const origamiApi = new OrigamiApi();

  const loginUser = async (user) => {
    const response = await origamiApi.login(user);
    if (response.status === 200) {
      await getPrivatePosts();
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    }
  };

  const getPrivatePosts = async () => {
    const response = await origamiApi.getPrivatePosts();
    dispatch({
      type: GET_PRIVATE_POSTS,
      payload: response.data,
    });
  };

  const logoutUser = async () => {
    const response = await origamiApi.logout();
    if (response.status === 200) {
      dispatch({
        type: USER_LOGOUT,
      });
    }
  };

  const getPublicPosts = async () => {
    const posts = await origamiApi.getPosts(5);
    dispatch({
      type: GET_ALL_POSTS,
      payload: posts.data,
    });
  };

  const submitPost = async (text) => {
    const response = await origamiApi.createPost(text);
    if (response.status === 200) {
      await getPrivatePosts();
    }
  };

  const registerUser = async (user) => {
    const response = await origamiApi.register(user);
    if (response.status === 200) {
      await loginUser({ username: user.username, password: user.password });
    }
  };

  return (
    <OrigamiContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        linkItems: state.linkItems,
        publicPosts: state.publicPosts,
        userData: state.userData,
        privatePosts: state.privatePosts,
        loginUser,
        logoutUser,
        getPublicPosts,
        submitPost,
        registerUser,
      }}
    >
      {props.children}
    </OrigamiContext.Provider>
  );
};

export default OrigamiState;

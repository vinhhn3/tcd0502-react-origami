import axios from "axios";

export default class OrigamiApi {
  constructor() {
    this.client = null;
    this.api_url = "http://localhost:9999/api";
  }

  init = () => {
    this.client = new axios.create({
      baseURL: this.api_url,
    });
    return this.client;
  };

  createPost = (text) => {
    return this.init().post(
      "/origami",
      { description: text },
      { withCredentials: true }
    );
  };

  getPosts = (limit) => {
    return this.init().get(`/origami/all?limit=${limit}`);
  };

  register = (user) => {
    return this.init().post("/user/register", user, { withCredentials: true });
  };

  login = (user) => {
    return this.init().post("/user/login", user, { withCredentials: true });
  };

  logout = () => {
    return this.init().post("/user/logout", null, { withCredentials: true });
  };

  getPrivatePosts = () => {
    return this.init().get("/origami/mine", { withCredentials: true });
  };
}

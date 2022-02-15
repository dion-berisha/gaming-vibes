import { END_POINT } from "../helpers";

class Api {
  constructor() {
    this.getEnvEndpoint = () => END_POINT[0];
  }

  async login(endpoint, domainModel, username, password) {
    const response = await fetch(`${this.getEnvEndpoint()}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json;domain-model=${domainModel}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    return result;
  }

  async userList(endpoint, domainModel, usernameFilter, token) {
    const response = await fetch(`${this.getEnvEndpoint()}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json;domain-model=${domainModel}`,
        Authorization: token,
      },
      body: JSON.stringify({ usernameFilter }),
    });

    const result = await response.json();

    return result;
  }
}

export default new Api();

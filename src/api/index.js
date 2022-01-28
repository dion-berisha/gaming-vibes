import { END_POINT } from "../helpers";

class Api {
  constructor() {
    this.getEnvEndpoint = () => END_POINT[Cookies.get("env")];
  }

  async login({ endpoint, domainModel, username, password }) {
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
}

export default new Api();

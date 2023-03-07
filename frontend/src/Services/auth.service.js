import axios from 'axios';

// console.log("AUTTHHHHH", process.env.REACT_APP_BACKEND_API_URL);

class AuthService {
  login({ email, password }) {
    // console.log(email, password, "ASDASDAD");
    return axios
      .post(process.env.REACT_APP_BACKEND_API_URL + "/api/signin", { email, password })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({ name, email, password }) {
    return axios.post(process.env.REACT_APP_BACKEND_API_URL + "/api/signup", { name, email, password });
  }
}

export default new AuthService();

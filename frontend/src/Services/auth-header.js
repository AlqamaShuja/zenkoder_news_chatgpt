export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user, "uuussseerrrr");
    if (user && user.token) {
      return { ["Authorization"]: user.token };
    } else {
     return {}
    }
  }
  // {"x-acces-token":"token"}
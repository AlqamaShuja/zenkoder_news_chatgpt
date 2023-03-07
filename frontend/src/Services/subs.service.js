import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;


class StripeServices {
  
  getAllPrices() {
    return axios.get(`${API_URL}/api/getPrice`, { headers: authHeader() });
  }

  getSubsList(stripeCustomerId) {
    return axios.get(`${API_URL}/api/subscriptionList/${stripeCustomerId}`, { headers: authHeader() });
  }
  createSession({ priceItem, userId }) {
    return axios.post(`${API_URL}/api/session`,{ priceId:priceItem, id:userId }, { headers: authHeader() });
  }
  
//   createCustomSession({ amount, id }) {
//     return axios.post("customSession", { amount:amount, id:id }, { headers: authHeader() });
//   }

  UpdateSubscription({subscriptionId,priceId}) {
    return axios.post("update_subscription",{subscriptionId,priceId}, { headers: authHeader() });
  }
}

export default new StripeServices();

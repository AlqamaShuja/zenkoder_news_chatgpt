import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { ProtectedRoute } from "./utils/ProtectedRoutes";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useSelector } from "react-redux";
import Subscription from "./Pages/Subscription";
import News from "./Pages/News";
import NewsDetails from "./Pages/NewsDetails";

function App() {
  const { user, isLoggedin} = useSelector(state => state.auth);
  // console.log(user, "App.js User, isLoggedIn");

  return (
    <div className="p-4">
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path={`/subscription`}
          element={
            <ProtectedRoute user={user}>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/news`}
          element={
            <ProtectedRoute user={user}>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/news/:id`}
          element={
            <ProtectedRoute user={user}>
              <NewsDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

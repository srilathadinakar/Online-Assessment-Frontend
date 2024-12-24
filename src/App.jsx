import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import Questions from "./Pages/Questions";
import CreateQuestion from "./Pages/CreateQuestion";
import EditQuestion from "./Pages/EditQuestion";

import Result from "./Pages/Result";
import ViewResults from "./Pages/ViewResults";

import Welcome from "./Pages/Welcome";
import WelcomeUser from "./Pages/WelcomeUser";

import AdminPanel from "./Pages/AdminPanel";

import NotFound from "./Pages/NotFound";

import ProtectedRoutes from "./Components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />}/>

          <Route
            path="/questions"
            element={
              <ProtectedRoutes>
                <Questions />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/createquestion"
            element={
              <ProtectedRoutes>
                <CreateQuestion />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editquestion/:id"
            element={
              <ProtectedRoutes>
                <EditQuestion />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoutes>
                <Result />
              </ProtectedRoutes>
            }
          />
          <Route path="/viewresults" element={<ProtectedRoutes><ViewResults /></ProtectedRoutes>} />

          <Route path="/welcome" element={<ProtectedRoutes><Welcome /></ProtectedRoutes>} />
          <Route path="/welcomeuser" element={<ProtectedRoutes><WelcomeUser /></ProtectedRoutes>} />

          <Route
            path="/adminpanel"
            element={
              <ProtectedRoutes adminOnly>
                <AdminPanel />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";

const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default routes;

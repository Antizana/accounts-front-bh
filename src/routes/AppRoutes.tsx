import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomersAccounts from "../views/CustomersAccounts";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomersAccounts />} />
    </Routes>
  );
}

export default AppRoutes;

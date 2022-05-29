/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./components/auth";
import LedgerDetail from "./components/pages/ledger-detail";
import Ledger from "./components/pages/ledger-form";
import LedgerList from "./components/pages/ledger-list";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // check token
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LedgerList />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ledger/:id" element={<LedgerDetail />} />
      <Route path="/ledger/create" element={<Ledger />} />
      <Route path="/ledger/update/:id" element={<Ledger />} />
    </Routes>
  );
}

export default App;

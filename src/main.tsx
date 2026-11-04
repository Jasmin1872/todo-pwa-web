import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate,} from "react-router-dom";
import "./installPrompt";
import PwaUpdater from "./components/PwaUpdater";
import Toaster from "./components/Toaster";
import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <PwaUpdater />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
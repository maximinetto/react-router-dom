import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./Navbar";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";

export default function App() {
  const [user, setUser] = useState();

  const login = () => {
    //Request done

    setUser({
      id: 1,
      name: "John",
      permissions: ["admin", "analize"],
    });
  };

  const logout = () => {
    //Request done
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/analitics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={!!user && user.permissions.includes("admin")}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

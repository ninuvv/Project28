import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";

import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Canvas from "./pages/Canvas";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
  
    <BrowserRouter>
      <div className="App">
                <Header />
      
           <ToastContainer />
         <Routes>
           
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/canvas" element={<PrivateRoute> <Canvas /> </PrivateRoute>} />           
            <Route path="*" element={<NotFound />} />
          </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;

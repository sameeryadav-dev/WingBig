import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddBike from "./pages/Addbike";
import EditBike from "./pages/Editbike";
import BikeDetails from "./pages/Bikedetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/bike/:id" element={<BikeDetails/>}/>

        <Route path="/add-bike" element={<AdminRoute><AddBike /></AdminRoute>}/>

        <Route path="/edit-bike/:id" element={<AdminRoute><EditBike /></AdminRoute>}/>

        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
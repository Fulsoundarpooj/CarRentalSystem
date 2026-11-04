import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
//import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BookCar from "./pages/BookCar";
import BrowseCar from "./pages/BrowseCar";
import UploadDocs from "./pages/UploadDocs";
import MakePayment from "./pages/user/MakePayment";
import Login from "./components/Login";
import PartnerRegister from "./components/PartnerRegister";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import ViewCar from "./pages/user/ViewCar";



function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        
        {/* Public Routes */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} /> */}

        {/* Admin Protected */}
        {/* <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route> */}

        {/* User Protected */}
        {/* <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route> */}
          
          <Route path="/login" element={<Login />} />
         <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/partnerRegister" element={<PartnerRegister />} />

        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/car/:carId" element={<ViewCar/>} />

        </Route>

        <Route element={<ProtectedRoute role="PARTNER" />}>
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        </Route>

{/* <Route path="/" element={<BrowseCar />} /> */}
        <Route path="/book/:carId" element={<BookCar />} />
        <Route path="/uploadDocs/:bookingId" element={<UploadDocs />} />
        <Route path="/makePayment/:bookingId" element={<MakePayment />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


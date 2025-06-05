import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Home } from "./screens/Home";
import { ContactUs } from "./screens/ContactUs";
import { Search } from "./screens/Search";
import { HotelDetails } from "./screens/HotelDetails";
import { About } from "./screens/About";
import { Login, Register } from "./screens/Auth";
import { Dashboard } from "./screens/Dashboard";
import { SimpleAuth } from "./components/SimpleAuth";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<SimpleAuth><DashboardLayout /></SimpleAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="profile" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search" element={<Search />} />
          
          <Route path="/hoteldetails" element={<HotelDetails />} />
          <Route path="/hoteldetails/:hotelId" element={<HotelDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
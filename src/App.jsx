// Main Layout File
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.jsx";


export default function App() {
  return (
    <div className="premium-gradient">
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Outlet /> 
      </main>
      {/* <Footer /> */}
    </div>
  );
}

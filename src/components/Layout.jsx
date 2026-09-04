import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/App.css";

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__contenido">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import MobileNavigation from "./pages/Auth/MobileNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <MobileNavigation />
      <main className="pt-20 lg:pl-16">
        <Outlet />
      </main>
    </>
  );
}

export default App;

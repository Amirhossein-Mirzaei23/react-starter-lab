import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navigationBar";
import Header from "../components/header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-[#ff764c] to-[#e1b85e] max-md:!p-4">
      <Header />
      
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

        <NavigationBar />
    </div>
  );
}

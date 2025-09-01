import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900  text-white">
      <header className="p-4 bg-gray-800">Header</header>
      
      <main className="flex-1 container mx-auto p-4">
        {/* <Outlet /> will render the matched route element */}
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-800 text-center">
        Footer
      </footer>
    </div>
  );
}

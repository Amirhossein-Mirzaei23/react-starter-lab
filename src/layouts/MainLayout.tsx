import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import Header from '../components/header';
import { useBackgroundStore } from '../stores/backgroundStore/background.store';

export default function MainLayout() {
  const backgroundHex = useBackgroundStore((s) => s.backgroundHex);

  // decide background
  const backgroundStyle = backgroundHex === null ? 'bg-gradient-to-b from-slate-800-300 ' : ''; // empty → custom color via inline style

  return (
    <div
      className={`min-h-screen flex flex-col text-white relative to-slate-600 overflow-hidden ${backgroundStyle}`}
      style={backgroundHex ? { backgroundColor: backgroundHex } : undefined}
    >
      <Header />
      <main className="flex-1 container mx-auto !p-4 flex flex-col">
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
}

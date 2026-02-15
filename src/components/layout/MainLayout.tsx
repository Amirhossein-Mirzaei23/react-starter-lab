import { Outlet } from 'react-router-dom';
import NavigationBar from './navigationBar';
import Header from './header';
import { useBackgroundStore } from '../../store/slices/backgroundStore/background.store';

export default function MainLayout() {
  const backgroundHex = useBackgroundStore((state) => state.backgroundHex);

  const backgroundClass =
    backgroundHex === null ? 'bg-gradient-to-b from-slate-800 to-slate-600' : '';

  return (
    <div
      className={`min-h-[100dvh] flex flex-col text-white relative overflow-hidden ${backgroundClass}`}
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

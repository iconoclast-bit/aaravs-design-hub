import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import GameLauncher from './games/GameLauncher';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <GameLauncher />
    </div>
  );
};

export default Layout;


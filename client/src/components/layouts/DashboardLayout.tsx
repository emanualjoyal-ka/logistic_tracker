'use client';
import { Menu } from 'lucide-react'
import React from 'react'
import DesktopSideBar from '../ui/DesktopSideBar';
import MobileSideBar from '../ui/MobileSideBar';
import { useSelector} from "react-redux";
import { RootState } from '@/store/store';

type DashBoardLayoutProps = {
  children: React.ReactNode;
};

const DashBoardLayout:React.FC<DashBoardLayoutProps> = ({children}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const openSidebar = () => {
      setIsOpen(true);
    };
    const closeSidebar = () => {
      setIsOpen(false);
    };

  return (
    <div>
         <div className="w-screen h-dvh overflow-hidden relative grid grid-cols-10 grid-rows-10 gap-2 p-2">
            <nav className="bg-white/5 backdrop-blur-md border border-white/10 row-start-1 row-end-2 col-start-1 col-end-11 md:col-start-3 flex items-center justify-between px-4 py-3 text-black rounded-lg ">
            <button onClick={openSidebar} >
              <Menu className="md:hidden text-white" />
            </button>
            <div className='flex items-center gap-2'>
              <div className='text-right'>
                <p className='text-white'>{user?.name}</p>
                <p className='text-white text-xs'>{(user?.role)?.toUpperCase()}</p>
              </div>
            <div className="bg-white/30 border border-white/30 text-white h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            </div>
            </nav>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 hidden md:block row-start-1 row-end-11 col-start-1 col-end-3 rounded-lg px-4 py-6">
              <DesktopSideBar/>
            </div>
            <main className="bg-white/5 overflow-y-auto backdrop-blur-md border border-white/10 row-start-2 row-end-11 col-start-1 col-end-11 md:col-start-3 rounded-lg p-4">
              {children}
            </main>
        </div>
        {isOpen && (
        <>
        <div className={`bg-white/5 backdrop-blur-md border border-white/10 w-[300px] h-dvh absolute top-0 left-0 md:hidden flex flex-col justify-between items-center px-4 py-6 z-20 shadow-lg rounded-br-lg rounded-tr-lg `}>
            <MobileSideBar closeSidebar={closeSidebar} />
        </div>
        <div onClick={closeSidebar} className="bg-black/50 absolute w-screen h-dvh top-0 left-0 md:hidden z-10"/>
        </>
    )}
    </div>
  )
}

export default DashBoardLayout
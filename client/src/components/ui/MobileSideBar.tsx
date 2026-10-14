'use client'
import { LogOut, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { sidebarItems } from '@/config/sideBar'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/store/store'
import { logout } from '@/features/auth/authSlice'
import { useLogOutUser } from '@/hooks/use-auth'
import { Logo } from './Logo'

type MobileSideBarProps = {
  closeSidebar: () => void;
};

const MobileSideBar:React.FC<MobileSideBarProps> = ({closeSidebar}) => {
    const pathname=usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const { mutateAsync, isPending } = useLogOutUser();
    const handleLogout = async () => {
      try {
        await mutateAsync();
        dispatch(logout());
        closeSidebar();
        router.replace('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
  };
const items = user?.role ? sidebarItems[user.role === "ADMIN" ? "admin" : user.role === "CUSTOMER" ? "customer" : "delivery_partner"]: [];
return (
    <>
    <div className='w-full flex flex-col items-center gap-6'>
        <div className="flex justify-between items-center w-full">
          <Logo/>
          <button onClick={closeSidebar} className="rounded-full bg-red-500/20 p-1">
            <X className='w-5 h-5 text-red-500'/>
          </button>
        </div>
        <ul className="flex flex-col w-full gap-3">
          {items.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link key={item.id} href={item.link} onClick={closeSidebar}>
                <li className={`flex justify-start items-center gap-2 p-2 rounded-lg transition delay-50 duration-300 ease-in-out
                  ${ isActive ? "bg-white/30 text-white" : "hover:text-white hover:bg-orange-500"}`}>
                  <item.icon className={`w-5 h-5 transition delay-50 duration-300 ease-in-out  ${ isActive ? "text-white" : "text-white"}`}/>
                  <p className={`transition delay-50 duration-300 ease-in-out ${isActive ? "text-white" : "group-hover:text-white"}`}>{item.title}</p>
                </li>
              </Link>
            );
          })
          }
        </ul>
    </div>
    <div className="w-full">
      <button onClick={handleLogout} disabled={isPending} className="group disabled:opacity-50 flex justify-start items-center gap-2 p-2 rounded-lg hover:bg-orange-500 hover:text-white w-full">
        <LogOut className="w-5 h-5 text-red-500 group-hover:text-white" />
        <p className="group-hover:text-white">Logout</p>
      </button>
    </div>
    </>
  )
}

export default MobileSideBar
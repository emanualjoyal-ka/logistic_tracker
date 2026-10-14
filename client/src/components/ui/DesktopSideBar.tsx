'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { sidebarItems } from '@/config/sideBar';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/store/store';
import { useLogOutUser } from '@/hooks/use-auth';
import { logout } from '@/features/auth/authSlice'
import { Logo } from './Logo';


const DesktopSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutateAsync, isPending } = useLogOutUser();
  const handleLogout = async () => {
    try {
      await mutateAsync();
      dispatch(logout());
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const items = user?.role ? sidebarItems[user.role === "ADMIN" ? "admin" : user.role === "CUSTOMER" ? "customer" : "delivery_partner"]: [];
  return (
    <div className='flex flex-col items-center justify-between h-full'>
      <div className="flex flex-col items-center w-full gap-8">
        <Logo/>
        <ul className="flex flex-col w-full gap-3">
          {items.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link key={item.id} href={item.link}>
                <li className={`group flex justify-start items-center gap-2 p-3  rounded-lg transition  duration-300 ease-in-out
                  ${isActive ? "bg-white/20" : "hover:bg-white/5"}`}>
                  <item.icon className={`w-4 h-4 lg:w-5 lg:h-5 transition duration-300 ease-in-out ${isActive ? "text-white" : "text-white group-hover:text-white"}`}/>
                  <p className={`transition delay-50 duration-300 ease-in-out text-xs lg:text-base ${isActive ? "text-white" : "group-hover:text-white"}`}>
                    {item.title}
                  </p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="w-full">
        <button onClick={handleLogout} disabled={isPending} className="group disabled:opacity-50 flex cursor-pointer justify-start items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition duration-300 hover:text-white w-full">
          <LogOut className="w-5 h-5 text-red-500" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default DesktopSideBar
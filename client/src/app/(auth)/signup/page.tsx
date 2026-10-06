"use client"
import SignUpForm from '@/components/auth/SignUpForm'
import { Button1 } from '@/components/ui/Buttons'
import { Logo } from '@/components/ui/Logo'
import { useRouter } from 'next/navigation'

const page = () => {
  const router=useRouter()
  return (
    <div className='h-dvh flex flex-col justify-center items-center px-4'>
      <div className='absolute top-0 left-0 right-0 z-10 flex items-center justify-between py-5 px-4 md:px-8 lg:px-20 xl:px-[16rem]'> 
        <Logo size='lg'/>
        <Button1 onClick={()=>router.push("/login")} padding='py-1 px-3' title='Login' className='rounded-lg'/>
      </div>
      <div className='max-w-xl p-10 border border-white/10 rounded-2xl bg-[#0A0A0A]'>
      <SignUpForm/>
      <p className='mt-6 text-center'>Already have an account? <span onClick={()=>router.push("/login")} className='text-blue-400 cursor-pointer hover:underline'>Login</span></p>
      </div>
    </div>
  )
}

export default page
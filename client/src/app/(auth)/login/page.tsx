"use client"
import LoginForm from '@/components/auth/LoginForm'
import { Button1 } from '@/components/ui/Buttons'
import { Logo } from '@/components/ui/Logo'
import { useRouter } from 'next/navigation'

const page = () => {
  const router=useRouter()
  return (
    <div className='h-dvh flex flex-col justify-center items-center px-4'>
      <div className='absolute top-0 left-0 right-0 z-10 flex items-center justify-between py-5 px-4 md:px-8 lg:px-20 xl:px-[2rem]'> 
        <Logo size='lg'/>
        <Button1 onClick={()=>router.push("/signup")} padding='py-1 px-3' title='Sign Up' className='rounded-lg'/>
      </div>
      <div className='max-w-sm'>
      <LoginForm/>
      <p className='mt-6 text-center'>Dont't have an account? <span onClick={()=>router.push("/signup")} className='text-blue-400 cursor-pointer hover:underline'>Sign Up</span></p>
      </div>
    </div>
  )
}

export default page

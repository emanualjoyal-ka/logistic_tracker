import { useForm } from "react-hook-form";
import { Button2 } from "../ui/Buttons"
import { InputField } from "../ui/InputFields"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/hooks/use-auth";

type SignUpValues = {
  name:string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const form = useForm<SignUpValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        name:"",
        email:"",
        password:""
      }
    });
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;
  
    const { mutate, isPending, error } = useRegisterUser();
    const router = useRouter();
  
    const onSubmit = (data: SignUpValues) => {
      mutate(data, {
        onSuccess: () => {
          router.replace("/login")
          reset();
        },
      });
    };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-3xl font-semibold">Create your account</h1>
        <p className="text-center">Join to save, organize, and manage your shortened URLs</p>
        <div className="mt-6 space-y-4">
        <InputField registration={register("name")} className="focus:ring-3 focus:ring-white/50 hover:shadow-[0_0_1px_rgba(255,255,255)] shadow-white" placeholder="Name"/>
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
        <InputField registration={register("email")} className="focus:ring-3 focus:ring-white/50 hover:shadow-[0_0_1px_rgba(255,255,255)] shadow-white" placeholder="Email Address"/>
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
        <InputField registration={register("password")} type="password" className="focus:ring-3 focus:ring-white/50 hover:shadow-[0_0_1px_rgba(255,255,255)] shadow-white" placeholder="Password"/>
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        {error && (
        <p className="text-red-500 text-sm mt-3 text-center">
          Invalid email or password
        </p>
        )}
        <Button2  disabled={isPending} type="submit" title="Sign Up" className="w-full mt-6 py-3 rounded-lg"/>
    <div className="bg-white/10 h-0.5 w-full mt-6"/>
    </form>
  )
}

export default SignUpForm
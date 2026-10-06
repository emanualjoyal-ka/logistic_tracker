import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";
import { Button2 } from "../ui/Buttons";
import { InputField } from "../ui/InputFields";
import { useLoginUser } from "@/hooks/use-auth";
import { setAccessToken } from "@/lib/TokenStore";
import { ROLE_ROUTES } from "@/lib/auth";

type loginValues = {
  email: string;
  password: string;
};

// DELETE THIS
const cust = "joyal@gmail.com";
const custPass = "joyal1234";
const partner = "vishnu@localflow.dev";
const admin = "admin@localflow.dev";
const Pass = "Password123";

const LoginForm = () => {
  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // email:"",
      // password:""
      email: cust,
      password: custPass,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const { mutate, isPending, error } = useLoginUser();
  const router = useRouter();

  const onSubmit = (data: loginValues) => {
    mutate(data, {
      onSuccess: (response) => {
        setAccessToken(response.accessToken);
        router.replace(ROLE_ROUTES[response.user.role]);
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-3xl font-semibold">Welcome back</h1>
      <p className="text-center">
        Sign in to access your workspace and manage your orders
      </p>
      <div className="mt-6 space-y-4">
        <InputField
          registration={register("email")}
          className="focus:ring-3 focus:ring-white/50 hover:shadow-[0_0_1px_rgba(255,255,255)] shadow-white"
          placeholder="Email Address"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
        <InputField
          registration={register("password")}
          type="password"
          className="focus:ring-3 focus:ring-white/50 hover:shadow-[0_0_1px_rgba(255,255,255)] shadow-white"
          placeholder="Password"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">
          Invalid email or password
        </p>
      )}
      <Button2
        type="submit"
        disabled={isPending}
        title={isPending ? "Logging in" : "Login"}
        className="w-full mt-6 mb-2 py-3 rounded-lg"
      />
      <span className="cursor-pointer hover:underline">Forgot Password?</span>
      <div className="bg-white/10 h-0.5 w-full mt-6" />
    </form>
  );
};

export default LoginForm;

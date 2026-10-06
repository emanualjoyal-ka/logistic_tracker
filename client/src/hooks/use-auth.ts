import { loginUser, registerUser } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";


export const useLoginUser=()=>{
  return useMutation({
    mutationFn: loginUser
  });
};

export const useRegisterUser=()=>{
  return useMutation({
    mutationFn: registerUser
  });
};
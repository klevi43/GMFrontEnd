import {
  useMutation,
  useQueryClient,
  type UseBaseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { WORKOUTS_ENDPOINT } from "../constants/endpoints";
import type AuthUserDto from "../dtos/authUserDto";
import authService from "../services/authService";
import type { LoginInput } from "../types/inputTypes";
import { formatApiError } from "../utils/formatApiError";
export const useLogin = (
  options?: UseMutationOptions<AuthUserDto, unknown, LoginInput, unknown>
): UseBaseMutationResult<AuthUserDto, unknown, LoginInput, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (loginInput: LoginInput) => {
      try {
        return await authService.login(loginInput);
      } catch (error) {
        let message = "Unable to login. Please try again later.";
        if (axios.isAxiosError(error) && error.response) {
          console.log("Backend error: ", error.response.data);
          message = formatApiError(error.response?.data?.message);
        }
        throw new Error(message);
      }
    },
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["authUser"], data);
      options?.onSuccess?.(data, variables, context);
      navigate(WORKOUTS_ENDPOINT);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};

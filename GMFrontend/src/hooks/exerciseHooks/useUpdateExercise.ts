import {
  useMutation,
  useQueryClient,
  type UseBaseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type ExerciseDto from "../../dtos/exerciseDto";
import type { ExerciseInput } from "../../types/inputTypes";
import { useModal } from "../useModal";
import exerciseService from "../../services/exerciseService";
import axios from "axios";
import { getExerciseId, getWorkoutId } from "../../utils/QueryParamHelpers";
import { useMod } from "../useMod";

export const useUpdateExercise = (): UseBaseMutationResult<
  ExerciseDto,
  unknown,
  ExerciseInput,
  unknown
> => {
  const { closeModal } = useMod();
  const workoutId = getWorkoutId();
  const exerciseId = getExerciseId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedExerise: ExerciseInput) => {
      try {
        return await exerciseService.updateExercise(
          updatedExerise,
          exerciseId,
          workoutId
        );
      } catch (error) {
        let message = "Unable to update exercise. Please try again later.";
        if (axios.isAxiosError(error) && error.response) {
          message = error.response?.data?.message;
        }
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
      closeModal();
    },
  });
};

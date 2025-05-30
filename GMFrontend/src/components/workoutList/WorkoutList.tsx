import { useGetCurrentWorkouts } from "../../hooks/workoutHooks/useGetCurrentWorkouts";
import React from "react";
import WorkoutListItem from "./WorkoutListItem";

const WorkoutList = React.memo(() => {
  const { data: workouts, error, isLoading } = useGetCurrentWorkouts();
  console.log("render");

  return (
    <div>
      {isLoading && (
        <p className="text-text text-[2rem] text-center ">
          Loading workouts...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-[2rem] text-center">
          {(error as Error).message}
        </p>
      )}

      <ul className="w-[100%] max-w-[1150px] mx-auto">
        {workouts
          ? workouts?.map((workout) => (
              <WorkoutListItem key={workout.id} workoutDto={workout} />
            ))
          : !isLoading && (
              <p className="text-text  text-center text-[2rem]">
                No workouts to show
              </p>
            )}
      </ul>
    </div>
  );
});

export default WorkoutList;

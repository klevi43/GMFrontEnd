import React from "react";
import type ExerciseDto from "../../dtos/exerciseDto";
import ExerciseListItem from "./ExerciseListItem";
import { useMenu } from "../../hooks/useMenu";
interface Props {
  exerciseDtos: ExerciseDto[];
}
const ExerciseList = ({ exerciseDtos }: Props) => {
  const { openMenuId } = useMenu();
  if (exerciseDtos.length == 0)
    return <p className="text-text">No exercises yet </p>;
  return (
    <>
      <ul className="mb-4">
        {exerciseDtos.map((exerciseDto) => (
          <ExerciseListItem
            key={exerciseDto.id}
            exerciseDto={exerciseDto}
            isMenuOpen={openMenuId === exerciseDto.id}
          />
        ))}
      </ul>
    </>
  );
};

export default ExerciseList;

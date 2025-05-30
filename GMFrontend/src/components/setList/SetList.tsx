import React from "react";
import type SetDto from "../../dtos/setDto";
import SetListItem from "./SetListItem";
import ShowElementButton from "../buttons/ShowElementButton";
import type ExerciseDto from "../../dtos/exerciseDto";
interface Props {
  sets: SetDto[];
}
const SetList = ({ sets }: Props) => {
  return (
    <>
      <ul className="">
        <SetListItem col1="No" col2="Weight" col3="Reps" col4="" />
        {sets.map((set, index) => (
          <SetListItem
            key={index}
            col1={index + 1}
            col2={set.weight}
            col3={set.reps}
            col4="..."
          />
        ))}
      </ul>
    </>
  );
};

export default SetList;

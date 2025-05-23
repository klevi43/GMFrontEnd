import React from "react";
interface Props {
  title: string;
}
const FormTitle = ({ title }: Props) => {
  return (
    <>
      <h2 className="font-bold text-[2rem] text-white text-center mb-[1rem]">
        {title}
      </h2>
    </>
  );
};

export default FormTitle;

import type { UseFormRegister } from "react-hook-form";
import type { UserCredentialsFormSchema } from "../../../schemas/userCredentialsSchema";

interface Props {
  name: "email" | "password" | "confirmPassword";
  type: string;
  register: UseFormRegister<UserCredentialsFormSchema>;
  errorMsg?: string;
}

const UserCredentialsFormInputItem = ({
  name,
  type,
  register,
  errorMsg,
}: Props) => {
  return (
    <>
      <div className="w-full mb-8">
        <input
          className=" p-2.5 w-full bg-input rounded-lg "
          type={type}
          {...register(name)}
        />
        {errorMsg && <span className="text-red-500">{errorMsg}</span>}
      </div>
    </>
  );
};

export default UserCredentialsFormInputItem;

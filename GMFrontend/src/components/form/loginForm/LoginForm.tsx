import {
  useForm,
  type UseFormReturn,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputItem from "./LoginFormInputItem";
import FormInputLabel from "../FormInputLabel";
import FormSubmitButton from "../FormSubmitButton";
import FormTitle from "../FormTitle";
import type { ServerError } from "../../../types/serverErrorContextType";
import { LoginFormSchema } from "../../../schemas/loginFormSchema";
import type { LoginFormFieldsType } from "../../../types/formFieldsType";

type Props = {
  // zod schema
  onSubmit: (data: LoginFormSchema) => void; // what to do upon successful submission
  fields: LoginFormFieldsType[]; // the fields to render
  title: string; // title of the form
  defaultValues: { email: ""; password: "" }; // initial values for the form fields
  serverError: ServerError;
};

const LoginForm = ({
  onSubmit,
  fields,
  title,
  defaultValues,
  serverError,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema), // automatically validates input data according to given schema
    defaultValues,
  });

  return (
    // handleSubmit is from Zod and validates form onSumbit is my function
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title={title} />
      {serverError.msg && (
        <span className="text-red-500">{serverError.msg}</span>
      )}
      {fields.map((field) => (
        <div key={field.name}>
          <FormInputLabel name={field.label} />
          <FormInputItem
            type={field.type}
            register={register}
            name={field.name}
            errorMsg={(errors as any)[field.name]?.message}
          />
        </div>
      ))}
      {!isSubmitting && <FormSubmitButton />}
    </form>
  );
};

export default LoginForm;

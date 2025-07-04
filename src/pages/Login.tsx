import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import FormContainer from "../components/containers/FormContainer";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/form/loginForm/LoginForm";
import Nav from "../components/navbar/Nav";
import { useLogin } from "../hooks/useLogin";
import { LoginFormSchema } from "../schemas/loginFormSchema";
import type { LoginInput } from "../types/inputTypes";

const Login = () => {
  const onSubmit: SubmitHandler<LoginFormSchema> = (data: LoginInput) => {
    try {
      mutation.mutateAsync(data);
    } catch (error) {}
  };
  const mutation = useLogin();
  return (
    <>
      <Nav />
      <div className="h-auto flex flex-col items-center justify-center">
        <FormContainer>
          <LoginForm
            onSubmit={onSubmit}
            title="Login"
            defaultValues={{ email: "", password: "" }}
            fields={[
              { name: "email", label: "Email", type: "text" },
              { name: "password", label: "Password", type: "password" },
            ]}
            error={mutation.error}
          />
          <span className="mt-5 text-center text-text">
            Don't have an account?{" "}
            <Link className="text-white underline" to="/register">
              Register here
            </Link>
          </span>
        </FormContainer>

        <Footer />
      </div>
    </>
  );
};

export default Login;

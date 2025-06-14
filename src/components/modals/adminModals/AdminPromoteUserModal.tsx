import type UserDto from "../../../dtos/userDto";
import { useAdminPromoteToAdmin } from "../../../hooks/adminHooks/useAdminPromoteToAdmin";
import { useMod } from "../../../hooks/useMod";
import FormContainer from "../../containers/FormContainer";
import ModalContainer from "../../containers/ModalContainer";
import Title from "../../form/Title";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import ModalCloseButton from "../ModalCloseButton";
interface Props {
  initialData: UserDto;
}
const AdminPromoteUserModal = ({ initialData }: Props) => {
  const { closeModal } = useMod();
  const mutation = useAdminPromoteToAdmin();
  const handleUpdateButtonClick = () => {
    mutation.mutateAsync(initialData.id);
  };
  return (
    <>
      <ModalContainer>
        <FormContainer>
          <div className="relative">
            <div className="absolute -top-5 right-0">
              <ModalCloseButton content="X" closeModal={closeModal} />
            </div>
            <div className="w-full">
              <div className="flex flex-col justify-center items-center mx-auto">
                <Title title={`Promote to Admin`} />
                {mutation.error instanceof Error && (
                  <ErrorMessage
                    fontSize="1rem"
                    message={mutation.error.message}
                  />
                )}
                {mutation.isSuccess && <SuccessMessage fontSize="[1rem]" />}
                <p className="text-text">
                  Are you sure you want to promote this account to an
                  administrator?
                </p>
                <h4 className="text-white text-[2rem] font-bold mb-5 ">
                  {initialData.email}
                </h4>
                <p className="text-red-500 mb-4 text-center">
                  Double check the user email before clicking submtit.
                </p>

                <div className="w-full">
                  {!mutation.isSuccess && (
                    <button
                      disabled={mutation.isPending}
                      onClick={handleUpdateButtonClick}
                      className="bg-primary text-[1.5rem] rounded-lg w-full py-2 hover:scale-102  hover:cursor-pointer transition-all duration-300 active:bg-modal active:text-primary active:border-2 active:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {mutation.isPending ? "Submitting..." : "Submit"}
                    </button>
                  )}
                  {mutation.isSuccess && (
                    <ModalCloseButton
                      closeModal={closeModal}
                      styles="bg-primary text-[1.5rem] rounded-lg w-full py-2 hover:scale-102 hover:cursor-pointer transition-all duration-300 active:bg-modal active:text-primary active:border-2 active:border:primary"
                      content="Close"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </FormContainer>
      </ModalContainer>
    </>
  );
};

export default AdminPromoteUserModal;

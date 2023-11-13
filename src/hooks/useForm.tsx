import { useForm as useDefaultForm } from "react-hook-form";

const useForm: typeof useDefaultForm = (props) => {
  const methods = useDefaultForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resetOptions: {
      keepErrors: true,
      keepDirty: true,
      keepDefaultValues: true,
    },
    ...props,
  });

  return methods;
};

export default useForm;

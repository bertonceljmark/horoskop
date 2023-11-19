import { Input } from "@nextui-org/react";
import { StarValueType } from "../interfaces/globalInterfaces";

interface IProps {
  field: string;
  form: { [key: string]: string | StarValueType };
  handleChange: (field: string) => (value: string) => void;
  getSpecificError: (field: string) => string | undefined;
  placeholder: string;
  type: string;
  label: string;
}

const FormInputRow = ({
  field,
  form,
  handleChange,
  getSpecificError,
  placeholder,
  type,
  label,
}: IProps) => {
  return (
    <div className="my-2 w-full">
      <Input
        label={label}
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onValueChange={handleChange(field)}
        isInvalid={!!getSpecificError(field)}
        errorMessage={getSpecificError(field)}
      />
    </div>
  );
};

export default FormInputRow;

import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import starSignList from "../utils/starSignHelper";
import { StarValueType } from "../interfaces/globalInterfaces";

interface IProps {
  sign: StarValueType | null;
  handleChange: (value: StarValueType) => void;
  error?: string;
}

const SignSelect = ({ sign, handleChange, error }: IProps) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Select your sign"
        selectionMode="single"
        selectedKeys={sign ? [sign] : []}
        errorMessage={error}
        isInvalid={!!error}
      >
        {starSignList.map((sign) => {
          return (
            <SelectItem
              key={sign.value}
              onClick={() => handleChange(sign.value)}
            >
              {sign.label}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SignSelect;

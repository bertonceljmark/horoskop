import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import starSignList from "../utils/starSignHelper";
import { StarValueType } from "../interfaces/globalInterfaces";

interface IProps {
  sign: StarValueType | null;
  setSign: (value: StarValueType) => void;
}

const SignSelect = ({ sign, setSign }: IProps) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Select your sign"
        defaultSelectedKeys={sign ? [sign] : undefined}
      >
        {starSignList.map((sign) => {
          return (
            <SelectItem key={sign.value} onClick={() => setSign(sign.value)}>
              {sign.label}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SignSelect;

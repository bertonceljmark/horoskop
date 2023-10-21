import React from "react";
import { StarValueType } from "../interfaces/globalInterfaces";
import useGPT from "../hooks/useGPT";
import { CircularProgress, Textarea } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";

interface IProps {
  sign: StarValueType | null;
}

const DailyPredictionText = ({ sign }: IProps) => {
  const { message, loading } = useGPT({ sign });

  if (loading) {
    return <CircularProgress size="lg" />;
  }

  if (!message) {
    return <span>Alo care zgorej zber sign</span>;
  }

  return (
    <div className="group flex flex-col w-full is-filled">
      <label className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        What today will bring
      </label>

      <div className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-foreground h-unit-10 min-h-unit-10 rounded-medium !h-auto transition-background !duration-150 transition-colors motion-reduce:transition-none is-filled">
        <TypeAnimation sequence={[message]} speed={70} />
      </div>
    </div>
  );
};

export default DailyPredictionText;

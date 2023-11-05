"use client";

interface IProps {
  sign: string;
  health: number;
  money: number;
  love: number;
  content: string;
}

const WeeklyHoroscopeCard = ({sign, health, money, love, content}: IProps) => {
  return (
    <div className="my-5 w-full max-w-2x2">
      <h3 className="text-center">{sign.toLocaleUpperCase()}</h3>
      <div className="flex justify-center">
        <h4 className="mx-5">Health: {health}</h4>
        <h4 className="mx-5">Money: {money}</h4>
        <h4 className="mx-5">Love: {love}</h4>
      </div>
      <p>{content}</p>
    </div>
  )
}

export default WeeklyHoroscopeCard;
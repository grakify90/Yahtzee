import React from "react";

type DiceProps = {
  dices: string;
};

export const Dice: React.FC<DiceProps> = (props) => {
  return <img src={props.dices} style={{ width: "100px" }} alt="dice" />;
};

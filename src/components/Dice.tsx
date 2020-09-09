import React from "react";
import { Button } from "@material-ui/core";

type DiceProps = {
  onedice: { dice: string; locked: boolean; location: number };
  callback: (place: number) => void;
};

export const Dice: React.FC<DiceProps> = (props) => {
  return (
    <div style={{ width: "100px" }}>
      <img src={props.onedice.dice} style={{ width: "100%" }} alt="dice" />

      <Button
        onClick={props.callback.bind(null, props.onedice.location)}
        variant="contained"
        color="primary"
      >
        {props.onedice.locked ? "Release" : "Keep"}
      </Button>
    </div>
  );
};

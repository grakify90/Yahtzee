import React from "react";
import { Button } from "@material-ui/core";
import { DiceModel } from "../models/dice.model";

type DiceProps = {
  onedice: DiceModel;
  callback: (dice: DiceModel) => void;
};

export const Dice: React.FC<DiceProps> = (props) => {
  return (
    <div style={{ width: "100px" }}>
      <img src={props.onedice.dice} style={{ width: "100%" }} alt="dice" />

      <Button
        onClick={props.callback.bind(null, props.onedice)}
        variant="contained"
        color={props.onedice.locked ? "secondary" : "primary"}
      >
        {props.onedice.locked ? "Release" : "Keep"}
      </Button>
    </div>
  );
};

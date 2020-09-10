import React from "react";
import { Button } from "@material-ui/core";
import { ScoreModel } from "../models/score.model";

type ScoreProps = {
  score: ScoreModel;
  subscore: number[];
  callback: (score: ScoreModel, subscore: number[]) => void;
};

export const Score: React.FC<ScoreProps> = (props) => {
  return (
    <Button
      disabled={props.score.locked}
      onClick={props.callback.bind(null, props.score, props.subscore)}
      color={props.score.locked ? "secondary" : "primary"}
      variant="contained"
    >
      {props.score.title}
    </Button>
  );
};

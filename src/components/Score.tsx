import React from "react";
import { Button } from "@material-ui/core";
import { ScoreModel } from "../models/score.model";
import "./Score.scss";

type ScoreProps = {
  score: ScoreModel;
  subscore: number[];
  callback: (score: ScoreModel, subscore: number[]) => void;
  scoreLock: number;
  throws: number;
  gameStarted: boolean;
};

export const Score: React.FC<ScoreProps> = (props) => {
  return (
    <Button
      disabled={props.score.locked}
      onClick={
        props.scoreLock === 1 && props.gameStarted && props.throws === 3
          ? props.callback.bind(null, props.score, props.subscore)
          : () => console.log("locked")
      }
      color={props.throws === 3 ? "secondary" : "primary"}
      variant="contained"
    >
      {props.score.title}
    </Button>
  );
};

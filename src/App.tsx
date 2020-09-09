import React, { useState } from "react";
import "./App.css";
import { Dice } from "./components/Dice";
import { Button } from "@material-ui/core";
import Yahtzeelogo from "./images/YAHTZEE.png";

const scoreUpper: string[] = [
  "Ones",
  "Twos",
  "Threes",
  "Fours",
  "Fives",
  "Sixes",
];

const scoreLower: string[] = [
  "3 of a kind",
  "4 of a kind",
  "Full House",
  "Small straight",
  "Large straight",
  "YAHTZEE",
  "Chance",
];

const dice: string[] = [
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Dice-0.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg",
];

const App: React.FC = () => {
  const [place1, setPlace1] = useState(0);
  const [place2, setPlace2] = useState(0);
  const [place3, setPlace3] = useState(0);
  const [place4, setPlace4] = useState(0);
  const [place5, setPlace5] = useState(0);

  return (
    <div className="App">
      <img src={Yahtzeelogo} alt="logo" style={{ maxWidth: "70vw" }} />
      <ul>
        {" "}
        {/*Upper section: needs total and added bonus (35) if total > 63*/}
        {scoreUpper.map((score) => {
          return <li>{score}</li>;
        })}
        {/*Lower section: needs total, total of upper section and grand total*/}
        {scoreLower.map((score) => {
          return <li>{score}</li>;
        })}
      </ul>
      <p>Upper section total:</p>
      <p>Lower section total:</p>
      <p>Grand total:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {dice.map((onedice) => {
          return <Dice dices={onedice} />;
        })}
      </div>

      <Button variant="contained" color="primary">
        Roll
      </Button>
    </div>
  );
};

export default App;

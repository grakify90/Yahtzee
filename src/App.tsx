import React, { useState } from "react";
import "./App.css";
import { Dice } from "./components/Dice";
import { Score } from "./components/Score";
import { Button } from "@material-ui/core";
import Yahtzeelogo from "./images/YAHTZEE.png";
import { DiceModel } from "./models/dice.model";
import { ScoreModel } from "./models/score.model";

type OneDice = {
  value: number;
  image: string;
};

const emptyDice: string =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Dice-0.svg";

const totalDice: OneDice[] = [
  {
    value: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg",
  },
  {
    value: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg",
  },
  {
    value: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg",
  },
  {
    value: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg",
  },
  {
    value: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg",
  },
  {
    value: 6,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg",
  },
];

const initialDiceState = [
  {
    dice: emptyDice,
    value: 0,
    locked: false,
    location: 1,
  },
  {
    dice: emptyDice,
    value: 0,
    locked: false,
    location: 2,
  },
  {
    dice: emptyDice,
    value: 0,
    locked: false,
    location: 3,
  },
  {
    dice: emptyDice,
    value: 0,
    locked: false,
    location: 4,
  },
  {
    dice: emptyDice,
    value: 0,
    locked: false,
    location: 5,
  },
];
const initialScoreState = [
  {
    title: "Ones",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "Twos",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "Threes",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "Fours",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "Fives",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "Sixes",
    locked: false,
    simpleCalculation: true,
  },
  {
    title: "3 of a kind",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "4 of a kind",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "Full House",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "Small straight",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "Large straight",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "YAHTZEE",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "Chance",
    locked: false,
    simpleCalculation: true,
  },
];

const App: React.FC = () => {
  const [diceStatus, setDiceStatus] = useState<DiceModel[]>(initialDiceState);
  const [scoreStatus, setScoreStatus] = useState<ScoreModel[]>(
    initialScoreState
  );
  const [throws, setThrows] = useState<number>(0);
  const [subscore, setSubscore] = useState<number[]>([]);
  const [totalscore, setTotalscore] = useState<number>(0);

  const rollDice = () => {
    setThrows(throws + 1);
    const newStatus = [
      ...diceStatus.map((dice) => {
        const randomDice =
          totalDice[Math.floor(Math.random() * totalDice.length)];
        if (dice.locked) {
          return dice;
        } else {
          return {
            ...dice,
            dice: randomDice.image,
            value: randomDice.value,
          };
        }
      }),
    ];
    setDiceStatus(newStatus);
    const scoresArray = newStatus.map((score) => score.value);
    setSubscore([...scoresArray]);
  };

  const keepOrRelease = (dice: DiceModel): void => {
    const newState = [
      ...diceStatus.map((item) => {
        if (item.location === dice.location) {
          return { ...item, locked: !dice.locked };
        } else {
          return item;
        }
      }),
    ];
    setDiceStatus(newState);
  };

  const calculateSimpleSubtotal = (array: number[], number: number): number => {
    return array.filter((score) => score === number).length * number;
  };
  const unique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const sumOfAllValues = (array: number[]) => {
    return array.reduce((a, b) => a + b);
  };
  const addToTotal = (score: ScoreModel, subscore: number[]): void => {
    if (score.title === "Ones" && subscore.includes(1)) {
      const subTot = calculateSimpleSubtotal(subscore, 1);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "Twos" && subscore.includes(2)) {
      const subTot = calculateSimpleSubtotal(subscore, 2);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "Threes" && subscore.includes(3)) {
      const subTot = calculateSimpleSubtotal(subscore, 3);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "Fours" && subscore.includes(4)) {
      const subTot = calculateSimpleSubtotal(subscore, 4);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "Fives" && subscore.includes(5)) {
      const subTot = calculateSimpleSubtotal(subscore, 5);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "Sixes" && subscore.includes(6)) {
      const subTot = calculateSimpleSubtotal(subscore, 6);
      setTotalscore(totalscore + subTot);
    }
    //Have to fix this, will work with [2, 2, 3, 3, 1] and should not
    if (score.title === "3 of a kind" && subscore.filter(unique).length < 4) {
      const subTot = sumOfAllValues(subscore);
      setTotalscore(totalscore + subTot);
    }
    if (score.title === "4 of a kind" && subscore.filter(unique).length < 3) {
      const subTot = sumOfAllValues(subscore);
      setTotalscore(totalscore + subTot);
    }
    //Have to fix this, willwork with [1, 2, 2, 2, 2] and should not
    if (score.title === "4 of a kind" && subscore.filter(unique).length < 3) {
      const subTot = sumOfAllValues(subscore);
      setTotalscore(totalscore + subTot);
    }
    //TODO: small straight, large straight, yahtzee, chance
    const newScoreStatus = [
      ...scoreStatus.map((item) => {
        if (item.title === score.title) {
          return { ...item, locked: true };
        } else {
          return item;
        }
      }),
    ];
    setScoreStatus(newScoreStatus);
    setThrows(0);
    setDiceStatus(initialDiceState);
  };

  /*Lower section: needs total, total of upper section and grand total*/
  /*Upper section: needs total and added bonus (35) if total > 63*/

  return (
    <div className="App">
      <img src={Yahtzeelogo} alt="logo" style={{ maxWidth: "70vw" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {scoreStatus.map((score, index) => {
          return (
            <Score
              key={index}
              score={score}
              callback={addToTotal}
              subscore={subscore}
            />
          );
        })}
      </div>
      <p>Grand total:{totalscore}</p>
      <p>
        Subscore:{" "}
        {subscore.map((score, index) => (
          <span key={index}>{score},</span>
        ))}
      </p>
      {throws > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          }}
        >
          {diceStatus.map((dice) => {
            return (
              <Dice
                key={Math.random()}
                onedice={dice}
                callback={keepOrRelease}
              />
            );
          })}
        </div>
      )}

      {throws < 3 && (
        <Button variant="contained" onClick={rollDice}>
          Roll the dice
        </Button>
      )}
    </div>
  );
};

export default App;

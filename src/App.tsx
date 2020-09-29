import React, { useState, useEffect } from "react";
import "./App.scss";
import { Dice } from "./components/Dice";
import { Score } from "./components/Score";
import { Button, useScrollTrigger } from "@material-ui/core";
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
    title: "Small Straight",
    locked: false,
    simpleCalculation: false,
  },
  {
    title: "Large Straight",
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
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [diceStatus, setDiceStatus] = useState<DiceModel[]>(initialDiceState);
  const [scoreStatus, setScoreStatus] = useState<ScoreModel[]>(
    initialScoreState
  );
  const [throws, setThrows] = useState<number>(0);
  const [subscore, setSubscore] = useState<number[]>([]);
  const [totalscore, setTotalscore] = useState<number>(0);
  const [scoreLock, setScoreLock] = useState<number>(1);
  const [gameover, setGameover] = useState<boolean>(false);
  const [rulesShown, setRulesShown] = useState<boolean>(false);

  const newGame = () => {
    setGameover(false);
    setThrows(0);
    setDiceStatus(initialDiceState);
    setScoreStatus(initialScoreState);
    setTotalscore(0);
  };

  const rollDice = () => {
    setGameStarted(true);
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

  useEffect(() => {
    if (throws === 3) {
      setScoreLock(1);
    }
  }, [throws]);

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

  //Game logic
  //helper functions
  const calculateSimpleSubtotal = (array: number[], number: number): number => {
    return array.filter((score) => score === number).length * number;
  };
  const sumArray = (arr: number[]) => arr.reduce((a, b) => a + b);

  //main function
  const validateScore = (arr: number[], check: string) => {
    const countOccurrences = (arr: number[], val: number) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    var a = [];
    for (let i = 0; i < arr.length; i++)
      if (a.indexOf(arr[i]) === -1) {
        a.push(arr[i]);
      }
    // 'a' will contain an array of unique values in subscore array
    if (check === "3 of a kind") {
      let occurence = 0;
      for (let i = 0; i < a.length; i++) {
        if (countOccurrences(arr, a[i]) > 2) {
          occurence = occurence + 1;
        }
      }
      return occurence > 0;
    }
    if (check === "4 of a kind") {
      let occurence = 0;
      for (let i = 0; i < a.length; i++) {
        if (countOccurrences(arr, a[i]) > 3) {
          occurence = occurence + 1;
        }
      }
      return occurence > 0;
    }
    if (check === "Full House") {
      let occurence = 0;
      for (let i = 0; i < a.length; i++) {
        if (countOccurrences(arr, a[i]) > 2) {
          occurence = occurence + 1;
        }
      }
      return occurence > 0 && a.length < 3;
    }
    if (check === "Small Straight") {
      arr.sort();
      if (/1234|2345|3456/.test(arr.join("").replace(/(.)\1/, "$1"))) {
        return true;
      } else {
        return false;
      }
    }
    if (check === "Large Straight") {
      const sumOfArray = sumArray(subscore);
      return (a.length === 5 && sumOfArray === 15) || sumOfArray === 20;
    }
    if (check === "YAHTZEE") {
      return a.length === 1;
    }
    return;
  };
  const sumOfAllValues = (array: number[]) => {
    return array.reduce((a, b) => a + b);
  };
  const addToTotal = (score: ScoreModel, subscore: number[]): void => {
    if (score.title === "Ones" && subscore.includes(1)) {
      const subTot = calculateSimpleSubtotal(subscore, 1);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Twos" && subscore.includes(2)) {
      const subTot = calculateSimpleSubtotal(subscore, 2);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Threes" && subscore.includes(3)) {
      const subTot = calculateSimpleSubtotal(subscore, 3);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Fours" && subscore.includes(4)) {
      const subTot = calculateSimpleSubtotal(subscore, 4);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Fives" && subscore.includes(5)) {
      const subTot = calculateSimpleSubtotal(subscore, 5);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Sixes" && subscore.includes(6)) {
      const subTot = calculateSimpleSubtotal(subscore, 6);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "3 of a kind" && validateScore(subscore, score.title)) {
      const subTot = sumOfAllValues(subscore);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "4 of a kind" && validateScore(subscore, score.title)) {
      const subTot = sumOfAllValues(subscore);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }
    if (score.title === "Full House" && validateScore(subscore, score.title)) {
      setTotalscore(totalscore + 25);
      setScoreLock(0);
    }
    if (
      score.title === "Small Straight" &&
      validateScore(subscore, score.title)
    ) {
      setTotalscore(totalscore + 30);
      setScoreLock(0);
    }
    if (
      score.title === "Large Straight" &&
      validateScore(subscore, score.title)
    ) {
      setTotalscore(totalscore + 40);
      setScoreLock(0);
    }
    if (score.title === "YAHTZEE" && validateScore(subscore, score.title)) {
      setTotalscore(totalscore + 50);
      setScoreLock(0);
    }
    if (score.title === "Chance") {
      const subTot = sumArray(subscore);
      setTotalscore(totalscore + subTot);
      setScoreLock(0);
    }

    const newScoreStatus = [
      ...scoreStatus.map((item) => {
        if (item.title === score.title) {
          setScoreLock(0);
          return { ...item, locked: true };
        } else {
          return item;
        }
      }),
    ];

    setScoreStatus(newScoreStatus);
    setThrows(0);
    setDiceStatus(initialDiceState);

    if (scoreStatus.filter((score) => score.locked === false).length === 1) {
      setGameover(true);
    }
  };

  /*Lower section: needs total, total of upper section and grand total*/
  /*Upper section: needs total and added bonus (35) if total > 63*/
  return (
    <div className="App">
      <img className="logo" src={Yahtzeelogo} alt="logo" />
      <div className="scoreboard">
        {scoreStatus.map((score, index) => {
          return (
            <Score
              key={index}
              score={score}
              callback={addToTotal}
              subscore={subscore}
              scoreLock={scoreLock}
              throws={throws}
              gameStarted={gameStarted}
            />
          );
        })}
      </div>
      {rulesShown && (
        <div className="rulesYahtzee">
          <h2>YAHTZEE rules</h2>
          <p>Roll the dice three times and pick a score.</p>
          <h3>Score categories</h3>
          <p>Ones//sixes: the sum of dice with that particular number </p>
          <p>
            Three/four of a kind: at least three/four dice the same (score is
            sum of all dice)
          </p>
          <p>Full house: three of one number and two of another (score 25)</p>
          <p>Small straight: four sequential dice (score 30) </p>
          <p>Large straight: five sequential dice (score 40) </p>
          <p>YAHTZEE: all five dice the same (score 50)</p>
          <p>Chance: any combination (score is sum of all dice)</p>
        </div>
      )}
      <div className="grandtotalcontainer">
        <h2>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/%3Fuestionmark_encircled.svg"
            alt="questionmark"
            className="questionmark"
            // onMouseEnter={() => setRulesShown(true)}
            // onMouseLeave={() => setRulesShown(false)}
            onClick={() => setRulesShown(!rulesShown)}
          />
          GRAND TOTAL:{totalscore}{" "}
          <Button variant="contained" color="secondary" onClick={newGame}>
            New game
          </Button>
        </h2>
        {throws >= 3 || gameover ? null : (
          <Button variant="contained" color="secondary" onClick={rollDice}>
            Roll the dice
          </Button>
        )}
      </div>
      <div className="dicecontainer">
        {throws > 0 &&
          diceStatus.map((dice) => {
            return (
              <Dice
                key={Math.random()}
                onedice={dice}
                callback={keepOrRelease}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;

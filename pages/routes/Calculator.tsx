import React from "react";
import ButtonComponent from "../../components/button";
import styles from "../../styles/_calculator.module.scss";

export default function App() {
  const [calculation, setCalculation]  = React.useState<(string | number)[]>([0]);
  const [result, setResult] = React.useState <number>(0);
  const [opera, setOpera] = React.useState <string>(null);
  const [prevResult, setPrevResult] = React.useState <number>(null);

  React.useEffect(() => {
    setCalculation([0]);
    setResult(0);
  }, []);

  React.useEffect(() => {
    //console.log(opera);
    if (opera != null) {
      //console.log(calculation);
      //console.log("result --- " + result);
      let itemBeforeOperator:any = 0;
      let itemAfterOperator:any = 0;
      let operatorFound = false;
      const length = calculation.length;
      for (let i = length - 1; i >= 0; i--) {
        if (calculation[i] !== "$") {
          if (opera === calculation[i]) {
            operatorFound = true;
            continue;
          }
          if (operatorFound) {
            if (result !== 0) {
              //console.log("Resultwokring")
              itemBeforeOperator  = result;
            } else {
              //console.log("Not Resultwokring")
              itemBeforeOperator =
                itemBeforeOperator === 0
                  ? calculation[i]
                  : calculation[i] + itemBeforeOperator;
            }
          } else {
            itemAfterOperator =
              itemAfterOperator === 0
                ? calculation[i]
                : calculation[i] + itemAfterOperator;
          }
        } else {
          if (result !== 0) {
            //console.log("Resultwokring")
            itemBeforeOperator = result;
          }
          break;
        }
      }

      const lastItem = calculation[calculation.length - 1];
      // console.log("lastItem :: " + lastItem);
      // console.log("itemBeforeOperator :: " + itemBeforeOperator);
      // console.log("itemAfterOperator :: " + itemAfterOperator);
      if (lastItem !== opera) {
        setPrevResult(prevResult);
        let updatedResult = 0;
        switch (opera) {
          case "%":
            updatedResult = itemBeforeOperator % itemAfterOperator;
            setResult(updatedResult);
            break;
          case "/":
            updatedResult = itemBeforeOperator / itemAfterOperator;
            setResult(updatedResult);
            break;
          case "x":
            updatedResult = itemBeforeOperator * itemAfterOperator;
            setResult(updatedResult);
            break;
          case "+":
            updatedResult =
              parseInt(itemBeforeOperator) + parseInt(itemAfterOperator);
            setResult(updatedResult);
            break;
          case "-":
            updatedResult = itemBeforeOperator - itemAfterOperator;
            setResult(updatedResult);
            break;
          default:
            return;
        }
      }
    } else {
      return;
    }
  }, [opera, calculation]);

  const num_handle = (value) => {
    if (calculation.length === 1 && calculation.indexOf(0) === 0) {
      setCalculation([value]);
    } else {
      setCalculation([...calculation, value]);
    }
    //console.log("num_handle :: " + value);
  };

  const spcl_handle = (value) => {
    if (calculation.length === 1 && calculation[calculation.length - 1] === 0) {
      return;
    }
    switch (value) {
      case "AC":
        setCalculation([0]);
        setResult(0);
        setOpera(null);
        return;
      case "%":
        updateCalculation("%");
        setOpera("%");
        break;
      case "/":
        updateCalculation("/");
        setOpera("/");
        break;
      case "+":
        updateCalculation("+");
        setOpera("+");
        break;
      case "-":
        updateCalculation("-");
        setOpera("-");
        break;
      case "x":
        updateCalculation("x");
        setOpera("x");
        return;
      case ".":
        setCalculation([...calculation, "."]);
        return;
      case "=":
        setCalculation([result]);
        setOpera(null);
        return;
      default:
        return;
    }
  };

  const updateCalculation = (value) => {
    if (result !== 0) {
      setPrevResult(result);
      setCalculation([...calculation, "$", value]);
    } else {
      setCalculation([...calculation, value]);
    }
  };

  const showCalculation = () => {
    return calculation.filter((item) => item !== "$");
  };

  return (
    <div className={`${styles["App"]}`}>
      <div className={styles["show-calculation"]}>
        <span className={`${styles["result-calculation"]}`}>{showCalculation()}</span>
        <span className={`${styles["final-result"]}`}>{result === 0 ? "0" : result}</span>
      </div>
      <div className={styles["button-layout"]}>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          AC
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          +/-
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          %
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          /
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          7
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          8
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          9
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          x
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          4
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          5
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          6
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          -
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          1
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          2
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          3
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          +
        </ButtonComponent>
        <ButtonComponent handleClick={(value) => num_handle(value)}>
          0
        </ButtonComponent>

        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          .
        </ButtonComponent>

        <ButtonComponent handleClick={(value) => spcl_handle(value)}>
          =
        </ButtonComponent>
      </div> 
    </div>
  );
}

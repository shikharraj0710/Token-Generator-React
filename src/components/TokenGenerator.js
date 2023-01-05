import React from "react";
import { useAppContext } from "../contexts/AppContextProvider";

export default function TokenGenerator() {
  const { tokens } = useAppContext();

  const numberArray = (total, tokenPerRow) =>  {
    const numbers = Array(total).fill(0).map((number, index) => index + 1);
    const totalRows = Math.ceil(total / tokenPerRow);
    let start = 0;
    let end = tokenPerRow;
    const arr = [];
    for(let i = 0; i < totalRows; i++) {
        arr.push(numbers.slice(start, end));
        start = end;
        end += tokenPerRow;
    }
    console.log(arr);
    return arr;
  }

  return (
    <div>
      {tokens.map((token, index) => (
        <div key={index} className="token-container">
            {numberArray(Number(token["number-of-tokens"]), Number(token["token-per-row"])).map((numberRow, i) => (          
              <div className="token-row" key={i}>
                 {
                  numberRow.map(number => (
                    <div className="token-box" style={{
                      background: token?.selectedColor
                    }}>{token?.prefix + number}</div>
                  ))
                 }
              </div>             
            ))}
            
        </div>
      ))}
    </div>
  );
}

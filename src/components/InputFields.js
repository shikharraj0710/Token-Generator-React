import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContextProvider";

export default function InputFields() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { dispatch, tokens } = useAppContext();
  const [inputError, setInputError] = useState(false)

  const handleFormSubmit = useCallback((data) => {
    if(data["token-per-row"] > data["number-of-tokens"]) {
      setInputError(true);
    } else {
    console.log(data);
    setInputError(false);
    dispatch({
        type: "ADD_TOKEN",
        tokenData: data
    });
    reset();}
  }, [dispatch]);

  function handleClear() {
    window.confirm("Are you sure you want to delete the tokens?") &&
    dispatch({
        type: "CLEAR_TOKENS",
    })
  }


  return (
    <div>
      <h1>Token Generator Application</h1>
      <form autoComplete="off">
        <div className="input-div">
          <label htmlFor="selectedColor">Select Ticket Color</label>
          <select
            id="selectedColor"
            name="selectedColor"
            {...register("selectedColor", {
              required: { value: true, message: "Ticket Color is required" },
            })}
          >
            <option value="">Select Color</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
          </select>
        </div>
        {errors?.selectedColor && <div className="errors">{errors?.selectedColor?.message}</div>}
        <div className="input-div">
          <label htmlFor="number-of-tokens">Number of Tokens</label>
          <input
            type="number"
            id="number-of-tokens"
            name="number-of-tokens"
            {...register("number-of-tokens", {
              required: {
                value: true,
                message: "Number of Tokens cannot be empty",
              },
            })}
          />
        </div>
        {errors["number-of-tokens"] && (
          <div className="errors">{errors["number-of-tokens"]?.message}</div>
        )}
        <div className="input-div">
          <label htmlFor="prefix"> Token Prefix</label>
          <input
            type="text"
            id="prefix"
            name="prefix"
            {...register("prefix", {
              required: {
                value: true,
                message: "Token Prefix cannot be empty",
              },
            })}
          />
        </div>
        {errors?.prefix && <div className="errors">{errors?.prefix?.message}</div>}
        <div className="input-div">
          <label htmlFor="token-per-row"> Token per row</label>
          <input
            type="text"
            id="token-per-row"
            name="token-per-row"
            {...register("token-per-row", {
              required: {
                value: true,
                message: "Token Per Row cannot be empty",
              },
            })}
          />
        </div>
        {errors["token-per-row"] && (
          <div className="errors">{errors["token-per-row"]?.message}</div>
        )}
        {
          inputError && <div className="errors">Token per Row value must be less than total Tokens</div>
        }
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}>
          <div style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0"
          }}>
            <button type="button" onClick={handleSubmit(handleFormSubmit)}>Generate</button>
            <button type="button" disabled={tokens.length === 0} onClick={handleClear}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  );
}



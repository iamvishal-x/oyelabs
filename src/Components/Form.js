import db from "../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { useCustomContext } from "../context";
import { useEffect, useState } from "react";

const Form = () => {
  const Options = ["Malta", "Sontra", "Sonfee"]; //dropdown options
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [cocktail, setCocktail] = useState("Malta");
  const [customContext, setCustomContext] = useCustomContext();

  const setStateFromSelectedEntry = (entry) => {
    setName(entry.name || "");
    setPoints(entry.points || "");
    setCocktail(entry.cocktail || "Malta");
  };

  const resetStates = () => {
    setCocktail("Malta");
    setName("");
    setPoints("");
  };

  const resetSelectedEntry = () =>
    setCustomContext((prev) => ({
      ...prev,
      isEditing: false,
      selectedEntryId: null,
    }));

  ////////////////////////////////////////////////
  useEffect(() => {
    if (customContext.isEditing && customContext.selectedEntryId) {
      const entry = customContext.entries.find(
        (e) => e.id === customContext.selectedEntryId
      );
      setStateFromSelectedEntry(entry || {});
    } else resetStates();
  }, [
    customContext.isEditing,
    customContext.selectedEntryId,
    customContext.entries,
  ]);

  //adding data to the db
  const addEntry = (e) => {
    e.preventDefault(); //prevents page from refreshing
    db.collection("entries").add({
      name,
      points,
      cocktail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    resetStates();
  };

  /////////////////////////////////////////////
  //Reset Button Fn
  const handleReset = (e) => {
    e.preventDefault();
    resetStates();
    resetSelectedEntry();
  };
  ///////////////////////////////////////////////

  const updateEntry = (e) => {
    e.preventDefault(); //prevents page from refreshin
    db.collection("entries").doc(customContext.selectedEntryId).set(
      {
        name,
        points,
        cocktail,
      },
      { merge: true }
    );
    resetStates();
    resetSelectedEntry();
  };

  return (
    <div>
      <form className="form" type="submit" onSubmit={addEntry}>
        <h1>Add Entry </h1>
        <label htmlFor="name">Name</label>
        <input
          required
          autoComplete="off"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label htmlFor="Select Cocktail"> Select Cocktail </label>
        <select
          required="required"
          onChange={(e) => setCocktail(e.target.value)}
          value={cocktail}
        >
          {Options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="Points">Points (0 to 10)</label>
        <input
          placeholder="Give Points"
          onChange={(e) => {
            if (+e.target.value >= 0 && +e.target.value <= 10)
              setPoints(+e.target.value);
          }}
          value={points}
          type="number"
          min="0"
          max="10"
        />
        <div className="buttons">
          {/* Disabling add button if input and points field are empty */}
          <button
            className=" btn btn__add"
            disabled={!name || !points}
            onClick={customContext.isEditing ? updateEntry : addEntry}
          >
            {customContext.isEditing ? "Update" : "Add"}
          </button>
          <button className="btn button" onClick={handleReset}>
            {customContext.isEditing ? "Cancel" : "Reset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

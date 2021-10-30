import db from "../firebase";
import "firebase/compat/firestore";
import "./Content.css";
import { useCustomContext } from "../context";
import { useEffect } from "react";
import Leaderboard from "./Leaderboard";

const Entries = () => {
  const [customContext, setCustomContext] = useCustomContext();

  return (
    <div className="right__scroll">
      <h1 className="right__title">Entries</h1>
      <Leaderboard />
      <table>
        <thead className="table__headings">
          <tr>
            <th>Name</th>
            <th>Cocktail</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {customContext.entries.map((entry) => (
            <tr key={entry.id}>
              <td> {entry.name} </td>
              <td> {entry.cocktail} </td>
              <td> {entry.points} </td>
              <td>
                <button
                  onClick={() =>
                    setCustomContext((prev) => ({
                      ...prev,
                      isEditing: true,
                      selectedEntryId: entry.id,
                    }))
                  }
                  className="button btn"
                >
                  Edit
                </button>
                {console.log(customContext.selectedEntryId)}
                <button
                  className="btn button "
                  onClick={() => {
                    db.collection("entries").doc(entry.id).delete();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;

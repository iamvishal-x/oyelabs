import { useEffect } from "react";
import "./Content.css";
import db from "../firebase";
import "firebase/compat/firestore";
import { useCustomContext } from "../context";
import Entries from "./Entries";
import Form from "./Form";

const Content = () => {
  const [customContext, setCustomContext] = useCustomContext();

  //fetching data and sorting it by asc order
  useEffect(() => {
    db.collection("entries")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setCustomContext((prev) => ({
          ...prev,
          entries: snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            points: doc.data().points,
            cocktail: doc.data().cocktail,
          })),
        }));
      });
  }, []);

  return (
    <div className="main">
      {/* Left Side- Form section */}
      <div className="left">
        <Form />
      </div>

      {/* //////////////////////////////////////////////////////////// */}
      {/* Right Side- Displaying/Outputting Data */}
      <div className="right">
        <Entries />
      </div>
    </div>
  );
};

export default Content;

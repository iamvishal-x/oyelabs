import Content from "./Components/Content";
import Navbar from "./Components/Navbar";
import { CustomContextProvider } from "./context";
// import firebase from "firebase";
import "firebase/firestore";
// import db from "./firebase";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <CustomContextProvider>
        <Content />
      </CustomContextProvider>
    </div>
  );
}

export default App;

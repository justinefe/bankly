import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { debitAction } from "./views/actions";
import DebitCard from "./views/DebitCard";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const debit = localStorage.getItem("debit");
    if (debit) {
      dispatch(debitAction(JSON.parse(debit)));
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DebitCard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
function StockPage() {
  const history = useHistory();
  let { stockTick } = useParams();

  return (
    <div>
      <div></div>
    </div>
  );
}
function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const history = useHistory();

  function onChangeSearch(evt) {
    const value = evt.target.value;
    setSearchValue(value);
  }
  function onEnter(e) {
    console.log(searchValue);
    if (e.key === "Enter") {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=5NUW7CKWG93NYG2M`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setSearchResults(res.bestMatches);
        });
    }
  }
  function onClickStock(index) {
    const value = searchResult[index]["1. symbol"];
    history.push("/" + value);
  }

  return (
    <div>
      <div className="topnav">
        <input
          placeholder="Search..."
          onChange={onChangeSearch}
          onKeyDown={onEnter}
          value={searchValue}
        />
      </div>
      <div>
        {"Search results"}
        {searchResult.map((value, index) => {
          return (
            <button
              className="results-button"
              onClick={() => onClickStock(index)}
            >
              <div>{"Symbol is " + value["1. symbol"]}</div>
              <div>{"Name is " + value["2. name"]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={"/"}>
            <HomePage />
          </Route>
          <Route path={`/:stockTick`}>
            <StockPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

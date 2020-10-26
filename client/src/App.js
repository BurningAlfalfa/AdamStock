import TradingViewWidget from "react-tradingview-widget";
import React, { useState, useEffect, useRef } from "react";
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
  const [stockPriceData, setStockPriceData] = useState({});
  const [yesterdayPriceData, setYesterdayPriceData] = useState({});
  const [stockInfoData, setStockInfoData] = useState({});
  const history = useHistory();
  let { stockTick } = useParams();
  const tradingRef = useRef();
  console.log(stockTick);

  /*
<div class="tradingview-widget-container">
  <div id="tradingview_951e6"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
  */

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTick}&interval=5min&apikey=5NUW7CKWG93NYG2M`
    )
      .then((res) => res.json())
      .then((res) => setStockPriceData(res));
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockTick}&apikey=5NUW7CKWG93NYG2M`
    )
      .then((res) => res.json())
      .then((res) => setYesterdayPriceData(res));
    fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockTick}&apikey=5NUW7CKWG93NYG2M`
    )
      .then((res) => res.json())
      .then((res) => setStockInfoData(res));
    // setInterval(
    //   () =>
    //     fetch(
    //       `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTick}&interval=5min&apikey=5NUW7CKWG93NYG2`
    //     ),
    //   1000 * 60 * 5
    // );
  }, []);
  const stockDescription = stockInfoData["Description"];
  const companyName = stockInfoData["Name"];
  const marketCap = stockInfoData["MarketCapitalization"];
  const employess = stockInfoData["FullTimeEmployees"];
  const shares = stockInfoData["SharesFloat"];
  const high52 = stockInfoData["52WeekHigh"];
  const low52 = stockInfoData["52WeekLow"];
  const dividend = stockInfoData["DividendDate"];
  const exDiv = stockInfoData["ExDividendDate"];
  const priceToEaring = stockInfoData["PERatio"];
  const movingAverage50 = stockInfoData["50DayMovingAverage"];
  const movingAverage200 = stockInfoData["200DayMovingAverage"];
  const beta = stockInfoData["Beta"];
  const divYield = stockInfoData["DividendYield"];
  const sector = stockInfoData["Sector"];
  const industry = stockInfoData["Industry"];
  const country = stockInfoData["Country"];
  const yesterdayPrice = yesterdayPriceData["Time Series (Daily)"]
    ? Number(
        Object.values(yesterdayPriceData["Time Series (Daily)"])[1]["4. close"]
      ).toFixed(2)
    : "error";
  const stockPrice = stockPriceData["Time Series (5min)"]
    ? Number(
        Object.values(stockPriceData["Time Series (5min)"])[0]["1. open"]
      ).toFixed(2)
    : "error";

  const stockPriceDate = stockPriceData["Time Series (5min)"]
    ? Object.keys(stockPriceData["Time Series (5min)"])[0]
    : "error";
  const isPositive = stockPrice >= yesterdayPrice;
  console.log(stockPriceData);
  const stockPoints = stockPrice - yesterdayPrice;
  const stockPercent =
    ((stockPrice - yesterdayPrice) / Math.abs(stockPrice)) * 100;
  return (
    <div className="body-wrapper">
      <body>
        <div class="columns is-mutiline">
          <div className="column">
            <div className="card">
              <h1>Stock Price</h1>
              <div>{stockPriceDate}</div>
              <div className="stock-ticker">{stockTick}</div>
              <div> {stockPrice}</div>
              <div
                style={{ color: isPositive ? "green" : "red" }}
                className="stock-price"
              >
                {stockPercent.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h1>Company Profile</h1>
              <strong class="tag">
                <span class="tag profile-tag"> Sector </span>
                <span class="tag primary-light"> {sector} </span>
              </strong>
              <strong class="tag">
                <span class=" tag profile-tag">Industry </span>
                <span class="tag primary-light"> {industry} </span>
              </strong>
              <strong class="tag">
                <span class=" tag profile-tag"> Country </span>
                <span class="tag primary-light">{country}</span>
              </strong>
              <strong class="tag">
                <span class=" tag profile-tag">Employess</span>
                <span class="tag primary-light">{employess}</span>
              </strong>
              {stockDescription}
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-multiline is-centered">
          <div className="column is-12-mobile is-10-tablet is-8-fullhd">
            <div class="columns box is-paddingless is-marginless">
              <div class="column">
                <h1> Quick look</h1>

                <div class="columns is multiline is-marginless is-paddingless">
                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>Market Cap</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatValue">
                        <p>{marketCap}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>Enterprise Value</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>EV/EBITDA</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>EV/EBIT</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>Price/Earnings</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>Price/Sales </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>-</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> Price/Book</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>-</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> TTMEPS </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>-</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> TTM Div Rate </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>-</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> Div Yield </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{divYield}</p>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-4-fullhd is-paddingless is-size-7 dbStatWrapper tooltip is-tooltip-info is-tooltip-multiline">
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> Next Div </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{dividend}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p> Ex-Div </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{exDiv}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>PE</p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{priceToEaring}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>Beta </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{beta}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="columns is-mobile is-marginless is-paddingless">
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>52W High </p>
                      </div>
                      <div class="column is-paddingless is-half dbStatLabel">
                        <p>{high52}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <div>
                      <div>
                        <p>52W Low</p>
                      </div>
                      <div>
                        <p> {low52}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>52W Change </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>50MA</p>
                      </div>
                      <div>
                        <p> {movingAverage50}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>200DMA </p>
                      </div>
                      <div>
                        <p>{movingAverage200}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (5d) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p> Change (30d)</p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (1m) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (3m)</p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (6m)</p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p> Change (1y) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p> Change (2y) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (5y) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (YTD)</p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p>Change (Max) </p>
                      </div>
                      <div>
                        <p>-</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <TradingViewWidget symbol={`NASDAQ:${stockTick}`} />
      </body>
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
          <Route exact path={"/"}>
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

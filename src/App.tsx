import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ApiObject = {
  text: string;
  author: string;
};

function App() {
  let prevIndex: number;
  let index: number;
  let quotes: ApiObject[];

  const [quote, setQuote] = useState("Click to Generate Quote");
  const [author, setAuthor] = useState("Author");

  // Fetching the Quote With IIFE from FREECODECAMP API
  (function randomQuote() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => (quotes = data));
  })();

  const generateQuote = () => {
    index = Math.floor(Math.random() * quotes.length - 1);
    //   If the random number was -1 then get 0 instead
    if (index < 0) index = 0;
    // Make sure we haven't generated the same quote before
    if (index === prevIndex) {
      // Check if we reached the end of the array or not
      if (index < quotes.length - 2) index++;
      else index--;
    }
    prevIndex = index;
    setQuote(quotes[index].text);
    setAuthor(quotes[index].author);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100vh">
      <div className="rounded-5 card justify-content-between align-items-center mh-40 col-12 col-lg-8 text-center">
        <p className="fw-bold pt-5 px-5">
          <FontAwesomeIcon icon={faQuoteLeft} />
          &nbsp;
          <span className="quote fs-5">{quote}</span>&nbsp;
          <FontAwesomeIcon icon={faQuoteRight} />
        </p>
        <span className="author fs-3 fw-bold">{author}</span>
        <h1 className="fa-3x mb-0 fw-bolder pb-2 px-5">Today's Quote</h1>
        <button
          className="btn py-3 mb-5 col-md-4 col-8 fw-bold"
          id="generateQuote"
          onClick={() => generateQuote()}
        >
          New Qoute
        </button>
      </div>
    </div>
  );
}

export default App;

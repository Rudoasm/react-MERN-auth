import React, { useEffect, useState } from "react";
import CurrencyRow from "../components/CurrencyRow";
import "./CurrencyConvertor.css";

const api_url =
  "https://v6.exchangerate-api.com/v6/44a527d6f060cc6110ce81ea/latest/USD";

export default function CurrencyConvertor() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);
  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json()) 
      .then((data) => {
        setCurrencyOptions([
          data.base_code,
          ...Object.keys(data.conversion_rates),
        ]);
      });
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="ccMain">
      <CurrencyRow />
      <div>&#8644;</div>
      <CurrencyRow />
    </div>
  );
}

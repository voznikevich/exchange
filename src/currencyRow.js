import React from "react";

function currencyRow({
  onchangeAmount,
  amount,
  currencyOptions,
  selectedCurrency,
  onchangeCurrency
}) {
  return (
    <div>
      <input type="number" value={amount} onChange={onchangeAmount} />
      <select value={selectedCurrency} onChange={onchangeCurrency}>
        {currencyOptions.map((Option) => (
          <option key={Option} value={Option}>
            {Option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default currencyRow;

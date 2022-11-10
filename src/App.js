import React from "react";

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ["Deposit", "Withdraw"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  let color = ""
  if (isDeposit) {
    color = "btn-outline-success" 
  }
  else {
    color = "btn-outline-danger"
  }

  return (
    <div>

    <label className="pt-5">
      {atmMode && <h3> {choice[Number(!isDeposit)]}</h3>}
    </label>
      {atmMode && (
        <input
          id="number-input"
          type="number"
          onChange={onChange}
          className="input-group-text bg-white w-100"
        ></input>
      )}
      {atmMode && (
        <input
          type="submit"
          value="Submit"
          id="submit-input"
          disabled={!isValid}
          className={`btn mt-2 w-100 ${color}`}
        ></input>
      )}
    </div>
  );
};

function App() {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    console.log(`Valid-- ${validTransaction}`);
    if (event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode === "Cash Back" && event.target.value > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    if (e.target.value === "Deposit") {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <div className="">
      <div className="bg-danger pt-3 pb-2">
        <h1 className="fw-bold text-center text-white">ATM</h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="py-5">
          <h2 id="total">{status}</h2>
          <label className="mt-5 mb-2">Action Type</label>
          <select
            onChange={(e) => handleModeSelect(e)}
            name="mode"
            id="mode-select"
            className="form-select form-select-lg w-100"
          >
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">
              Deposit
            </option>
            <option id="cashback-selection" value="Withdraw">
              Withdraw
            </option>
          </select>
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            atmMode={atmMode}
            isValid={validTransaction}
            className="mt-5"
          ></ATMDeposit>
        </form>
      </div>
    </div>
  );
}

export default App;

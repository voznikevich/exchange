import './App.css';
import React, {useEffect, useState} from "react";
import {db} from './firebase-config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import CurrencyRow from "./currencyRow";

function App() {
    const [currencyOptions, setcurrencyOptions] = useState([]);
    const [fromCurrency, setfromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState();
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    const usersCollectionRef = collection(db, "users");
    const [users, setUsers] = useState([]);
    let b = ["a", "b"];

    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }
    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            console.log(data.docs, '1111111111')
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getUsers();
        setfromCurrency(1);
        setToCurrency(1);
        setExchangeRate(1);
    }, []);
    console.log(users)
    useEffect(() => {

    }, [fromCurrency, toCurrency]);
    function handleFromAmount(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }
    function handleToAmount(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }
    return (
        <div className="App">
            <h1>Currency Converter</h1>
            <CurrencyRow
                currencyOptions={b}
                selectedCurrency={fromCurrency}
                onchangeCurrency={(e) => {
                    setfromCurrency(e.target.value);
                }}
                amount={fromAmount}
                onchangeAmount={handleFromAmount}
            />
            <h1> = </h1>
            <CurrencyRow
                currencyOptions={b}
                selectedCurrency={toCurrency}
                onchangeCurrency={(e) => {
                    setToCurrency(e.target.value);
                }}
                amount={toAmount}
                onchangeAmount={handleToAmount}
            />
        </div>
    );
}
export default App;

import './App.css';
import React, {useEffect, useState} from "react";
import {db} from './firebase-config';
import {
    collection,
    getDocs,
} from "firebase/firestore";
import CurrencyRow from "./currencyRow";

function App() {
    const usersCollectionRef = collection(db, "users");
    const [select1, setSelect1] = useState([])
    const [select2, setSelect2] = useState([])
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);


    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const value = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))


        const valueSelect = Object.values(value).map((i) => {
            return { base_code: i.base_code, map: Object.keys(i.rates), rates: i.rates }
        })


        const sel = valueSelect.map((a) => a.base_code)


        setFromCurrency(sel[0]);
        setSelect1(sel)
        setCurrencyOptions(valueSelect)
    };

    useEffect(() => {
        getUsers();
    }, []);


    useEffect(() => {
        const rate = currencyOptions.find((s) => s.base_code === fromCurrency)?.rates[toCurrency]
        if (rate) {
            setExchangeRate(+rate)
        }
    }, [toCurrency, fromCurrency])


    useEffect(() => {
        const a = currencyOptions.find((s) => s.base_code === fromCurrency)
        if (a) {
            setSelect2(a?.map)
            setToCurrency(a.map[0]);
        }
    }, [fromCurrency, currencyOptions])


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
                currencyOptions={select1}
                selectedCurrency={fromCurrency}
                onchangeCurrency={(e) => {
                    setFromCurrency(e.target.value);
                }}
                amount={fromAmount}
                onchangeAmount={handleFromAmount}
            />
            <h1> = </h1>
            <CurrencyRow
                currencyOptions={select2}
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

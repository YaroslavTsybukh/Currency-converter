import {useEffect , useState} from "react";

const App = ({sum}) => {

    const [data , setData] = useState([])
    const [total , setTotal] = useState(sum)

    const getCurrency = async() => {
        const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
        const result = await response.json()
        const currencyObject = result.filter(item => item.txt === "Долар США" || item.txt === "Євро" || item.txt === "Злотий" ? item : null)
        setData(currencyObject)
    }

    useEffect(() => {
        getCurrency()
    }, [])

    const getCalculatedValues  = (countryCode) => {
        const currencyCheck = (item , countryCode , currency) => {
            if(item.cc === countryCode){
                const res = (total * item.rate).toFixed(1) + currency
                setTotal(res)
            }

            if(total !== 1){
                alert("Значения поменялось на дефолтное")
                setTotal(1)
            }
        }

        data.forEach(item => {
            switch(countryCode){
                case "USD" :
                    currencyCheck(item , countryCode, "$")
                    break
                case "EUR" :
                    currencyCheck(item , countryCode , "€")
                    break
                case "PLN" :
                    currencyCheck(item , countryCode , "zł")
                    break
                }
            }
        )
    }

    const resetValue = () => {
        setTotal(total => total =  sum)
    }

    return (
      <div className="app">
          <p className="subtitle">Вы ввели данную сумму : {sum} грн</p>
          <div className="counter">{total}</div>
          <div className="controls">
              <button onClick={() => getCalculatedValues("USD")}>USD</button>
              <button onClick={() => getCalculatedValues("EUR")}>EUR</button>
              <button onClick={() => getCalculatedValues("PLN")}>PLN</button>
              <button onClick={resetValue}>RESET</button>
          </div>
      </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Toggle } from './Components/Theme/Toggle';
import { useDarkMode } from './Components/Theme/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './Components/Theme/globalStyles';
import { ThemeProvider } from 'styled-components';
import LineDiagram from './Components/LineDiagram/lineDiagram';
import Rate from './Components/Rate/Rate';
import Cards from './Components/Cards/cards';
import fetchData from './Components/API';

function App() {
  //theme mode
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalDate, setDate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(1);
  const [country, setCountry] = useState('');
  const [covidCountAr, setCovidCountAr] = useState([]);
  const [label, setLabel] = useState([]);


  //send HTTP request 
  //save response to variable
  useEffect(() => {

    setLoading(true);
    fetchData.get(`/summary`)
      .then(res => {

        setLoading(false);

        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setDate(res.data.Global.Date);
          setCovidSummary(res.data);
        }
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);


  //Get Reports
  const getReportByDate = (countrySlug, from, to) => {
    fetchData.get(`country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
      .then(res => {
        console.log(res);
        const yData = res.data.map(d => d.Cases);
        const xAxisLabel = res.data.map(d => d.Date);
        const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug);

        setCovidCountAr(yData);
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch(error => {
        console.log(error);
      })
  }


  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);     //12 -> 012 -> 12
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  }

  //country handler
  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));

    //console.log(from, to);

    getReportByDate(e.target.value, from, to);
  }

  //date in readable format
  const daysHandler = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    getReportByDate(country, from, to);
  }

  if (loading) {
    return <p>Pieni hetki, haetaan tiedot!</p>
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Toggle theme={theme} toggleTheme={toggleTheme} />
      <Cards
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        totaldate={totalDate}
        country={country}
      />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '40px auto' }}>
        <select value={country} onChange={countryHandler}>
          <option value="">Valitse Maa</option>
          {
            covidSummary.Countries && covidSummary.Countries.map(country =>
              <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            )
          }
        </select>
        <select value={days} onChange={daysHandler}>
          <option value="7"> Viime viikko </option>
          <option value="30"> Kuukausi </option>
          <option value="90"> Kolme Kuukausi</option>
        </select>
      </div>
      <LineDiagram
        yAxis={covidCountAr}
        label={label} />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }}>
        <Rate />
      </div>
    </ThemeProvider>
  );
}

export default App;

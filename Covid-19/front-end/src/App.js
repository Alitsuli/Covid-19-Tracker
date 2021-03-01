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
        }
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

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
        country={'country'}
      />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '40px auto' }}>
        <select >
          <option value="">Valitse Maa</option>
        </select>
        <select>
          <option value="7"> 7 Päivän Tiedot </option>
          <option value="30"> 30 Päivän Tiedot  </option>
          <option value="90"> 90 Päivän Tiedot </option>
        </select>
      </div>
      <LineDiagram />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '100px auto' }}>
        <Rate />
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Toggle } from './Components/Theme/Toggle';
import { useDarkMode } from './Components/Theme/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './Components/Theme/globalStyles';
import { ThemeProvider } from 'styled-components';
import LineDiagram from './Components/LineDiagram/lineDiagram';
import Rate from './Components/Rate/Rate';
import Cards from './Components/Cards/cards';

function App() {
  //theme mode
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Toggle theme={theme} toggleTheme={toggleTheme} />
      <Cards />
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

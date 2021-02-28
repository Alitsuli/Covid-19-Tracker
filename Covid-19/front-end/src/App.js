import React, { useEffect, useState } from 'react';
import { Toggle } from './Components/Theme/Toggle';
import { useDarkMode } from './Components/Theme/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './Components/Theme/globalStyles';
import { ThemeProvider } from 'styled-components';

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
    </ThemeProvider>
  );
}

export default App;

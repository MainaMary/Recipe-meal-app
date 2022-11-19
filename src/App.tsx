import "./App.css";
import React from "react";
import GlobalStyle from "./styles/globalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import AuthProvider from "./context/UserContext";
import MainRoutes from "./routes";
function App() {
  const themeStyles = lightTheme;
  return (
    <ThemeProvider theme={themeStyles}>
      <div className="App">
        <GlobalStyle />

        <Router>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

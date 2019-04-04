import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MessageBoard from "./MessageBoard";

const theme = createMuiTheme(
  {
    typography: {
      useNextVariants: true,
    }
  },);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App/>
    <MessageBoard/>
  </MuiThemeProvider>,
  document.getElementById('root')
)

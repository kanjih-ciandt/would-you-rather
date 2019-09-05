import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { loadState, saveState} from './context/localStorage'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0'
    },
    secondary: {
      light: '#fff64f',
      main: '#ffc400',
      dark: '#c79400',
    },
  },
});

const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

store.subscribe( () => {
  saveState({
    authedUser: store.getState().authedUser
  });
});

ReactDOM.render(
  <Provider store={store}>
    
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

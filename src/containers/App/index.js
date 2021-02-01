import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import history from 'utils/history';
import storage from 'services/storage.service';
import { lightTheme, darkTheme } from 'themes';
import { loadTheme } from 'store/actions/theme';
import TopBar from 'components/TopBar';
import Routes from 'routes';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const userName = useSelector((state) => state.game.username);

  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  useEffect(() => {
    if (!storage.getItem('username')) {
      history.push('/');
    }
  }, [userName]);

  const appliedTheme = createMuiTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Router history={history}>
          <TopBar />

          <Routes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

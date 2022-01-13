import { setAuthToken } from './utils/constants'
import { useEffect } from 'react'
import Login from './Components/Login'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './utils/components/PrivateRoute'
import Research from './Components/Research'
import SnackBar from './Components/SnackBar/SnackBar';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

function App() {
  let mainTheme = createTheme({
    typography: {
      fontFamily: [
        `'Inter', 
        sans-serif`,
      ].join(','),
    },
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: '100%',
          '& .MuiIconButton-root': {
            color: '#001858',
          },
        },

        toolbar: {
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid #A5AFC233',
          borderLeft: '2px solid #A5AFC233',
          borderRight: '2px solid #A5AFC233',
          borderBottom: '1px solid #A5AFC233',
          borderRadius: '8px 8px 0px 0px',
          marginTop: '13px',
        },

        editor: {
          label: {
            color: 'red',
          },
          borderTop: 'none',
          border: '2px solid #A5AFC233',
          borderRadius: '0px 0px 8px 8px',
          padding: '10px',
          height: '630px',
          lineHeight: 1.5,
          maxHeight: '630px',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '3px',
            height: '3px',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px #FFFFFF',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: '10px',
          },
        },
        placeHolder: {
          padding: 10,
          color: '#868DA2',
        },
      },
    },
  })

  return (
    <ThemeProvider theme={mainTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SnackBar />
        <Switch>
          <Route exact path="/login" component={Login}>
            {<Login></Login>}
          </Route>
          <PrivateRoute exact path="/*" component={Login} />
          <PrivateRoute path="/research" component={Research}></PrivateRoute>
        </Switch>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App

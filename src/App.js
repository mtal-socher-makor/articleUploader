import UploadForm from './Components/UploadForm';
import { setAuthToken } from './utils/constants';
import { useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  useEffect(() => {
    setAuthToken('123');
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UploadForm />
    </MuiPickersUtilsProvider>
  );
}

export default App;

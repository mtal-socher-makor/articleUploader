import UploadForm from './Components/UploadForm';
import { setAuthToken } from './utils/constants';
import { useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AllArticles from './Components/AllArticels';
import * as articlesAction from './Redux/articleSlice/articleSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken('123');
    dispatch(articlesAction.getAllArticlesAsync());
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <UploadForm /> */}
      <AllArticles />
    </MuiPickersUtilsProvider>
  );
}

export default App;

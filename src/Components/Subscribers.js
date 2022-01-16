import axios from 'axios';
import { BASE_URL, END_POINT } from '../utils/constants';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as actionSnackBar from '../Redux/snackbarSlice/snackbarSlice';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useStyles, StyledTable, StyledTableCell } from '../Styles/mainStyles';
import { ReactComponent as Rectangle } from '../Assets/Rectangle.svg';

function Subscribers() {
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState();
  const classes = useStyles();

  const getSubscriptionAsync = async () => {
    try {
      let resp = await axios.get(`${BASE_URL}${END_POINT.SUBSCRIPTION}`);
      if (resp.status === 200) {
        setSubscription(resp.data);
        dispatch(actionSnackBar.setSnackBarAction({ type: 'success', timeout: 3000, message: 'Subscribers loaded successfuly', visible: true }));
      }
    } catch (err) {
      dispatch(actionSnackBar.setSnackBarAction({ type: 'error', timeout: 3000, message: 'Network error', visible: true }));
    }
  };
  useEffect(() => {
    getSubscriptionAsync();
  }, []);

  return (
    <Grid container className={classes.pageGrid}>
      <Grid item xs={12}>
        <Grid container direction="column" alignItems="center">
          <Grid item align="center">
            <Rectangle />
          </Grid>
          <Grid item align="center">
            <Typography className={classes.title}>Subscribers</Typography>
          </Grid>
        </Grid>
      </Grid>
      {!!subscription && (
        <Grid item xs={12} align="center" style={{ paddingTop: 20 }}>
          <TableContainer className={classes.tableContainer} style={{ width: '20%' }}>
            <StyledTable stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }}>Email</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscription.map((subs, idx) => {
                  return (
                    <TableRow key={idx}>
                      <StyledTableCell style={{ textAlign: 'center', width: '50px' }}>{subs.email}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: 'center' }}>{format(new Date(subs.created_at), 'dd.MM.yyyy')}</StyledTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}

export default Subscribers;

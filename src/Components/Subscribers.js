import axios from 'axios';
import { BASE_URL, END_POINT } from '../utils/constants';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as actionSnackBar from '../Redux/snackbarSlice/snackbarSlice';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useStyles, StyledTable, StyledTableCell } from '../Styles/mainStyles';
import { ReactComponent as Rectangle } from '../Assets/Rectangle.svg';

function Subscribers() {
  const subscription = useSelector((state) => state.articles.subscriptions);
  const classes = useStyles();

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
      {subscription && (
        <Grid item xs={12} align="center" style={{ paddingTop: 20 }}>
          <TableContainer className={classes.tableContainer} style={{ width: '25%' }}>
            <StyledTable stickyHeader size="small">
              <TableHead>
                <TableRow className={classes.tableRow} style={{ filter: 'none' }}>
                  <TableCell style={{ textAlign: 'center', borderBottom: 'none', backgroundColor: '#cccccc' }}>Email</TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: 'none', backgroundColor: '#cccccc' }}>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscription.map((subs, idx) => {
                  return (
                    <TableRow key={idx} className={classes.tableRow}>
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

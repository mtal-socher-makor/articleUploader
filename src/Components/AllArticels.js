import { Grid, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, IconButton, withStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as articlesAction from '../Redux/articleSlice/articleSlice';
import { format } from 'date-fns';
import { useStyles, FilledButton } from '../Styles/mainStyles';
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SubHeader from './SubHeader';
import { ReactComponent as Rectangle } from '../Assets/Rectangle.svg';
import { useState } from 'react';
import UploadForm from '../Components/UploadForm';
const headersLables = ['Title', 'Decription', 'Date', 'File', 'Created at', 'Updated at'];

function AllArticles(props) {
  const allArticles = useSelector((state) => state.articles.articles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const setChosenArticleAndRedirect = (article) => {
    dispatch(articlesAction.setChosenArticle(article));
    handleOpenForm();
  };

  const deleteArticle = async (id) => {
    // FOR THE LADIES!
  };

  const convertTimestemp = (unixTimeStemp) => {
    const date = new Date(unixTimeStemp);
    console.log(date, typeof date);
    return 'HELLO';
    // format(new Date(date) , 'yy.MM.yyyy')
  };
  return (
    <>
      <UploadForm openForm={handleOpenForm} handleCloseForm={handleCloseForm} open={openForm} />
      <Grid container className={classes.pageGrid} justifyContent="center" alignItems="center">
        <Grid item xs={8} align="right">
          <FilledButton style={{ width: 37 }}>
            <AddCircleOutlineIcon fontSize="small" style={{ color: '#ffff' ,marginRight : 3}} /> New
          </FilledButton>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={2} align="center">
            <Rectangle />
          </Grid>
          <Grid item xs={9} align="center">
            <Typography className={classes.title}>All Articles</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} align="center" style={{ display: 'flex', justifyContent: 'center' }}>
          <TableContainer className={classes.tableContainer} style={{ width: '80%' }}>
            <StyledTable stickyHeader size="small" style={{ width: '100%' }}>
              <TableHead>
                <TableRow className={classes.tableRow} style={{ filter: 'none' }}>
                  {headersLables.map((header, idx) => {
                    return (
                      <TableCell style={{ borderBottom: 'none', backgroundColor: '#cccccc' }} key={idx}>
                        {header}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ borderBottom: 'none', backgroundColor: '#cccccc' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allArticles &&
                  allArticles.map((article, idx) => {
                    return (
                      <TableRow key={idx} className={classes.tableRow}>
                        <StyledTableCell>{article.title} </StyledTableCell>
                        <StyledTableCell>{article.description.slice(0, 10)} </StyledTableCell>
                        <StyledTableCell>{format(new Date(article.date * 1000), 'dd.MM.yyyy')} </StyledTableCell>
                        <StyledTableCell>{article.file} </StyledTableCell>
                        <StyledTableCell>{convertTimestemp(article.createdAt)} </StyledTableCell>
                        <StyledTableCell>{article.updatedAt} </StyledTableCell>
                        <StyledTableCell style={{ padding: '0px' }}>
                          <Grid container justiyContent="space-evenly">
                            <Grid item xs={4} align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                              <IconButton
                                size="small"
                                style={{ borderRadius: '50%' }}
                                /* 
                                  ! Think of Download the file
                               */
                              >
                                <InsertDriveFileIcon fontSize="small" style={{ color: '#548CFF' }} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                              <IconButton size="small" style={{ borderRadius: '50%' }} onClick={() => setChosenArticleAndRedirect(article)}>
                                <EditIcon fontSize="small" style={{ color: '#A3DA8D' }} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={4} align="left" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton size="small" style={{ borderRadius: '50%' }} onClick={() => deleteArticle(article.id)}>
                                <DeleteIcon fontSize="small" style={{ color: '#CD1818' }} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default AllArticles;

const StyledTable = withStyles(() => ({
  root: {
    borderCollapse: 'separate',
    borderSpacing: '0px 3px',
  },
}))(Table);

const StyledTableCell = withStyles((theme) => ({
  root: {
    color: '#000',
    fontSize: '14px',
    borderBottom: 'none',
    padding: '6px 16px 6px 16px',
  },
}))(TableCell);

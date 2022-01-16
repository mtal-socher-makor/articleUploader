import { Grid, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, IconButton, withStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as articlesAction from '../Redux/articleSlice/articleSlice';
import * as actionSnackBar from '../Redux/snackbarSlice/snackbarSlice';
import * as authAction from '../Redux/auth/action'
import { format } from 'date-fns';
import { useStyles, FilledButton , StyledTable , StyledTableCell} from '../Styles/mainStyles';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ReactComponent as Rectangle } from '../Assets/Rectangle.svg';
import { useState } from 'react';
import UploadForm from '../Components/UploadForm';
import { END_POINT, BASE_URL } from '../utils/constants';
import axios from 'axios';

const headersLables = ['Title', 'Decription', 'Date', 'File', 'Created at'];
const initStateForm = {
  title: "",
  description: "",
  date: new Date(),
  file: "",
};

function AllArticles() {
  const allArticles = useSelector((state) => state.articles.articles)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openForm, setOpenForm] = useState(false)
  const [newArticle, setNewArticle] = useState(false)

  const handleCloseForm = () => {
    console.log("handleCloseForm runs")
    setOpenForm(false);
    dispatch(articlesAction.setChosenArticle(initStateForm));
  };
  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const setChosenArticleAndRedirect = (article) => {
    dispatch(articlesAction.setChosenArticle(article))
    setNewArticle(false)
    handleOpenForm()
  }

  const deleteArticle = async (id) => {
    const res = await axios.delete(`${BASE_URL}${END_POINT.ARTICLE}/${id}`)
    if (res.status === 200) {
      dispatch(actionSnackBar.setSnackBarAction({ type: 'success', timeout: 3000, message: 'Article Deleted', visible: true }));
      dispatch(articlesAction.getAllArticlesAsync());
    }
  }

  const addNewArticle = () => {
    dispatch(articlesAction.clearChosenArticle())
    setNewArticle(true)
    handleOpenForm()
  }
  const handleLogout = () => {
    dispatch(authAction.logout())
  }
  const convertTimestemp = (dateStr) => {
    let timeStemp = new Date(dateStr)
    if (!isNaN(timeStemp.getMonth())) {
      return format(timeStemp, 'dd.MM.yyyy')
    }
    return 'N/A'
  }

  const showFile = (file_name) => {
    window.open(`https://files-website.enigma-securities.io/${file_name}`)
  }
  return (
    <>
      <Grid container justify='flex-end'>
        <Grid item>
          <FilledButton style={{  padding: '5px 12px 5px 12px ' }} onClick={handleLogout}>
            Logout <ExitToAppIcon />
          </FilledButton>
        </Grid>
      </Grid>

      <UploadForm openForm={handleOpenForm} handleCloseForm={handleCloseForm} open={openForm} newArticle={newArticle} />
      <Grid container className={classes.pageGrid} justifyContent='center' alignItems='center'>
        <Grid item xs={7} align='right'>
          <FilledButton style={{ width: 37 }} onClick={addNewArticle}>
            <AddCircleOutlineIcon fontSize='small' style={{ color: '#ffff', marginRight: 3 }} /> New
          </FilledButton>
        </Grid>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={2} align='center'>
            <Rectangle />
          </Grid>
          <Grid item xs={9} align='center'>
            <Typography className={classes.title}>All Articles</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} align='center' style={{ display: 'flex', justifyContent: 'center' }}>
          <TableContainer className={classes.tableContainer} style={{ width: '60%' }}>
            <StyledTable stickyHeader size='small' style={{ width: '100%' }}>
              <TableHead>
                <TableRow className={classes.tableRow} style={{ filter: 'none' }}>
                  {headersLables.map((header, idx) => {
                    return (
                      <TableCell style={{ borderBottom: 'none', backgroundColor: '#cccccc' }} key={idx}>
                        {header}
                      </TableCell>
                    )
                  })}
                  <TableCell style={{ borderBottom: 'none', backgroundColor: '#cccccc', textAlign: 'center', width: '100px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allArticles &&
                  allArticles.map((article, idx) => {
                    return (
                      <TableRow key={idx} className={classes.tableRow}>
                        <StyledTableCell style={{ minWidth: '55px' }}>{article.title.slice(0, 10)} </StyledTableCell>
                        <StyledTableCell>{article.description.slice(0, 10)} </StyledTableCell>
                        <StyledTableCell>{format(new Date(article.date), 'dd.MM.yyyy')} </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 415 }}>{article.file} </StyledTableCell>
                        <StyledTableCell>{convertTimestemp(article.createdAt)} </StyledTableCell>
                        <StyledTableCell style={{ padding: '0px' }}>
                          <Grid container justifyContent="space-evenly">
                            <Grid item xs={4} align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                              <IconButton size="small" style={{ borderRadius: '50%' }} onClick={() => showFile(article.file)}>
                                <InsertDriveFileIcon fontSize="small" style={{ color: '#548CFF' }} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={4} align='center'>
                              <IconButton size='small' style={{ borderRadius: '50%' }} onClick={() => setChosenArticleAndRedirect(article)}>
                                <EditIcon fontSize='small' style={{ color: '#A3DA8D' }} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={4} align='center' style={{ display: 'flex', justifyContent: 'center' }}>
                              <IconButton size='small' style={{ borderRadius: '50%' }} onClick={() => deleteArticle(article.id)}>
                                <DeleteIcon fontSize='small' style={{ color: '#CD1818' }} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default AllArticles


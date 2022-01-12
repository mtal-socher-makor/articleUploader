
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from "../Styles/mainStyles";

function SubHeader({ title }) {
  const classes = useStyles()
  return (
    <>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
          <Grid container justifyContent="center" alignItems>
              <Grid item xs={2} className={classes.blueShape} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SubHeader

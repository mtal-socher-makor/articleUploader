import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../Styles/mainStyles';
import { ReactComponent as Rectangle } from '../Assets/Rectangle.svg';

function SubHeader({ title }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6} align='cneter'style={{display : 'flex' , justifyContent: 'center', paddingBottom : 4 }}>
            <Rectangle/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SubHeader;

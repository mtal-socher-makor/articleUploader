import { Grid, makeStyles } from "@material-ui/core";
import { StyledTextField } from '../../Styles/formStyles';


function TextInputUnit({
  className,
  name,
  value,
  label,
  onChange,
  size = 12,
  error = null,
  id = null,
  inputProps = null,
  InputProps = null,
  onKeyDown = null,
  type = null

}) {

  const classes = useStyles();

  return (
    <Grid container className={className} style={{
      height: '57px',
    }}>
      <Grid item xs={size}>
        <StyledTextField
          className={classes.field}
          name={name}
          value={value}
          inputProps={{ autoComplete: "off" }}
          placeholder={label}
          onChange={onChange}
          style={{ width: "100%" }}
          variant="outlined"
          {...(error && { error: true, helperText: error })}
          {...(id && { id: id })}
          {...(type && { type: type })}
          {...(InputProps && { InputProps: InputProps })}
          {...(inputProps && { inputProps: inputProps })}
          {...(onKeyDown && { onKeyDown: onKeyDown })}
          {...(type && { type: type })}


        />
      </Grid>
    </Grid>
  );
}

export default TextInputUnit;

const useStyles = makeStyles({
  field: {
    // height:63.2
  }
})

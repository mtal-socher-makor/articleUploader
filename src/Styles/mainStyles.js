import { makeStyles, withStyles, Button, IconButton, TextField, Table, TableCell } from '@material-ui/core';

export const useStyles = makeStyles({
  blueShape: {
    backgroundColor: '#1C67FF',
    borderRadius: '8px',
    height: '12px',
    marginBottom: '10px',
  },
  title: {
    color: '#868DA2',
    fontSize: '24px',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#0909090d',
    filter: `drop-shadow(-2px 2px 4px #bababa)`,
    '& :first-child': {
      borderRadius: '4px 0 0 4px',
    },
    '& :last-child': {
      borderRadius: ' 0 4px 4px 0',
    },
  },
  pageGrid: {
    marginTop: '10%',
    margin: '0 auto',
  },
  tableContainer: {
    maxHeight: 440,
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#bababa',
      borderRadius: 8,
    },
    '&::-webkit-scrollbar-track-piece': {
      '&:start': {
        background: 'transparent',
        marginTop: '61px',
      },
      '&:end': {
        background: 'transparent',
        marginBottom: '5px',
      },
    },
  },
});

export const DeleteButton = withStyles({
  root: {
    padding: '6px',
    backgroundColor: '#EDEFF3',
    borderRadius: '50%',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6b6b6b33',
      transition: '.3s',
    },
    '&:disabled': {
      backgroundColor: '#6b6b6b',
    },
  },
})(IconButton);

export const FilledButton = withStyles({
  root: {
    padding: '7px 39px',
    backgroundColor: '#1C67FF',
    fontWeight: 400,
    fontSize: '16px',
    color: '#FFFFFF',
    borderRadius: '21px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0044CD',
      boxShadow: '0px 6px 10px #00185829',
      transition: '.3s',
    },
    '&.Mui-disabled': {
      backgroundColor: '#ACB1BF',
      color: '#868DA2',
    },
  },
})(Button);

export const StyledTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#EDEFF3',
      },
      '&:hover fieldset': {
        border: '1px solid #EDEFF3',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #EDEFF3',
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '11px',
      '&::placeholder': {
        color: '#868DA2',
        opacity: 1,
      },
    },

    '& .MuiInputLabel-outlined': {
      transform: 'translate(12px, 12px) scale(1)',
    },
  },
})(TextField);

export const StyledTable = withStyles(() => ({
  root: {
    borderCollapse: 'separate',
    borderSpacing: '0px 3px',
  },
}))(Table);

export const StyledTableCell = withStyles((theme) => ({
  root: {
    color: '#000',
    fontSize: '14px',
    borderBottom: 'none',
    padding: '6px 16px 6px 16px',
  },
}))(TableCell);

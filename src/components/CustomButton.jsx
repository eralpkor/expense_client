import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    boxShadow: 'none',
    alignItems: 'center',
    backgroundImage: 'none',
    border: '1px solid #7d8b8f',
    '&:hover': {
      // backgroundColor: '#0069d9',
      border: '2px solid #0185ff',
      // boxShadow: 'none',
    },
    borderRadius: '8px',
    color: '#fff !important',
    background: '#0b1b34',
    fontWeight: '700',
    height: '52px',
    overflow: 'hidden',
    position: 'relative',
    // textAlign: 'left',
    float: 'left',
    // fontFamily: 'GT-America-Standard,"Helvetica Neue",Helvetica,Arial,sans-serif',
    cursor: 'pointer',
    marginBottom: '15px!important',
    padding: '.5rem 1rem',
  },
  
  icon: {
    right: '12px',
    color: '#0185ff',

  },
  link: {

  }
})

export default function CustomButton({ children,  ...props}) {
  const styles = useStyles();

  return(
    <button
      className={styles.root}
      {...props}
    >
      {children || 'button'}
    </button>
  );
}
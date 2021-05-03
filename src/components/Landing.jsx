import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import brand from '../images/brand_2020.jpg';
let icon = "https://d2k5nsl2zxldvw.cloudfront.net/images/icons/sign-in/expensify-logo-2021-reversed.svg"

const useStyles = makeStyles(() => ({
  root: {
    color: '#fff',
    height: '100%'
  },
  homepageBackgroundContainer: {
    width: 'calc(100% - 400px)',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    right: '0',
    top: '0',
  },
  backgroundImage: {
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  homepageBackgroundFade: {
    backgroundImage: 'linear-gradient(180deg,rgba(11,27,52,0) 0,#0b1b34 100%)',
    bottom: '0',
    height: '560px',
    position: 'absolute',
    right: '0',
    width: '100%',
  },
  signupTextContent: {
    bottom: '0',
    color: '#fff',
    padding: '0 80px 60px',
    position: 'absolute',
    right: '0',
    textAlign: 'left',
    width: '100%',
    zIndex: '2',
  },
  hr: {
    background: 'white',
    border: 'none',
    display: 'inline-block',
    height: '4px',
    margin: '0 0 14px',
    width: '34px',
    marginTop: '2rem',
  },
  signupSidepane: {
    width: '400px',
    background: '#0b1b34',
    height: '100%',
    padding: '90px 50px 0',
    position: 'relative',
  },
  signupSidepane__logo: {
    display: 'block',
    margin: 'auto',
    position: 'relative',
    width: '125px',
    textAlign: 'center',
  },
  signupControls: {
    margin: 'auto',
    marginTop: '32px',
  }
}))

export default function LandingPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div class={styles.signupSidepane}>
        <div class={styles.signupSidepane__logo}>
          <img src={icon} alt="expense report" />
        </div>
          <div class={styles.signupControls}>
            <div class="signin-flow">
              <div class="d-flex flex-column">
                <div class="d-flex concierge mb-4"></div>
                <div class="mb-4 text-break">
                  Welcome! How would you like to connect?
                </div>
                <button id="js_click_showEmailForm" class="btn btn-lg btn-white my-2 signup-option__icon signup-option__icon-email" type="button">Continue with Email</button>
                <button id="js_click_showSmsForm" class="btn btn-lg btn-white my-2 signup-option__icon signup-option__icon-mobile">Continue with Phone Number</button>
                <button id="js_click_googleSignIn" class="btn btn-lg btn-white my-2 signup-option__icon signup-option__icon-google">Continue with Google</button>
              </div>
              <div class="signup-sidepane__footer text-center">
                <small class="form-text text-muted">By logging in, you agree to our <a href="#" target="_blank">terms of service</a> and <a href="#" target="_blank">privacy policy</a>.</small>
                <small class="form-text text-muted d-none d-md-block">Money transmission is provided by Expensify Payments LLC (NMLS ID:2017010) pursuant to its <a href="#" target="_blank">licenses</a>.</small>
            </div>
          </div>
        </div>
      </div>



      <div className={styles.homepageBackgroundContainer}>
        <img className={styles.backgroundImage} src={brand} alt='woman with motorcycle helmet' />
        <div className={styles.homepageBackgroundFade}></div>
        <div class={styles.signupTextContent}>
          <Typography variant="h3" component="h2">
          You weren't born 
            <br></br>
            to do expenses.
          </Typography>
          <hr class={styles.hr}></hr>
          <p class="primary-line mb-1"></p>
          <p class="mb-0"></p>
        </div>
      </div>
    </div>
  )
}
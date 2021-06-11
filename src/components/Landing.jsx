import React, {  useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from "@material-ui/core/Typography";
import NiceButton from "./CustomButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Landing.css";
import CircularLoading from "../utils/Loading";

import SignIn from "./SignIn";

import brand from "../images/brand_2020.jpg";
import brand2 from "../images/expensify-brand__billpay.jpg";
import brand3 from "../images/card-cascade--blue.svg";
import brand4 from "../images/chicks.jpg";
// const icon = "https://d2k5nsl2zxldvw.cloudfront.net/images/icons/sign-in/expensify-logo-2021-reversed.svg";
const icon__new =
  "https://d2k5nsl2zxldvw.cloudfront.net/images/logo/expensify-iconmark-reversed.svg";


const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    background: "#0b1b34",
    height: "100%",
  },
  homepageBackgroundContainer: {
    width: "calc(100% - 400px)",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    right: "0",
    top: "0",
    opacity: 0,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  backgroundImage: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  homepageBackgroundFade: {
    backgroundImage: "linear-gradient(180deg,rgba(11,27,52,0) 0,#0b1b34 100%)",
    bottom: "0",
    height: "560px",
    position: "absolute",
    right: "0",
    width: "100%",
  },
  signupTextContent: {
    bottom: "0",
    color: "#fff",
    padding: "0 80px 60px",
    position: "absolute",
    right: "0",
    textAlign: "left",
    width: "100%",
    zIndex: "2",
  },
  hr: {
    background: "white",
    border: "none",
    display: "inline-block",
    height: "4px",
    margin: "0 0 14px",
    width: "34px",
    marginTop: "2rem",
  },
  signupSidepane: {
    width: "400px",
    background: "#0b1b34",
    height: "100%",
    padding: "90px 50px 0",
    position: "absolute",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      // backgroundColor: 'white'
    }
    
  },
  signupSidepane__logo: {
    display: "block",
    // margin: "auto",
    position: "relative",
    width: "52px",
    // textAlign: "center",
    "& img": {
      width: "54px",
    },
  },
  signupControls: {
    // margin: "auto",
    marginTop: "32px",
    maxWidth: "300px",
  },
  signinFlow: {
    display: "flex",
    flexDirection: "column",
  },
  concierge: {
    display: "flex",
    marginBottom: "1.5rem",
  },
  textBreak: {
    wordBreak: "break-word !important",
    overflowWrap: "break-word !important",
    fontSize: "0.8rem",
    marginBottom: "32.5px",
    fontWeight: "500",
  },
  span: {
    float: "left",
  },
  arrow: {
    fontSize: 20,
    color: "#0185ff",
    right: "12px",
    float: "right",
    position: "absolute",
  },
  signupSidepane__footer: {
    fontSize: "0.8rem",
    padding: "0 30px 20px",
    bottom: 0,
    left: 0,
    position: "absolute",
    width: "400px",
    textAlign: "center",
    color: "#6c757d !important",
  },
  showing: {
    opacity: 1,
    zIndex: 2,
  }
}));

// window.addEventListener('resize', () => {
//   let viewport_width= window.innerWidth;
//   let viewport_height = document.documentElement.clientHeight;

//   console.log(viewport_width);
// });
var viewport_width = document.documentElement.clientWidth;

export default function LandingPage(props) {
  const [showDiv, setShowDiv] = useState(true);
  const styles = useStyles();

 

  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));
  let slideIndex = 0;
  const slides = document.getElementsByClassName(styles.homepageBackgroundContainer);

  useEffect(() => {
    if (viewport_width >= 960) {
      let interval = setInterval(() => showSlides(), 12000);
      return () => clearInterval(interval);
    }
  }, [viewport_width]);
  
  const showSlides = () => {
    slides[slideIndex].className = `${styles.homepageBackgroundContainer}`;
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].className = `${styles.homepageBackgroundContainer} ${styles.showing} fade`
  }

  const displaySignin = (e) => {
    console.log(!showDiv);
    setShowDiv(!showDiv)
    
    // console.log('Hello world');
  }

  let activeDiv;
  showDiv ? activeDiv = (<div style={{width: '200px', height:'300px', background: 'black', color: 'white'}}><h1>HeLLO</h1></div>) :
  activeDiv = (<div style={{width: '200px', height:'300px', background: 'blue', color: 'yellow'}}><h1>Good bye...</h1></div>)

  return (
    <div className={styles.root}>
      <div className={`${styles.signupSidepane}`}>
        <div className="signup-sidepane__inner">
          <div className={styles.signupSidepane__logo}>
            <img src={icon__new} alt="expense report" />
          </div>
          <div className={`${styles.signupControls}`}>
            <div className="signin-flow">
              <div className={styles.signinFlow}>
                <div className={styles.concierge} m={4}></div>
                <div className={styles.textBreak}>
                  Welcome! How would you like to connect?
                </div>
                {/* {
                    activeDiv
                  } */}
                <NiceButton onClick={() => setShowDiv(!showDiv)}>
                  <span className={styles.span}>Email</span>
                  <ArrowForwardIosIcon className={styles.arrow} />
                </NiceButton>
                <NiceButton>
                  <span className={styles.span}>Phone Number</span>
                  <ArrowForwardIosIcon className={styles.arrow} />
                </NiceButton>
                <NiceButton>
                  <span className={styles.span}>Google</span>
                  <ArrowForwardIosIcon className={styles.arrow} />
                </NiceButton>
                <NiceButton>
                  <span className={styles.span}>Apple</span>
                  <ArrowForwardIosIcon className={styles.arrow} />
                </NiceButton>
                <div
                  id="loading"
                  className="spinner spinner-xl spinner--light hidden"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.signupSidepane__footer}>
          <div className="signup-sidepane__footer-logo">
            <img
              className="logo_image"
              src="https://d2k5nsl2zxldvw.cloudfront.net/images/icons/sign-in/expensify-logo-2021-reversed.svg"
              alt="Expensify"
            />
          </div>
          <small className="form-text text-muted">
            By logging in, you agree to our{" "}
            <a href="#" target="_blank">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" target="_blank">
              privacy policy
            </a>
            .
          </small>
          <small className="form-text text-muted d-none d-md-block">
            Money transmission is provided by Expense Tracker LLC (NMLS
            ID:2017010) pursuant to its{" "}
            <a href="#" target="_blank">
              licenses
            </a>
            .
          </small>
        </div>
      </div>

      {/* right side pane */}
      {/* first image */}
      <div className={`${styles.homepageBackgroundContainer} ${styles.showing} fade`}>
        <img
          className={`${styles.backgroundImage} `}
          src={brand}
          alt="woman with motorcycle helmet"
        />
        <div className={styles.homepageBackgroundFade}></div>
        <div className={styles.signupTextContent}>
          <Typography variant="h3" component="h2">
            You weren't born
            <br></br>
            to do expenses.
          </Typography>
          <hr className={styles.hr}></hr>
          <p className="primary-line mb-1"></p>
          <p className="mb-0"></p>
        </div>
      </div>
      {/* second image */}
      <div className={`${styles.homepageBackgroundContainer}`}>
        <img
          className={`${styles.backgroundImage} `}
          src={brand2}
          alt="two business women"
        />
        <div className={styles.homepageBackgroundFade}></div>
        <div className={styles.signupTextContent}>
          <Typography variant="h4" component="h4">
            Now you can pay bills in Expense Tracker.
          </Typography>
          <hr className={styles.hr}></hr>
          <p className="primary-line mb-1"></p>
          <p className="mb-0"></p>
        </div>
      </div>
      {/* third image */}
      <div className={`${styles.homepageBackgroundContainer} `}>
        <img
          className={`${styles.backgroundImage} `}
          src={brand3}
          alt="expense tracker card"
        />
        <div className={styles.homepageBackgroundFade}></div>
        <div className={styles.signupTextContent}>
          <Typography variant="h3" component="h2">
            Easy money.
          </Typography>
          <hr className={styles.hr}></hr>
          <p className="primary-line mb-1"></p>
          <p className="mb-0"></p>
        </div>
      </div>
      {/* fourth image */}
      <div className={`${styles.homepageBackgroundContainer} `}>
        <img
          className={`${styles.backgroundImage} `}
          src={brand4}
          alt="bunch of chicks"
        />
        <div className={styles.homepageBackgroundFade}></div>
        <div className={styles.signupTextContent}>
          <Typography variant="h3" component="h2">
            Watch your money grow.
          </Typography>
          <hr className={styles.hr}></hr>
          <p className="primary-line mb-1"></p>
          <p className="mb-0"></p>
        </div>
      </div>
    </div>
  );
}

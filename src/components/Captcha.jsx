import ReCAPTCHA from "react-google-recaptcha";



export default function ReCaptcha() {
  const onChange = (value) => {
    console.log("Captcha value:", value);
  }

  return (
    <ReCAPTCHA
      sitekey="Your client site key"
      onChange={onChange}
    />
  )
}

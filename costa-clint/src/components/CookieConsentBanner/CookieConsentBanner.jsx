import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="siteCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#fff", fontSize: "14px", backgroundColor: "#4CAF50" }}
      expires={365} 
    >
      We use cookies to improve your experience. By continuing, you agree to our{" "}
      <a href="/privacy-policy" style={{ color: "#FFD700", textDecoration: "underline" }}>
        Privacy Policy
      </a>.
    </CookieConsent>
  );
};

export default CookieConsentBanner;

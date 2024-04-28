import "./footer.css";

import { default as LinkedInIcon } from "../icons/linkedin.tsx";
import { default as GitHubIcon } from "../icons/github.tsx";
import { default as EmailIcon } from "../icons/email.tsx";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-copyrights">© 2024 Daniel Attali all rights reserved</p>
      <ul className="footer-links">
        <h2>Contact Me</h2>
        <li className="footer-link">
          <LinkedInIcon className="footer-icon" />
          <a href="linkedin.com/in/daniel-attali-3885a1209" target="_blank">
            LinkedIn
          </a>
        </li>
        <li className="footer-link">
          <GitHubIcon className="footer-icon" />
          <a href="https://www.github.com/dattali18/" target="_blank">
            GitHub
          </a>
        </li>
        <li className="footer-link">
          <EmailIcon className="footer-icon" />
          <a href="mailto: danielattali16@gmail.com" target="_blank">
            Mail
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

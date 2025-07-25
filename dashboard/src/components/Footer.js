export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="FooterContent">
        <img src="https://www.pyramidautomation.com/resources/assets/img/logo-01.png" alt="Pyramid Automation Logo" className="logo-img"/>
        <p className="RightsText">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Footer = () => {
  return (
    <footer style={styles}>Copyright {new Date().getFullYear()} &copy;</footer>
  );
};

const styles = {
  color: "var(--white-color)",
  fontSize: "21px",
  backgroundColor: "var(--blue-color)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "50px",
};

export default Footer;

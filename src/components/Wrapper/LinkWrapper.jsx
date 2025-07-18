import { Link } from "react-router";

const LinkWrapper = ({ children, path, className }) => {
  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
};

export default LinkWrapper;

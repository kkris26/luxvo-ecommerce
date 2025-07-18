import { Link } from "react-router";

const LinkWrapper = ({ children, path }) => {
  return (
    <Link to={path} className="flex font-extralight">
      {children}
    </Link>
  );
};

export default LinkWrapper;

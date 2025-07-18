import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardPage = () => {
  const { userLogin, loadUserLogin } = useContext(AuthContext);
  return <div>Welcome {loadUserLogin ? "Loading .." : userLogin?.profile?.fullName}</div>;
};

export default DashboardPage;

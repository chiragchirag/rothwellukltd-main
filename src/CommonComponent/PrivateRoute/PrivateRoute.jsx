
import { useDispatch } from "react-redux";
import isTokenValid from "../../Utils/Token";
import { AuthContainer } from "../../pages";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const TOKEN = dispatch(isTokenValid());
  return TOKEN ? children : <AuthContainer />;
};

export default PrivateRoute;

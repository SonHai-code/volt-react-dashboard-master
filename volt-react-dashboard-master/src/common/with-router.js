import { React } from "react";
import { useHistory, useParams } from "react-router-dom";

export const withRouter = ({ component: Component }) => {
  function ComponentWithRouterProp(props) {
    let history = useHistory();
    // let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ history, params }} />;
  }

  return ComponentWithRouterProp;
};

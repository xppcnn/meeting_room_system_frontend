import { Link, Outlet } from "react-router-dom";
const BaseLayout = () => {
  return (
    <div>
      <div>
        <Link to="/aaa">to aaa</Link>
      </div>
      <div>
        <Link to="/bbb">to bbb</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;

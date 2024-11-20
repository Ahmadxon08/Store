import { Link } from "react-router-dom";
import "./NotFound.scss";
// Video faylni import qilish

const NotFound = () => {
  return (
    <section className="notfound">
      <h1>Page not found</h1>
      <p>Sorry, but the page you are looking for does not exist.</p>
      <Link to="/">Go back to the home page</Link>
    </section>
  );
};

export default NotFound;

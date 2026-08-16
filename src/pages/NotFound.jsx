import { Link } from "react-router-dom";

const NotFound = () => <main className="not-found-page"><div><p className="not-found-page__code">404</p><h1>That page has moved on</h1><p>The address does not point to a page in Bugsy.</p><Link className="bugsy-btn bugsy-btn--primary" to="/">Go home</Link></div></main>;

export default NotFound;

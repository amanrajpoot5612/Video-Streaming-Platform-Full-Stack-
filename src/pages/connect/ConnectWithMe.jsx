import { ArrowRight } from "lucide-react";
import { createElement } from "react";
import connectOptions from "../../context/connectOptions";

const ConnectWithMe = () => (
  <section className="connect-page" aria-labelledby="connect-title">
    <header className="connect-page__head"><span className="bugsy-eyebrow">Community</span><h1 id="connect-title">Connect with the creator</h1><p>Share feedback, discuss a collaboration, or follow the work behind Bugsy.</p></header>
    <div className="connect-grid">{connectOptions.map(({ icon, title, description, link, linkText }) => <article className="connect-card" key={title}><div className="connect-card__icon">{createElement(icon, { size: 21 })}</div><h2>{title}</h2><p>{description}</p><a href={link} target="_blank" rel="noreferrer">{linkText}<ArrowRight size={15} /></a></article>)}</div>
  </section>
);

export default ConnectWithMe;

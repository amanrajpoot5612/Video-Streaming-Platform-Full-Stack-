import {
  Award,
  Heart,
  History,
  Home,
  Info,
  MonitorPlay,
  Newspaper,
  Settings,
  Tv,
  UserRound,
  UsersRound,
  Video,
  Waypoints,
} from "lucide-react";
import { createElement } from "react";
import { NavLink } from "react-router-dom";

const discoverItems = [
  { name: "Home", link: "/", icon: Home, end: true },
  { name: "Movies", link: "/movies", icon: MonitorPlay },
  { name: "News", link: "/news", icon: Newspaper },
  { name: "Sports", link: "/sports", icon: Award },
  { name: "Trending", link: "/trending", icon: Waypoints },
  { name: "Music", link: "/music", icon: Tv },
];

const libraryItems = [
  { name: "History", link: "/history", icon: History },
  { name: "Liked", link: "/liked", icon: Heart },
  { name: "Subscriptions", link: "/subscription", icon: UsersRound },
  { name: "Create", link: "/upload-video", icon: Video },
];

const utilityItems = [
  { name: "Settings", link: "/settings", icon: Settings },
  { name: "Connect", link: "/help", icon: UserRound },
  { name: "About", link: "/showcase", icon: Info },
];

const MenuGroup = ({ heading, items, footer = false }) => (
  <section className={`app-sidebar__group${footer ? " app-sidebar__group--footer" : ""}`}>
    {heading && <p className="app-sidebar__heading">{heading}</p>}
    <ul className="app-sidebar__nav">
      {items.map(({ name, link, icon, end }) => (
        <li key={name}>
          <NavLink
            to={link}
            end={end}
            className={({ isActive }) => `app-sidebar__item${isActive ? " is-active" : ""}`}
          >
            {createElement(icon, { size: 20, strokeWidth: 1.9, "aria-hidden": true })}
            <span className="app-sidebar__label">{name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </section>
);

const Sidebar = () => (
  <aside className="app-sidebar" aria-label="Primary navigation">
    <MenuGroup heading="Discover" items={discoverItems} />
    <MenuGroup heading="You" items={libraryItems} />
    <MenuGroup items={utilityItems} footer />
  </aside>
);

export default Sidebar;

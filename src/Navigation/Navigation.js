import { NavLink } from 'react-router-dom';
import s from '../Navigation/Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={s.link}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link}>
        Movies
      </NavLink>
    </nav>
  );
}

import Search from './Search';
import Logo from './Logo';
import NumResults from './NumResults';
export default function Navbar() {

  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  )
}



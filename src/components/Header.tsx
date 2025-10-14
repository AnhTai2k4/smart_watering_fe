import "./Header.css"

function Header() {
  return (
    <header className="header">
      <div className="logo_group">
        <img src="/Tree.png" alt="Tree" className="picture" />
        <h1 className="logo">Smart Sprout</h1>
      </div>

      <nav className="notiandvery">
        <img src="/Bell.png" />
        <img src="/User.png" />
      </nav>
    </header>
  )
}

export default Header

import React from "react";

function NavHeader() {
  const user = localStorage.getItem("token");

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  }

    return (
        <nav className="nav">
          <ul className="ul-nav">
            {!user && 
              <><li className="item"><a href="/signin">Sign In</a></li>
              <li className="item"><a href="/signup">Sign Up</a></li></>}
            {user &&
            <><li className="item"><a onClick={Logout} href={'/'}>Sign Out</a></li>
            <li className="item"><a href="/create-list">Create List</a></li></>}
            
            <li className="item"><a href="/lists">Lists</a></li>
          </ul>
        </nav>
    )
}

export default NavHeader;
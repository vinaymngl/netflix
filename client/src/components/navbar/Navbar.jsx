import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Notifications } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import React from 'react';
import "./navbar.scss"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt="logo" />
          <Link to="/" className='link'>
            <span>HomePage</span>
          </Link>

          <Link to="/series" className='link'>
            <span>Series</span>
          </Link>
          <Link to = '/movies' className='link'>
            <span>Movies</span>
          </Link>
          <span>News and List</span>
          <span>My list</span>
        </div>
        <div className="right">
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <span>KID</span>
          <FontAwesomeIcon icon={faBell} className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <FontAwesomeIcon icon={faCaretDown} className="icon" />
            <div className='options'>
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Navbar

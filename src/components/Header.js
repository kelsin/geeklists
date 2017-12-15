import './Header.scss';
import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Nav from './Nav';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {navOpen: false};
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
  }

  render() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <NavLink exact to="/" className="header__site-name">Geeklist Stat Analyzer</NavLink>
          <Route path="/" render={()=>(<Nav open={this.state.navOpen}/>)} />
          <button onClick={this.toggleNav} className="header__toggle-nav"><span className="fal fa-bars"></span> <span className="sr-only">Menu</span></button>
        </div>
      </header>
    )
  }
}



export default Header;
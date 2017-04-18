import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import routes from '../routes';
import styles from './Header.css';

const Header = () => (
  <header styleName="styles.Header">
    <h1>
      Movie Things?
    </h1>
    <nav>
      <ul>
        <NavLink activeClassName={styles.active} to="/venn">Venn</NavLink>
      </ul>
    </nav>
  </header>
);


export default Header;

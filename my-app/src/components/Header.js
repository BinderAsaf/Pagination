import React, { Component } from 'react';
import {styles} from '../styles';



export class Header extends Component {
  
  
  render() {
    return (
      <header style={styles.HeaderStyle}>
        <h1 style={styles.H1Style}    >Users Management Tool</h1>
        <h3  style={styles.SubHeaderStyle} >All users</h3>
      </header>
    
    )
  }
}

export default Header;



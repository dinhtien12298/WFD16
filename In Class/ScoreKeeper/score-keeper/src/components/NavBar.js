import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
        <div style={{ borderBottom: "1px #cecece solid" }}>
            <nav>
                <a href="/">Score Keeper</a>
            </nav>
        </div>
    )
  }
}

export default NavBar;
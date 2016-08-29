import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import PageBody from './page_body';
export default class App extends Component {
  render() {
    return (
      <div className="flex-container">
      	<Header clasName="header"/>
      	<PageBody className="main"/>
      	<Footer className="footer"/>
      </div>
    );
  }
}

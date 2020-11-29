import React, {
    useState, useEffect, useRef
  } from 'react';
  import './Frontpage.css';

  import {
    useHistory,
    useParams,
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom";

import formImage from './formimage.png';

const Frontpage = (props) => {
    const history = useHistory();
    return(
        <div className="main-container">
            <header>
                <h1 className="logo-big">Form<span className="logo-small">survway</span></h1>
            </header>
            <div className="main-content">
        <div className="left-content">
            <h1 className="white-header">Create free <span class="surveys-text">surveys</span></h1>
            <h1 className="white-header">and collect data!</h1>
            <button className="create-button" onClick={() => history.push('/')}>Create survey</button>
        </div>
        <div className="right-content">
            <img className="image" src={formImage} alt=""/>
        </div>
            </div>
            <footer>
                <p>Easily get the answers you need.</p>
                <Link className="linkki no-margin" to="/">{"Start now."}</Link>
                <p className="light-blue">Form<span className="logo-small">survway</span></p>
            </footer>
        </div>
    )
}
export default Frontpage;
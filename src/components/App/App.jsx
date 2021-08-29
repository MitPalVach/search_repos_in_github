import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Card from "../Card/Card";


const App = () => {
    return (
        <BrowserRouter>
            <div className={'container'}>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/card/:username/:reponame' component={Card}/>
                    <Route path='/error' component={Error}/>
                    <Redirect to={Main}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
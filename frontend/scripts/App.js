import { Component } from '../modules/Onion/index.js';
import { Router, Routes, Route } from '../modules/onion-router/index.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';

export default class App extends Component
{
    render()
    {
        return String.raw`
            <div className=${Router.name}>
                <div class="d-flex justify-content-center flex-column align-items-center vh-100">
                    <div className=${Routes.name}>
                        <div className=${Route.name} exact path="/" component=${Login.name}></div>
                        <div className=${Route.name} path="/login" component=${Login.name}></div>
                        <div className=${Route.name} path="/home" component=${Home.name}></div>
                    </div>
                </div>
            </div>
        `;
    }
}
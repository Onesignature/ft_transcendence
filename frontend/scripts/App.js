import { Component } from '../modules/onion/index.js';
import { Router, Routes, Route } from '../modules/onion-router/index.js';
import Login from './pages/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import MainMenu from './pages/MainMenu.js';

export default class App extends Component
{
    render()
    {
        return String.raw`
            <div className=${Router.name}>
                <div class="d-flex justify-content-center flex-column align-items-center vh-100">
                    <div className=${Routes.name}>
                        <div className=${Route.name} path="/login" component=${Login.name}></div>
                        <div className=${ProtectedRoute.name} path="/home" component=${MainMenu.name}></div>
                        <div className=${ProtectedRoute.name} path="/" component=${MainMenu.name}></div>
                    </div>
                </div>
            </div>
        `;
    }
}
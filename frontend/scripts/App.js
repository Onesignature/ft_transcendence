import { Component } from '../modules/Onion/index.js';
import TwoFactorAuth from './pages/2FA.js';
import Login from './pages/Login.js';
import MainMenu from './pages/MainMenu.js';
import PopUpTournament from './pages/PopUpTournament.js';
import Winner from './pages/Winner.js';
import Loser from './pages/Loser.js';
import TournamentHistory from './pages/TournamentHistory.js';
import PopUpConfirmation from './components/PopUpConfirmation.js';

export default class App extends Component
{
    constructor(props, context)
    {
        super(props, context);
        console.log('app constructor');
    }

    onMount()
    {
        console.log('app mounted');
    }

    // shouldComponentUpdate(nextProps, nextState)
    // {
    //     console.log('-------- shouldComponentUpdate');
        
    //     console.log(`prevProps:`);
    //     console.log(this.props);
    //     console.log(`prevState:`);
    //     console.log(this.state);
        
    //     console.log(`nextProps:`);
    //     console.log(nextProps);
    //     console.log(`nextState:`);
    //     console.log(nextState);

    //     return true;
    // };

    // onPreUpdate(prevProps, prevState)
    // {
    //     console.log('-------- preUpdate');
        
    //     console.log(`prevProps:`);
    //     console.log(prevProps);
    //     console.log(`prevState:`);
    //     console.log(prevState);

    //     console.log(`currProps:`);
    //     console.log(this.props);
    //     console.log(`currState:`);
    //     console.log(this.state);
    // }

    // onUpdate()
    // {
    //     console.log('update');
    // }

    // onUnmount()
    // {
    //     console.log('unmounted');
    // }

    render()
    {
        return String.raw`
            <div class="d-flex justify-content-center flex-column align-items-center vh-100">
                <div className=${TournamentHistory.name}></div>
            </div>
        `;
    }
}
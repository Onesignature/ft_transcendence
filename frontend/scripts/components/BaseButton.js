import {Component} from '../../modules/onion/index.js';
import ExampleClass from './ExampleClass.js';

export default class BaseButton extends Component {

    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return String.raw`
            ${ExampleClass}
        `;
    }

    // render()
    // {
    //     return String.raw`
    //         <link rel="stylesheet" href="./styles/BaseButton.css">
    //         <button class="base-button" >Test</button>
    //     `;
    // }
}
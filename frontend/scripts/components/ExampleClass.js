import {Component} from '../../modules/onion/index.js';

export default class ExampleClass extends Component {

    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return String.raw`
            <h1>${this.props.key}</h1>
        `;
    }
}
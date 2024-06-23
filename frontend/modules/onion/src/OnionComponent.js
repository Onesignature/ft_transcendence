function Component(props, context)
{
    this.props = props;
    this.context = context;
}

//Mount Phase
Component.prototype.onMount = function(){};

//Update Phase
Component.prototype.shouldComponentUpdate = function(nextProps, nextState)
{
    return true;
};

Component.prototype.onPreUpdate = function(prevProps, prevState){};

Component.prototype.onUpdate = function(prevProps, prevState){};

Component.prototype.render = function(){};

//Unmount Phase
Component.prototype.onUnmount = function(){};

//Hooks
Component.prototype.setState = function (partialState, callback)
{
    if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState != null)
        throw new Error('takes an object of state variables to update or a function which returns an object of state variables.');

    // if (!this._onionInternals.parent)
    //     throw new Error(`updating state on an unmounted component: ${this._onionInternals.elementType}`);
    
    const onStateChangeEvent = new CustomEvent('component.stateChange', {
        detail: {
            instance: this,
            props: this.props,
            state: Object.assign({}, this.state, partialState),
            callback: callback
        }
    });

    document.dispatchEvent(onStateChangeEvent);
};

export { Component };
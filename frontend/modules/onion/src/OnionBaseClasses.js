function Component(props, context) {
    this.props = props;
    this.context = context;
}

Component.prototype.onEnable = function(){};

Component.prototype.onDisable = function(){};

Component.prototype.render = function(){};

Component.prototype.getContext = function()
{
    return this.context;
};

export {Component};
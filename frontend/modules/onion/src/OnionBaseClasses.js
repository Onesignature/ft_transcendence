function Component(props, context) {
    this.props = props;
    this.context = context;
}

Component.prototype.onEnable = function(){};

Component.prototype.onDisable = function(){};

Component.prototype.render = function(){};

export {Component};
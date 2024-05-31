function Component(props, context) {
    this.props = props;
    this.context = context;
}

Component.prototype.onEnable()
{}

Component.prototype.onUpdate(prevProps, prevState)
{}

Component.prototype.onDisable()
{}

Component.prototype.render()
{
    // return documnet.getHTML("./mainMenu.html");
}

Component.prototype.shouldComponentUpdate()
{
    return true;
}

Component.prototype.shouldComponentUpdate()
{}

exports.Component = Component;
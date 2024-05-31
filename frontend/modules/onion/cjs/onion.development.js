'use strict';

(function() {

    'use strict';

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
    {}

    Component.prototype.shouldComponentUpdate()
    {
        return true;
    }

    Component.prototype.shouldComponentUpdate()
    {}

    exports.Component = Component;

})();
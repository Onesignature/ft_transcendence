import { TEXT_NODE } from "../../onion-dom/shared/HTMLNodeType.js";

let instanceId = 0; // Generate unique instance id

const generateId = () =>
{
    return instanceId += 1;
}
    
export function createClassComponent(className, options)
{
    const ComponentClass = window[className];
    if (!ComponentClass)
    {
        throw new Error(`Class ${className} not found, please make sure the class in registed in global-setup.js`);
    }

    let children = getChildrenOuterHTML(options.children);
    
    let context = {};
    let props = {instanceId: generateId(), children: children};
    
    const instance = new ComponentClass(props, context);
    instance.props = instance.props ? Object.assign({}, instance.props, props) : props;
    instance.outerHTML = options.element.outerHTML;
    
    return instance;
}

function getChildrenOuterHTML(children)
{
    return Array.from(children, element => 
        element.nodeType === TEXT_NODE ? element.textContent : element.outerHTML
    );
}
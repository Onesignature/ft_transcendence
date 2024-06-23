let instanceId = 0; // Generate unique instance id

const generateId = () =>
{
    return instanceId += 1;
}
    
export function createClassComponent(node, className)
{
    const ComponentClass = window[className];
    if (!ComponentClass)
    {
        throw new Error(`Class ${className} not found, please make sure the class in registed in global-setup.js`);
    }
    
    let context = {};
    let props = {instanceId: generateId()};
    
    const instance = new ComponentClass(props, context);
    instance.children = getChildrenOuterHTML(node.children);
    instance._onionInternals = node;
    
    return instance;
}

export function mountClassComponent(node)
{

}

export function unmountClassComponent(node)
{
    
}

function getChildrenOuterHTML(children)
{
    return Array.from(children, element => element.outerHTML);
}
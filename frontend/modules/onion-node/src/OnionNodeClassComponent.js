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
    instance.outerHTML = options.element.outerHTML;
    
    return instance;
}

function getChildrenOuterHTML(children)
{
    return Array.from(children, element => element.outerHTML);
}
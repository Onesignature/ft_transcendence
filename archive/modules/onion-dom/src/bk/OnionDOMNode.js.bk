// Generate unique instance id
let instanceId = 0;

function OnionDOMNode()
{
}

export async function createNodeList(root)
{    
    const components = [root];
    const rawHTML = await root.render();
    const childComponents = componentParser(rawHTML);

    if (childComponents == null || childComponents.length == 0)
        return components;
    
    const classComponents = createClassComponents(childComponents);
    
    await Promise.all(classComponents.map(async (instance) =>
    {
        let instanceComponents = await createNodeList(instance);
        components.push(...instanceComponents);
    }));
    
    return components;
}

const componentParser = (rawHTML) =>
{
    const divRegex = /<div\s+([^>]+)\/>/g;
    const attrRegex = /(\w+)="([^"]+)"/g;

    let match;
    const components = [];

    while ((match = divRegex.exec(rawHTML)) !== null)
    {
        const attributes = match[1];
        const component = {};
        let attrMatch;

        while ((attrMatch = attrRegex.exec(attributes)) !== null)
        {
            const [ , propName, propValue] = attrMatch;
            if (propName === 'classname')
            {
                component.className = propValue;
            }
            else
            {
                component[propName] = propValue;
            }
        }

        components.push(component);
    }

    return components;
};

const generateId = () =>
{
    return instanceId += 1;
};

function createClassComponents(components)
{
    const classComponents = [];
    
    components.forEach(({ className, ...props }) =>
    {
        const ComponentClass = window[className];
        if (!ComponentClass)
        {
            throw new Error(`Class ${className} not found, please make sure the class in registed in global-setup.js`);
        }
    
        const instance = new ComponentClass({ instanceId: generateId(), ...props }, 'context');
        classComponents.push(instance);
    });

    return classComponents;
}
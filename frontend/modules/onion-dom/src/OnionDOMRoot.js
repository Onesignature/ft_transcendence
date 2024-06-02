function OnionDOMRoot(element)
{
    this._internalRoot = element;
}

export function createRoot(element)
{
    return new OnionDOMRoot(element);
}

OnionDOMRoot.prototype.render = function(component)
{
    const root = this._internalRoot;
    if (root === null)
    {
        throw new Error('Cannot update an unmounted root.');
    }

    const newComponent = new component();

    document.addEventListener("DOMContentLoaded", async () => {
        const classText = await newComponent.render();
        const childComponent = createClass(classText);
        
        const anotherClassText = await childComponent.render();
        const childChildComponent = createClass(anotherClassText);

        root.innerHTML = await childChildComponent.render();
    })
}

function createDomTree()
{

}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function trimStartAndEnd(str) {
    // Remove leading whitespace
    str = str.replace(/^\s+/, '');
    
    // Remove trailing whitespace
    str = str.replace(/\s+$/, '');
    
    return str;
}

function createClass(classText)
{
    const instanceId = generateId();
    const component = new Function('return (' + trimStartAndEnd(classText) + ');')();
    return new component({key: instanceId}, 'context');
}
function OnionDOMRoot(element)
{
    this._internalRoot = element;
    this._prevComponent = null;
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
    
    if (this._prevComponent !== null)
    {
        this._prevComponent.onDisable();
    }
    let newComponent = new component();
    newComponent.onEnable();
    this._prevComponent = component;

    document.addEventListener("DOMContentLoaded", async () => {
        root.innerHTML = await newComponent.render();
    })
}
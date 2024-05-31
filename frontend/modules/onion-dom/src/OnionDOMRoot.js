function OnionDOMRoot(element)
{
    this._internalRoot = element;
}

export function createRoot(element)
{
    console.log("CALLED!");
    return new OnionDOMRoot(element);
}

OnionDOMRoot.prototype.render = function(component)
{
    const root = this._internalRoot;
    if (root === null)
    {
        throw new Error('Cannot update an unmounted root.');
    }
    root.innerHTML = component.render();
}
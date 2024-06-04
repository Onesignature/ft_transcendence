import { createNodeList } from './OnionDOMNode.js';

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

    const rootComponent = new component();

    document.addEventListener("DOMContentLoaded", async () => {
        const nodeTree = await createNodeList(rootComponent);
        await printNode(nodeTree);
    });
}

async function printNode(rootNode)
{
    const rawHTML = await rootNode.parent.render();
    console.log(rawHTML);
    
    rootNode.children.forEach(async (parent) => {
        printNode(parent);
    });
}
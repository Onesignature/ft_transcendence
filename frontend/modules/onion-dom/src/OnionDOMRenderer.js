import { updateNode } from "../../onion-node/src/OnionNodeContainer.js";

export function rerender(instance, partialState, callback)
{
    let node = instance.__onionInternals;
    if (!isMounted(node))
    {
        console.error(`Cannot perform state update on an unmounted component ${instance.name}. ` +
            'Please make sure that the component is mounted before called this.setState');
    }
    updateNode(node, null, partialState, callback);
}

function isMounted(node)
{
    return !!(node && node.parentContainer);
}
import { updateNodeOnContainer } from "../../onion-node/src/OnionNodeContainer.js";

export function rerender(instance, partialState, callback)
{
    let node = instance._onionInternals;
    if (!isMounted(node))
    {
        console.error(`Cannot perform state update on an unmounted component ${instance.name}. ` +
            'Please make sure that the component is mounted before called this.setState');
    }
    processState(node, partialState);
    updateNodeOnContainer(node, node.parentContainer, callback);
}

function isMounted(node)
{
    return !!(node && node.parentContainer);
}

function processState(node, partialState)
{
    let pendingState = node.pendingState;
    if (typeof partialState === 'function')
    {
        partialState = partialState.call();
    }
    node.pendingState = Object.assign({}, partialState, pendingState);
}
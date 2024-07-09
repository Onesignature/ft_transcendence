import { createRootNode } from "./OnionNodeRoot.js";
import { updateOnNodes, updateNodeProps, updateNodeState } from "./OnionNodeUpdates.js";
import { render } from "./OnionNodeRender.js";

let currentlyProcessingUpdate = false;

export function createContainer(containerInfo, tag)
{
    return createRootNode(containerInfo, tag);
}

export function updateContainer(nodeList, container, callback)
{
	updateContainerImp(container.current, nodeList, container, callback);
}

export function updateNode(node, pendingProps, pendingState, callback)
{
    updateNodeProps(node, pendingProps);
    updateNodeState(node, pendingState);
	updateContainerImp(node, null, node.parentContainer, callback);
}

function updateContainerImp(rootNode, nodeList, container, callback)
{
    if (currentlyProcessingUpdate)
        console.error("Cannot perform root node update because onion is busy rendering");

    currentlyProcessingUpdate = true;

    //TODO: Implement context using container param

    if (container.containerInfo)
        container = container.containerInfo;

    updateOnNodes(rootNode, nodeList);
    render(rootNode, container);
    
    currentlyProcessingUpdate = false;

    if (callback)
        callback.call();
}
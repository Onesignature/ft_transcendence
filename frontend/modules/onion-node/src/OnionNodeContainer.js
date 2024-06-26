import { createRootNode } from "./OnionNodeRoot.js";
import { updateOnNodes, getRootForUpdatedNode } from "./OnionNodeUpdates.js";
import { renderOnRootNode } from "./OnionNodeRender.js";

let currentlyProcessingUpdate = false;

export function createContainer(containerInfo, tag)
{
    return createRootNode(containerInfo, tag);
}

export function updateContainer(nodeList, container)
{
	return updateContainerImp(container.current, nodeList, container);
}

function updateContainerImp(rootNode, nodeList, container)
{
    if (currentlyProcessingUpdate)
        console.error("Cannot perform root node update because onion is busy rendering");

    currentlyProcessingUpdate = true;
    let root = updateOnNodes(rootNode, nodeList);
    if (root)
        renderOnRootNode(root.current, container.containerInfo);
    currentlyProcessingUpdate = false;
}

export function updateNodeOnContainer(node, container, callback)
{
    if (currentlyProcessingUpdate)
        console.error("Cannot perform node update from this.setState because onion is busy rendering");

    currentlyProcessingUpdate = true;
    let root = updateOnNodes(node, nodeList);
    if (root)
        renderOnRootNode(root, container.containerInfo);
    currentlyProcessingUpdate = false;
    callback.call();
}
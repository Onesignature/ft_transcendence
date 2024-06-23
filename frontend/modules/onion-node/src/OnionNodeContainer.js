import { createRootNode } from "./OnionNodeRoot.js";
import { updateOnNodes } from "./OnionNodeUpdates.js";

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
    console.log(rootNode);
    console.log(nodeList);

    updateOnNodes(rootNode, nodeList, container);
    renderRootNode(rootNode, container);
}

function renderRootNode(rootNode, container)
{
    
}
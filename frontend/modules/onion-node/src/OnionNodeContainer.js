import { createRootNode } from "./OnionNodeRoot.js";
import { updateOnNodes } from "./OnionNodeUpdates.js";
import { renderOnRootNode } from "./OnionNodeRender.js";

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
    updateOnNodes(rootNode, nodeList);
    renderOnRootNode(rootNode, container);
}
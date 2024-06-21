import { createRootNode } from "./OnionNodeRoot.js";
import { renderOnNode } from "./OnionNodeRenderer.js";
import { ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";

export function createContainer(containerInfo, tag)
{
    return createRootNode(containerInfo, tag);
}

export function updateContainer(element, container)
{
	return updateContainerImp(container.current, element, container);
}

function updateContainerImp(rootNode, element, container)
{
    console.log(rootNode);
    console.log(element);

    for (let index in element)
    {
        let node = element[index];
        updateOnNode(node);
    }
}

function updateOnNode(node)
{
    switch (node.tag)
    {
        case ClassComponent:
            
            break;
        case HostComponent:

        default:
            break;
    }
}
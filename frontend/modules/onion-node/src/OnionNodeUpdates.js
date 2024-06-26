import { HostRoot } from "../shared/OnionNodeTags.js";

export function updateOnNodes(node, nodeList)
{    
    node.children = [];
    for (let i = 0; i < nodeList.length; i++)
    {
        let childNode = nodeList[i];
        childNode.parent = node;
        node.children.push(childNode);
    }

    return getRootForUpdatedNode(node);
}

export function getRootForUpdatedNode(sourceNode)
{
    let node = sourceNode;
    let parent = node.parent;
    while (parent !== null)
    {
        node = parent;
        parent = node.parent;
    }
    return node.tag === HostRoot ? node.stateNode : null;
}
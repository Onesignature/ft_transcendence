import { HostRoot } from "../shared/OnionNodeTags.js";

export function updateOnNodes(rootNode, nodeList)
{
    console.log(rootNode);
    
    rootNode.children = [];
    for (let i = 0; i < nodeList.length; i++)
    {
        let node = nodeList[i];
        node.parent = rootNode;
        rootNode.children.push(node);
    }

    return getRootForUpdatedNode(rootNode);
}

function getRootForUpdatedNode(sourceNode)
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
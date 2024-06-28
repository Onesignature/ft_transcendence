import { HostRoot, ClassComponent } from "../shared/OnionNodeTags.js";
import { parseHtmlString } from "../../onion-dom/src/OnionDOMParser.js";

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

export function updateOnNodes(node)
{
    if (node.tag != ClassComponent)
        console.error("Cannot re-update on a node which is not a class component.");

    for (let i = 0; i < node.children.length; i++)
    {
        let childNode = node.children[i];
        diffCompareChild(childNode);
    }
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

function diffCompareChild(node)
{
    let newHtml = node.stateNode.render();
    let elements = parseHtmlString(newHtml);
    for (let i = 0; i < elements.length; i++)
    {
        if (lNode.outerHtml === rNode.outerHtml)
        {
            
        }
    }
}
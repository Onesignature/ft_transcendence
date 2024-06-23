import { HostRoot, ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";

export function updateOnNodes(rootNode, nodeList, container)
{
    rootNode.children = nodeList;
    for (let i = 0; i < nodeList.length; i++)
    {
        let node = nodeList[i];
        node.rootContainer = container;
        updateOnNode(node);
    }
}

export function updateOnNode(node)
{
    switch (node.tag)
    {
        case ClassComponent:
            UpdateClassNode(node);
            break;
        case HostComponent:
        default:
            break;
    }
}

function UpdateClassNode(node)
{
    detectUpdateOnUnmountedNode(node);

    let pendingProps = node.pendingProps;
    let newState = node.stateNode.state;
    if (pendingProps || newState)
    {
        let skipUpdate = node.stateNode.shouldComponentUpdate(pendingProps, newState);
        node.stateNode.props = pendingProps;
        node.memoizedProps = pendingProps;
        node.memoizedState = newState;
        if (skipUpdate)
            return;
        node.pendingProps = null;
    }
}

function isNodeMounted(sourceNode)
{
    return !!getRootForUpdatedNode(sourceNode);
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

function detectUpdateOnUnmountedNode(sourceNode)
{
    if (!sourceNode.rootContainer)
        console.error("Can't perform a Onion state update on a component that hasn't mounted yet.");
}
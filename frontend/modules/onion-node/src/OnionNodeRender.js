import { getNodeListFromHTML } from "../../onion-dom/src/OnionDOMParser.js";
import { ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";
import { updateOnNodes } from "./OnionNodeUpdates.js";

export function renderOnRootNode(rootNode, container)
{    
    // Nothing to render
    if (!rootNode.children)
        return;

    for (let i = 0; i < rootNode.children.length; i++)
    {
        let node = rootNode.children[i];
        renderOnNode(node, container);
    }
}

export function renderOnNode(node, container)
{
    switch (node.tag)
    {
        case ClassComponent:
            renderOnClassNode(node, container)
            break;
        case HostComponent:
            renderOnHostNode(node, container);
            break;
        default:
            break;
    }
}

function renderOnClassNode(node, container)
{
    let stateNode = node.stateNode;
    let newMount = !node.rootContainer;

    if (newMount)
    {
        node.rootContainer = container;
        stateNode.onMount();
    }
    else if (node.rootContainer != container)
    {
        stateNode.onUnmount();
        node.rootContainer = container;
    }

    let pendingProps = node.pendingProps;
    let pendingState = node.pendingState;
    
    if (pendingProps || pendingState)
    {
        if (!stateNode.shouldComponentUpdate(pendingProps, pendingState))
            return;
        
        node.memoizedProps = stateNode.props ? Object.assign({}, stateNode.props, pendingProps) : pendingProps;
        node.memoizedState = stateNode.state ? Object.assign({}, stateNode.state, pendingState) : pendingState;
    }
    else if (!newMount)
        return;

    node.pendingProps = null;
    node.pendingState = null;

    let prevProps = stateNode.props;
    let prevState = stateNode.state;
    
    stateNode.props = node.memorizedProps;
    stateNode.state = node.memoizedState;
    
    stateNode.onPreUpdate(prevProps, prevState);
    
    let HTMLString = stateNode.render();
    console.log(HTMLString);
    let nodeList = getNodeListFromHTML(HTMLString);
    updateOnNodes(node, nodeList);
    renderOnRootNode(node, container);

    stateNode.onUpdate(prevProps, prevState);
}

function renderOnHostNode(node, container)
{
    container.containerInfo.appendChild(node.stateNode);
}
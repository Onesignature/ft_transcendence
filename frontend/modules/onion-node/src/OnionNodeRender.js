import { getNodeListFromHTML, getNodeListFromDOMElements } from "../../onion-dom/src/OnionDOMParser.js";
import { ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";
import { updateOnNodes } from "./OnionNodeUpdates.js";
import { getComponentNameFromDOMElement } from "./OnionNode.js";
import { isValidContainer } from "../../onion-dom/src/OnionDOMContainer.js";

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
    // else its an update on a mounted component

    let pendingProps = node.pendingProps;
    let pendingState = node.pendingState;
    
    if (pendingProps || pendingState)
    {
        if (!stateNode.shouldComponentUpdate(pendingProps, pendingState))
            return;
        
        node.memoizedProps = stateNode.props ? Object.assign({}, stateNode.props, pendingProps) : pendingProps;
        node.memoizedState = stateNode.state ? Object.assign({}, stateNode.state, pendingState) : pendingState;
    }
    else
        //TODO: Don't re-render if there are no changes

    node.pendingProps = null;
    node.pendingState = null;

    let prevProps = stateNode.props;
    let prevState = stateNode.state;
    
    stateNode.props = node.memoizedProps;
    stateNode.state = node.memoizedState;
    
    stateNode.onPreUpdate(prevProps, prevState);
    
    let HTMLString = stateNode.render();
    let nodeList = getNodeListFromHTML(HTMLString);
    updateOnNodes(node, nodeList);
    renderOnRootNode(node, container);

    stateNode.onUpdate(prevProps, prevState);
}

function renderOnHostNode(node, container)
{
    if (containsClassComponentInTree(node))
    {
        const clonedNode = node.stateNode.cloneNode(false); // false means "do not clone children"
        container.appendChild(clonedNode);
        let nodeList = getNodeListFromDOMElements(node.stateNode.childNodes);
        updateOnNodes(node, nodeList);
        renderOnRootNode(node, container.lastChild);
    }
    else
    {
        // Render the entire node tree if there are no class components in them
        container.appendChild(node.stateNode);
    }
}

function containsClassComponentInTree(node)
{
    let stateNode = node.stateNode;
    if (!stateNode.childNodes)
        return false;

    for (let i = 0; i < stateNode.childNodes.length; i++)
    {
        let element = stateNode.childNodes[i];
        if (!isValidContainer(element))
            return false;
        if (getComponentNameFromDOMElement(element) || containsClassComponent(element))
            return true;
    }
    return false;
}
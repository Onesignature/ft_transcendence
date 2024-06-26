import { getNodeListFromHTML, getNodeListFromDOMElements } from "../../onion-dom/src/OnionDOMParser.js";
import { ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";
import { updateOnNodes, getRootForUpdatedNode } from "./OnionNodeUpdates.js";
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
    let newMount = !node.parentContainer;

    if (newMount)
    {
        node.parentContainer = container;
        stateNode.onMount();
    }
    else if (node.parentContainer != container)
    {
        stateNode.onUnmount();
        node.parentContainer = container;
    }
    else
    {
        console.log(container);
        console.log("Called Update");
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
    //TODO: else don't re-render if there are no changes

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
        processSpecialProps(node);
        // Render the entire node tree if there are no class components in them
        container.appendChild(node.stateNode);
    }
}

function containsClassComponentInTree(node)
{
    let stateNode = node.stateNode ? node.stateNode : node;
    if (!stateNode.childNodes)
        return false;

    for (let i = 0; i < stateNode.childNodes.length; i++)
    {
        let element = stateNode.childNodes[i];
        if (!isValidContainer(element))
            return false;
        if (getComponentNameFromDOMElement(element) || containsClassComponentInTree(element))
            return true;
    }
    return false;
}

function processSpecialProps(node)
{
    let props = node.pendingProps;
    for (const key in props)
    {
        if (key.toLowerCase() === "onclick")
        {
            let funcName = props[key].split('(')[0];
            let boundFunction = resolveFunction(node, funcName);
            if (!boundFunction)
            {
                console.error(`Passed function ${funcName} on ${node.type} component, but the parent nodes does not have this function implemented.`);
                continue;
            }
            node.stateNode.onclick = boundFunction;
            break;
        }
    }

    node.memoizedProps = props;
    node.pendingProps = null;
}

function resolveFunction(node, funcName)
{
    while (node)
    {
        let stateNode = node.stateNode;
        if (!isValidSpecialPropsNode(node, funcName) &&
            stateNode && typeof stateNode[funcName] === 'function')
        {
            return stateNode[funcName].bind(stateNode);
        }
        node = node.parent;
    }
    return null;
}

function isValidSpecialPropsNode(node, funcName)
{
    return !!(node.memoizedProps && node.memoizedProps.onclick === funcName)
}
import { getNodeListFromHTML, getNodeListFromDOMElements } from "../../onion-dom/src/OnionDOMParser.js";
import { HostRoot, ClassComponent, HostComponent } from "../shared/OnionNodeTags.js";
import { updateOnNodes, updateNodeFromNodeList } from "./OnionNodeUpdates.js";
import { getComponentNameFromDOMElement } from "./OnionNode.js";
import { isValidContainer } from "../../onion-dom/src/OnionDOMContainer.js";
import { resolveNodeFunction } from "./OnionNodeEventBind.js";

export function render(node, container)
{
    renderImp(node, container);
}

function renderImp(node, container)
{
    switch (node.tag)
    {
        case HostRoot:
            renderOnChildNode(node, container);
            break;
        case ClassComponent:
            renderOnClassNode(node, container);
            break;
        case HostComponent:
            renderOnHostNode(node, container);
            break;
        default:
            break;
    }
}

function renderOnChildNode(node, container)
{
    // Nothing to render
    if (!node.children)
        return;

    for (let i = 0; i < node.children.length; i++)
    {
        let childNode = node.children[i];
        renderImp(childNode, container);
    }
}

function renderOnClassNode(node, container)
{
    let stateNode = node.stateNode;
    let newNodeMount = warnIsNodeNotMounted(node, container);

    let pendingProps = node.pendingProps;
    let pendingState = node.pendingState;

    if (!newNodeMount && !stateNode.shouldComponentUpdate(pendingProps, pendingState))
        return;
    
    if (pendingProps)
    {
        node.memoizedProps = stateNode.props ? Object.assign({}, stateNode.props, pendingProps) : pendingProps;
        node.pendingProps = null;
    }
    if (pendingState)
    {
        // Exract outerHTML from state
        if (pendingState.__outerHTML)
        {
            stateNode.outerHTML = pendingState.__outerHTML;
            delete pendingState.__outerHTML;
        }

        node.memoizedState = stateNode.state ? Object.assign({}, stateNode.state, pendingState) : pendingState;
        node.pendingState = null;
    }
    
    if (!newNodeMount && !pendingProps && !pendingState)
        return;

    let prevProps = stateNode.props;
    let prevState = stateNode.state;
    
    stateNode.props = node.memoizedProps;
    stateNode.state = node.memoizedState;
    
    if (!newNodeMount)
        stateNode.onPreUpdate(prevProps, prevState);
    
    let HTMLString = stateNode.render();
    let nodeList = getNodeListFromHTML(HTMLString);

    if (!newNodeMount)
    {
        nodeList = updateNodeFromNodeList(node, nodeList);
        unmountOnChildNode(node, container);
    }
    
    updateOnNodes(node, nodeList);
    renderOnChildNode(node, container);

    if (!newNodeMount)
        stateNode.onUpdate(prevProps, prevState);
}

function renderOnHostNode(node, container)
{    
    let newNodeMount = warnIsNodeNotMounted(node, container);
    if (containsClassComponentInTree(node))
    {
        let nodeList = getNodeListFromDOMElements(node.stateNode.childNodes);
        
        cloneNodeFromStateNode(node, false);
        container.appendChild(node.stateNode);
        
        updateOnNodes(node, nodeList);
        renderOnChildNode(node, node.stateNode);
    }
    else
    {
        if (newNodeMount)
        {
            processSpecialProps(node);
            // Render the entire node tree if there are no class components in them
            container.appendChild(node.stateNode);
        }
        else
        {
            //TODO: add support for special props
            let stateNode = node.stateNode;

            let pendingState = node.pendingState;
            let pendingProps = node.pendingProps;

            if (pendingState)
            {
                // Exract and update outerHTML from state
                if (pendingState.__outerHTML)
                {                    
                    let newStateNode = createStateNodeFromOuterHTML(pendingState.__outerHTML);
                    node.stateNode = newStateNode;
                    delete pendingState.__outerHTML;
                    
                    processSpecialProps(node);
                    container.replaceChild(newStateNode, stateNode);
                }
                node.memoizedState = stateNode.state ? Object.assign({}, stateNode.state, pendingState) : pendingState;
                node.pendingState = null;
            }
            if (pendingProps)
            {
                node.memoizedProps = stateNode.props ? Object.assign({}, stateNode.props, pendingProps) : pendingProps;
                node.pendingProps = null;
            }
        }
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
            let boundFunction = resolveNodeFunction(node, funcName);
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

function unmountNode(node, container)
{
    switch (node.tag)
    {
        case HostRoot:
            unmountOnChildNode(node, container);
            break;
        case ClassComponent:
            unmountOnClassNode(node, container);
            break;
        case HostComponent:
            unmountOnHostNode(node, container);
            break;
        default:
            break;
    }
}

function unmountOnChildNode(node, container)
{
    if (!node.children)
        return;

    for (let i = 0; i < node.children.length; i++)
    {
        let childNode = node.children[i];
        unmountNode(childNode, container);
    }
    delete node.children;
}

function unmountOnClassNode(node, container)
{
    unmountOnChildNode(node, container);
    node.stateNode.onUnmount();
    //TODO: remove any styles with it
    delete node.stateNode;
}

function unmountOnHostNode(node, container)
{
    container.removeChild(node.stateNode);
    delete node.stateNode;
}

function warnIsNodeNotMounted(node, container)
{
    let newNodeMount = !node.parentContainer;
    if (newNodeMount)
    {
        node.parentContainer = container;
    }
    else if (node.parentContainer != container)
    {
        console.error('Updating an already mounted node to another container, ' +
            'need to cleanup the node first. This error is likely caused by a ' +
            'bug in Onion. Please file an issue.');
    }
    return newNodeMount;
}

function cloneNodeFromStateNode(node, allowChildren)
{
    const clonedNode = node.stateNode.cloneNode(allowChildren);
    delete node.stateNode;
    node.stateNode = clonedNode;
}

function createStateNodeFromOuterHTML(outerHTML)
{
    var tempContainer = document.createElement('div');
    tempContainer.innerHTML = outerHTML;
    return tempContainer.firstElementChild;
}
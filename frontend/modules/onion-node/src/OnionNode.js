import { HostRoot, HostComponent, ClassComponent } from "../shared/OnionNodeTags.js";
import { createClassComponent } from "./OnionNodeClassComponent.js";

const className = "className";

function Node(tag, key, pendingProps)
{
    this.tag = tag;
    this.key = key;
    this.type = null;
    this.stateNode = null;

    this.parent = null;
    this.children = null;

    this.pendingProps = pendingProps;
    this.pendingState = null;
    this.memoizedProps = null;
    this.memoizedState = null;

    this.rootContainer = null;
}

function createNode(tag, key, pendingProps)
{
    return new Node(tag, key, pendingProps);
}

export function createHostRootNode()
{
    return createNode(HostRoot, null, null);
}

export function createNodeFromDOMElement(element)
{
    let key = element.key;
    let elementType = element.nodeType;
    let nodeTag = null;
    let type = null;
    let pendingProps = {};
    let stateNode = null;

    if (type = getComponentNameFromDOMElement(element))
    {
        nodeTag = ClassComponent;
        let options = { children: element.childNodes };
        stateNode = createClassComponent(type, options);
    }
    else
    {
        nodeTag = HostComponent;
        type = element.localName;
        stateNode = element;
    }
    
    for (let attr of element.attributes)
    {
        let name = attr.name.toLowerCase();
        if (name === "key")
            key = attr.value;
        else if (attr.value != type)
            pendingProps[attr.name] = attr.value;
    }
    
    let node = createNode(nodeTag, key, pendingProps);
    
    node.elementType = elementType;
    node.type = type;
    node.stateNode = stateNode;
    node.memoizedProps = stateNode.props;
    node.memoizedState = stateNode.state;
    
    stateNode._onionInternals = node;

    return node;
}

export function getComponentNameFromDOMElement(element)
{
    return element.getAttribute(className.toLowerCase());
}
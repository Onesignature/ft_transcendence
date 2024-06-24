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
    let nodeTag = HostComponent;
    let type = element.nodeType;
    let key = element.key;
    let pendingProps = {};
    let componentName = null;

    if (componentName = element.getAttribute(className))
    {
        nodeTag = ClassComponent;
        let lowerCaseClassName = className.toLowerCase();
        for (let attr of element.attributes)
        {
            let name = attr.name.toLowerCase();
            if (name === "key")
                key = attr.value;
            else if (name != lowerCaseClassName)
                pendingProps[attr.name] = attr.value;
        }
    }
    else
        pendingProps = element.attributes;
    
    let node = createNode(nodeTag, key, pendingProps);
    node.elementType = type;
    if (nodeTag == ClassComponent)
    {
        node.stateNode = createClassComponent(node, componentName, element.childNodes);
        node.type = componentName;
    }
    else
    {
        node.stateNode = element;
        node.type = node.stateNode.localName;
    }
    return node;
}
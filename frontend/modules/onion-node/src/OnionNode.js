import { HostRoot, HostComponent, ClassComponent } from "../shared/OnionNodeTags.js";
import { createClassComponent } from "./OnionNodeClassComponent.js";
import { convertStringToType } from "../../shared/StringConverter.js";
import { COMMENT_NODE, TEXT_NODE } from "../../onion-dom/shared/HTMLNodeType.js";

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

    this.context = null;
    this.parentContainer = null;
}

function createNode(tag, key, pendingProps)
{
    return new Node(tag, key, pendingProps);
}

export function createHostRootNode()
{
    return createNode(HostRoot, null, null);
}

export function createNodeFromDOMElement(element, caseSensitiveString)
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
        let options = { element: element, children: element.childNodes };
        stateNode = createClassComponent(type, options);
    }
    else
    {
        nodeTag = HostComponent;
        type = element.localName;
        stateNode = element;
    }
    
    if (elementType != TEXT_NODE && elementType != COMMENT_NODE)
    {
        for (let attr of element.attributes)
        {
            let name = findCaseSensitiveValue(caseSensitiveString, attr.name);
            let value = convertStringToType(attr.value);
            if (attr.name === "key")
                key = value;
            else if (attr.value != type)
                pendingProps[name] = value;
        }
    }
    
    let node = createNode(nodeTag, key, pendingProps);
    
    node.elementType = elementType;
    node.type = type;
    node.stateNode = stateNode;
    node.memoizedProps = stateNode.props;
    node.memoizedState = stateNode.state;
    
    stateNode.__onionInternals = node;

    return node;
}

function getComponentNameFromDOMElement(element)
{
    return (element.nodeType != TEXT_NODE && element.getAttribute(className.toLowerCase()));
}

function findCaseSensitiveValue(targetString, key)
{
    if (!targetString)
        return key;

    // Find the lowercase key in the target string
    let index = targetString.toLowerCase().indexOf(key.toLowerCase());
    
    if (index === -1)
        return key;
    
    // Extract the substring from the original target string
    let caseSensitiveValue = targetString.substring(index, index + key.length);
    
    return caseSensitiveValue;
}
import { isValidSpecialPropsNode } from "./OnionNodeProps.js";

export function resolveClassNodeFunction(node, funcName)
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

export function resolveHostNodeFunction(node, funcName)
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
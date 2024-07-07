export function resolveNodeFunction(node, funcName)
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
    return !!(node.memoizedProps && node.memoizedProps.onClick === funcName)
}
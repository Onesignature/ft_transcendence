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
    if (!node.memoizedProps)
        return false;
    
    const key = findKeyByValue(node.memoizedProps, funcName);
    return !!(key && node.memoizedProps[key]);
}

function findKeyByValue(object, value)
{
    return Object.keys(object).find(key => object[key] === value);
}
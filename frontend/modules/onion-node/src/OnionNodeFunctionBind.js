export function resolveNodeFunction(node, funcName)
{
    while (node)
    {
        let stateNode = node.stateNode;
        // if (node.memoizedProps)
        // {
        //     let boundFunction = getFuncFromProps(node.memoizedProps, funcName);
        //     if (boundFunction)
        //         return boundFunction;
        // }
        if (stateNode)
        {
            let unboundFuncName = funcName.split('bound ')[1];
            funcName = unboundFuncName ? unboundFuncName : funcName; 

            if (typeof stateNode[funcName] === 'function')
                return stateNode[funcName].bind(stateNode);
        }
        node = node.parent;
    }
    return null;
}

function getFuncFromProps(object, funcName)
{
    let unboundFuncName = funcName.split('bound ')[1];
    const boundFuncName = unboundFuncName ? funcName : `bound ${funcName}`;

    for (let key in object)
    {
        if (Object.prototype.hasOwnProperty.call(object, key) &&
            typeof object[key] === 'function' &&
            object[key].name === boundFuncName)
        {
            return object[key];
        }
    }
    return null;
}
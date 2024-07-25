export function objectToProps(obj)
{
    if (!obj || typeof obj !== 'object')
    {
        return ''; // Return an empty string if obj is null, undefined, or not an object
    }
    
    return Object.entries(obj)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
}

export function propsToObject(propsString)
{
    if (typeof propsString !== 'string' || !propsString.trim())
    {
        return {}; // Return an empty object if the input is not a string or is empty
    }

    return propsString.split(/\s+/).reduce((acc, prop) => {
        const [key, value] = prop.split('=');

        if (key && value) {
            // Remove surrounding quotes from the value
            acc[key] = value.replace(/^"|"$/g, '');
        }

        return acc;
    }, {});
}
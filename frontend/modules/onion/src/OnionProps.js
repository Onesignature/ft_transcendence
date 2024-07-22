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
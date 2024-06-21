export function remove(key)
{
    key._onionInternals = undefined;
}

export function get(key)
{
    return key._onionInternals;
}

export function has(key)
{
    return key._onionInternals !== undefined;
}

export function set(key, value)
{
    key._onionInternals = value;
}
export function convertStringToType(value)
{
    if (!isNaN(value))
      return parseFloat(value);
    else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')
      return value.toLowerCase() === 'true';
    else if (!isNaN(Date.parse(value)))
      return new Date(value);
    else
      return value;
}
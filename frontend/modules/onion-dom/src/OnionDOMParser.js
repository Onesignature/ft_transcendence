import { isValidContainer } from "./OnionDOMContainer.js";
import { createNodeFromDOMElement } from "../../onion-node/src/OnionNode.js";

export function getNodeListFromHTML(htmlString)
{
    let cleanedHtml = removeWhitespaceBetweenTags(htmlString);
    const domElements = parseHtmlString(cleanedHtml);

    return getNodeListFromDOMElements(domElements);
}

export function getNodeListFromDOMElements(elements)
{
    let nodeList = [];
    for (let i= 0; i < elements.length; i++)
    {
        let domElement = elements[i];
        let node = createNodeFromDOMElement(domElement);
        nodeList.push(node);
    }
    return nodeList;
}

function removeWhitespaceBetweenTags(html) {
    // Regular expression to match whitespace between HTML tags
    const pattern = />\s+</g;
    
    // Replaces the whitespace between tags with a single "><"
    let cleanedHtml = html.replace(pattern, '><');
    
    // Trim whitespace from the start and end of the string
    cleanedHtml = cleanedHtml.trim();
    
    return cleanedHtml;
}

function parseHtmlString(htmlString)
{
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const bodyContent = doc.body;

    // Find all link elements in the parsed document
    const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');

    linkElements.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if the stylesheet already exists in the current document
        const isStylesheetAlreadyPresent = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .some(existingLink => existingLink.getAttribute('href') === href);
        
        // Append the link element if it doesn't already exist
        if (!isStylesheetAlreadyPresent) {
            document.head.appendChild(link.cloneNode(true));
        }
    });

    let children = [];
    while (bodyContent.firstChild)
    {
        let element = bodyContent.firstChild;
        if (!isValidContainer(element))
            console.error(`Unsupport or invalid element, skipped rendering for: ${element}`);
        else
            children.push(element);
        bodyContent.removeChild(element);
    }
    return children;
}
import { isValidContainer } from "./OnionDOMContainer.js";
import { createNodeFromDOMElement } from "../../onion-node/src/OnionNode.js";

export function getNodeListFromHTML(htmlString)
{
    let cleanedHtml = removeWhitespaceBetweenTags(htmlString);
    const domElements = parseHtmlString(cleanedHtml);

    let nodeList = [];
    for (let index in domElements)
    {
        let domElement = domElements[index];
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
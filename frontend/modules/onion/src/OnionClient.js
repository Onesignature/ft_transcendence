import { Component } from './OnionComponent.js';
import { createContext } from './OnionContext.js';
import { createElement, isValidElement } from './OnionElement.js';
import { forEach, map, count, toArray } from './OnionChildren.js';

const Children = {
    map,
    forEach,
    count,
    toArray,
};

export {
    Children,
    Component,
    createContext,
    createElement,
    isValidElement
}
// BaseButton.js

class BaseButton {
  constructor(text, options = {}) {
    this.text = text;
    this.options = Object.assign({}, BaseButton.defaultOptions, options);
    this.element = this.createButtonElement();
    this.addStyles();
  }

  createButtonElement() {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.classList.add('base-button');
    return button;
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .base-button {
        outline: none;
        background-color: transparent;
        border: 2px solid ${this.options.strokeColor};
        color: ${this.options.textColor};
        padding: 2px 40px;
        font-size: ${this.options.fontSize}pt;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s, border-color 0.3s;
      }

      .base-button:hover {
        background-color: ${this.options.hoverBackgroundColor};
        color: ${this.options.hoverTextColor};
        border-color: transparent;
      }

      .base-button:active {
        background-color: ${this.hexToRgba(this.options.hoverBackgroundColor, 0.3)};
        color: ${this.options.hoverTextColor};
        border-color: transparent;
      }

      .base-button:focus {
        outline: none;
      }
    `;
    document.head.appendChild(style);
  }

  hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }
}

BaseButton.defaultOptions = {
  fontSize: 16,
  textColor: 'white',
  strokeColor: 'white',
  hoverTextColor: 'black',
  hoverBackgroundColor: 'white',
};

// Usage example:
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('[data-base-button]');
  buttons.forEach(button => {
    const text = button.textContent.trim();
    const fontSize = button.dataset.fontSize ? parseInt(button.dataset.fontSize) : undefined;
    const textColor = button.dataset.textColor || undefined;
    const strokeColor = button.dataset.strokeColor || undefined;
    const hoverTextColor = button.dataset.hoverTextColor || undefined;
    const hoverBackgroundColor = button.dataset.hoverBackgroundColor || undefined;
    const onClick = button.getAttribute('data-onclick') || undefined;

    const newButton = new BaseButton(text, {
      fontSize,
      textColor,
      strokeColor,
      hoverTextColor,
      hoverBackgroundColor,
    });

    if (onClick && window[onClick] instanceof Function) {
      newButton.element.addEventListener('click', window[onClick]);
    }

    button.parentNode.replaceChild(newButton.element, button);
  });
});

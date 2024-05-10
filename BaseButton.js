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
    button.addEventListener('click', () => {
      const onClick = button.getAttribute('data-onclick');
      if (onClick && window[onClick] instanceof Function) {
        window[onClick]();
      }
    });
    return button;
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .base-button {
        background-color: transparent;
        border: 2px solid ${this.options.strokeColor};
        color: ${this.options.textColor};
        padding: 2px 40px;
        font-size: ${this.options.fontSize}pt;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
      }

      .base-button:hover {
        background-color: ${this.options.hoverBackgroundColor};
        color: ${this.options.hoverTextColor};
        border-color: transparent;
      }
    `;
    document.head.appendChild(style);
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
    const newButton = new BaseButton(text, {
      fontSize,
      textColor,
      strokeColor,
      hoverTextColor,
      hoverBackgroundColor,
    });
    button.parentNode.replaceChild(newButton.element, button);
  });
});

// Example click handler function
function handleButtonClick() {
  alert('Button clicked!');
}

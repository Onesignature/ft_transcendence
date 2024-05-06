class BaseButton {
  constructor(text) {
    this.text = text;
    this.element = this.createButtonElement();
  }

  createButtonElement() {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.addEventListener('click', () => {
      const onClick = button.getAttribute('data-onclick');
      if (onClick && window[onClick] instanceof Function) {
        window[onClick]();
      }
    });
    return button;
  }
}

// Usage example:
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('[data-base-button]');
  buttons.forEach(button => {
    const text = button.textContent.trim();
    const newButton = new BaseButton(text);
    button.parentNode.replaceChild(newButton.element, button);
  });
});

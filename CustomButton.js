
function createCustomButton(text, color, fontSize) {
    var button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn btn-primary custom-button';
    button.style.color = color;
    button.style.fontSize = fontSize;
    button.style.padding = parseInt(fontSize) * 0.75 + 'px';
    return button;
  }
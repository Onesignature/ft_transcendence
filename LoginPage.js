document.addEventListener('DOMContentLoaded', function() {
    // Add the HTML elements
    document.body.insertAdjacentHTML('beforeend', `
        <button id="loginButton" data-base-button data-font-size="20" data-text-color="white" data-stroke-color="white" data-hover-text-color="#0E0E0E" data-hover-background-color="#FFD335">Log In</button>
        <h2 style="font-size: 15pt; color: #FFD335; margin-top: 5px; margin-bottom: 20px;">Log in with 42 account</h2>
        <h1 style="font-size: 20pt; color: white;">Enjoy the Pong</h1>
    `);

    // Define the action for the button
    function handleButtonClick() {
        alert('Button clicked!');
    }

    // Attach the click event listener to the button
    const button = document.getElementById('loginButton');
    if (button) {
        button.addEventListener('click', handleButtonClick);
    }

    // Function to load JavaScript file via AJAX
    function loadScript(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    eval(xhr.responseText); // Execute the loaded script
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    console.error('Failed to load script:', url);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    // Load LogoAnim.js and BaseButton.js
    loadScript('LogoAnim.js', function() {
        loadScript('BaseButton.js');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add the HTML elements
    document.body.insertAdjacentHTML('beforeend', `
        <button data-base-button data-font-size="20" data-text-color="white" data-stroke-color="white" data-hover-text-color="#0E0E0E" data-hover-background-color="#FFD335" data-onclick="handleButtonClick">Log In</button>
        <h2 style="font-size: 15pt; color: #FFD335; margin-top: 5px; margin-bottom: 20px;">Log in with 42 account</h2>
        <h1 style="font-size: 20pt; color: white;">Enjoy the Pong</h1>
    `);

    // Define the action for the button
    function handleButtonClick() {
        alert('Button clicked!');
    }

    // Attach the click event listener to the button
    const button = document.querySelector('button[data-onclick="handleButtonClick"]');
    if (button) {
        button.addEventListener('click', handleButtonClick);
    }
});

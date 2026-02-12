const noButton = document.getElementById('noButton');

noButton.addEventListener('click', function() {
    // Get viewport dimensions
    const maxX = window.innerWidth - noButton.offsetWidth - 20;  // Added -20 for padding
    const maxY = window.innerHeight - noButton.offsetHeight - 20;
    
    // Generate random position with minimum boundaries
    const randomX = Math.floor(Math.random() * (maxX - 100)) + 50; // Keep away from edges
    const randomY = Math.floor(Math.random() * (maxY - 100)) + 50;
    
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    
    console.log('Button moved to:', randomX, randomY); // Debug to see positions
});
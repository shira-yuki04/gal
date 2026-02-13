// NO button movement
const noButton = document.getElementById('noButton');
if(noButton) {
    noButton.addEventListener('click', function() {
        const maxX = window.innerWidth - noButton.offsetWidth - 20;
        const maxY = window.innerHeight - noButton.offsetHeight - 20;
        
        const randomX = Math.floor(Math.random() * (maxX - 100)) + 50;
        const randomY = Math.floor(Math.random() * (maxY - 100)) + 50;
        
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    });
}

// Name validation form
const form = document.getElementById('nameForm');
if(form) {
    const nameInput = document.getElementById('nameInput');
    const errorMessage = document.getElementById('errorMessage');
    const correctName = ["Shahrukh", "Ayan","Avantika","Soni","Manzil","Zeba","Megha"];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredName = nameInput.value.trim();
        const isNameCorrect = correctName.some(name => name.toLowerCase() === enteredName.toLowerCase());
        
        if(isNameCorrect) {
            // SAVE THE NAME before redirecting
            localStorage.setItem('userName', enteredName);
            console.log('Name saved:', enteredName);
            window.location.href = 'page1.html';
        } else {
            alert("Bro!!! I'm not stealing your money. Enter actual name");
            errorMessage.style.display = 'block';
            nameInput.value = '';
        }
    });
}

// Galentine form - Load saved name and handle submission
const galentineForm = document.getElementById('galentineForm');
if(galentineForm) {
    const savedName = localStorage.getItem('userName');
    const hiddenNameInput = document.getElementById('hiddenName');  // FIXED: was 'hiddenNameInput'
    
    console.log("Saved name:", savedName);
    
    if(savedName && hiddenNameInput) {
        hiddenNameInput.value = savedName;
        console.log("Hidden input set to:", hiddenNameInput.value);
    }
    
    // Handle form submission to Python server
    galentineForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = hiddenNameInput.value;
        console.log('Submitting name:', name);
        
        try {
            const response = await fetch('https://gal-production.up.railway.app/submit-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name })
            });
            
            if (response.ok) {
                console.log('Success!');
                window.location.href = 'page3.html';
            } else {
                alert('Error sending response');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server. Make sure Python server is running!');
        }
    });
}

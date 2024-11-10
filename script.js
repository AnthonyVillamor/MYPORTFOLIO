// Show the scroll-to-top button when scrolling down
window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 200);
});

// Smooth scroll to top
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add event listeners for project images
document.querySelectorAll('.project-item img').forEach((img) => {
    img.addEventListener('click', () => {
        console.log("Project image clicked: ", img.src);  // Log when project image is clicked
        createFullscreenView(img.src);
    });
});

// Add event listeners for skills icons
// Ensure that the selector targets the correct images within the skills section
document.querySelectorAll('.skills img').forEach((icon) => {
    icon.addEventListener('click', () => {
        console.log("Skill icon clicked: ", icon.src);  // Log when skill icon is clicked
        createFullscreenView(icon.src);
    });
});

// Function to create fullscreen view for images/icons
function createFullscreenView(src) {
    // Create a fullscreen div
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.style.position = 'fixed';
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = '100%';
    fullscreenDiv.style.height = '100%';
    fullscreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fullscreenDiv.style.zIndex = 10000;
    fullscreenDiv.style.display = 'flex';
    fullscreenDiv.style.justifyContent = 'center';
    fullscreenDiv.style.alignItems = 'center';

    // Create an image element for the fullscreen view
    const fullImage = document.createElement('img');
    fullImage.src = src;
    fullImage.style.maxWidth = '90%';
    fullImage.style.maxHeight = '90%';
    fullImage.style.border = '2px solid skyblue'; // Optional: add border to the fullscreen image

    // Close the fullscreen when clicking the fullscreen div
    fullscreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullscreenDiv);
    });

    // Add event listener to close fullscreen on ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (document.body.contains(fullscreenDiv)) {
                document.body.removeChild(fullscreenDiv);
            }
        }
    });

    // Append the image to the fullscreen div
    fullscreenDiv.appendChild(fullImage);
    document.body.appendChild(fullscreenDiv);
}

// Contact form functionality
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    submitButton = document.getElementById('submit-button');  // Added submit button for spinner control

const sendEmail = (e) => {
    e.preventDefault();
    
    // Show loading spinner
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_ugrf65v', 'template_3q92rf5', '#contact-form', '3fKWt-bvTE4TVliIL')
    .then(() => {
        contactMessage.textContent = 'Message Sent Successfully';
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);

        // Reset the form
        contactForm.reset();
    }, () => {
        contactMessage.textContent = 'Message not sent (Service Error)';
    })
    .finally(() => {
        // Hide loading spinner
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
};

contactForm.addEventListener('submit', sendEmail);



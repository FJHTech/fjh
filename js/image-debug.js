// Image loading debug script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Image debug script loaded');
    
    // Get all images on the page
    const images = document.querySelectorAll('img');
    
    // Log image loading status
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}: ${img.src}`);
        
        // Check if image is already loaded
        if (img.complete) {
            if (img.naturalHeight === 0) {
                console.error(`Image ${index + 1} failed to load: ${img.src}`);
            } else {
                console.log(`Image ${index + 1} loaded successfully: ${img.src}`);
            }
        } else {
            // Add event listeners for loading and error
            img.addEventListener('load', () => {
                console.log(`Image ${index + 1} loaded successfully: ${img.src}`);
            });
            
            img.addEventListener('error', () => {
                console.error(`Image ${index + 1} failed to load: ${img.src}`);
                
                // Add visible error indicator
                img.style.border = '2px solid red';
                const errorDiv = document.createElement('div');
                errorDiv.textContent = 'Image failed to load';
                errorDiv.style.color = 'red';
                errorDiv.style.fontWeight = 'bold';
                errorDiv.style.padding = '10px';
                img.parentNode.appendChild(errorDiv);
            });
        }
    });
});
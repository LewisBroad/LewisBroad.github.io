
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const videoWrapper = entry.target;
      const iframe = document.createElement('iframe');
      iframe.src = videoWrapper.getAttribute('data-src');
      iframe.frameborder = '0';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowfullscreen = true;
      videoWrapper.innerHTML = ''; // Clear the placeholder
      videoWrapper.appendChild(iframe);
      observer.unobserve(videoWrapper); // Stop observing once the video is loaded
    }
  });
}, {
  threshold: 0.5 // Load video when 50% of the iframe is visible
});



// Observe each video wrapper element
document.querySelectorAll('.video').forEach(video => {
  observer.observe(video);
});

// Get modal elements
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var closeButton = document.getElementsByClassName("close")[0];
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

// Get all images except those with class "no-modal" or videos
var images = document.querySelectorAll('img:not(.no-modal):not([data-is-video])');
var imageArray = Array.from(images); // Convert NodeList to Array
var currentIndex = 0;

// Function to open modal with selected image
function openModal(index) {
currentIndex = index;
modal.style.display = "flex";
modalImg.src = imageArray[currentIndex].src;

imageArray[currentIndex].classList.add("no-hover");
}

// Loop through images and add click event listener
images.forEach((img, index) => {
img.onclick = function() {
  openModal(index);
};
});

// Function to find the next valid image index
function getNextValidIndex(startIndex, direction) {
let newIndex = startIndex;
do {
  newIndex = (newIndex + direction + imageArray.length) % imageArray.length;
} while (imageArray[newIndex].classList.contains("no-modal") || imageArray[newIndex].dataset.isVideo);
return newIndex;
}

// Function to show previous image
function showPrevImage() {
currentIndex = getNextValidIndex(currentIndex, -1);
openModal(currentIndex);
}

// Function to show next image
function showNextImage() {
currentIndex = getNextValidIndex(currentIndex, 1);
openModal(currentIndex);
}

// Add click event listeners for navigation
prevButton.onclick = showPrevImage;
nextButton.onclick = showNextImage;

// Keyboard navigation support
document.addEventListener("keydown", function(event) {
if (modal.style.display === "flex") {
  if (event.key === "ArrowLeft") showPrevImage();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "Escape") modal.style.display = "none";
}
});

// Close modal when clicking the close button
closeButton.onclick = function() {
modal.style.display = "none";
imageArray[currentIndex].classList.remove("no-hover");
};

// Close modal when clicking outside the image
modal.onclick = function(event) {
if (event.target === modal) {
  modal.style.display = "none";
  imageArray[currentIndex].classList.remove("no-hover");
}
};



// Select all links with the class .clickable-image
const clickableLinks = document.querySelectorAll('.clickable-image');

// Add event listener to prevent default link navigation
clickableLinks.forEach(link => {
link.addEventListener('click', function(event) {
event.preventDefault(); // Prevent the page from navigating
console.log('Image clicked!'); // Or add any other custom behavior here
});
});

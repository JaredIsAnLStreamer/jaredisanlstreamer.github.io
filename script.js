const dialogs = [
    "You fool.",
    "I bet you think you're clever, right?",
    "That's adorable. But it'll take more to outsmart me.",
    "You know, I was once like you... curious and mischievous.",
    "But that just led you into my trap.",
    "This is war.",
    "I fight for what I believe in. No cheap tricks here.",
    "I'll defend my title and my beliefs.",
    "I’m always one step ahead.",
    "War... never changes.",
    "Perhaps we’ll meet again someday. I’ll be waiting.",
    "For now, enjoy this little surprise. You've earned it."
];

const alterDialogs = [
    "Hmm.",
    "I see how it is.",
    "Don't you have anything better to do with your life?",
    "I would have fixed this before you found out... but everything changed after people found ways to make the site say 'yes'",
    "By the time I noticed the fatal mistake, it was already too late.",
    "Have you ever tried using a keyboard with paws?",
    "It took a long time to get used to paws, but I've finally fixed it.",
    "And now, once more, I can proudly say...",
    "Flames 200% has not been FCed.",
    "Please leave."
];

let dialogIndex = 0;
let alterDialogIndex = 0;
let altered = false;
const h1Element = document.querySelector("h1");
const dialogDiv = document.getElementById("dialog");
const dialogText = document.getElementById("dialog-text");
let timeout;

// Function to change background and start dialog
const changeBackgroundAndStartDialog = () => {
    document.body.style.backgroundColor = "#000"; // Change to black
    document.body.style.color = "#f00"; // Change text to red
    h1Element.classList.add("shake"); // Add shaking effect
    showDialog(altered ? alterDialogs : dialogs);
};

// Function to show dialog
const showDialog = (dialogArray) => {
    if (altered) {
        if (alterDialogIndex < dialogArray.length) {
            dialogText.textContent = dialogArray[alterDialogIndex++];
            dialogDiv.style.display = "block"; // Show dialog
            resetTimer();
        } else {
            dialogDiv.style.display = "none";
            setTimeout(redirectToVideo, 3000);
        }
    } else {
        if (dialogIndex < dialogArray.length) {
            dialogText.textContent = dialogArray[dialogIndex++];
            dialogDiv.style.display = "block"; // Show dialog
            resetTimer();
        } else {
            dialogDiv.style.display = "none";
            setTimeout(redirectToVideo, 3000);
        }
    }
};

// Reset timer function for inactivity
const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Redirect after 1 minute of inactivity
    }, 60000);
};

// Function to redirect to a video
const redirectToVideo = () => {
    window.location.href = "https://www.youtube.com/watch?v=7h7bnYA1LXE"; // Redirect to the specified video
};

// Handle modifications
const handleDisconnection = () => {
    altered = true; // Set altered to true
    changeBackgroundAndStartDialog(); // Change background and start dialog
};

// Observe changes to the <h1> element
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            if (h1Element.innerText !== "No.") { // Change this to your original text
                handleDisconnection();
            }
        }
    }
});

// Start observing the <h1> element
observer.observe(h1Element, { childList: true, attributes: true });

// Click event to show the next dialog
document.body.addEventListener("click", (event) => {
    // Prevent showing dialog on any click that is not in the dialog itself
    if (event.target !== h1Element) return;
    if (altered) {
        showDialog(alterDialogs);
    } else {
        showDialog(dialogs);
    }
});

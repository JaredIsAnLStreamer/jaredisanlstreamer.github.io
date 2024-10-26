const initialDialogs = [
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

const changeBackgroundAndStartDialog = () => {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#f00";
    h1Element.classList.add("shake");
    showDialog(initialDialogs);
};

const showDialog = (dialogArray) => {
    if (altered) {
        if (alterDialogIndex < dialogArray.length) {
            dialogText.textContent = dialogArray[alterDialogIndex++];
        } else {
            dialogDiv.style.display = "none";
            setTimeout(redirectToVideo, 3000);
        }
    } else {
        if (dialogIndex < dialogArray.length) {
            dialogText.textContent = dialogArray[dialogIndex++];
            dialogDiv.style.display = "block";
            resetTimer();
        } else {
            dialogDiv.style.display = "none";
            setTimeout(redirectToVideo, 3000);
        }
    }
};

const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Redirect after 1 minute of inactivity
    }, 60000);
};

const redirectToVideo = () => {
    window.location.href = "https://www.youtube.com/watch?v=7h7bnYA1LXE"; // Redirect to the specified video
};

const mutationObserver = new MutationObserver(() => {
    if (h1Element.innerText !== "No." && !altered) {
        altered = true;
        changeBackgroundAndStartDialog(alterDialogs);
    }
});

mutationObserver.observe(h1Element, { characterData: true, childList: true, subtree: true });

document.body.addEventListener("click", () => {
    if (altered) {
        showDialog(alterDialogs);
    } else {
        showDialog(initialDialogs);
    }
});

// Initialize the dialog when the page loads
changeBackgroundAndStartDialog(initialDialogs);

// Select all boxes, the reset button, and modal elements
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let winnerModal = document.querySelector("#winnerModal");
let winnerMessage = document.querySelector("#winner");
let newGameButton = document.querySelector("#newGame");

let turnO = true;

// Win patterns to check for a winner
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a win
function checkWin() {
    const boxValues = Array.from(boxes).map(box => box.innerText);

    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        if (boxValues[a] && boxValues[a] === boxValues[b] && boxValues[a] === boxValues[c]) {
            showWinner(boxValues[a]); // Show modal with the winner
            return;
        }
    }

    // Check for a draw if all boxes are filled
    if (boxValues.every(value => value !== "")) {
        showWinner("No one"); // Show modal with draw message
    }
}

// Function to show the winner modal
function showWinner(winner) {
    winnerMessage.innerText = winner;
    winnerModal.style.display = "flex"; // Show the modal
}

// Function to reset the game
function resetGame() {
    boxes.forEach(box => box.innerText = "");
    turnO = true; // Reset to "O" starting
    winnerModal.style.display = "none"; // Hide the modal
}

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only allow turn if the box is empty
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO; // Toggle turn
            checkWin(); // Check if this move led to a win
        }
    });
});

// Event listener for reset button
resetButton.addEventListener("click", resetGame);

// Event listener for new game button in modal
newGameButton.addEventListener("click", resetGame);

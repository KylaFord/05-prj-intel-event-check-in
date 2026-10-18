//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Track attendance
let count = 0;
const maxCount = 50;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Update total count and progress bar
  count = count + 1;
  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;

  // Update team count
  const teamCounter = document.getElementById(`${team}Count`);
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  greeting.textContent = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  // Celebrate when the attendance goal is reached
  if (count === maxCount) {
    const waterCount = parseInt(document.getElementById("waterCount").textContent);
    const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
    const powerCount = parseInt(document.getElementById("powerCount").textContent);

    let winningTeam = "water";
    let winningName = "Team Water Wise";
    let highest = waterCount;

    if (zeroCount > highest) {
      winningTeam = "zero";
      winningName = "Team Net Zero";
      highest = zeroCount;
    }
    if (powerCount > highest) {
      winningTeam = "power";
      winningName = "Team Renewables";
      highest = powerCount;
    }

    document.querySelector(`.team-card.${winningTeam}`).classList.add("winner");
    greeting.textContent = `🏆 Goal reached! ${winningName} wins with ${highest} attendees!`;
  }

  form.reset();
});

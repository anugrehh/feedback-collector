const submitBtn = document.getElementById("submitBtn");
const feedbackList = document.getElementById("feedbackList");
const counter = document.getElementById("counter");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

const API_URL = "http://localhost:5000";

// Load feedbacks when page opens
window.onload = () => {
    loadFeedbacks();
};

// Submit Feedback
submitBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const rating = document.getElementById("rating").value;

    if (!name || !message) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/addFeedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                message,
                rating
            })
        });

        const data = await response.json();

        alert(data.message);

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
        document.getElementById("rating").value = "5";

        loadFeedbacks();

    } catch (error) {
        console.log(error);
        alert("Failed to save feedback");
    }
});

// Load All Feedbacks
async function loadFeedbacks() {

    try {

        const response = await fetch(`${API_URL}/feedbacks`);
        const feedbacks = await response.json();

        feedbackList.innerHTML = "";

        counter.textContent =
            `Total Feedbacks: ${feedbacks.length}`;

        feedbacks.reverse().forEach(feedback => {

            feedbackList.innerHTML += `
                <div class="feedback-card">

                    <h3>${feedback.name}</h3>

                    <p>${feedback.message}</p>

                    <p>⭐ ${feedback.rating}</p>

                    <small>
                        ${new Date(
                            feedback.createdAt
                        ).toLocaleString()}
                    </small>

                    <br><br>

                    <button
                        class="deleteBtn"
                        onclick="deleteFeedback('${feedback._id}')">
                        Delete
                    </button>

                </div>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

// Delete Feedback
async function deleteFeedback(id) {

    const confirmDelete = confirm("Delete this feedback?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${API_URL}/feedback/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        await loadFeedbacks();

    } catch (error) {

        console.log(error);
        alert("Delete failed");

    }
}

// Search Feedbacks
searchInput.addEventListener("keyup", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(".feedback-card");

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// Dark Mode
darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {
        darkModeBtn.innerHTML = "☀️ Light Mode";
    } else {
        darkModeBtn.innerHTML = "🌙 Dark Mode";
    }

});
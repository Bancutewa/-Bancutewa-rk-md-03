
const fetchData = async () => {
    const response = await fetch("/api/v1/questions");
    const questions = await response.json();
    return questions;
};
const renderRandomQuestion = async () => {
    const questions = await fetchData();
    const index = Math.floor(Math.random() * (questions.length - 1 - 0) + 0);
    const randomQuestion = questions[index];
    document.getElementById("question-name").innerHTML = randomQuestion.content;

    document.getElementById("like").addEventListener("click", () => handleLike(randomQuestion.id));
    document.getElementById("dislike").addEventListener("click", () => handleDislike(randomQuestion.id));
};

renderRandomQuestion();

const handleLike = async (id) => {
    // Fetch API
    const response = await fetch(`/api/v1/questions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: "like",
        }),
    });
    console.log(response);
    window.location.href = `/question-detail/${id}`;
};

const handleDislike = async (id) => {
    // Fetch API
    const response = await fetch(`/api/v1/questions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: "dislike",
        }),
    });
    console.log(response);
    window.location.href = `/question-detail/${id}`;
};

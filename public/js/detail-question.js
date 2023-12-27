document.addEventListener("DOMContentLoaded", () => {
    // Lấy id từ window.location.href
    const questionID = window.location.href.split("/").pop()
    fetchData(questionID);
});



const fetchData = async (id) => {
    const response = await fetch(`/api/v1/questions/${id}`);
    const question = await response.json();
    renderQuestionDetails(question);
};

const renderQuestionDetails = (question) => {
    document.querySelector(".question-content").innerHTML = question.content;

    const totalVotes = question.like + question.dislike;
    document.querySelector(".vote-number").innerHTML = totalVotes
    const likePercentage = totalVotes === 0 ? 0 : Math.round((question.like / totalVotes) * 100);
    const dislikePercentage = totalVotes === 0 ? 0 : Math.round((question.dislike / totalVotes) * 100);


    const likeBar = document.querySelector('.rate-bar .like');
    const dislikeBar = document.querySelector('.rate-bar .dislike');
    likeBar.innerHTML = likePercentage + "%"
    dislikeBar.innerHTML = dislikePercentage + "%"
    likeBar.style.width = `${likePercentage}%`;
    dislikeBar.style.width = `${dislikePercentage}%`;


    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        window.location.href = "/";
    });
};
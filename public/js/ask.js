document.addEventListener("DOMContentLoaded", () => {
    const questionContentTextarea = document.querySelector('textarea.question-content');
    const letterCountSpan = document.querySelector('span.letter');
    const mainForm = document.querySelector('form.main-form');

    questionContentTextarea.addEventListener('input', () => {
        const content = questionContentTextarea.value.trim();
        console.log(content);
        if (content.length < 200) {
            letterCountSpan.innerHTML = 200 - (content.length)
        } else {
            letterCountSpan.innerHTML = `Vượt quá ký tự`
        }
    }
    );

    mainForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const questionContent = questionContentTextarea.value.trim();

        if (questionContent === '') {
            alert('Textarea không được bỏ trống');
        } else {
            const data = {
                content: questionContent,
                like: 0,
                dislike: 0,
                id: generateRandomArray(13, 1, 10)
            }
            postData('/api/v1/questions', data)
                .then(response => {
                    alert('Thêm câu hỏi thành công');
                    window.location.href = "/";
                })
                .catch(error => {
                    console.error('Error adding question:', error);
                });
        }
    });
});


const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}


const generateRandomArray = (length, min, max) => {
    var randomArray = [];
    for (var i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomArray.join("");
}
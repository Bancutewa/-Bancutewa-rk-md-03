document.addEventListener("DOMContentLoaded", function () {
    const questionContentTextarea = document.querySelector('textarea.question-content');
    const letterCountSpan = document.querySelector('span.letter');
    const mainForm = document.querySelector('form.main-form');

    questionContentTextarea.addEventListener('input', function () {
        const content = questionContentTextarea.value
        console.log(content);
        if (content.length < 200) {
            letterCountSpan.innerHTML = 200 - (content.length)
        } else {
            letterCountSpan.innerHTML = `Vượt quá ký tự`
        }
    }
    );

    mainForm.addEventListener('submit', function (event) {
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


function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}


function generateRandomArray(length, min, max) {
    var randomArray = [];
    for (var i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomArray.join("");
}
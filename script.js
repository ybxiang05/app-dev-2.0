document.addEventListener("DOMContentLoaded", () => {

    const title = document.querySelector(".quiz-title");
    const answers = document.querySelector(".quiz-answers");
    const quizScore = document.querySelector(".score");

    const json = "./src/quiz.json";

    fetch(json).then((response) => {
        return response.json();
    }).then((myJson) => {
        const quizArray = myJson.quizzes;
        console.log(quizArray);

        quizArray.forEach((quiz, index) => {
            const quizChoice = document.createElement('button');
            quizChoice.innerText = quiz.title;
            answers.appendChild(quizChoice);
            quizChoice.addEventListener('click', () => {
                title.innerText = quiz.questions[0].question;
                answers.innerHTML = "";
                console.log(quiz, "22");
                const quizAns = quiz.questions[index].answers;
                console.log(quizAns);
                quizAns.forEach(quesAnswer => {
                    const answerBtn = document.createElement('button');
                    answerBtn.innerText = quesAnswer.content;
                    answers.appendChild(answerBtn);
                    answerBtn.addEventListener('click', () => {
                        console.log(quesAnswer);
                    })
                })
                //forEach
            })
        })




    })

}); //end doc ready

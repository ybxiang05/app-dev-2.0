document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".quiz-title");
    const answers = document.querySelector(".quiz-answers");
    const quizScore = document.querySelector(".score-counter");
    const json = "./src/quiz.json";
    let count = 0;

    fetch(json).then((response) => {
        return response.json();
    }).then((myJson) => {
        const quizArray = myJson.quizzes;
        console.log(quizArray);
        quizArray.forEach((quiz) => {
            const quizChoice = document.createElement('button');
            quizChoice.innerText = quiz.title;
            answers.appendChild(quizChoice);
            quizChoice.addEventListener('click', () => {

                showQuestion(quiz, 0);
            })
        });
        showQuestion = (quiz, index) => {
            title.innerText = quiz.questions[index].question;
            answers.innerHTML = "";
            console.log(quiz, "22");
            const quizAns = quiz.questions[index].answers;
            console.log(Array.isArray(quizAns));
            quizAns.forEach(quesAnswer => {
                const answerBtn = document.createElement('button');
                answerBtn.innerText = quesAnswer.content;
                answers.appendChild(answerBtn);
                answerBtn.addEventListener('click', () => {
                    if (quesAnswer.value === true) {
                        answerBtn.style.backgroundColor = "green";
                        count += 1;
                        quizScore.innerText = " " + count;
                    } else {
                        answerBtn.style.backgroundColor = 'red';
                    }
                    const disableBtns = document.querySelectorAll('button');
                    disableBtns.forEach((btn) => {
                        btn.disabled = true;
                    })
                    console.log(disableBtns);
                    setTimeout(() => {
                        if (index < quiz.questions.length - 1) {
                            showQuestion(quiz, index + 1)
                        } else {
                            let passFail = count / quiz.questions.length;
                            console.log(passFail);
                            if (passFail > 0.5) {
                                title.innerText = "You passed!"
                                answers.innerHTML = `<button>Play Again</button>`
                                playAgain();
                            } else {
                                title.innerText = "You did not pass. Play again?"
                                playAgain();
                            }
                        }
                    }, 2000);
                    playAgain = () => {
                        answers.innerHTML = `<button>Play Again</button>`
                        const playAgainBtn = answers.querySelector('button');
                        playAgainBtn.addEventListener('click', () => { window.location.reload() })
                    }
                })
            })
        }
    })
}); //end doc ready

const progressText = document.querySelector('#progressText')
const progressBar = document.querySelector('#progressBarFull')
const scoreText = document.querySelector('#score')
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.coiche-text'))
const choice_container = Array.from(document.querySelectorAll('.choice-container'))

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaliableQuestion = []

let questions = [
    // Ciencias
    {
        question: 'Qual a matéria que compõe os diamantes?',
        choice1: 'Silício',
        choice2: 'Diamantina',
        choice3: 'Carbono',
        choice4: 'Grafite',
        answer: 3,
    },

    {
        question: 'Quem foi o primeiro ganhador do prêmio Nobel em física?',
        choice1: 'Albert Einstein',
        choice2: 'Isaac Newton',
        choice3: 'Max Plank',
        choice4: 'Wilhelm Röntgen',
        answer: 4,
    },

    {
        question: 'Quem foi o criador oficial do rádio?',
        choice1: 'Alexander Graham Bell',
        choice2: 'Nikola Tesla',
        choice3: 'Alfred Nobel',
        choice4: 'Tim Berners-Lee',
        answer: 2,
    },

    {
        question: 'Quem propôs o primeiro modelo atômico?',
        choice1: 'John Dalton',
        choice2: 'Ernest Rutherford',
        choice3: 'Niels Bohrn',
        choice4: 'Joseph Thompson',
        answer: 1,
    },
    {
        question: 'O que é "supernova" em astronomia?',
        choice1: 'Um planeta',
        choice2: 'A morte de uma estrela',
        choice3: 'Nome de uma ferramenta',
        choice4: 'Uma teoria',
        answer: 2,
    },
    // tecnologia
    {
        question: 'Qual é o dobro de um sistema de computador 32 bit',
        choice1: '64 bit',
        choice2: '8 bytes',
        choice3: '33 bit',
        choice4: 'nenhum',
        answer: 3,
    },
    {
        question: 'Quem foi a primeira pessoa a fazer um programa de computador?',
        choice1: 'Alan Turing',
        choice2: 'Bill Gates',
        choice3: 'Steve Jobs',
        choice4: 'Ada Lovalace',
        answer: 4,
    },
    {
        question: 'Quem criou o sistema operacional de computadores "Linux"?',
        choice1: 'Linus Torvald',
        choice2: 'Guido Van Rossum',
        choice3: 'Richard Stallman',
        choice4: 'Grace Murray Hooper',
        answer: 1,
    },
    {
        question: 'Qual o maior polo de tecnologia do mundo?',
        choice1: 'Tóquio',
        choice2: 'China',
        choice3: 'Vale do Silício',
        choice4: 'Singapura',
        answer: 3,
    },
    {
        question: 'O que é "Eniac"?',
        choice1: 'Uma linguagem de programação',
        choice2: 'Primeiro computador digital eletrônico',
        choice3: 'Um desenvolvedor de software',
        choice4: 'Um componente de hardware',
        answer: 2,
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = questions.length

starGame = () => {
    questionCounter = 0
    score = 0
    avaliableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(avaliableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/html/quiz-saveScore.html')
    }
    console.log(avaliableQuestion);
    questionCounter++;
    progressText.innerText = `questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBar.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

   const questionIndex = Math.floor(Math.random() * avaliableQuestion.length)
    currentQuestion = avaliableQuestion[questionIndex]

    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' +number]
    })
    avaliableQuestion.splice(questionIndex, 1)

}
choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        answer = currentQuestion.answer
        const rightAnswer = document.querySelector(`.coiche-text[data-number="${answer}"]`)
        
        let addingClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(addingClass === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        else{
            
            console.log(rightAnswer);
            rightAnswer.parentElement.classList.add('correct')
        }
        selectedChoice.parentElement.classList.add(addingClass)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(addingClass)
            rightAnswer.parentElement.classList.remove('correct')
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

starGame()

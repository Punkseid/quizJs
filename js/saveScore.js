const finalScore = document.querySelector('#finalScore')
const userName = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScore = JSON.parse(localStorage.getItem('highScore')) || []

const MAX_HIGH_SCORE = 5

finalScore.innerText = mostRecentScore

userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !userName.value
   
})

saveHighScore = e =>{
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userName.value
    }
    
    highScore.push(score)
    
    highScore.sort((a, b) => {
        return b.score - a.score
    })

    highScore.splice(5)

    localStorage.setItem('highScore', JSON.stringify(highScore))
    window.location.assign('../index.html')
}
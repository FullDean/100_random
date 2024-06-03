let questions = []
let questions_passees = []
let rand
let question = document.querySelector('.question')
let btn_vilain = document.querySelector('.vilain')
let div = document.querySelector('.contain')
let son = new Audio("sound/microwave.mp3")
let score = 0
let max = 65

function generer_random(){
    return Math.floor(Math.random() * (max - 1))
}

function loadData(){
    let ajax = new XMLHttpRequest()
    ajax.open("GET", "data.txt", true)
    ajax.setRequestHeader("Content-type", "application/json; charset=utf-8")
    ajax.send()
    ajax.onreadystatechange = ()=>{
        questions = ajax.response.split('\n')
        questions.forEach((elt, i) => {
            questions[i] = elt.split(". ")
        })
        rand = generer_random()
        questions_passees.push(rand)
        question.innerHTML = `<span>${questions[rand][0]}</span> ${questions[rand][1]}`
    }
}

function next(){
    rand = generer_random()
    if(questions_passees.indexOf(rand) > -1){
        next()
    }else{
        son.play()
        score++
        questions_passees.push(rand)
        question.innerHTML = `<span>${questions[rand][0]}</span> ${questions[rand][1]}`

        if(score == 10){
            div.style.height = "400px"
            btn_vilain.style.opacity = 1
        }
    }
}

function hot(){
    max = 96
    next()
}

window.onload = ()=>{
    loadData()
}
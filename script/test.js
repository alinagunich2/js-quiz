(function(){
    const Test = {
        nextButtonElement:null,
        passButtonElement: null,
        prevButtonElement:null,
        questionTitleElement: null,
        optionsElement: null,
        quiz:null,
        currentOuestionIndex:1,
        
        init(){
            checkUserData()
            const url = new URL(location.href)
            const testId = url.searchParams.get('id')

            if(testId){
                const xhr = new XMLHttpRequest()
                xhr.open('GET', 'https://testologia.site/get-quiz?id='+testId, false)
                xhr.send()
                if(xhr.status===200 && xhr.responseText){
                    try{
                        this.quiz = JSON.parse(xhr.responseText)
                    }catch(e){
                        location.href = 'index.html'
                    }
                    this.startQuiz()
                }else{
                    location.href = 'index.html'
                }
            }else{
                location.href='index.html'
            }
        },
       
        startQuiz(){
            console.log(this.quiz)
            this.questionTitleElement = document.getElementById('title')
            this.optionsElement = document.getElementById('options')

            this.nextButtonElement = document.getElementById('next')
            this.nextButtonElement.onclick = this.move.bind(this, 'next')

            this.passButtonElement = document.getElementById('pass')
            this.passButtonElement.onclick = this.move.bind(this, 'pass')

            this.prevButtonElement = document.getElementById('prev')
            this.prevButtonElement.onclick = this.move.bind(this, 'prev')


            this.showQuestion()
        },
        showQuestion(){
            const activeQuestion = this.quiz.questions[this.currentOuestionIndex-1]

            this.questionTitleElement.innerHTML =  '<span>Вопрос: '+this.currentOuestionIndex+'</span> '+activeQuestion.question

            this.optionsElement.innerHTML=''
            const that = this
            activeQuestion.answers.forEach(answer=>{
                const optionElement = document.createElement('div')
                optionElement.className = 'test-question-option'

                const inputId = 'answer-'+answer.id;
                const inputElement = document.createElement('input');
                inputElement.setAttribute('id', inputId)
                inputElement.setAttribute('type', 'radio')
                inputElement.setAttribute('name', 'answer')
                inputElement.setAttribute('value', answer.id)

                inputElement.onchange = function(){
                    that.chooseAnswer()
                }

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId)
                labelElement.innerText = answer.answer

                optionElement.appendChild(inputElement)
                optionElement.appendChild(labelElement)

                this.optionsElement.appendChild(optionElement)

            })
            this.nextButtonElement.setAttribute('disabled', 'disabled')

            if(this.currentOuestionIndex === this.quiz.questions.length){
                this.nextButtonElement.innerText = 'Завершить'
            }else{
                this.nextButtonElement.innerText = 'Дальше'
            }
            if(this.currentOuestionIndex>1){
                this.prevButtonElement.removeAttribute('disabled')
            }
        },
        chooseAnswer(){
            this.nextButtonElement.removeAttribute('disabled')
        },
        move(action){
            if(action==='next'||action==='pass'){
                this.currentOuestionIndex++
            }else{
                this.currentOuestionIndex--
            }
            this.showQuestion()
        }
    }
    Test.init()
})()
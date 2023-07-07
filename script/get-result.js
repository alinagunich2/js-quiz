(function(){
    const Test = {
        quiz:null,
        iDTest: null,
        idRightAnswers:[],
        idUserResultAnswer:[],
        init(){
            const url = new URL(location.href)
            const testId = url.searchParams.get('id')
            this.iDTest=testId
            this.idUserResultAnswer = url.searchParams.get('result').split(',').map(Number)
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
                    this.showAllQuestion()
                    this.checkAnswer()
                }else{
                    location.href = 'index.html'
                }
            }else{
                location.href='index.html'
            }
        },
        showAllQuestion(){
        
        document.getElementById('title-test').innerText = this.quiz.name

        let that = this.quiz.questions
            const result = document.getElementById('test-question')

            let content = ''

        let getAnswer = (questionIndex)=>{
            return that[questionIndex].answers.map((answers)=>{
                return `<div class="test-question-option">
                            <input class='question-input' type="radio" id="${answers.id}" name="answer">
                            <label for="answer-one">${answers.answer}</label>
                        </div>`
            })
            .join('')
        }

            this.quiz.questions.forEach((questions, index)=>{
                content+=`
                <div class="big-question test-question-title" >
                    <span>Вопрос: ${index+1}</span> ${questions.question}
                </div>
                <div class="test-question-options">${getAnswer(index)}
                </div>
                `
            })
            result.innerHTML = content
        },
        checkAnswer(){
            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'https://testologia.site/get-quiz-right?id='+this.iDTest, false)
            xhr.send()
            if(xhr.status===200 && xhr.responseText){
                try{
                    this.idRightAnswers = JSON.parse(xhr.responseText)
                }catch(e){
                    location.href = 'index.html'
                }
            }else{
                location.href = 'index.html'
            }


            for(let i = 0; i<this.idRightAnswers.length;i++){
                if(this.idUserResultAnswer[i]===this.idRightAnswers[i]){
                    let input = document.getElementById(String(this.idRightAnswers[i]))
                    input.style.border='3px solid #5FDC33'
                    input.nextElementSibling.style.color='#5FDC33'
                }else{
                    let input = document.getElementById(String(this.idRightAnswers[i]))
                    input.style.border='3px solid #DC3333'
                    input.nextElementSibling.style.color='#DC3333'
                }
            }
            
        }
    }
    Test.init()
})()
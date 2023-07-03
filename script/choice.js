(function(){
    const Choice = {
        init(){
            checkUserData ()

            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'https://testologia.site/get-quizzes', false)
            xhr.send()

            if(xhr.status===200 && xhr.responseText){
                try{
                    this.quizzez = JSON.parse(xhr.responseText)
                }catch(e){
                    location.href = 'index.html'
                }
            }else{
                location.href = 'index.html'
            }
        },
        
    }

    Choice.init()
})()
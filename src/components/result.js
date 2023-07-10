
  export  class Result {
        constructor(){
            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score') +'/' + url.searchParams.get('total');

            this.showAnswer();
        }

        showAnswer(){
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const name = url.searchParams.get('name');
            const lastName = url.searchParams.get('lastName');
            const result = url.searchParams.get('result');
            const email = url.searchParams.get('email')

            document.getElementById('result-score').onclick = function () {
                        location.href = 'get-result.html?id=' + id + "&name=" + name +
                            "&lastName=" +"&lastName="+email+ lastName+'&id=' + id + "&result=" +result;
            }
        }
    }


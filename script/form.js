(function(){
    const Form = {
        fields:[
            {
                name:"name",
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
            },
            {
                name:'lastName',
                id:'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
            },
            {
                name:'email',
                id: 'email',
                element: null,
                regex: /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            }, 
        ],
        init(){
            const that = this;
            this.fields.forEach((itm)=>{
                itm.element = document.getElementById(itm.id)
                itm.element.onchange = function(){
                    that.validateField.call(that, itm, this); 
                }
            })

            

        },
        validateField(field,element){
            if(!element.value || !element.value.match(field.regex)){ 
                element.parentNode.style.borderColor = 'red'
            }else{
                element.parentNode.removeAttribute('style')
            }
            this.validateForm()
        },
        validateForm(){

        }
    };

    Form.init()
})();


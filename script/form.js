(function(){
    const Form = {
        agreeElement: null,
        processElement: null,
        fields:[
            {
                name:"name",
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name:'lastName',
                id:'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name:'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
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

            this.processElement = document.getElementById('process')
            this.processElement.onchange=function(){

            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function(){
                that.validateForm()
            }

        },
        validateField(field,element){
            if(!element.value || !element.value.match(field.regex)){ 
                element.parentNode.style.borderColor = 'red'
                field.valid=false
            }else{
                element.parentNode.removeAttribute('style')
                field.valid=true
            }
            this.validateForm()
        },
        validateForm(){
            const validForm = this.fields.every(itm => itm.valid)
            if(this.agreeElement.checked && validForm){
                this.processElement.removeAttribute('disabled')
            }else{
                this.processElement.setAttribute('disabled', 'disabled')
            }
        }
    };

    Form.init()
})();


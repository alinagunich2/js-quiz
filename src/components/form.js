
  export  class Form  {

constructor(){
    this.agreeElement=null;
    this.processElement= null;
    this.fields =[
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
    ];

    const that = this;
            this.fields.forEach((itm)=>{
                itm.element = document.getElementById(itm.id)
                itm.element.onchange = function(){
                    that.validateField.call(that, itm, this); 
                }
            })

            this.processElement = document.getElementById('process')
            this.processElement.onclick=function(){
                that.processForm()
            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function(){
                that.validateForm()
            }
}

        validateField(field,element){
            if(!element.value || !element.value.match(field.regex)){ 
                element.parentNode.style.borderColor = 'red'
                field.valid=false
            }else{
                element.parentNode.removeAttribute('style')
                field.valid=true
            }
            this.validateForm()
        }
        validateForm(){
            const validForm = this.fields.every(itm => itm.valid)
            const isValid = this.agreeElement.checked && validForm
            if(isValid){
                this.processElement.removeAttribute('disabled')
            }else{
                this.processElement.setAttribute('disabled', 'disabled')
            }
            return isValid
        }
        processForm(){
            if(this.validateForm()){
                
                let paramString = ''
                this.fields.forEach(itm=>{
                    paramString += (!paramString ? '?':'&') + itm.name + '=' + itm.element.value
                })

                location.href='choice.html'+paramString
            }
        }
    };



export class Router{
    constructor(){
        this.routes=[
             {
                route: '#/',
                title:'Главная',
                template:'template/index.html',
                styles:'styles/index.css',
                load:()=>{
                    
                }
             },
        ]
    }
}
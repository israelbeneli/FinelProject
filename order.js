
export class Order{
    orderNumber; 
    user; 
    prodactarrey=[]; 
    totalprice=0;
    constructor(user,prodactarrey){
        this.orderNumber = Number(JSON.parse(localStorage.getItem("ordernumber")))+1;
        this.user=user;
        this.prodactarrey=prodactarrey;
        for(let i=0; i<this.prodactarrey.length; i++){
            this.totalprice+=Number(this.prodactarrey[i].price);
        }
    localStorage.setItem("ordernumber",JSON.stringify(this.orderNumber));
    };

}

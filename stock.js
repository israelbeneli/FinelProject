export class Stock{
    prodactarrey;
    constructor(){
        this.prodactarrey=[];
    }
    addProdactToStock(prodact , quantity){
        this.prodactarrey.push([prodact,quantity]);    
        localStorage.setItem("stock",JSON.stringify(this.prodactarrey));

    }
    removefromstock(prodactid , quantity){
        this.prodactarrey = JSON.parse(localStorage.getItem("stock"));        for(let i = 0 ; i<this.prodactarrey.length;i++){
            if (this.prodactarrey[i][0].prodactNumber == prodactid){
                if (this.prodactarrey[i][1]-quantity>=0){
                    this.prodactarrey[i][1]=this.prodactarrey[i][1]-quantity;
                    localStorage.setItem("stock",JSON.stringify(this.prodactarrey));
                    return true;
                }
                else{
                    alert("אין מספיק מלאי ממוצר זה");
                    return false;
                }
            }   
        }
        alert("המוצר לא קיים במערכת");
    }
    
    chackifinstock(prodactid){
        for(let i=0;i<this.prodactarrey.length;i++){
            if(prodactid == this.prodactarrey[i][0].prodactNumber){
                if (this.prodactarrey[i][1]>0){
                        return true;
                    }
                }
            }
            return false;
        }
    
    chackifexist(prodact){
        for(let i=0;i<this.prodactarrey.length;i++){
            if(prodact.prodactNumber == this.prodactarrey[i][0].prodactNumber){
                return true;
            }
        }
        return false;
    }
    addunitstoexistitem(prodact,units){
        for(let i=0;i<this.prodactarrey.length;i++){
            if(prodact.prodactNumber == this.prodactarrey[i][0].prodactNumber){
                this.prodactarrey[i][1]+= units;
            }
        }
        localStorage.setItem("stock",JSON.stringify(this.prodactarrey));
    }
}
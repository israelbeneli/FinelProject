import { Stock } from "./stock.js";
import { User } from "./user.js";
import { Prodact } from "./prodact.js";
import { Order } from "./order.js";
// export class Mystore{
//     usersArrey=[];
//     prodactarrey=[];
//     ordersarrey=[];
//     arreyofprodact=[];
//     s=new Stock();
//     constructor(name){
//         this.storename=name;
//         this.
//     }
// }

let usersArrey =[];
let prodactarrey = [];
let ordersarrey = [];
let s = new Stock();
let arreyofprodact = [];
refreshinput();

ordersarrey= JSON.parse(localStorage.getItem("orders")) || [];
s.prodactarrey= JSON.parse(localStorage.getItem("stock")) || [];
//כפתור הוספה לסל הקניות

let newButton = document.createElement("button");
let placeforbutton = document.getElementById("placeForbutton");
newButton.innerText = "לחץ כאן להוספה";
newButton.addEventListener("click",addTobasket);
placeforbutton.appendChild(newButton); 
//כפתור סיום הזמנה והכנסת ההזמנה למערכת        
let button1 = document.createElement("button"); 
let placetobutton2 = document.getElementById("buttonaddorder");
button1.innerText="סיום הזמנה";
let orderNumber = document.getElementById("ordernumber");
orderNumber.innerText = Number(JSON.parse(localStorage.getItem("ordernumber")));
button1.addEventListener("click",addtoorders);
placetobutton2.appendChild(button1); 

// כפתור להוספת לקוח חדש
let buttontoadduser = document.getElementById("addUserButton");  
buttontoadduser.addEventListener("click",()=>{
    if (is_israeli_id_number(Number(document.getElementById("inputid").value))==false){
        alert("is not israeli id");
    }
    else{
        let pFi = document.getElementById("inputid").value;
        let pFu = document.getElementById("inputusername").value;
        let pFp = document.getElementById("inputphone").value;
        let newUser = new User(pFi,pFu,pFp);
        usersArrey =JSON.parse(localStorage.getItem("users"))||[];
        usersArrey.push(newUser);
        localStorage.setItem("users",JSON.stringify(usersArrey));
    }

    refreshinput();
    clear("inputid");
    clear("inputusername");
    clear("inputphone");
});
// כפתור להוספת מוצר חדש
let buttontoaddprodact = document.getElementById("addProdactButton");  
buttontoaddprodact.addEventListener("click",()=>{
    let pFb = document.getElementById("inputbarcode").value;
    let pFn = document.getElementById("inputname").value;
    let pFp = document.getElementById("inputprice").value;
    if(chackifbarcodeisok(pFb)==true){
        let newProdact = new Prodact(pFb,pFn,pFp);
        prodactarrey = JSON.parse(localStorage.getItem("prodacts"))|| [];
        prodactarrey.push(newProdact);
        localStorage.setItem("prodacts",JSON.stringify(prodactarrey));
        refreshinput();
        clear("inputbarcode");
        clear("inputname");
        clear("inputprice");
    }
    refreshviewprodacts();
});

// כפתור להוספת מוצר למלאי החנות
let buttontoaddToStock =document.getElementById("addProdactToStockBTN");
buttontoaddToStock.addEventListener("click",()=>{
    let prodactinput = document.getElementById("prodactToAddToStock").value;
    let unitinput = Number(document.getElementById("inputunit").value);
    prodactinput= getidfrombeginingstring(prodactinput);
    prodactinput = getprodact(prodactinput);
    s.prodactarrey = JSON.parse(localStorage.getItem("stock"));
    if (s.chackifexist(prodactinput) == false){
        s.addProdactToStock(prodactinput,unitinput);
        alert("המוצר התווסף למלאי");
    }
    else{
        s.addunitstoexistitem(prodactinput,unitinput);
        alert(" המוצר התווסף למלאי הקיים");
    }

    clear("inputunit");
    refreshviewstock();
});

// קביעת כפתורי ההצגה 

let stockviewB = document.getElementById("stockview");
stockviewB.addEventListener("click",refreshviewstock);

let prodactsviewB = document.getElementById("prodactsview");
prodactsviewB.addEventListener("click",refreshviewprodacts);

let custumersviewB = document.getElementById("custumersview");
custumersviewB.addEventListener("click",refreshviewcustumers);

let ordersviewB = document.getElementById("orderview");
ordersviewB.addEventListener("click",refreshvieworders);
//פונקציה לכפתור הצג סטוק
function refreshviewstock(){
    let place = document.getElementById("stock");
    let newUL = document.createElement("ul");
    place.innerText="";
    for (let i = 0; i<s.prodactarrey.length; i++){
        let newli = document.createElement("il");
        newli.innerText = " שם המוצר: " + s.prodactarrey[i][0].name + " כמות במלאי: "+ s.prodactarrey[i][1];
        let newbr = document.createElement("br");
        newUL.appendChild(newli);
        newUL.appendChild(newbr);
    }
    place.appendChild(newUL);
}
//פונקציה לכפתור הצג רשימת מוצרים
function refreshviewprodacts(){    
    let place = document.getElementById("prodact");
    let newUL = document.createElement("ul");
    place.innerText="";
    for (let i = 0; i<prodactarrey.length; i++){
        let newli = document.createElement("il");
        newli.innerText = " שם המוצר: " + prodactarrey[i].name + " מחיר : "+ prodactarrey[i].price;
        let newbr = document.createElement("br");
        newUL.appendChild(newli);
        newUL.appendChild(newbr);
    }
    place.appendChild(newUL);
}
//פונקציה לכפתור הצג רשימת לקוחות כולל הוספת כפתור מחיקה לכל לקוח
function refreshviewcustumers(){
    let place = document.getElementById("custumers");
    let newUL = document.createElement("ul");
    place.innerText="";
    for (let i = 0; i<usersArrey.length; i++){
        let newli = document.createElement("il");
        newli.setAttribute("id",i);
        newli.innerText = " שם הלקוח: " + usersArrey[i].name + " טלפון : "+ usersArrey[i].phone;
        let newbr = document.createElement("br");
        newUL.appendChild(newli);
        newUL.appendChild(newbr);
        let delbuttonc = document.createElement("button");
        delbuttonc.setAttribute("class","delbutoon");
            delbuttonc.innerText = "del";
            newli.appendChild(delbuttonc);
            delbuttonc.addEventListener("click",()=>{
                removeuser(usersArrey[i]);
                usersArrey =JSON.parse(localStorage.getItem("users"))||[];
                refreshviewcustumers();
                refreshinput();
            });
    }
    place.appendChild(newUL);
}
//פונקצית עזר למחיקת לקוח מהמאגר
function removeuser(user){
    for (let i = 0; i < usersArrey.length; i++) {
        if(usersArrey[i]==user){
            usersArrey.splice(i,1);
        }  
    }
    localStorage.setItem("users",JSON.stringify(usersArrey));
}
//פונקציה להצגת כל ההזמנות
function refreshvieworders(){
    let place = document.getElementById("allOrders");
    let newUL = document.createElement("ul");
    place.innerText="";
    for (let i = 0; i<ordersarrey.length; i++){
        let newli = document.createElement("il");
        newli.innerText = " מספר הזמנה: " + ordersarrey[i].orderNumber + " שם הלקוח : "+ ordersarrey[i].user.name  + " סך הכל להזמנה: " + ordersarrey[i].totalprice;
        let newbr = document.createElement("br");
        newUL.appendChild(newli);
        newUL.appendChild(newbr);
    }
    place.appendChild(newUL);
}
// פונקציה שבודקת האם המספר פריט נמצא כבר 
function chackifbarcodeisok(barcodetochack){
    for (let i =0; i<prodactarrey.length; i++){
        if(Number(prodactarrey[i].prodactNumber) == Number(barcodetochack)){
            alert("קיים מוצר עם מספר דומה")
            return false;
        }
    }
    return true;
}

// פונקציה למחיקת שורה בדף
function clear(id){
   document.getElementById(id).value=null; 
}

// פונקציה לרענון שורות סלקט
function refreshinput(){
    usersArrey =JSON.parse(localStorage.getItem("users")) || []   ;
    prodactarrey = JSON.parse(localStorage.getItem("prodacts")) || [];
    let a = document.getElementById("userlist");
    a.innerText = "";
    usersArrey.forEach(user => {
        let d = document.createElement("option");
        d.innerText = [user.id,user.name] ; 
        a.appendChild(d);
    });
    let b = document.getElementById("prodactToAdd");
    let placeInStock = document.getElementById("prodactToAddToStock");
    b.innerText = "";
    placeInStock.innerText = "";
    prodactarrey.forEach(prodact => {
        let d = document.createElement("option");
        let sp = document.createElement("option");
        d.innerText = [prodact.prodactNumber,prodact.name,prodact.price]; 
        sp.innerText = [prodact.prodactNumber,prodact.name];
        b.appendChild(d);  
        placeInStock.appendChild(sp);
    });
}
//פונקציה שמחזירה את הסכום הכולל של סל הקניות
function totalprice(arrey){
    let total=0;
    for (let i = 0; i < arrey.length; i++) {
        total+= Number(arrey[i].price);
    }
    return(total);
}
// פונקציה פועלת בזמן לחיצה על כפתור הוספה לסל
function addTobasket(){ 
    let userinorder = document.getElementById("userlist").value;
    let prodactToAdd = document.getElementById("prodactToAdd").value;
    let placefornameinbasket = document.getElementById("nameofuser");
        prodactToAdd = getidfrombeginingstring(prodactToAdd);
        if (s.chackifinstock(prodactToAdd)==true){
            placefornameinbasket.innerText = userinorder;   
            s.removefromstock(prodactToAdd,1);
            let placeOfProdactList = document.getElementById("listofprodacts");
            let newli = document.createElement("li");
            newli.setAttribute("class","list")
            newli.innerText = getProdactNameAndPrice(prodactToAdd);
            arreyofprodact.push(getprodact(prodactToAdd));
            let placetotal = document.getElementById("totalprice");
            placetotal.innerText = totalprice(arreyofprodact);
            placeOfProdactList.appendChild(newli);  
            let userid = getidfrombeginingstring(userinorder);
            console.log(userid);
            let delbutton = document.createElement("button");
            delbutton.setAttribute("class","delbutoon")
            delbutton.innerText = "del";
            placeOfProdactList.appendChild(delbutton);
            delbutton.addEventListener("click",()=>{
                prodactToAdd = getprodact(prodactToAdd);
                s.addunitstoexistitem(prodactToAdd,1);
                removeprodactfromorder(prodactToAdd);
                let placetotal = document.getElementById("totalprice");
                placetotal.innerText = totalprice(arreyofprodact);
                newli.remove();
                delbutton.remove();
            });
        
        }
        else{
            alert("מוצר לא קיים בסטוק");
        }
}
//פונקציה למחיקת מוצר מהעגלה
function removeprodactfromorder(prodact){
        for(let i=0; i<arreyofprodact.length; i++){
            if (arreyofprodact[i] == prodact){
                arreyofprodact.splice(i,1);
                return;
            }
        }
    }

// פונקציה יוצרת הזמנה חדשה עם כל הנתונים הכתובים עובדת עם לחיצה על כפתור סיים הזמנה
function addtoorders(){
    let userinorder = getidfrombeginingstring(document.getElementById("userlist").value);
    let neworder = new Order(getuser(userinorder),arreyofprodact);
    arreyofprodact="";
    ordersarrey= JSON.parse(localStorage.getItem("orders")) || [];
    ordersarrey.push(neworder);
    localStorage.setItem("orders",JSON.stringify(ordersarrey));
    console.log(neworder);
    addtextToHtml("buttonaddorder",neworder.totalprice,"p");
    clear("ordernumber");
    clear("listofprodacts");
    location.reload();
    let list = document.getElementsByClassName("list");

    while(list.length>0){
        list[0].remove();
    }

    let dbtn = document.getElementsByClassName("delbutoon");
    while(dbtn.length>0){
        dbtn[0].remove();
    }
    counter=0;
}

// פונקציה שמקבלת 3 פרמטרים מיקום,טקסט,סוג ויוצרת אלמנט מהסוג המבוקש עם הטקסט המבוקש במיקום המבוקש
function addtextToHtml(place,text,type){
    let placeTo = document.getElementById(place);
    let elementTo = document.createElement(type);
    elementTo.innerText = text;
    placeTo.appendChild(elementTo);
}


//פונקציה לבדיקת מספר ת"ז
function is_israeli_id_number(id) {
	id = String(id).trim();
	if (id.length > 9 || isNaN(id)) return false;
	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
		return Array.from(id, Number).reduce((counter, digit, i) => {
			const step = digit * ((i % 2) + 1);
			return counter + (step > 9 ? step - 9 : step);
		}) % 10 === 0;
}

// פונקציה המחזירה את כל המספרים בתחילת מחרוזת עד הסימן "," ושומרת אותו כמספר
function getidfrombeginingstring(string){
    let id="";
    for (let i=0; i<string.length; i++){ 
        if(string[i] == ","){
            id=Number(id);
            return id; 
        }
        else{
            id +=string[i];
        }
    }
}
// פונקציה מקבלת מספר מוצר ומחזירה אותו כסטרינג עם המחיר
function getProdactNameAndPrice(prodactid){
    for (let i=0 ; i< prodactarrey.length; i++ ){
        if (prodactarrey[i].prodactNumber == prodactid){
            return(`${prodactarrey[i].name} , Price For unit: ${prodactarrey[i].price}`);
        }    
    };
}
// פונקציה מקבלת מספר מוצר ומחזירה את האובייקט של המוצר
function getprodact(prodactid){
    for (let i=0; i<prodactarrey.length; i++){
        if (prodactarrey[i].prodactNumber == prodactid){
            return(prodactarrey[i]);
        }    
    }
}
//פונקציה מקבלת מספר זהות ומחזירה את האובייקט של המשתמש 
function getuser(userid){
    for (let i=0; i<usersArrey.length; i++){
        if (usersArrey[i].id == userid){
            return(usersArrey[i]);
        }    
    }
}

localStorage.setItem("stock",JSON.stringify(s.prodactarrey));
localStorage.setItem("prodacts",JSON.stringify(prodactarrey));
localStorage.setItem("users",JSON.stringify(usersArrey));
localStorage.setItem("orders",JSON.stringify(ordersarrey));

function clearLocalStorage(){
    localStorage.clear("stock");
    localStorage.clear("prodacts");
    localStorage.clear("users");
    localStorage.clear("orders");
}



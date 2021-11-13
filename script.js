const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");



// const dummyTransactions = [
//     { id:1 , text:"Flower", amount:-20},
//     { id:2 , text:"Salary", amount:300},
//     { id:3 , text:"Book", amount:-10},
//     { id:4 , text:"Camera", amount:150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !==null ? localStorageTransactions: [];



//Add transaction to DOM list
function addTransactionDOM(transaction){
    const sign = transaction.amount<0? "-": "+";
    const item = document.createElement("li");

    //add class based on value
    item.classList.add(transaction.amount<0?"minus":"plus");
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick ="removeTransaction(${transaction.id})">&times;</button>
    `;
    list.appendChild(item)

}

//Update Balance, Income and Expense


function updateIncomes(){

    const posArr = [];
list.querySelectorAll(".plus").forEach((item,i)=>{
    posArr[i] = +item.childNodes[1].innerText.split(/\W/).join("");
})
const negArr = [];
list.querySelectorAll(".minus").forEach((item,i)=>{
    negArr[i] = +item.childNodes[1].innerText.split(/\W/).join("");
})

incomeval = posArr.reduce((sum,val)=> (sum+val),0).toFixed(2);
spentVal = negArr.reduce((sum,val)=> (sum+val),0).toFixed(2);
money_plus.innerHTML = `+€${incomeval}`;
money_minus.innerHTML = `-€${spentVal}`
totalMoney = incomeval-spentVal;
balance.innerText = `${totalMoney>=0?"":"-"}€${Math.abs(totalMoney).toFixed(2)}`;


}

//generate random Id
function generateId(){
    return Math.floor(Math.random()*100000000);
}

//Add items 
const addItems = ()=>{
    if (text.value.trim()=="" || amount.value.trim()==""){

    }else{ 
        const transObj = {id:generateId(),text:text.value, amount:amount.value};
        transactions.push(transObj)
        addTransactionDOM(transObj);
    
        text.value = "";
        amount.value = "";
        updateLocalStorage()
        updateIncomes()
    }
}



//remove transaction by id
function removeTransaction(id){
    transactions = transactions.filter(transaction=> transaction.id !== id);
    updateLocalStorage()
    init();
}
//Update local storage
function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactions))
}

//init app
function init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateIncomes()
}
init()


form.addEventListener("submit",(e)=>{
    e.preventDefault();
 
    addItems();
   

})
// const deleteBtn = document.querySelectorAll(".delete-btn");
// deleteBtn.forEach((button)=>{
//     button.addEventListener("click",()=>{
//         button.parentNode.remove();
//         updateLocalStorage();
//         updateIncomes();
        
//     })
    
// })










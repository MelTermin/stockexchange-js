
 const stockLine="https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list"

 const rollingList= document.getElementById("scrolling");

 fetch(stockLine)
 .then((response) => response.json())
 .then((data) => {
  
  
  for (let i = 0; i < data.length; i++) {
  
    const rollingText=document.createElement("p")
    rollingText.classList.add("rollingText")
    rollingText.innerHTML= data[i]["symbol"] + " "

    const rollingNumber=document.createElement("p")
    rollingNumber.classList.add("rollingNumber")
    rollingNumber.style.color="#00CD00"
    rollingNumber.innerHTML= "$" + data[i]["price"]
    
  

   rollingList.append(rollingText,rollingNumber)
  
   
  }

 });


const search= document.getElementById("icon");


const getStockInfo = function () {

  let x = document.getElementById("input").value;
  const spinner = document.getElementById("spinner-displayer");

 
spinner.classList.remove("hidden");

    
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${x}&limit=10&exchange=NASDAQ`
  
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
  
  
  const autoFill = document.getElementById("autofill");
  
  //console.log(autoFill);//
  for (let i = 0; i < data.length; i++) {

const additionalImageUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${data[i]["symbol"]}`;

fetch(additionalImageUrl)
  .then((response) => response.json())
  .then((data) => {


  for (let i = 0; i < data.length; i++) {
  const image= document.createElement("img");
  image.src= data [i]["image"];
  image.classList.add("icons");

const changesList= document.createElement("p");
changesList.innerText= "(" + data[i] ["changes"]  + "%" + ")"
changesList.classList.add("changes");

  
listResult.append(changesList)
listResult.prepend(image);


  if(changesList.innerText.includes("-")){
    changesList.style.color="#E52C4A";
  }else {
    changesList.style.color="#197C5F";
  }
  }
 
 
});



    const menu=document.createElement("div");
    menu.classList.add("menu");
    const listResult= document.createElement("li");

  
    const a= document.createElement("a");
    a.href=`/company.html?symbol=${data[i]["symbol"]} `
    a.target="_blank";
    a.innerText=data[i].name + " " + "(" + data[i] ["symbol"] + ")";
   
    spinner.classList.add("hidden");

    
  listResult.append(a)
   menu.append(listResult)
  autoFill.append(menu);

  
    
  }
  });


};

search.addEventListener("click", getStockInfo);






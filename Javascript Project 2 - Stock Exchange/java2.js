
const urlPath =window.location.search;

const urlArray = urlPath.split("/");

const urlSymbol = urlArray[urlArray.length - 1]
  .replace("=", "")
  .replace("?symbol", "");

const companyUrl=`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${urlSymbol}`

fetch(companyUrl)
.then((response) => response.json())
.then((data) => {

const companyIcon=document.getElementById("companyIcon");
companyIcon.src=data.profile ["image"];


const companyTitle= document.getElementById("companyName");
companyTitle.innerText=data.profile ["companyName"]+ "  " + "(" + data.profile ["sector"] + ")";


const stockPrice= document.getElementById("stockPrice");
stockPrice.classList.add("stock");
stockPrice.innerText= "Stock Price:"+ " " + "$" + data.profile ["price"];

const stockPercentage= document.getElementById("stock-percentage");
stockPercentage.innerText=data.profile ["changesPercentage"];
stockPercentage.classList.add("percentage");


if(data.profile ["changesPercentage"].includes("-")){
  stockPercentage.style.color="red";
}else {
  stockPercentage.style.color="green";
}


const companyDescription=document.getElementById("description");
companyDescription.innerText=data.profile ["description"]

});


const companyHistroyUrl=`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${urlSymbol}?serietype=line`;
const canvas = document.getElementById("myChart");

fetch(companyHistroyUrl)
.then((response) => response.json())
.then((data) => {
  
const date = data.historical.splice(0, 30).map(element => {
  return element.date;
});


const close = data.historical.splice(0, 30).map(element => {
  return element.close;
});


const chart = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(chart, {
type: 'line',
data: {
labels: date,
datasets: [{
label: 'Stock Price History',
data: close,
backgroundColor: "transparent",
borderColor: "#0A5569",
borderWidth: 4
}]
},
options: {
scales: {
y: {
beginAtZero: true
}
}
}
});
});


const b= document.getElementById("btn");

fetch(companyUrl)
.then((response) => response.json())
.then((data) => {

const link= document.createElement("a");
link.classList.add("button-design");
link.style.textDecoration="none"
link.href=data.profile["website"];
link.target="_blank";
link.innerText="Read More...";

b.append(link);

});


"use strict";

const personName = document.querySelector(".name"),
  phoneNum = document.querySelector(".phoneNum"),
  mail = document.querySelector(".mail"),
  inquiry = document.querySelector(".inquiry"),
  transmissionBtn = document.querySelector(".transmissionBtn");

console.log(personName);
console.log("hello");

transmissionBtn.addEventListener('click',transmission)

function transmission() {
  const req = {
    personName : personName.value,
    phoneNum : phoneNum.value,
    mail : mail.value,
    inquiry : inquiry.value, 
  }
  
  fetch("/inquiry",{
    method: "POST",
    body : JSON.stringify(req),
  });
}
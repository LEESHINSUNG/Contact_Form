"use strict";

const personName = document.querySelector(".userName"),
  phoneNum = document.querySelector(".userPhoneNum"),
  mail = document.querySelector(".userMail"),
  inquiry = document.querySelector(".userInquiry"),
  transmissionBtn = document.querySelector(".transmissionBtn");

transmissionBtn.addEventListener('click',transmission)

function transmission() {
  const personalInfo = {
    userName : personName.value,
    userPhoneNum : phoneNum.value,
    userMail : mail.value,
    userInquiry : inquiry.value, 
  }
  
  console.log(personalInfo);
}


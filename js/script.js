import image from './data.js';
// console.log(image);

const navbar = document.querySelector('.navbar')
const navbarOffsetTop = navbar.offsetTop
const sections = document.querySelectorAll('section')
const navbarLinks = document.querySelectorAll('.navbar-link');
const progress = document.querySelector('.progress-bars-wrapper');

const progressBarPercent = [90,85,87, 70,60,50];

// ************SLIDE**************
const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// ****************** CONTACT FORM*********

const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const textarea = document.getElementById('text');
// **********************

window.addEventListener('scroll', () => {
  mainFn()
});

const mainFn =()=>{
    // console.log(window.pageYOffset, navbar.offsetTop);
    if (window.pageYOffset >= navbarOffsetTop) {
        // console.log('sticky');
        navbar.classList.add('sticky')
    } else {
        navbar.classList.remove('sticky')
    }

    sections.forEach((section, i) => {
        if (window.pageYOffset >= section.offsetTop - 10) {
            navbarLinks.forEach((navbarLink) => {
                navbarLink.classList.remove('change')
            })
            navbarLinks[i].classList.add('change')
        }
    });

    if (window.pageYOffset + window.innerHeight >= progress.offsetTop) {
        document.querySelectorAll('.progress-percent').forEach((el, i) => {

            el.style.width = `${progressBarPercent[i]}%`;
            el.previousElementSibling.firstElementChild.textContent = progressBarPercent[i]
        })
    }
}

mainFn();

window.addEventListener('resize',()=>{
    window.location.reload();
})


// *********SLIDE*********

container.innerHTML = image.map((person,i)=>{
    const {img,name,text} = person;
    let position = 'next';
    if(i === 0){
        position = 'first';
    }
    if(i === image.length - 1 ){

        position = 'last'
    }


    return `
    <div class=" slide ${position}">
                    <img src="${img}" class="img" alt="Helsinki">
                    <h4>${name}</h4>
                    
                    <p class="text">${text}</p>
                    
                    <div class="quote-icon"><i class="fas fa-quote-right"></i></div>
                </div>
    
    `
}).join('');

const startSlide = (type)=>{
   const first = document.querySelector('.first');
   const last = document.querySelector('.last');
   let next = first.nextElementSibling;
   if(!next){
       next = container.firstElementChild
   }

   first.classList.remove(['first']);
   last.classList.remove(['last']);
   next.classList.remove(['next']);

   if(type === 'prev'){
       first.classList.add('next');
       last.classList.add('first');
       next = last.previousElementSibling;
       if(!next){
           next= container.lastElementChild;
       }
       next.classList.remove(['next']);

       next.classList.add('last')
       return;
   }


   first.classList.add('last');
   last.classList.add('next');
   next.classList.add('first');

}

nextBtn.addEventListener('click', ()=>{
startSlide();
})
prevBtn.addEventListener('click', ()=>{
startSlide('prev');
})

// *******CONTACT FORM

function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}
  function showSuccess(input){
      const formControl = input.parentElement;
      formControl.className ="form-control success ";
  }

//   TEXTAREA

function showErrorText(textarea, message) {
    const formControl = textarea.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccessText(textarea) {
    const formControl = textarea.parentElement;
    formControl.className = "form-control success ";
}
//   check if email is valid
 function checkEmail(input){
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //  return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())){
        showSuccess(input);

    }else{
        showError(input, 'Email is not valid')
    }

 }

 function checkTextarea (textarea , min, max){
     if (textarea.value.length < min) {
         showErrorText(textarea, `${getFieldName(textarea)} must be least ${min} characters`)
     } else if (textarea.value.length > max) {
         showErrorText(textarea, ` ${getFieldName(textarea)} must be less than ${max} characters`
         );
     } else {
         showSuccessText(textarea);
     }

    
 }

//  check required field
function checkRequired(inputArr){
    inputArr.forEach(function(input){
      if(input.value.trim() === ''){
          showError(input, `${getFieldName(input)} is required` );
      }else{
          showSuccess(input)
      }
    })
}

// check input length
function checkLength(input, min, max){

    if(input.value.length < min){
        showError (input, `${getFieldName(input)} must be least ${min} characters`)
    }else if(input.value.length > max){
        showError(input,` ${getFieldName(input)} must be less than ${max} characters`
            );
    }else{
        showSuccess(input);
    }
}

// get fieldName

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)  ;
}
form.addEventListener('submit', function(e){
    // console.log('sumbit');
    e.preventDefault(e);
   checkRequired([username,email]);
   checkLength(username, 5 , 15);
   checkEmail(email)
   checkTextarea(textarea, 25 , 225)
})
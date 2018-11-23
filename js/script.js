window.addEventListener('DOMContentLoaded', function(){

    let tabHeader = document.querySelector('.info-header'),
        tabs = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

   function hideTab(a){
       for (let i = a; i<tabContent.length; i++){
             tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        };
   };
   hideTab(1);

   function showTab(b){
       if (tabContent[b].classList.contains('hide')){
           tabContent[b].classList.remove('hide');
           tabContent[b].classList.add('show');
       }
   };

   tabHeader.addEventListener('click', function(event){
       let target = event.target;
       if(target && target.classList.contains('info-header-tab')){
           for (let i=0; i<tabs.length; i++){
               if (tabs[i]==target) {
                   hideTab(0);
                   showTab(i);
               };
           };
       };
   });


   // timer

   let deadLine = '2018-11-22';

   function makeInterval(deadLine){
        let t = Date.parse(deadLine) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));
            if (seconds<10) seconds = '0' + seconds;
            if (minutes<10) minutes = '0' + minutes;
            if (hours<10) hours = '0' + hours;    
        if (t<0) return {
            'total': 0,
            'seconds': '00',
            'minutes': '00',
            'hours': '00'
        }
        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        }
   };

   function setClock(id, deadLine){
       let  clock = document.getElementById(id),
            seconds = clock.querySelector('.seconds'),
            minutes = clock.querySelector('.minutes'),
            hours = clock.querySelector('.hours'),
            timer = setInterval(setTimer, 1000);

        function setTimer(){
            let t = makeInterval(deadLine);
            seconds.textContent = t.seconds;
            minutes.textContent = t.minutes;
            hours.textContent = t.hours
            if (t.total<=0) clearInterval(timer);
        };
   };

   setClock('timer', deadLine)
});

// modal

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    closeBtn = document.querySelector('.popup-close');

more.addEventListener('click', function(){
    overlay.style.display = 'block';
    this.classList.add('more-splash');
});

closeBtn.addEventListener('click', function(){
    overlay.style.display = '';
    more.classList.remove('more-splash');
});

let descriptionBtns = document.querySelectorAll('.description-btn');
let info = document.querySelector('.info');
info.addEventListener('click', function(event){
    let target = event.target;
    if (target.classList.contains('description-btn')){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
    }
})

// form 
let form = document.querySelector('.main-form'),
    inputs = form.getElementsByTagName('input'),
    statusMessage=document.createElement('div'),
    message = {
        load: 'loading',
        done: 'All is ok. We will call you',
        err: 'Error. Repeat.please!'
    };

    statusMessage.classList.add('status');

form.addEventListener('submit', function(event){
    event.preventDefault();
    form.appendChild(statusMessage);
    let request = new XMLHttpRequest();

    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);
    
    let obj = {};
    formData.forEach(function(item, key){
        obj[key]= item;
    })
    
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function(){
        if (request.readyState<4){
            statusMessage.innerHTML = message.load;
        } else if (request.readyState == 4 && request.status==200){
            statusMessage.innerHTML = message.done;
        } else statusMessage.innerHTML = message.err;
    })
});

let downForm = document.querySelector('#form'),
    downInputs = downForm.getElementsByTagName('input');

    downForm.addEventListener('submit', function(event){
        event.preventDefault();
        downForm.appendChild(statusMessage);
        let request = new XMLHttpRequest();
    
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
        let formData = new FormData(downForm);
        
        let obj = {};
        formData.forEach(function(item, key){
            obj[key]= item;
        })
        
        let json = JSON.stringify(obj);
    
        request.send(json);
    
        request.addEventListener('readystatechange', function(){
            if (request.readyState<4){
                statusMessage.innerHTML = message.load;
            } else if (request.readyState == 4 && request.status==200){
                statusMessage.innerHTML = message.done;
            } else statusMessage.innerHTML = message.err;
        })
    });

    // slider

    let slides = document.querySelectorAll('.slider-item'),
        dotWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        slideIndicator = 0;

    showSlides(slideIndicator);
    function showSlides(n){
        if (n>slides.length-1) slideIndicator = 0;
        if (n<0) slideIndicator = slides.length -  1;

        slides.forEach(slide => slide.style.display = 'none');
         slides[slideIndicator].style.display = 'block';

         dots.forEach(dot => dot.classList.remove('dot-active'));
         dots[slideIndicator].classList.add('dot-active');
    };

    function currentSlide(n){
         slideIndicator = n;
         showSlides(slideIndicator);
    }

    function plusSlide(n){
         slideIndicator += n;
         showSlides(slideIndicator);
     };

     next.addEventListener('click',() => plusSlide(1));
    prev.addEventListener('click',() => plusSlide(-1));

     dotWrap.addEventListener('click', function(event){
        for (let i=0; i<dots.length; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i]){
                currentSlide(i);
            }
         }
    })

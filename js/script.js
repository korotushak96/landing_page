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
})
window.addEventListener('DOMContentLoaded', function(){

    let tabHeader = document.querySelector('.info-header'),
        tabs = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent')

   function hideTab(a){
       for (let i = a; i<tabContent.length; i++){
             tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide')
             
        }
   }
   hideTab(1);

   function showTab(b){
       if (tabContent[b].classList.contains('hide')){
           tabContent[b].classList.remove('hide');
           tabContent[b].classList.add('show');
       }
   }

   tabHeader.addEventListener('click', function(event){
       let target = event.target;
       if(target && target.classList.contains('info-header-tab')){
           for (let i=0; i<tabs.length; i++){
               if (tabs[i]==target) {
                   hideTab(0);
                   showTab(i);
               }
           }
       }
   })

})
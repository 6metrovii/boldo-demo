"use strict"
window.addEventListener('DOMContentLoaded',  () => {

    // mobile or pc
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');
    } else {
        document.body.classList.add('pc');
    }

    // menu mobile
    const menuIcon = document.querySelector('.menu-icon');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuIcon.parentElement.classList.toggle('active');
            document.body.classList.toggle('_lock');
        })
    }

    // scroll to section

    const menuLinks = document.querySelectorAll('.header-link'),
          footerLinks = document.querySelectorAll('.link-item'),
          logo = document.querySelectorAll('.logo-icon');

    if (logo.length > 0) logo.forEach(logo => logo.addEventListener('click', scrollToSection)); 
    if (menuLinks.length > 0 ) menuLinks.forEach(link => link.addEventListener('click', scrollToSection));
    if (footerLinks.length > 0) footerLinks.forEach(link => link.addEventListener('click', scrollToSection));

    function scrollToSection (e) {
        const navLink = e.target;
        
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoBlock = document.querySelector(navLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
        menuIcon.parentElement.classList.remove('active');
        document.body.classList.remove('_lock');
        e.preventDefault();
    }

    // login user
    const loginBtn = document.querySelector('#login-btn'),
          modalWindow = document.querySelector('.login-window'),
          loginForm = document.querySelector('.login-form'),
          messageWindow = document.createElement('div'),
          modalCloseBnt = document.querySelector('.form-close');

    if (localStorage.getItem('userName')) saveUserName();
    if (loginBtn) loginBtn.addEventListener('click', openModal);
    if (modalCloseBnt) modalCloseBnt.addEventListener('click', closeModal);
    if (modalWindow) {
        modalWindow.addEventListener('click', (e) => {
            if(e.target == modalWindow){
                closeModal();
            }
        })
    } 
    if (loginForm) { 
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginForm.style.opacity = 0;
            let user = loginForm.userLogin.value;
            loginForm.reset();
            localStorage.setItem('userName', user);
            showMessage();
            setTimeout( () => {
                showMessage.remove;
                closeModal();
            }, 2500);
            setTimeout( () => {
                loginForm.style.opacity = 1;
                messageWindow.classList.remove('message');
            }, 3000)
            saveUserName();
        });
    }

    function saveUserName () {
        if (localStorage.getItem('userName')) {
            loginBtn.innerHTML = localStorage.getItem('userName');
            loginBtn.classList.remove('head-button')
            loginBtn.classList.add('_user');
        }
    }

    function showMessage () {
        let userName = localStorage.getItem('userName');

        messageWindow.classList.add('message');
        messageWindow.innerHTML = `Hello, <span>${userName}</span>`;
        modalWindow.append(messageWindow);
    }

    function openModal () {
        menuIcon.parentElement.classList.remove('active');
        document.body.classList.add('_lock');
        modalWindow.classList.add('_modal-active');
    }

    function closeModal () {
        modalWindow.classList.remove('_modal-active');
        document.body.classList.remove('_lock');
    }

    // buy modal

    const buyBtn = document.querySelector('#buy'),
          exploreBtn = document.querySelector('#explore'),
          startNowBtn = document.querySelector('.block2-button'),
          closeBuyModalBtn = document.querySelector('.buy-close'),
          buyForm = document.querySelector('.buy-form'),
          thankmess = document.createElement('div'),
          modalBuy = document.querySelector('.buy-window');

    if (startNowBtn) startNowBtn.addEventListener('click', openBuyModal);
    if (buyBtn) buyBtn.addEventListener("click", openBuyModal);
    if (exploreBtn) exploreBtn.addEventListener('click', openBuyModal);
    if (closeBuyModalBtn) closeBuyModalBtn.addEventListener('click', closeBuyModal);
    if (buyForm) {
        buyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            buyForm.style.opacity = 0;
            buyForm.reset();
            showThankMess();
            setTimeout( () => {
                showThankMess.remove;
                closeBuyModal();
            }, 2500)
            setTimeout( () => {
                buyForm.style.opacity = 1;
                thankmess.classList.remove('message');
            }, 3000)
        });
    }
    if (modalBuy) {
        modalBuy.addEventListener('click', (e) => {
            if(e.target == modalBuy){
                closeBuyModal();
            }
        })
    }

    function showThankMess () {
        
        thankmess.classList.add('message');
        thankmess.innerHTML = `Thank you for leaving your details, we will call you back soon!`;
        modalBuy.append(thankmess);
    }

    function openBuyModal () {
        modalBuy.classList.add('_modal-active');
        document.body.classList.add('_lock');
    }
    
    function closeBuyModal () {
        modalBuy.classList.remove('_modal-active');
        document.body.classList.remove('_lock');
    }

    //slider

    const slides = document.querySelectorAll(".slider-content"),  
          prev = document.querySelector("#prew-slide"),  
          next = document.querySelector("#next-slide"),  
          slidesWrapper = document.querySelector(".slider-wrapper"),  
          slidesField = document.querySelector(".slider-field"),     
          width = parseInt(window.getComputedStyle(slidesWrapper).width); 

    let slideIndex = 1; 
    let offset = 0;  

    if (slides) slides.forEach(slide => slide.style.width = width);
    if (next) next.addEventListener('click', nextSlide);
    if (prev) prev.addEventListener('click', prevSlide);
    if (slidesField) {
        slidesField.style.width = 100 * slides.length  + '%';   
        slidesField.style.transition = 'all 0.7s ease'; 
    }           

    function prevSlide () {
        if (offset == 0) {      
            offset = width * (slides.length -1);  
        } else {
            offset = offset - width; 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;  
        
        if (slideIndex == 1) {            
            slideIndex = slides.length;
        } else {
            slideIndex--;              
        }
    }

    function nextSlide () {
        if (offset == width * (slides.length -1)) {      
            offset = 0;                       
        } else {
            offset = offset + width;  
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == slides.length) {          
            slideIndex = 1;
        } else {
            slideIndex++;                          
        }
    } 

    // load more card

    const loadMoreCardBtn = document.querySelector('.cards-button'),
          wrapperCard = document.querySelector('.cards');
    
    const newCardsDescr = {
        card1: 'Beta prototype sales iPad gen-z marketing network effects value proposition',
        card2: 'Pitch termsheet backing validation focus release.',
        card3: 'Seed round direct mailing non-disclosure agreement graphical user interface rockstar..',
    }

    if (loadMoreCardBtn) loadMoreCardBtn.addEventListener('click', () => {
        wrapperCard.style.flexWrap = "wrap";
        renderCard();
    } );

    function newCard (img, descr, userIcon, userName){
        const card = document.createElement('div');

        card.classList.add('card-wrapper');
        card.classList.add('_show');
        card.innerHTML = `
            <div class="card">
                <div class="card-img">
                    <img src="img/ourblog-card/${img}.png" alt="image">
                </div>
                <div class="card-data"><span>Category</span>November 22, 2021</div>
                <div class="card-text">${descr}</div>
                <div class="card-user">
                <div class="card-avatar">
                    <img src="img/ourblog-card/${userIcon}.png" alt="icon">
                </div>${userName}
            </div>
        `
        return card;
    }

    function renderCard (){
        const card1 = newCard('card33', newCardsDescr.card1, 'user33', 'Monica Geller'),
              card2 = newCard('card11', newCardsDescr.card1, 'user11', 'Chandler Bing'),
              card3 = newCard('card22', newCardsDescr.card1, 'user22', 'Rachel Green');

        wrapperCard.append(card1);
        wrapperCard.append(card2);
        wrapperCard.append(card3);
    } 

    // email popup

    const emailForm = document.querySelector('#form');
    const message = document.querySelector('._message');

    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            emailForm.reset();
            message.classList.add('_show-message');
            setTimeout(() => {
                message.classList.remove('_show-message');
            }, 3500);
        })
    }

    // footer links mobile
    const likksArrow =  document.querySelectorAll('.links-arrow');

    if (likksArrow.length > 0) {
        likksArrow.forEach(link => link.addEventListener('click', () => {
            link.parentElement.classList.toggle("active");
        }))
    }

    // scroll button 
    const scrollBtn = document.querySelector('.scroll-btn');

    if (scrollBtn) scrollBtn.addEventListener('click', scrollToSection);

    window.addEventListener('scroll', scrollToTop);

    function scrollToTop () {
        let scrollPixel = window.scrollY;

        if (scrollPixel > 1300) {
            scrollBtn.classList.add('_show-scroll-btn');
        } else {
            scrollBtn.classList.remove('_show-scroll-btn')
        }
    }
});
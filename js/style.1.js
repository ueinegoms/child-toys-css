var modalsOppened = 0;
// prepare the template
/*
    rotina:
    pegar os itens da nav e replicar eles em uma nav que fica oculta para ser mostrada
    por usuários de mobile e ou desktop até 1024px

    parte 0
    cria um botão menu no header (para a versão mobile first)

    parte 1
    replica em uma variável fantasma, enquanto cria uma variável com os 2 primeiros itens
    depois insere o botão menu (visível apenas para mobile)

    parte 2
    após isso utiliza a segunda variavel para substituir o valor da nav e cria a nova
    nav de mobile
*/

// var gridContainer = document.getElementById('grid-container');
window.addEventListener("load", function(event) {
//window.onload = function(){ 
// function computeStyle(){
	// computeStyle();

      console.log("computeStyle");
      // variáveis e constantes
      const headerMenuButton =
        '<div class="show-menu-button" onclick="menuTemplateToggle()"><i class="material-icons font-32 menuIconToggle">menu</i></div>';

      const mobileMenuButton =
        '<li class="li-show-menu-item"><div class="show-menu-button-smartphone" onclick="menuTemplateToggle()"><i class="material-icons font-32 i-show-menu-item menuIconToggle">menu</i></div></li>';

      var nav = document.getElementById("nav");

      var navFull = "";
      var navCompact = "";

      var modal = document.getElementsByClassName("modal");
      var modalSmooth = document.getElementsByClassName("modal-smooth");
      var modalLocked = document.getElementsByClassName("modal-locked");
      var modalSmoothLocked = document.getElementsByClassName("modal-smooth-locked");

      // parte 0
      document.getElementById("header").innerHTML = headerMenuButton + document.getElementById("header").innerHTML;

      // parte 1
      for (var i = 0; i < nav.firstElementChild.childElementCount; i++) {
        if (i < 4) {
          if (i == 0) {
            navCompact += "<ul>";
          }
          if (i == 2) {
            navCompact += mobileMenuButton;
          }

          navCompact +=
            "<li>" + nav.firstElementChild.children[i].innerHTML + "</li>";

          if (i == 3) {
            navCompact += "</ul>";
          }
        }
        if (i == 0) {
          navFull += '<ul>';
        }

        navFull +=
          "<li>" + nav.firstElementChild.children[i].innerHTML + "</li>";

        if (i == nav.firstElementChild.childElementCount - 1) {
          navFull += "</ul>";
        }
      }

      // parte 2
      nav.innerHTML = navCompact;

      // THIS SHIT FUCKS EVERYTHING IN VUE, WHY
      // document.getElementById("grid-container").innerHTML += navFull;

      var divNavFull = document.getElementById('navFull');
      divNavFull.innerHTML = navFull;

      // mandar para cima depois, com as outras variáveis
      var modalSmooth = document.getElementsByClassName("modal-smooth");
      var modal = document.getElementsByClassName("modal");

      for (var j = 0; j < modalSmooth.length; j++) {
        modalSmooth.item(j).addEventListener("click", function(evt) {
          clickModal(evt);
        });
      }
      for (var k = 0; k < modal.length; k++) {
        modal.item(k).addEventListener("click", function(evt) {
          clickModal(evt);
        });
      }
});

function menuTemplateToggle(){
    var navFull = document.getElementById('navFull');
    menuIconToggle();

    if(navFull.classList.contains('top0left0')){
        navFull.classList.remove('top0left0');
    } else{
        navFull.classList.add('top0left0');
    }

}

function menuIconToggle(){
    var icons = document.getElementsByClassName('menuIconToggle');
    for (i = 0; i < icons.length; i++){
        if(icons[i].innerHTML == 'menu'){
            icons[i].innerHTML = 'close';
        } else {
            icons[i].innerHTML = 'menu';
        }
        
    }
}

function modalToggle(modal){
    setTimeout(function(){
        // window.navigator.vibrate(1);
        if(modal.classList.contains('showing')){
            modal.classList.remove('showing');
            modalsOppened -= 1;
            modal.dataset.modalOrder = '';
        } else {
            modal.classList.add('showing');
            modalsOppened += 1;
            modal.dataset.modalOrder = modalsOppened;
        }
    }, 50);
}

function openModal(modal){
    modalToggle(modal);
}

function clickModal(evt){
    if (modalsOppened > 0){
        var modalSmooth = document.getElementsByClassName('modal-smooth');
        var modal = document.getElementsByClassName('modal');
        // var modalContent = document.getElementsByClassName('modal-content'),
        var modalContent;
        for (i = 0; i < modal.length; i++){
            if (modal.item(i).dataset.modalOrder == modalsOppened){
                modalContent = modal.item(i).children[0];
            }
        }
        for (i = 0; i < modalSmooth.length; i++){
            if (modalSmooth.item(i).dataset.modalOrder == modalsOppened){
                modalContent = modalSmooth.item(i).children[0];
            }
        }
        targetElement = evt.target;  // clicked element
        console.log(targetElement);
        
        do {
            if (targetElement == modalContent) {
                console.log('clicou dentro');

                return;
            }

            if (modalContent != undefined){
                if (targetElement == modalContent.parentElement){
                    // This is a click outside.
                    console.log('clicou fora');
                    modalToggle(modalContent.parentElement);
                    
                    return;
                }
            }

            targetElement = targetElement.parentElement;
        } while (targetElement);
    }
}

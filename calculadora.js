
//Selectores
const img = document.querySelector('.img');
const formulario = document.querySelector('.formulario');
const containerPintar = document.querySelector('.pintar');


/*FUNCIONILADAD*/
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    //Object DATA
    const data = new FormData(formulario);
    //Altura
    const altura = parseFloat(data.get('usuarioAltura') * 100);
    //Peso
    const peso = parseFloat(data.get('usuarioPeso'));
    console.log("funciono")

    calcular(altura,peso);
    //clase
    containerPintar.classList.toggle('active');
})


function calcular(altura,peso){
    if(altura && peso){
        //Get (imc)
        let imc = peso / (altura * altura);
        const imcRedondeado = imc.toFixed(4);
        //PINTAMOS
        pintarImc(imcRedondeado)
    }
};

function pintarImc(imc){
    containerPintar.textContent = "";
    
    const fragment = document.createDocumentFragment();
    //CREACION 
    const h3 = document.createElement('h3');
    h3.classList.add('imc-res')
    h3.textContent = `${imc}%`;
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = `<i class="bi bi-x icon"></i>`;
    btnDelete.classList.add('btn-danger');
    btnDelete.addEventListener('click',()=>{
        h3.remove()
        btnDelete.remove()
        //Reiniciamos INPUT
        altura.value = "";
        peso.value = "";

        // Eliminar el valor del IMC del localStorage
        localStorage.removeItem('imc');
    })

    localStorage.setItem('imc',imc);

    fragment.appendChild(btnDelete);
    fragment.appendChild(h3);

    //FIN
    containerPintar.appendChild(fragment);
};

/*=== CONFIGURACION LOCALSTORAGE ===*/
document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('imc')){
        let newImc = localStorage.getItem('imc');
        pintarImc(newImc);
    }
})



/*CAMBIAR IMAGENES*/
const galeria = ["img/vector1.png", "img/vector2.png", "img/vector3.png"];
// definimos INDICE
var indice = 0;

function cambio(){
    setInterval(()=>{
        indice++;
        if(indice >= galeria.length){
        indice = 0;
      }
      img.src = galeria[indice]
      img.classList.toggle('active');
    },3500)
 
}

/*=== ANIMACIONES CARGA ====*/
document.addEventListener("DOMContentLoaded", ()=>{
    img.classList.add('active');
    formulario.classList.add('active');
    //LLamamos a la funcion (cambio de imagenes)
    cambio()
});



/*VALIDAR INPUT*/
//Altura
var inputAltura = document.getElementById("altura");
inputAltura.addEventListener("input", function() {
  var value = this.value;
  value = value.replace(/[^0-9.]/g, ""); // Remover todos los caracteres excepto números y el punto decimal
  value = value.replace(/(\..*)\./g, "$1"); // Remover múltiples puntos decimales
  this.value = value;
});

//Peso
var inputPeso = document.getElementById("peso");
inputPeso.addEventListener("input", function() {
  var valuee = this.value;
  valuee = valuee.replace(/[^0-9]/g, ""); // Remover todos los caracteres que no sean números
  this.value = valuee;
});

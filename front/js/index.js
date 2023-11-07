function menu(){
    let burger = document.getElementById('burger');
    let card = document.getElementById('card');
    let option = document.getElementById('option');
    let img_burger=document.getElementById('img_burger');
    burger.classList.toggle('active');
    burger.classList.toggle('absolute');
    burger.classList.toggle('z-index1');
    burger.classList.toggle('ma-8');
    burger.classList.toggle('ma-3');
    card.classList.toggle('d-none');
    img_burger.classList.toggle('d-none');
    option.classList.toggle('option');
    option.classList.toggle('absolute');
    option.classList.toggle('mx-auto');
    console.log("asddsa")
}
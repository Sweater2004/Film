function menu(){
    let menu_button = document.getElementById('burger');
    let card = document.getElementById('card');
    let option = document.getElementById('option');
    menu_button.classList.toggle('active');
    card.classList.toggle('d-none');
    option.classList.toggle('option');
    option.classList.toggle('mx-auto');
    console.log("asddsa")
}
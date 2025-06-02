const flapTop = document.querySelector('.flap-top');
const flapBottom = document.querySelector('.flap-bottom');
const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');

let isOpen = false;

openBtn.addEventListener('click', () => {
  if (!isOpen) {
    // Abrir cartinha
    flapTop.style.transform = 'rotateX(-180deg)';
    flapBottom.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
      card.classList.add('show');
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }, 800);

    envelope.classList.add('open'); // <--- aqui
    openBtn.innerText = 'Fechar Cartinha 💌';
    isOpen = true;
  } else {
    // Fechar cartinha
    flapTop.style.transform = 'rotateX(0deg)';
    flapBottom.style.transform = 'rotateX(0deg)';

    card.classList.remove('show');
    card.style.transform = 'translateY(100%)';
    card.style.opacity = '0';

    envelope.classList.remove('open'); // <--- e aqui
    openBtn.innerText = 'Abrir Cartinha';
    isOpen = false;
  }
});

const flapTop = document.querySelector('.flap-top');
const flapBottom = document.querySelector('.flap-bottom');
const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');
const loveTimer = document.getElementById('loveTimer'); // Adicionado para o timer

let isOpen = false;

// Data de início do relacionamento: 28 de agosto de 2022 às 14:20
// O mês em JavaScript é 0-indexado (Janeiro é 0, Agosto é 7)
const startDate = new Date(2022, 7, 28, 14, 20, 0);

function updateLoveTimer() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = Math.floor(totalDays / 365.25); // Considera anos bissextos aproximadamente
    const remainingDaysAfterYears = totalDays % 365.25;

    const months = Math.floor(remainingDaysAfterYears / 30.4375); // Média de dias no mês
    const remainingDaysAfterMonths = Math.floor(remainingDaysAfterYears % 30.4375);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    loveTimer.innerHTML = `Juntos há:<br>
                           ${years} ano${years !== 1 ? 's' : ''},
                           ${months} mês${months !== 1 ? 'es' : ''},
                           ${remainingDaysAfterMonths} dia${remainingDaysAfterMonths !== 1 ? 's' : ''}<br>
                           ${hours} hora${hours !== 1 ? 's' : ''},
                           ${minutes} minuto${minutes !== 1 ? 's' : ''} e
                           ${seconds} segundo${seconds !== 1 ? 's' : ''}!`;
}

// Atualiza o timer a cada segundo
setInterval(updateLoveTimer, 1000);

// Chama a função uma vez ao carregar para exibir o timer imediatamente
updateLoveTimer();


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

        envelope.classList.add('open');
        openBtn.innerText = 'Fechar Cartinha 💌';
        isOpen = true;
    } else {
        // Fechar cartinha
        flapTop.style.transform = 'rotateX(0deg)';
        flapBottom.style.transform = 'rotateX(0deg)';

        card.classList.remove('show');
        card.style.transform = 'translateY(100%)';
        card.style.opacity = '0';

        envelope.classList.remove('open');
        openBtn.innerText = 'Abrir Cartinha';
        isOpen = false;
    }
});
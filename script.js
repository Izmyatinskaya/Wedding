let b = 0, n = 1; 

function start(){
    let quest = document.getElementById('question');
    let butS = document.querySelector('.start');
    let nb = document.querySelector('.next-back');
    let input = document.getElementById('fio');
    
    quest.classList.remove('animateP');
    quest.classList.add('animateP');

    butS.classList.remove('animateOut');
    butS.classList.add('animateOut');

    setTimeout(function() {
        quest.textContent = "Введите ваше имя и фамилию:";
        input.style.display = 'block';
        nb.style.display = 'flex';
        butS.style.display = 'none';

        input.classList.remove('animateInside');
        input.classList.add('animateInside');
        nb.classList.remove('animateInside');
        nb.classList.add('animateInside');
        n=2; b=1;
    }, 2000);
}

function next()
{

    n++; b++;
}
function back()
{

    n--; b--;
}

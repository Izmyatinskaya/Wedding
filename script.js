const data = {
    "questions": [
        {
            "id": 0,
            "text": "Просим Вас ответить на несколько\nвопросов касающихся свадьбы."
        },
        {
            "id": 1,
            "text": "Введите ваше имя и фамилию:"
        },
        {
            "id": 2,
            "text": "Есть ли у вас аллергии? (Укажите, если есть, например,\nаллергия на орехи, лактозу, глютен и т.д.)"
        },
        {
            "id": 3,
            "text": "Что вы предпочитаете из алкогольных напитков\n(можно выбрать несколько вариантов)?"
        },
        {
            "id": 4,
            "text": "Если вы выбрали вино, какое предпочитаете\n(можно выбрать несколько вариантов)?"
        },
        {
            "id": 5,
            "text": "Необходим ли вам трансфер до места\nбанкета и обратно?"
        },
        {
            "id": 6,
            "text": "Спасибо за то, что уделили время и ответили на вопросы!\nВаши ответы помогут нам лучше организовать свадьбу\nдля всех. Мы очень ценим ваше участие!"
        }
    ]
};
let formData = {
    fullName: "",
    allergy: "",
    allergyDetail: "",
    alcohol: [],
    wine: [],
    transfer: ""
};
let bb = 0, b = 0, n = 1;
let quest = document.getElementById('question');
let butS = document.querySelector('.start');
let nb = document.querySelector('.next-back');
let input = document.getElementById('fio');
let star = document.getElementById('star');
let wingL = document.getElementById('lineR');
let wingR = document.getElementById('lineL');
const testDiv = document.getElementsByClassName('test');
/* setTimeout(function() {
        
}, 2000); */
window.onload = start;
//идентификатор развертывания
//AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI
//URL
//https://script.google.com/macros/s/AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI/exec
function submitForm() {

    // Формируем данные для отправки
    let submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("allergies", formData.allergy === "Да" ? `Да\n${formData.allergyDetail}` : "Нет");
    submissionData.append("alcohol", formData.alcohol.join('\n'));
    submissionData.append("wine", formData.wine.join('\n'));
    submissionData.append("transfer", formData.transfer);

    // Отправка данных на Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI/exec', {
        method: 'POST',
        body: submissionData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Спасибо! Ваши данные отправлены.");
        } else {
            alert("Произошла ошибка. Пожалуйста, попробуйте снова.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeInputs()
{
    input.value ="";
    for (let i = 0; i < testDiv.length; i++) {
        var div = testDiv[i];
        punkts = div.querySelectorAll('input');
        for (let j = 0; j < punkts.length; j++) {
            if(i == 0 & j == 1)
            punkts[j].value = "";
            punkts[j].checked = 'false';
            
        }
    }
    
    
}
function fly()
{
    wingL.classList.add('flyl');
    wingR.classList.add('flyr');
}
function land()
{
    wingL.classList.remove('flyl');
    wingR.classList.remove('flyr');
}
function start() {
    document.body.classList.remove('animateOutY');
    document.body.classList.add('animateInsideBack');
    //dasha.classList.add('animateInsideBack');
}
function restart() {
    alert();
    document.body.classList.remove('animateInsideBack');
    document.body.classList.add('animateOutY');
    setTimeout(function () {
        let blockBack = getElementByIndex(b);
        blockBack.style.display = 'none';
        butS.style.display = 'flex';
        deleteAllClasses(quest);
        deleteAllClasses(butS);
        quest.innerText = getQuestionTextById(0);
        star.style.display = 'none';
        start();
        bb = 0, b = 0, n = 1;
    }, 1000);
    removeInputs();
}
function next() {
    //alert("bb: " + bb + " b: " + b + " n:" + n);
    if (n != 7) {
        let blockBack = getElementByIndex(b);
        if (inspect(blockBack) == false)
            return;
        let blockNext = getElementByIndex(n);
        
        deleteAllClasses(quest);
        quest.offsetWidth;
        quest.classList.add('animateP');

        animate(blockBack, 2);

        setTimeout(function () {
            quest.innerText = getQuestionTextById(n);

            if (blockBack != null)
                blockBack.style.display = 'none';
            if (blockNext != null)
                blockNext.style.display = 'flex';
                
            animate(blockNext, 1);

            if (n == 1) {
                nb.style.display = 'flex';
                deleteAllClasses(nb);
                nb.classList.add('animateInside');
            }
            if (n == 6) {
                deleteAllClasses(nb);
                nb.classList.add('animateOut');
                nb.style.display = 'none';

                star.style.display = 'flex';
                deleteAllClasses(star);
                star.classList.add('animateInside');
            }
            if(b==5)
            submitForm();

            n++; b++;
            if (b > 1) bb++;
            //alert("%bb: " + bb + " b: " + b + " n:" + n);
        }, 1000);

    }
}
function back() {
    //alert("bb: " + bb + " b: " + b + " n:" + n);
    if (b != 0) {
        let blockBack = getElementByIndex(bb);
        let blockNext = getElementByIndex(b);
        deleteAllClasses(quest);
        quest.offsetWidth;
        quest.classList.add('animatePBack');

        animate(blockNext, 3);
        if (n == 2) {
            deleteAllClasses(nb);
            nb.classList.add('animateOutBack');
        }

        setTimeout(function () {
            quest.innerText = getQuestionTextById(b - 1);
            if (n == 2) {
                nb.style.display = 'none';
                blockBack.style.display = 'flex';
            }
            if (blockBack != null) {
                blockBack.style.display = 'flex';
            }
            if (blockNext != null) {
                blockNext.style.display = 'none';
            }

            animate(blockBack, 4);
            //alert(7);

            n--; b--; if (b > 0) bb--;
            //alert("%bb: " + bb + " b: " + b + " n:" + n);
        }, 1000);
    }

}
function inspect(block) {
    if (b > 0) {
        let c=0;
        let txt="";
        let yes, no;

        switch (b) {
            case 1: 
            if(block.value == "")
            {
                alert("Вы не ввели своё имя и фамилию");
                return false;
            }
            formData.fullName = block.value;
                break;
            case 2:
                var div = testDiv[0];
                punkts = div.querySelectorAll('input');
                
                yes = punkts[0];
                no = punkts[2];
                txt = punkts[1];
                
                if (!yes.checked & !no.checked) {
                    alert("Выберите хотя бы 1 вариант ответа!");
                    return false;
                } else
                if (yes.checked) {
                    if(txt.value != ""){
                    formData.allergy = "Есть";
                    formData.allergyDetail = txt.value;
                    }
                    else{
                        alert("Укажите на что конкретно у вас аллергии");
                        return false;
                    }
                }
                else if (no.checked) {
                    formData.allergy = "Нет";
                }
                break;
            case 3:
                c=0; 
                let txt2="";
                div = testDiv[1];
                punkts = div.querySelectorAll('input');
                txts = div.querySelectorAll('p');
                for (let i = 0; i < punkts.length; i++) {
                    if(punkts[i].checked) 
                    {
                        c++;
                        txt += txts[i].textContent + ", ";
                    }
                }
                if(c==0)
                {
                    alert("Выберите хотя бы 1 вариант ответа!");
                    return false;
                }
                else {
                    for (let i = 0; i < punkts.length; i++) {
                        if(punkts[i].checked) 
                        formData.alcohol.push(txts[i].textContent);
                    }
                }
            break;
            case 4:
                c=0; 
                txt="";
                div = testDiv[2];
                punkts = div.querySelectorAll('input');
                txts = div.querySelectorAll('p');
                for (let i = 0; i < punkts.length; i++) {
                    if(punkts[i].checked) 
                    {
                        c++;
                        txt += txts[i].textContent + ", ";
                    }
                }
                if(c==0)
                {
                    alert("Выберите хотя бы 1 вариант ответа!");
                    return false;
                }
                else 
                {
                    for (let i = 0; i < punkts.length; i++) {
                        if(punkts[i].checked) 
                        formData.wine.push(txts[i].textContent);
                    }
                }
            break;
            case 5:
                var div = testDiv[3];
                punkts = div.querySelectorAll('input');
                
                yes = punkts[0];
                no = punkts[1];
                
               if (!yes.checked & !no.checked) {
                    alert("Выберите 1 вариант ответа!");
                    return false;
                } else 
                 if (yes.checked) {
                    formData.transfer = "Да";
                }
                else if (no.checked) {
                    formData.transfer = "Нет";
                }
                break;
            default:
                break;
        }
    }
    //block.style.background = 'red';
}
function uncheked()
{
    let div = testDiv[1];
    let punkts = div.querySelectorAll('input');
    for (let i = 0; i < punkts.length-1; i++) {
        if(punkts[i].checked) punkts[i].checked = false;
    }
}
function uncheked2()
{
    let div = testDiv[1];
    let punkts = div.querySelectorAll('input');
    punkts[5].checked = false;
}
function uncheked3()
{
    let div = testDiv[2];
    let punkts = div.querySelectorAll('input');
    for (let i = 0; i< punkts.length-1; i++) {
        if(punkts[i].checked) punkts[i].checked = false;
    }
}
function uncheked4()
{
    let div = testDiv[2];
    let punkts = div.querySelectorAll('input');
    punkts[4].checked = false;
}
function animate(block, a) {
    if (block != null) {
        if (a == 1) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateInside');
        }
        if (a == 2) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateOut');
        }
        if (a == 3) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateOutBack');
        }
        if (a == 4) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateInsideBack');
        }
    }
}
function deleteAllClasses(block) {
    block.classList.remove('animateOutBack');
    block.classList.remove('animateInsideBack');
    block.classList.remove('animateInside');
    block.classList.remove('animateOut');
    block.classList.remove('animatePBack');
    block.classList.remove('animateP');
}
function getQuestionTextById(id) {
    // Ищем вопрос по id
    //alert();
    const question = data.questions.find(q => q.id === id);
   // alert(id);
    //alert(question);
    // Если вопрос найден, возвращаем его текст, иначе возвращаем null или сообщение об ошибке
    return question ? question.text : `Вопрос с id ${id} не найден.`;
}
function getElementByIndex(index) {
   
    let collection = document.getElementsByName('block');
  
    // Проверяем, находится ли индекс в пределах допустимого диапазона
    if (index >= 0 && index < collection.length) {
        //collection[index].style.background = 'red';
        return collection[index];
    } else {
        // Если индекс вне диапазона, возвращаем null или undefined
        return null;
    }
}
function createSubjectElement(text) {
    const subject = document.createElement('div');
    subject.className = 'subject';
    subject.innerHTML = `
        <p>${text}</p>
        <button class="delete-btn">Видалити</button>
    `
    return subject;
}

function saveCookie(name, value){
    let encodedHTML=encodeURIComponent(value);
    document.cookie= `${name}=${encodedHTML}; max-age=31536000; path=/`;
}

function loadCookie(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

// Переключення днів
let days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

let buttons_div = document.querySelector('.buttons')
buttons_div.addEventListener('click', function (e) {
    let dayBtn = e.target.closest(".btn");
    if (!dayBtn) return;
    let day_block_id = dayBtn.dataset.target;
    let show_block = document.getElementById(day_block_id)
    show_block.style.display = "block"

    days.forEach(day => {
        let block = document.getElementById(day);
        if (block !== show_block) {
            block.style.display = "none"
        }
    })
})


const dayBlocks = document.querySelectorAll('.abc');

// Завантаження даних з cookies при завантаженні сторінки
dayBlocks.forEach(dayBlock => {
    const savedHTML = loadCookie(dayBlock.id);
    if (savedHTML) {
        dayBlock.innerHTML = savedHTML;
    }
});

// Обробка кліків для кожного дня
dayBlocks.forEach(dayBlock => {
    dayBlock.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-subject-btn')) {
            const input = e.target.parentElement.querySelector('input');
            const subjectText = input.value.trim();
            
            if (subjectText) {
                // Get the subjects container ID from the data attribute
                const subjectsContainerId = e.target.dataset.subjects;
                const subjectsContainer = document.getElementById(subjectsContainerId);
                // Create and add the new subject
                const newSubject = createSubjectElement(subjectText);
                subjectsContainer.appendChild(newSubject);
                input.value = '';
                saveCookie(this.id, this.innerHTML);
            }
        }

        if (e.target.classList.contains('delete-btn')) {
            const subjectElement = e.target.closest('.subject');
            if (subjectElement) {
                subjectElement.remove();
                saveCookie(this.id, this.innerHTML);
            }
        }
    });
});
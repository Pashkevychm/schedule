
document.addEventListener('DOMContentLoaded', () => {
	
	function createSubjectElement(text) {
		const subject = document.createElement('div');
		subject.className = 'subject';

		const p = document.createElement('p');
		p.textContent = text || 'Предмет';

		const del = document.createElement('button');
		del.className = 'delete-btn';
		del.type = 'button';
		del.textContent = 'Видалити';
		del.addEventListener('click', () => subject.remove());

		subject.appendChild(p);
		subject.appendChild(del);
		return subject;
	}

	
	document.querySelectorAll('.add-subject').forEach(area => {
		const input = area.querySelector('input[type="text"]');
		const btn = area.querySelector('.add-subject-btn');

		btn.addEventListener('click', () => {
			const text = input.value.trim();
			if (!text) return;

			const subjectsContainer = area.closest('.schedule').querySelector('.subjects');
			const newSubject = createSubjectElement(text);
			subjectsContainer.appendChild(newSubject);
			input.value = '';
			input.focus();
		});

		
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				btn.click();
			}
		});
	});

	document.querySelectorAll('.subjects').forEach(container => {
		container.querySelectorAll('.delete-btn').forEach(b => {
			b.addEventListener('click', (e) => {
				const subject = e.target.closest('.subject');
				if (subject) subject.remove();
			});
		});
	});
});

document.querySelectorAll('.subjects').forEach(container => {
    container.querySelectorAll('.subject').forEach(subject => {
        const p = subject.querySelector('p');
        const text = p ? p.textContent.trim() : '';
        if (!text || text === 'Предмет') subject.remove();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const schedules = Array.from(document.querySelectorAll('.schedule'));

    schedules.forEach((schedule, idx) => {
        const key = 'subjects:' + idx;
        const subjectsContainer = schedule.querySelector('.subjects');
        const addArea = schedule.querySelector('.add-subject');
        if (!subjectsContainer || !addArea) return;

        const input = addArea.querySelector('input[type="text"]');
        const btn = addArea.querySelector('.add-subject-btn');


        try {
            const saved = JSON.parse(localStorage.getItem(key) || '[]');
            if (Array.isArray(saved) && saved.length) {
                saved.forEach(text => {
                    if (!text) return;
                    input.value = text;
                    
                    btn.click();
                });
                input.value = '';
            }
        } catch (e) {
            
        }

        
        const save = () => {
            const items = Array.from(subjectsContainer.querySelectorAll('.subject p'))
                .map(p => p.textContent.trim())
                .filter(t => t && t !== 'Предмет');
            localStorage.setItem(key, JSON.stringify(items));
        };
        const mo = new MutationObserver(() => save());
        mo.observe(subjectsContainer, { childList: true });
        save();
    });
    
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

    let buttons_div = document.querySelector('.buttons')
    buttons_div.addEventListener('click', function(e){
        let dayBtn = e.target.closest(".btn");
        if (!dayBtn) return;
        let day_block_id = dayBtn.dataset.target;
        let show_block = document.getElementById(day_block_id)
        show_block.style.display = "flex"

        days.forEach(day => {
            let block = document.getElementById(day);
            if (block !== show_block) {
                block.style.display = "none"
            }
        })
    })
})
export function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active state to clicked
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

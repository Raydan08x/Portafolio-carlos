export function initPreviewMode() {
    const modal = document.getElementById('preview-modal');
    if (!modal) return;
    
    const iframe = document.getElementById('preview-iframe');
    const closeBtn = document.querySelector('.close-modal-btn');
    const loader = document.getElementById('modal-loader');
    const externalLink = document.getElementById('modal-external-link');

    // Attach to all quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = btn.getAttribute('data-url');
            if (url) {
                // Show modal
                modal.style.display = 'flex';
                // Trigger reflow
                modal.offsetHeight;
                modal.classList.add('show');
                
                // Setup iframe
                loader.style.display = 'block';
                iframe.style.display = 'none';
                iframe.src = url;
                externalLink.href = url;
                
                iframe.onload = () => {
                    loader.style.display = 'none';
                    iframe.style.display = 'block';
                };
                
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            iframe.src = ''; // Clear iframe to stop playback/loading
            document.body.style.overflow = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

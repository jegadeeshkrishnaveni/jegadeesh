document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const modal = document.getElementById('notification-modal');
    const closeBtn = document.querySelector('.close');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Disable button temporarily
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Show success modal
            showNotification();

            // Submit with slight delay
            setTimeout(() => {
                form.submit(); // ✅ actual submit with data
                // Restore button state (in case of fast reload cancel)
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 800);
        });
    }

    /** ========== Notification Modal ========== */
    function showNotification() {
        if (!modal) return;
        modal.style.display = 'flex';

        // Auto close after 3s
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }

    // Close modal on [x]
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    /** ========== Smooth Scrolling ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /** ========== Download Tracking (Optional) ========== */
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Resume download initiated');
            // Hook for analytics/tracking (GA, FB Pixel, etc.)
        });
    });
});

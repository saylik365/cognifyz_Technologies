document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    if (!form) return; // Only run on pages that have the form

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill all fields!');
            return;
        }

        // For index.ejs form → just show a thank-you alert
        // (Real submissions are handled in submissions.ejs with JWT)
        alert(`Thanks, ${name}! Your message was received.`);
        form.reset();
    });
});

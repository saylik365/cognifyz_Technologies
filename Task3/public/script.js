document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!name || !email || !message) {
            alert('All fields are required!');
            e.preventDefault();
        } else if (!email.match(emailPattern)) {
            alert('Please enter a valid email address!');
            e.preventDefault();
        }
    });
});

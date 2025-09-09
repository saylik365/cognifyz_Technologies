document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
        alert('Submission successful!');
        document.querySelector('#contact-form').reset();
    } else {
        alert('Error: All fields are required');
    }
});

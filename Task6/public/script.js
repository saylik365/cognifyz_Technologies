document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
    }

    const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (res.ok) {
        alert('Submission successful!');
        document.querySelector('#contact-form').reset();
    } else {
        alert(`Error: ${data.error}`);
    }
});

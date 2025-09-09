document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must log in first!');
        window.location.href = '/login';
        return;
    }

    const list = document.getElementById('submission-list');
    const form = document.getElementById('contact-form');

    async function loadSubmissions() {
        const res = await fetch('/api/submissions', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        list.innerHTML = '';
        data.forEach(sub => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span><strong>${sub.name}</strong> - ${sub.email}: ${sub.message}</span>
                <button class="btn btn-sm btn-danger" onclick="deleteSubmission('${sub._id}')">Delete</button>
            `;
            list.appendChild(li);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill all fields!');
            return;
        }

        await fetch('/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name, email, message })
        });
        form.reset();
        loadSubmissions();
    });

    window.deleteSubmission = async (id) => {
        await fetch(`/api/submissions/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadSubmissions();
    };

    loadSubmissions();
});

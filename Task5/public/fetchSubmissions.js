document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('submission-list');

    async function loadSubmissions() {
        const res = await fetch('/api/submissions');
        const data = await res.json();
        list.innerHTML = '';
        data.forEach(sub => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span><strong>${sub.name}</strong> - ${sub.email}: ${sub.message}</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editSubmission(${sub.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSubmission(${sub.id})">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    window.deleteSubmission = async (id) => {
        await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
        loadSubmissions();
    };

    window.editSubmission = async (id) => {
        const newName = prompt('Enter new name:');
        const newEmail = prompt('Enter new email:');
        const newMessage = prompt('Enter new message:');
        await fetch(`/api/submissions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, email: newEmail, message: newMessage })
        });
        loadSubmissions();
    };

    loadSubmissions();
});

// 1. Load existing notices from LocalStorage (if any)
let notices = JSON.parse(localStorage.getItem('campusNotices')) || [];

const noticeForm = document.getElementById('noticeForm');
const noticeList = document.getElementById('noticeList');
const filterCategory = document.getElementById('filterCategory');

// Run display function when page loads
document.addEventListener('DOMContentLoaded', displayNotices);

// 2. Handle Form Submission (Add Notice)
noticeForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Page refresh hone se rokta hai

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // New Notice Object
    const newNotice = {
        id: Date.now(), // Unique ID using timestamp
        title,
        category,
        description,
        date
    };

    notices.push(newNotice); // Array mein add kiya
    saveAndRender();        // Storage mein save karke UI update kiya
    noticeForm.reset();     // Form clear kiya
});

// 3. Display Notices on UI
function displayNotices() {
    const selectedCategory = filterCategory.value;
    noticeList.innerHTML = '';

    // Filter logic based on dropdown selection
    const filteredNotices = selectedCategory === 'All' 
        ? notices 
        : notices.filter(n => n.category === selectedCategory);

    // Agar koi notice nahi hai
    if (filteredNotices.length === 0) {
        noticeList.innerHTML = `<div class="empty-state"><i class="fa-regular fa-folder-open fa-2x" style="margin-bottom:10px;"></i><br>No notices found.</div>`;
        return;
    }

    // Loop through notices and create HTML cards dynamically
    filteredNotices.forEach(notice => {
        const card = document.createElement('div');
        card.classList.add('notice-card');
        
        card.innerHTML = `
            <div class="notice-top">
                <h3>${notice.title}</h3>
                <span class="badge">${notice.category}</span>
            </div>
            <div class="notice-date"><i class="fa-regular fa-calendar"></i> Posted on: ${notice.date}</div>
            <p class="notice-desc">${notice.description}</p>
            <button class="delete-btn" onclick="deleteNotice(${notice.id})">
                <i class="fa-solid fa-trash-can"></i> Delete
            </button>
        `;
        noticeList.appendChild(card);
    });
}

// 4. Delete Notice Function
function deleteNotice(id) {
    notices = notices.filter(n => n.id !== id); // Us ID ko chhod kar baki sab rakho
    saveAndRender();
}

// 5. Filter Change Event
filterCategory.addEventListener('change', displayNotices);

// Helper function: Save data to browser memory & refresh view
function saveAndRender() {
    localStorage.setItem('campusNotices', JSON.stringify(notices));
    displayNotices();
}
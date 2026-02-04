document.addEventListener('DOMContentLoaded', () => {
    
    // --- Section Switching ---
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    function switchSection(sectionId) {
        // Remove active from all
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active'));

        // Add active to selected
        const activeNav = document.querySelector(`.admin-nav-item[data-section="${sectionId}"]`);
        const activeSection = document.getElementById(`section-${sectionId}`);

        if (activeNav) activeNav.classList.add('active');
        if (activeSection) activeSection.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
            window.location.hash = section;
        });
    });

    // Handle Hash on Load
    const initialSection = window.location.hash.replace('#', '') || 'dashboard';
    switchSection(initialSection);


    // --- Login Logic (Simulation) ---
    const loginOverlay = document.getElementById('login-overlay');
    const btnLogin = document.getElementById('btn-login');
    const loginEmail = document.getElementById('login-email');
    const loginPass = document.getElementById('login-password');

    // Check "Session"
    if (localStorage.getItem('katy_admin_logged')) {
        if (loginOverlay) loginOverlay.classList.remove('active');
    }

    function handleLogin() {
        const email = loginEmail.value.trim().toLowerCase();
        const pass = loginPass.value.trim();

        if (email === 'admin@katy.com' && pass === '123456') {
            localStorage.setItem('katy_admin_logged', 'true');
            loginOverlay.classList.remove('active');
        } else {
            alert('Invalid credentials. Use admin@katy.com / 123456');
        }
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', handleLogin);
    }

    // Support Enter Key
    [loginEmail, loginPass].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin();
            });
        }
    });

    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('katy_admin_logged');
            location.reload();
        });
    }

    // --- Portfolio Upload Modal ---
    const uploadModal = document.getElementById('upload-modal');
    const btnOpenUpload = document.getElementById('open-upload-modal');
    const btnCloseModal = document.querySelector('.close-modal');
    const uploadForm = document.getElementById('portfolio-upload-form');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const methodGroups = document.querySelectorAll('.upload-method-group');
    const imgFile = document.getElementById('img-file');
    const imgPreview = document.getElementById('upload-preview');
    const dropMsg = document.querySelector('.drop-msg');

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            methodGroups.forEach(g => g.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // File Preview
    if (imgFile) {
        imgFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgPreview.src = e.target.result;
                    imgPreview.style.display = 'block';
                    dropMsg.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnOpenUpload) {
        btnOpenUpload.addEventListener('click', () => {
            uploadModal.classList.add('active');
            // Reset preview
            imgPreview.style.display = 'none';
            dropMsg.style.display = 'block';
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            uploadModal.classList.remove('active');
        });
    }

    // Close on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            uploadModal.classList.remove('active');
        }
    });

    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const url = document.getElementById('img-url').value;
            const category = document.getElementById('img-category').value;
            const file = imgFile.files[0];

            let source = url;
            if (file) {
                source = "Local Computer Selection";
            }

            // Simulate upload (Firebase logic will go here)
            alert(`Success! Image added to ${category}.\nSource: ${source}`);
            
            // Close modal and reset
            uploadModal.classList.remove('active');
            uploadForm.reset();
            imgPreview.style.display = 'none';
            dropMsg.style.display = 'block';
            
            // Refresh simulated gallery
            renderAdminGallery();
        });
    }

    // --- Category Management ---
    let portfolioCategories = ['Portrait', 'Fashion', 'B&W', 'Bikini'];
    const categoryList = document.getElementById('category-list');
    const newCategoryInput = document.getElementById('new-category-name');
    const btnAddCategory = document.getElementById('btn-add-category');
    const categorySelect = document.getElementById('img-category');

    function renderCategories() {
        if (!categoryList) return;
        
        // Render Tags In Settings
        categoryList.innerHTML = portfolioCategories.map(cat => `
            <span class="manage-tag">
                ${cat} 
                <button class="remove-tag" data-cat="${cat}">&times;</button>
            </span>
        `).join('');

        // Update Select Dropdown in Upload Modal
        if (categorySelect) {
            categorySelect.innerHTML = portfolioCategories.map(cat => `
                <option value="${cat}">${cat}</option>
            `).join('');
        }

        // Add Delete Listeners
        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                const catToRemove = btn.dataset.cat;
                portfolioCategories = portfolioCategories.filter(c => c !== catToRemove);
                renderCategories();
            });
        });
    }

    if (btnAddCategory) {
        btnAddCategory.addEventListener('click', () => {
            const val = newCategoryInput.value.trim();
            if (val && !portfolioCategories.includes(val)) {
                portfolioCategories.push(val);
                newCategoryInput.value = '';
                renderCategories();
            }
        });
    }

    // --- Dynamic Data Simulation ---
    // Function to "render" portfolio items (this is where Firebase logic would go)
    const galleryContainer = document.getElementById('admin-gallery');
    
    function renderAdminGallery() {
        if (!galleryContainer) return;
        let html = '';
        
        for(let i=1; i<=8; i++) {
            const cat = portfolioCategories[Math.floor(Math.random() * portfolioCategories.length)] || 'General';
            html += `
                <div class="gallery-admin-item">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&sig=${i}" alt="Item">
                    <div class="item-actions">
                        <span class="category-tag">${cat}</span>
                        <button class="btn-delete" title="Delete Image">&times;</button>
                    </div>
                </div>
            `;
        }
        galleryContainer.innerHTML = html;
    }

    renderCategories();
    renderAdminGallery();

    // --- Editor.js Logic ---
    const btnOpenEditor = document.getElementById('btn-open-editor');
    const btnBackToBlog = document.getElementById('btn-back-to-blog');
    
    // Initialize Editor.js
    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
            header: {
                class: window.Header || Header,
                inlineToolbar: ['link']
            },
            list: {
                class: window.List || window.EditorjsList,
                inlineToolbar: true
            },
            checklist: {
                class: window.Checklist || window.EditorjsChecklist,
                inlineToolbar: true
            },
            quote: {
                class: window.Quote || Quote,
                inlineToolbar: true,
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
            },
            linkTool: window.LinkTool || LinkTool,
            image: {
                class: window.ImageTool || ImageTool,
                config: {
                    endpoints: {
                        byFile: 'http://localhost:8008/uploadFile', // Placeholder for now
                        byUrl: 'http://localhost:8008/fetchUrl', // Placeholder for now
                    }
                }
            }
        },
        placeholder: 'Click here to start your story...',
        data: {} // Initial data
    });

    if (btnOpenEditor) {
        btnOpenEditor.addEventListener('click', () => {
            switchSection('editor');
        });
    }

    if (btnBackToBlog) {
        btnBackToBlog.addEventListener('click', () => {
            switchSection('blog');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-links a');

    function toggleMenu() {
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioImages = document.querySelectorAll('.portfolio-item img');

    if (lightbox && portfolioImages.length > 0) {
        portfolioImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const fadeElems = document.querySelectorAll('.fade-in');
    fadeElems.forEach(el => observer.observe(el));

    // Parallax & Nav Scroll
    const navbar = document.querySelector('.navbar');
    const imageCol = document.querySelector('.image-col img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Navbar scrolled class
        if (navbar) {
            if (scrolled > 50) navbar.classList.add('navbar--scrolled');
            else navbar.classList.remove('navbar--scrolled');
        }

        // Parallax
        if (imageCol && window.innerWidth > 768) {
            imageCol.style.transform = `translateY(${scrolled * 0.1}px) scale(1.05)`;
        }
    });

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 400); // Wait for transition
                    }
                });
            });
        });
    }

    // --- Translations ---
    const translations = {
        en: {
            // Index
            subtitle: "Fashion Model",
            location: "ROME & WORLDWIDE",
            portfolio_btn: "Portfolio",
            hire_btn: "Contact →",
            // About
            bio_subtitle: "Biography",
            bio_title_1: "BEYOND THE",
            bio_title_2: "LENS",
            bio_p1: "Born in the vibrant modeling scene of Rome, Katy Lapucci has spent the last five years redefining modern elegance. Her career is a testament to versatility, seamlessly transitioning between high-fashion editorials, commercial campaigns, and runway shows.",
            bio_p2: "Katy's unique look—a blend of classic sophistication and raw, emotive power—has caught the eye of leading photographers and directors worldwide. She believes that modeling is not just about posing, but about storytelling; becoming a silent actor in the narrative of fashion.",
            meas_height: "Height",
            meas_bust: "Bust",
            meas_waist: "Waist",
            meas_hips: "Hips",
            meas_eyes: "Eyes",
            meas_hair: "Hair",
            download_card: "Download Comp Card",
            // Contact
            contact_subtitle: "Contact",
            contact_title_1: "GET IN",
            contact_title_2: "TOUCH",
            contact_text: "For inquiries, collaborations, or just to say hello.",
            contact_agency: "Represented by",
            // Magazines
            mag_subtitle: "Press & Features",
            mag_title: "MAGAZINE",
            mag_title_highlight: "COVERS",
            // Blog
            blog_subtitle: "Insights",
            blog_title: "LATEST",
            blog_highlight: "STORIES",
            blog_cat_1: "FASHION",
            blog_post_t1: "5 Tips for Your First Professional Photoshoot",
            blog_post_e1: "Navigating your first professional photoshoot can be daunting. Here are 5 essential tips to help you stay confident and deliver your best poses.",
            blog_post_d1: "February 01, 2026",
            blog_cat_2: "LIFESTYLE",
            blog_post_t2: "My Morning Routine: How I Stay Model-Ready",
            blog_post_e2: "From skincare to nutrition, discover my daily habits that help me maintain my energy and look during busy weeks in Milan and Paris.",
            blog_post_d2: "January 25, 2026",
            blog_cat_3: "BEHIND THE SCENES",
            blog_post_t3: "A Day in the Life: Paris Fashion Week Edition",
            blog_post_e3: "Ever wondered what goes on behind the curtains of PFW? Join me as I take you through a whirlwind 24 hours of castings, fittings, and shows.",
            blog_post_d3: "January 12, 2026",
            blog_read_more: "Read Full Blog",
            // Portfolio
            port_subtitle: "Showcase",
            port_title: "THE",
            port_highlight: "PORTFOLIO",
            filter_all: "All",
            filter_portrait: "Portrait",
            filter_fashion: "Fashion",
            filter_bw: "B&W",
            filter_bikini: "Bikini",
            // Menu
            menu_home: "Home",
            menu_portfolio: "Portfolio",
            menu_magazines: "Magazines",
            menu_blog: "Blog",
            menu_about: "About",
            menu_contact: "Contact",
            // Footer
            footer_about: "About me",
            footer_mags: "Magazines",
            footer_port: "Portfolio",
            footer_ctc: "Contacts",
            footer_loc: "MODEL BASED IN ROME"
        },
        it: {
            // Index
            subtitle: "Modella di Moda",
            location: "ROMA & WORLDWIDE",
            portfolio_btn: "Portfolio",
            hire_btn: "Contatti →",
            // About
            bio_subtitle: "Biografia",
            bio_title_1: "OLTRE L'",
            bio_title_2: "OBIETTIVO",
            bio_p1: "Nata nella vibrante scena della moda romana, Katy Lapucci ha trascorso gli ultimi cinque anni a ridefinire l'eleganza moderna. La sua carriera è una testimonianza di versatilità, passando senza problemi da editoriali di alta moda a campagne commerciali e sfilate.",
            bio_p2: "Il look unico di Katy—una fusione di classica raffinatezza ve pura potenza emotiva—ha catturato l'attenzione di fotografi e registi di spicco in tutto il mondo. Crede che fare la modella non significhi solo posare, ma raccontare storie; diventare un attore silenzioso nella narrativa della moda.",
            meas_height: "Altezza",
            meas_bust: "Seno",
            meas_waist: "Vita",
            meas_hips: "Fianchi",
            meas_eyes: "Occhi",
            meas_hair: "Capelli",
            download_card: "Scarica Comp Card",
            // Contact
            contact_subtitle: "Contatti",
            contact_title_1: "RIMANI IN",
            contact_title_2: "CONTATTO",
            contact_text: "Per richieste, collaborazioni o semplicemente per un saluto.",
            contact_agency: "Rappresentata da",
            // Magazines
            mag_subtitle: "Stampa & Caratteristiche",
            mag_title: "COPERTINE",
            mag_title_highlight: "RIVISTE",
            // Blog
            blog_subtitle: "Approfondimenti",
            blog_title: "ULTIME",
            blog_highlight: "STORIE",
            blog_cat_1: "MODA",
            blog_post_t1: "5 Consigli per il tuo Primo Servizio Fotografico Professionale",
            blog_post_e1: "Affrontare il tuo primo servizio fotografico professionale può spaventare. Ecco 5 consigli essenziali per aiutarti a rimanere sicura di te.",
            blog_post_d1: "01 Febbraio, 2026",
            blog_cat_2: "LIFESTYLE",
            blog_post_t2: "La mia Routine Mattutina: Come restare Modella-Ready",
            blog_post_e2: "Dalla cura della pelle alla nutrizione, scopri le mie abitudini quotidiane che mi aiutano a mantenere energia durante le settimane a Milano e Parigi.",
            blog_post_d2: "25 Gennaio, 2026",
            blog_cat_3: "DIETRO LE QUINTE",
            blog_post_t3: "Un Giorno nella Vita: Edizione Paris Fashion Week",
            blog_post_e3: "Ti sei mai chiesta cosa succede dietro le quinte della PFW? Seguimi in queste frenetiche 24 ore tra casting e sfilate.",
            blog_post_d3: "12 Gennaio, 2026",
            blog_read_more: "Leggi l'Articolo",
            // Portfolio
            port_subtitle: "Vetrina",
            port_title: "IL",
            port_highlight: "PORTFOLIO",
            filter_all: "Tutti",
            filter_portrait: "Ritratti",
            filter_fashion: "Moda",
            filter_bw: "B&N",
            filter_bikini: "Bikini",
            // Menu
            menu_home: "Home",
            menu_portfolio: "Portfolio",
            menu_magazines: "Riviste",
            menu_blog: "Blog",
            menu_about: "Chi Sono",
            menu_contact: "Contatti",
            // Footer
            footer_about: "Chi sono",
            footer_mags: "Riviste",
            footer_port: "Portfolio",
            footer_ctc: "Contatti",
            footer_loc: "MODELLA CON BASE A ROMA"
        }
    };

    const langOpts = document.querySelectorAll('.lang-opt');
    const defaultLang = localStorage.getItem('katy_lang') || 'en';

    function setLanguage(lang) {
        // Update active class
        langOpts.forEach(opt => {
            if (opt.dataset.lang === lang) opt.classList.add('active');
            else opt.classList.remove('active');
        });

        // Update text content
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang] && translations[lang][key]) {
                // If it has HTML inside (like spans), we might need to be careful
                // For simple text replacement:
                el.innerText = translations[lang][key]; 
            }
        });

        localStorage.setItem('katy_lang', lang);
        document.documentElement.lang = lang;
    }

    if (langOpts.length > 0) {
        langOpts.forEach(opt => {
            opt.addEventListener('click', () => {
                setLanguage(opt.dataset.lang);
            });
        });
        
        // Initialize
        setLanguage(defaultLang);
    }
});

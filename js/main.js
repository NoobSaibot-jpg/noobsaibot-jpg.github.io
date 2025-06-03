// Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setActiveLanguage(currentLang);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setActiveLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
    
    function setActiveLanguage(lang) {
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const translations = {
            en: {
                // Navigation
                'home': 'Home',
                'skill': 'Skill',
                'education': 'Education',
                'experience': 'Experience',
                'projects': 'Projects',
                'contact': 'Contact',
                
                // About Section
                'about-me': 'About Me',
                'about-name': 'Timofii Manko',
                'about-text': 'Hi, I\'m Timofii, a Full Stack Developer from Kharkiv, Ukraine. I specialize in building modern web applications using JavaScript/React for the frontend and Python/Node.js for the backend. With expertise in both client and server-side development, I create robust and scalable solutions that deliver exceptional user experiences.',
                'age': 'Age',
                'address': 'Address',
                'email': 'Email',
                'phone': 'Phone',
                'website': 'Website',
                
                // Skill Section
                'skill-title': 'Skill',
                
                // Education Section
                'education-title': 'Education',
                'medical-business': 'Medical Business',
                'computer-modeling': 'Department of Computer Modeling, Design and Computer Graphics',
                'web-developer': 'Web-developer 2021',
                'react-developer': 'React developer',
                
                // Experience Section
                'experience-title': 'Experience',
                'engineer': 'Engineer',
                'telegram-bot': 'Creating a Telegram bot, testing fire detectors',
                'software-developer': 'Software Developer',
                'api-development': 'API Development, Developed software for data processing (images and PDFs)',
                'document-management': 'Developed software for data processing (images and PDFs), created electronic archives and registries',
                
                // Projects Section
                'featured-projects': 'Featured Projects',
                'scan-data-desc': 'Web application for scanning and processing data using modern technologies.',
                'itdocumentum-desc': 'Document management and business process system for company workflow optimization.',
                'view-project': 'View Project',
                
                // Contact Section
                'contact-title': 'Contact',
                'name': 'Name',
                'email': 'Email',
                'subject': 'Subject',
                'message': 'Message',
                'send-message': 'Send Message',
                'attention': 'Attention',
                'attention-text': 'Please fill in all fields. The name, subject and message must be at least 3 characters long. Make sure your email is valid!',
                'success': 'Success',
                'success-text': 'Your message has been sent successfully! Thank you for contacting me.',
                'error': 'Error',
                'error-text': 'There was an error sending your message. Please try again later.',
                'close': 'Close'
            },
            uk: {
                // Navigation
                'home': 'Головна',
                'skill': 'Навички',
                'education': 'Освіта',
                'experience': 'Досвід',
                'projects': 'Проекти',
                'contact': 'Контакти',
                
                // About Section
                'about-me': 'Про мене',
                'about-name': 'Тимофій Манько',
                'about-text': 'Привіт, я Тімофій, Full Stack Developer з Харкова, Україна. Я спеціалізуюся на розробці сучасних веб-додатків, використовуючи JavaScript/React для фронтенду та Python/Node.js для бекенду. Маючи досвід як у клієнтській, так і в серверній розробці, я створюю надійні та масштабовані рішення, які забезпечують винятковий користувацький досвід.',
                'age': 'Вік',
                'address': 'Адреса',
                'email': 'Email',
                'phone': 'Телефон',
                'website': 'Веб-сайт',
                
                // Skill Section
                'skill-title': 'Навички',
                
                // Education Section
                'education-title': 'Освіта',
                'medical-business': 'Лікувальна справа',
                'computer-modeling': 'Кафедра комп\'ютерного моделювання, проектування та комп\'ютерної графіки',
                'web-developer': 'Веб-розробник 2021',
                'react-developer': 'React розробник',
                
                // Experience Section
                'experience-title': 'Досвід',
                'engineer': 'Інженер',
                'telegram-bot': 'Створення Telegram бота, тестування пожежних датчиків',
                'software-developer': 'Розробник програмного забезпечення',
                'api-development': 'Розробка API, розробка програмного забезпечення для обробки даних (зображення та PDF)',
                'document-management': 'Розробка програмного забезпечення для обробки даних (зображення та PDF), створення електронних архівів та реєстрів',
                
                // Projects Section
                'featured-projects': 'Реалізовані проекти',
                'scan-data-desc': 'Веб-додаток для сканування та обробки даних з використанням сучасних технологій.',
                'itdocumentum-desc': 'Система управління документами та бізнес-процесами для оптимізації роботи компанії.',
                'view-project': 'Переглянути проект',
                
                // Contact Section
                'contact-title': 'Контакти',
                'name': 'Ім\'я',
                'email': 'Email',
                'subject': 'Тема',
                'message': 'Повідомлення',
                'send-message': 'Надіслати повідомлення',
                'attention': 'Увага',
                'attention-text': 'Будь ласка, заповніть усі поля. Ім\'я, тема та повідомлення повинні містити щонайменше 3 символи. Переконайтеся, що ваш email дійсний!',
                'success': 'Успішно',
                'success-text': 'Ваше повідомлення успішно надіслано! Дякую за звернення.',
                'error': 'Помилка',
                'error-text': 'Виникла помилка при надсиланні повідомлення. Будь ласка, спробуйте пізніше.',
                'close': 'Закрити'
            }
        };
        
        // Update text content based on selected language
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                // For input elements, update placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            } else {
                console.warn(`Translation missing for key "${key}" in language "${lang}"`);
            }
        });

        // Update project descriptions
        const projectDescriptions = document.querySelectorAll('.project-description');
        projectDescriptions.forEach(desc => {
            const projectName = desc.closest('.project-item').querySelector('.project-title a').textContent;
            if (projectName === 'Scan Data') {
                desc.textContent = translations[lang]['scan-data-desc'];
            } else if (projectName === 'IT Documentum') {
                desc.textContent = translations[lang]['itdocumentum-desc'];
            }
        });
    }
}); 
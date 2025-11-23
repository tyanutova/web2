// Плавная прокрутка по якорным ссылкам
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Модальное окно с акцией
    const ctaButton = document.getElementById('cta-button');
    const promoModal = document.getElementById('promo-modal');
    const closeButtons = document.querySelectorAll('.close-button, #promo-close-btn');

    // Показ модального окна при клике на CTA кнопку
    if (ctaButton && promoModal) {
        ctaButton.addEventListener('click', () => {
            // Прокручиваем к меню
            const menuSection = document.querySelector('#menu');
            if (menuSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = menuSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Показываем промо-модальное окно с задержкой
            setTimeout(() => {
                promoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }, 800);
        });
    }

    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (promoModal) {
                promoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === promoModal) {
            promoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Валидация формы
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            // Сброс предыдущих ошибок
            clearErrors();

            let isValid = true;

            // Валидация имени
            if (name.length < 2) {
                showError(this.name, 'Имя должно содержать минимум 2 символа');
                isValid = false;
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(this.email, 'Введите корректный email адрес');
                isValid = false;
            }

            // Валидация сообщения
            if (message.length < 10) {
                showError(this.message, 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }

            if (isValid) {
                // Имитация отправки формы
                showSuccessMessage();
                this.reset();
            }
        });
    }

    // Функция показа ошибок
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }

    // Функция очистки ошибок
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });

        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }

    // Функция показа успешного сообщения
    function showSuccessMessage() {
        // Создаем элемент для сообщения
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: linear-gradient(135deg, var(--color-accent), var(--color-gold));
            color: white;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            margin-top: 1rem;
            font-family: var(--font-body);
            font-weight: 500;
        `;
        successDiv.innerHTML = `
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">✅ Сообщение отправлено!</h4>
            <p style="margin: 0; opacity: 0.9;">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
        `;

        // Добавляем сообщение перед формой
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);

        // Удаляем сообщение через 5 секунд
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Закрытие модального окна на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && promoModal.style.display === 'block') {
            promoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.process-step, .menu-item, .gallery-grid img');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.process-step, .menu-item, .gallery-grid img').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запускаем анимацию при загрузке и скролле
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
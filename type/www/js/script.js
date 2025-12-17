// DOM Elements
const tabItems = document.querySelectorAll('.tab-item');
const navSectionTitles = document.querySelectorAll('.nav-section-title');
const ratingOptions = document.querySelectorAll('.rating-option input[type="radio"]');
const submitBtn = document.querySelector('.submit-btn');
const feedbackTextarea = document.querySelector('.feedback-input textarea');

// Tab Navigation
tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabItems.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Here you could add logic to show/hide different content sections
        console.log(`Switched to tab: ${tab.textContent}`);
    });
});

// Sidebar Navigation
navSectionTitles.forEach(title => {
    
    document.querySelectorAll('.nav-section').forEach(s => {
        const btn = s.querySelector('.nav-section-title');
        if (btn) {
            // active 클래스가 있으면 true, 없으면 false로 설정
            const isActive = s.classList.contains('active');
            btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }
    });
    title.addEventListener('click', () => {
        const section = title.closest('.nav-section');
        const isActive = section.classList.contains('active');
        
        // Close all sections
        document.querySelectorAll('.nav-section').forEach(s => {
            s.classList.remove('active');
            const btn = s.querySelector('.nav-section-title');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked section if it wasn't active
        if (!isActive) {
            section.classList.add('active');
            title.setAttribute('aria-expanded', 'true');
        }
    });
});

// Rating System
ratingOptions.forEach(radio => {
    radio.addEventListener('change', () => {
        console.log(`Rating selected: ${radio.value}`);
    });
});

// Feedback Submission
submitBtn.addEventListener('click', () => {
    const selectedRating = document.querySelector('input[name="satisfaction"]:checked');
    const feedbackText = feedbackTextarea.value.trim();
    
    if (!selectedRating) {
        alert('만족도를 선택해 주세요.');
        return;
    }
    
    if (feedbackText.length > 100) {
        alert('의견은 100자 이내로 작성해 주세요.');
        return;
    }
    
    // Simulate form submission
    const formData = {
        rating: selectedRating.value,
        feedback: feedbackText,
        timestamp: new Date().toISOString()
    };
    
    console.log('Feedback submitted:', formData);
    
    // Show success message
    alert('소중한 의견이 등록되었습니다. 감사합니다.');
    
    // Reset form
    document.querySelector('input[name="satisfaction"]:checked').checked = false;
    feedbackTextarea.value = '';
});

// Smooth Scrolling for Anchor Links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// Header Scroll Effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Institution Carousel Auto-scroll (optional)
let institutionIndex = 0;
const institutionItems = document.querySelectorAll('.institution-item');

function rotateInstitutions() {
    institutionItems.forEach((item, index) => {
        item.style.opacity = index === institutionIndex ? '1' : '0.7';
    });
    institutionIndex = (institutionIndex + 1) % institutionItems.length;
}

// Uncomment to enable auto-rotation
// setInterval(rotateInstitutions, 3000);

// Form Validation Helper
function validateKoreanInput(input) {
    const koreanRegex = /^[가-힣\s]*$/;
    return koreanRegex.test(input);
}

// Text Area Character Counter
feedbackTextarea.addEventListener('input', () => {
    const currentLength = feedbackTextarea.value.length;
    const maxLength = 100;
    
    if (currentLength > maxLength) {
        feedbackTextarea.value = feedbackTextarea.value.substring(0, maxLength);
    }
    
    // You could add a character counter display here
    console.log(`Characters: ${Math.min(currentLength, maxLength)}/${maxLength}`);
});

// Accessibility: Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close modals or dropdowns
    if (e.key === 'Escape') {
        // Close any open dropdowns or modals
        document.querySelectorAll('.nav-section.active').forEach(section => {
            if (!section.querySelector('.nav-subitem.active')) {
                section.classList.remove('active');
            }
        });
    }
    
    // Enter key for button-like elements
    if (e.key === 'Enter' && e.target.classList.contains('tab-item')) {
        e.target.click();
    }
});

// Print Functionality
document.querySelector('[aria-label="인쇄"]')?.addEventListener('click', () => {
    window.print();
});

// Share Functionality
// document.querySelector('[aria-label="공유"]')?.addEventListener('click', () => {
    
// });

// Initialize page
// document.addEventListener('DOMContentLoaded', () => {
    
//     // Add fade-in animation to main sections
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, { threshold: 0.1 });
    
//     document.querySelectorAll('.content-sections > *').forEach(section => {
//         section.style.opacity = '0';
//         section.style.transform = 'translateY(20px)';
//         section.style.transition = 'all 0.6s ease';
//         observer.observe(section);
//     });
// });

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile Menu Toggle (if needed)
function createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');

    // navMenu가 존재하지 않으면 함수 종료
    if (!navMenu) {
        return;
    }

    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', '메뉴 열기');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        mobileToggle.innerHTML = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        mobileToggle.setAttribute('aria-label',
            navMenu.classList.contains('mobile-open') ? '메뉴 닫기' : '메뉴 열기'
        );
    });

    // Insert mobile toggle before nav menu
    navMenu.parentNode.insertBefore(mobileToggle, navMenu);
}

// Initialize mobile menu on smaller screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && !mobileToggle) {
        createMobileMenu();
    } else if (window.innerWidth > 768 && mobileToggle) {
        mobileToggle.remove();
        document.querySelector('.nav-menu').classList.remove('mobile-open');
    }
});

$(document).ready(function() {
    // Modal functionality
    $('#openCompareModal').on('click', function() {
        $('#compareModal').fadeIn(300);
    });
    
    $('#closeModal, #cancelModal').on('click', function() {
        $('#compareModal').fadeOut(300);
    });
    
    // Close modal when clicking outside
    $(window).on('click', function(event) {
        if (event.target.id === 'compareModal') {
            $('#compareModal').fadeOut(300);
        }
    });
    
    // Remove card from comparison
    $('.remove-btn').on('click', function() {
        $(this).closest('.compare-card').fadeOut(300, function() {
            $(this).remove();
        });
    });
    
    // Form input formatting (숫자 입력 포맷팅)
    $('.number-input').on('input', function() {
        let value = $(this).val().replace(/[^\d]/g, '');
        if (value) {
            value = parseInt(value).toLocaleString();
        }
        $(this).val(value);
    });
    
    // Newsletter subscription
    $('.subscribe-btn').on('click', function() {
        const email = $('.email-input').val();
        if (email && validateEmail(email)) {
            alert('구독 신청이 완료되었습니다.');
            $('.email-input').val('');
        } else {
            alert('올바른 이메일 주소를 입력해주세요.');
        }
    });
    
    // Email validation
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Action button clicks
    $('.action-button, .card-action-btn').on('click', function() {
        alert('상담 신청이 접수되었습니다. 곧 연락드리겠습니다.');
    });
    
    // Info action buttons
    $('.btn-secondary').on('click', function() {
        alert('상담 신청이 접수되었습니다.');
    });
    
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 200);
        }
    });
    
    // Form validation
    $('form').on('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        const requiredFields = $(this).find('[required]');
        
        requiredFields.each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('error');
                isValid = false;
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (isValid) {
            alert('폼이 성공적으로 제출되었습니다.');
            $(this)[0].reset();
        } else {
            alert('모든 필수 필드를 입력해주세요.');
        }
    });

    // Add loading animation for buttons
    $('.action-button, .compare-btn, .subscribe-btn, .access-btn').on('click', function() {
        const $button = $(this);
        const originalText = $button.text();
        
        $button.text('처리 중...').prop('disabled', true);
        
        setTimeout(function() {
            $button.text(originalText).prop('disabled', false);
        }, 2000);
    });
    
    // Scroll to top functionality
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > 200) {
    //         if (!$('.scroll-to-top').length) {
    //             $('body').append(
    //                 '<button class="scroll-to-top" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: var(--krds-light-color-button-primary-fill); border: none; border-radius: 50%; cursor: pointer; z-index: 999; font-size: 18px;"><img src="/type/www/img/icons/ico_go_top.svg" alt="맨 위로 가기" style="filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(132deg) brightness(103%) contrast(103%);"></button>'
    //             );
    //         }
    //         $('.scroll-to-top').fadeIn();
    //     } else {
    //         $('.scroll-to-top').fadeOut();
    //     }
    // });
    
    // $(document).on('click', '.scroll-to-top', function() {
    //     $('html, body').animate({scrollTop: 0}, 200);
    // });
    
    // Tooltip functionality
    // $('[data-tooltip]').hover(
    //     function() {
    //         const tooltipText = $(this).data('tooltip');
    //         $(this).append('<div class="tooltip">' + tooltipText + '</div>');
    //         $('.tooltip').fadeIn(200);
    //     },
    //     function() {
    //         $('.tooltip').remove();
    //     }
    // );
    
    // Print functionality
    // $('.action-btn').filter(':contains("🖨")').on('click', function() {
    //     window.print();
    // });
    
    // Share functionality
    // $('.action-btn').filter(':contains("🔗")').on('click', function() {
    //     if (navigator.share) {
    //         navigator.share({
    //             title: '신용회복위원회 - 재무조성 지원',
    //             url: window.location.href
    //         });
    //     } else {
    //         // Fallback for browsers that don't support Web Share API
    //         const url = window.location.href;
    //         navigator.clipboard.writeText(url).then(function() {
    //             alert('링크가 클립보드에 복사되었습니다.');
    //         });
    //     }
    // });
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Institution Carousel Swiper - Moved to common.js

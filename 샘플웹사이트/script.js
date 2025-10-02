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
    
    // Mobile menu toggle
    $('.mobile-menu-btn').on('click', function() {
        $('.main-nav').slideToggle(300);
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
    
    $('.btn-primary').on('click', function() {
        alert('상품이 선택되었습니다.');
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 500);
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
    
    // Responsive sidebar toggle for mobile
    if ($(window).width() <= 768) {
        $('.sidebar').hide();
        
        // Add sidebar toggle button for mobile
        $('.main-content').prepend(
            '<button class="sidebar-toggle" style="display: block; margin-bottom: 16px; padding: 8px 16px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer;">메뉴</button>'
        );
        
        $('.sidebar-toggle').on('click', function() {
            $('.sidebar').slideToggle(300);
        });
    }
    
    // Window resize handler
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $('.sidebar').show();
            $('.sidebar-toggle').hide();
            $('.main-nav').show();
        } else {
            $('.sidebar-toggle').show();
            $('.main-nav').hide();
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
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            if (!$('.scroll-to-top').length) {
                $('body').append(
                    '<button class="scroll-to-top" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: #f97316; color: white; border: none; border-radius: 50%; cursor: pointer; z-index: 999; font-size: 18px;">↑</button>'
                );
            }
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
    
    $(document).on('click', '.scroll-to-top', function() {
        $('html, body').animate({scrollTop: 0}, 500);
    });
    
    // Tooltip functionality
    $('[data-tooltip]').hover(
        function() {
            const tooltipText = $(this).data('tooltip');
            $(this).append('<div class="tooltip">' + tooltipText + '</div>');
            $('.tooltip').fadeIn(200);
        },
        function() {
            $('.tooltip').remove();
        }
    );
    
    // Print functionality
    $('.action-btn').filter(':contains("🖨")').on('click', function() {
        window.print();
    });
    
    // Share functionality
    $('.action-btn').filter(':contains("🔗")').on('click', function() {
        if (navigator.share) {
            navigator.share({
                title: '신용회복위원회 - 재무조성 지원',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(function() {
                alert('링크가 클립보드에 복사되었습니다.');
            });
        }
    });
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

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // You could send this to a logging service
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log('Page loaded in:', Math.round(loadTime), 'ms');
});
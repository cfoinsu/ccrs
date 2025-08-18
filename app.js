// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모달 관련 요소들 선택
    const modalTriggers = document.querySelectorAll('.modal-trigger-card');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // 모달 열기 함수
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            
            // 접근성을 위한 포커스 관리
            const firstFocusable = modal.querySelector('.modal-close');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    // 모달 닫기 함수
    function closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // 배경 스크롤 복원
    }

    // 모든 모달 닫기 함수
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = '';
    }

    // 모달 트리거 카드 클릭 이벤트
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modal;
            if (modalId) {
                openModal(modalId);
            }
        });

        // 키보드 접근성 (Enter, Space)
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modalId = this.dataset.modal;
                if (modalId) {
                    openModal(modalId);
                }
            }
        });
    });

    // 모달 닫기 버튼 이벤트
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // 모달 오버레이 클릭으로 닫기
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // 카드 호버 효과 개선
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 부드러운 스크롤 애니메이션
    function smoothScroll(target, duration = 1000) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // 섹션 간 네비게이션 (미래 확장을 위한 기본 구조)
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.setAttribute('data-section', index);
    });

    // 스크롤 시 섹션 애니메이션 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 카드들에 순차적 애니메이션 효과 적용
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // 섹션들을 옵저버에 등록
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // 미리보기 버튼 클릭 효과
    const previewButtons = document.querySelectorAll('.preview-card .btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 실제 기능에서는 해당 페이지로 이동하거나 미리보기를 표시
            const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
            
            // 간단한 알림 표시 (실제 구현에서는 페이지 이동이나 다른 기능으로 대체)
            showNotification(`${cardTitle} 미리보기 기능입니다.`);
        });
    });

    // 알림 표시 함수
    function showNotification(message, duration = 3000) {
        // 기존 알림이 있다면 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 알림 스타일
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-btn-primary-text)',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            fontSize: '14px',
            fontWeight: '500',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        document.body.appendChild(notification);

        // 애니메이션으로 표시
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 자동으로 숨기기
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // 모달 내 버튼 클릭 효과
    const modalButtons = document.querySelectorAll('.modal .btn--primary');
    modalButtons.forEach(button => {
        if (!button.classList.contains('modal-close-btn')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const modal = this.closest('.modal');
                const modalId = modal.getAttribute('id');
                
                let message = '';
                if (modalId === 'modal1') {
                    message = '상담 서비스로 연결됩니다.';
                } else if (modalId === 'modal2') {
                    message = '온라인 상담 신청 페이지로 이동합니다.';
                }
                
                closeModal(modal);
                
                setTimeout(() => {
                    showNotification(message);
                }, 300);
            });
        }
    });

    // 디자인 카드 특별 효과
    const designCards = document.querySelectorAll('.design-card');
    designCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').textContent;
            showNotification(`${cardTitle} 디자인 상세보기 기능입니다.`);
        });

        // 키보드 접근성
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 초기 로드 애니메이션
    setTimeout(() => {
        const firstSection = document.querySelector('.header');
        if (firstSection) {
            firstSection.style.opacity = '1';
            firstSection.style.transform = 'translateY(0)';
        }
    }, 100);

    // 페이지 로드 완료 후 추가 초기화
    window.addEventListener('load', function() {
        // 모든 이미지가 로드된 후 레이아웃 재조정
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        if (images.length === 0) {
            initializeLayout();
        } else {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', function() {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            initializeLayout();
                        }
                    });
                    
                    img.addEventListener('error', function() {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            initializeLayout();
                        }
                    });
                }
            });
            
            if (loadedImages === images.length) {
                initializeLayout();
            }
        }
    });

    function initializeLayout() {
        // 레이아웃이 완전히 로드된 후 실행할 코드
        console.log('레이아웃 초기화 완료');
        
        // 모든 섹션에 fade-in 클래스 추가
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('loaded');
            }, index * 200);
        });
    }
});
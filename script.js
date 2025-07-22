document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单激活状态
    const navLinks = document.querySelectorAll('.category-nav a');
    const sections = document.querySelectorAll('.portfolio-section, .profile-section');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // 初始化导航菜单
    function initNavigation() {
        // 点击导航链接时的处理
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有链接的激活状态
                navLinks.forEach(item => item.classList.remove('active'));
                
                // 添加当前链接的激活状态
                this.classList.add('active');
                
                // 滚动到对应的部分
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // 在移动设备上点击导航链接后关闭菜单
                const mainNav = document.getElementById('main-nav');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
        
        // 汉堡菜单点击事件
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }
        
        // 滚动时更新导航状态和回到顶部按钮
        window.addEventListener('scroll', function() {
            updateNavigation();
            toggleBackToTopButton();
        });
        
        // 点击回到顶部按钮
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // 更新导航状态
    function updateNavigation() {
        const scrollPosition = window.scrollY + 100; // 添加偏移量
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }
    
    // 移除了图片点击放大效果
    function initPortfolioDetails() {
        // 此功能已被移除
    }
    
    // 防复制功能
    function initCopyProtection() {
        // 禁用右键菜单
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG' || e.target.closest('.portfolio-image')) {
                e.preventDefault();
                return false;
            }
        });
        
        // 禁用拖拽图片
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
        
        // 禁用键盘快捷键
        document.addEventListener('keydown', function(e) {
            // 禁用Ctrl+S, Ctrl+P, Ctrl+Shift+I等快捷键
            if ((e.ctrlKey || e.metaKey) && 
                (e.key === 's' || e.key === 'p' || 
                 (e.shiftKey && e.key === 'i') || 
                 e.key === 'c')) {
                e.preventDefault();
                return false;
            }
        });
    }
    
    // 控制回到顶部按钮的显示和隐藏
    function toggleBackToTopButton() {
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }
    
    // 初始化所有功能
    function init() {
        initNavigation();
        initPortfolioDetails();
        initCopyProtection();
        
        // 初始化时触发一次导航更新和按钮状态
        updateNavigation();
        toggleBackToTopButton();
    }
    
    // 启动初始化
    init();
});
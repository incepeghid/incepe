document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and X
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Presentation Section Slide functionality
    const slides = document.querySelectorAll('.slide:not(.resurse-slide)');
    const indicators = document.querySelectorAll('.indicators:not(.fs-indicators):not(.resurse-indicators) .indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    
    // Create progress line for indicators
    const indicatorsContainer = document.querySelector('.indicators:not(.fs-indicators):not(.resurse-indicators)');
    if (indicatorsContainer) {
        const progressLine = document.createElement('div');
        progressLine.classList.add('progress-line');
        indicatorsContainer.appendChild(progressLine);
        
        // Set initial width
        updateProgressLine(0);
    }
    
    function updateProgressLine(index) {
        const progressLine = document.querySelector('.indicators:not(.fs-indicators):not(.resurse-indicators) .progress-line');
        if (!progressLine) return;
        
        const totalSlides = indicators.length;
        if (totalSlides <= 1) return;
        
        // Calculate width based on current index
        const width = (index / (totalSlides - 1)) * 100;
        progressLine.style.width = `${width}%`;
    }
    
    function showSlide(index) {
        // Hide all slides with fade effect
        slides.forEach(slide => {
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.classList.remove('active');
            }, 200);
        });
        
        // Show current slide with fade effect
        setTimeout(() => {
            if (slides[index]) {
                slides[index].classList.add('active');
                slides[index].style.opacity = '0';
                
                setTimeout(() => {
                    slides[index].style.opacity = '1';
                }, 50);
            }
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update progress line
            updateProgressLine(index);
            
            // Update button states
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === slides.length - 1;
        }, 200);
    }
    
    // Add event listeners to buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
    }
    
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Initialize slides with fade effect
    slides.forEach(slide => {
        slide.style.transition = 'opacity 0.4s ease';
        if (!slide.classList.contains('active')) {
            slide.style.opacity = '0';
        } else {
            slide.style.opacity = '1';
        }
    });
    
    // CTA button click event
    const ctaButton = document.querySelector('.cta-button');
    const presentationSection = document.getElementById('presentation');
    
    if (ctaButton && presentationSection) {
        ctaButton.addEventListener('click', () => {
            presentationSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add subtle hover effect to slide container
    const slideContainer = document.querySelector('.slide-container:not(.resurse-container)');
    if (slideContainer) {
        slideContainer.addEventListener('mouseenter', () => {
            slideContainer.style.transform = 'translateY(-5px)';
            slideContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
        
        slideContainer.addEventListener('mouseleave', () => {
            slideContainer.style.transform = 'translateY(0)';
            slideContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    }

    // Fullscreen functionality
    const enterFullscreenBtn = document.getElementById('enterFullscreen');
    const exitFullscreenBtn = document.getElementById('exitFullscreen');
    const fullscreenMode = document.getElementById('fullscreenMode');
    const fullscreenSlides = document.getElementById('fullscreenSlides');
    const fsIndicators = document.querySelectorAll('.fs-indicators .indicator');
    const fsPrevBtn = document.querySelector('.fs-prev-btn');
    const fsNextBtn = document.querySelector('.fs-next-btn');
    
    let fsCurrentSlide = 0;
    let fullscreenSlidesArray = [];

    // Create progress line for fullscreen indicators
    const fsIndicatorsContainer = document.querySelector('.fs-indicators');
    if (fsIndicatorsContainer) {
        const fsProgressLine = document.createElement('div');
        fsProgressLine.classList.add('progress-line');
        fsIndicatorsContainer.appendChild(fsProgressLine);
        
        // Set initial width
        updateFsProgressLine(0);
    }
    
    function updateFsProgressLine(index) {
        const progressLine = document.querySelector('.fs-indicators .progress-line');
        if (!progressLine) return;
        
        const totalSlides = fsIndicators.length;
        if (totalSlides <= 1) return;
        
        // Calculate width based on current index
        const width = (index / (totalSlides - 1)) * 100;
        progressLine.style.width = `${width}%`;
    }

    function createFullscreenSlides() {
        // Clear existing slides
        fullscreenSlides.innerHTML = '';
        fullscreenSlidesArray = [];
        
        // Clone all slides
        slides.forEach((slide, index) => {
            const fsSlide = document.createElement('div');
            fsSlide.className = 'fullscreen-slide';
            if (index === fsCurrentSlide) {
                fsSlide.classList.add('active');
            }
            
            const fsSlideInner = document.createElement('div');
            fsSlideInner.className = 'fullscreen-slide-inner';
            
            // Clone the content
            fsSlideInner.innerHTML = slide.querySelector('.slide-inner').innerHTML;
            
            fsSlide.appendChild(fsSlideInner);
            fullscreenSlides.appendChild(fsSlide);
            fullscreenSlidesArray.push(fsSlide);
        });
    }
    
    function showFsSlide(index) {
        // Hide all slides with fade effect
        fullscreenSlidesArray.forEach(slide => {
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.classList.remove('active');
            }, 200);
        });
        
        // Show current slide with fade effect
        setTimeout(() => {
            if (fullscreenSlidesArray[index]) {
                fullscreenSlidesArray[index].classList.add('active');
                fullscreenSlidesArray[index].style.opacity = '0';
                
                setTimeout(() => {
                    fullscreenSlidesArray[index].style.opacity = '1';
                }, 50);
            }
            
            // Update indicators
            fsIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update progress line
            updateFsProgressLine(index);
            
            // Update button states
            if (fsPrevBtn) fsPrevBtn.disabled = index === 0;
            if (fsNextBtn) fsNextBtn.disabled = index === fullscreenSlidesArray.length - 1;
        }, 200);
    }
    
    // Enter fullscreen mode
    if (enterFullscreenBtn) {
        enterFullscreenBtn.addEventListener('click', () => {
            fsCurrentSlide = currentSlide;
            createFullscreenSlides();
            fullscreenMode.classList.add('active');
            document.body.classList.add('fs-active');
            showFsSlide(fsCurrentSlide);
            
            // Bind keyboard navigation
            document.addEventListener('keydown', handleFullscreenKeydown);
        });
    }
    
    // Exit fullscreen mode
    if (exitFullscreenBtn) {
        exitFullscreenBtn.addEventListener('click', () => {
            fullscreenMode.classList.remove('active');
            document.body.classList.remove('fs-active');
            // Sync current slide position with main slides
            currentSlide = fsCurrentSlide;
            showSlide(currentSlide);
            
            // Remove keyboard navigation
            document.removeEventListener('keydown', handleFullscreenKeydown);
        });
    }
    
    // Add event listeners to fullscreen indicators
    fsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            fsCurrentSlide = index;
            showFsSlide(fsCurrentSlide);
        });
    });
    
    // Add event listeners to fullscreen navigation buttons
    if (fsPrevBtn && fsNextBtn) {
        fsPrevBtn.addEventListener('click', function() {
            if (fsCurrentSlide > 0) {
                fsCurrentSlide--;
                showFsSlide(fsCurrentSlide);
            }
        });
        
        fsNextBtn.addEventListener('click', function() {
            if (fsCurrentSlide < fullscreenSlidesArray.length - 1) {
                fsCurrentSlide++;
                showFsSlide(fsCurrentSlide);
            }
        });
    }
    
    // Keyboard navigation for fullscreen mode
    function handleFullscreenKeydown(e) {
        switch(e.key) {
            case 'Escape':
                exitFullscreenBtn.click();
                break;
            case 'ArrowLeft':
                if (fsCurrentSlide > 0) {
                    fsCurrentSlide--;
                    showFsSlide(fsCurrentSlide);
                }
                break;
            case 'ArrowRight':
                if (fsCurrentSlide < fullscreenSlidesArray.length - 1) {
                    fsCurrentSlide++;
                    showFsSlide(fsCurrentSlide);
                }
                break;
        }
    }

    // RESURSE SECTION FUNCTIONALITY
    // ---------------------------------
    const resurseSlides = document.querySelectorAll('.resurse-slide');
    const resurseIndicators = document.querySelectorAll('.resurse-indicators .indicator');
    const resursePrevBtn = document.querySelector('.resurse-prev-btn');
    const resurseNextBtn = document.querySelector('.resurse-next-btn');
    
    let currentResurseSlide = 0;
    
    // Create progress line for resurse indicators
    const resurseIndicatorsContainer = document.querySelector('.resurse-indicators');
    if (resurseIndicatorsContainer) {
        const resurseProgressLine = document.createElement('div');
        resurseProgressLine.classList.add('progress-line');
        resurseIndicatorsContainer.appendChild(resurseProgressLine);
        
        // Set initial width
        updateResurseProgressLine(0);
    }
    
    function updateResurseProgressLine(index) {
        const progressLine = document.querySelector('.resurse-indicators .progress-line');
        if (!progressLine) return;
        
        const totalSlides = resurseIndicators.length;
        if (totalSlides <= 1) return;
        
        // Calculate width based on current index
        const width = (index / (totalSlides - 1)) * 100;
        progressLine.style.width = `${width}%`;
    }
    
    function showResurseSlide(index) {
        // Hide all slides with fade effect
        resurseSlides.forEach(slide => {
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.classList.remove('active');
            }, 200);
        });
        
        // Show current slide with fade effect
        setTimeout(() => {
            if (resurseSlides[index]) {
                resurseSlides[index].classList.add('active');
                resurseSlides[index].style.opacity = '0';
                
                setTimeout(() => {
                    resurseSlides[index].style.opacity = '1';
                }, 50);
            }
            
            // Update indicators
            resurseIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update progress line
            updateResurseProgressLine(index);
            
            // Update button states
            if (resursePrevBtn) resursePrevBtn.disabled = index === 0;
            if (resurseNextBtn) resurseNextBtn.disabled = index === resurseSlides.length - 1;
        }, 200);
    }
    
    // Add event listeners to resurse buttons
    if (resursePrevBtn && resurseNextBtn) {
        resursePrevBtn.addEventListener('click', function() {
            if (currentResurseSlide > 0) {
                currentResurseSlide--;
                showResurseSlide(currentResurseSlide);
            }
        });
        
        resurseNextBtn.addEventListener('click', function() {
            if (currentResurseSlide < resurseSlides.length - 1) {
                currentResurseSlide++;
                showResurseSlide(currentResurseSlide);
            }
        });
    }
    
    // Add event listeners to resurse indicators
    resurseIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentResurseSlide = index;
            showResurseSlide(currentResurseSlide);
        });
    });
    
    // Initialize resurse slides with fade effect
    resurseSlides.forEach(slide => {
        slide.style.transition = 'opacity 0.4s ease';
        if (!slide.classList.contains('active')) {
            slide.style.opacity = '0';
        } else {
            slide.style.opacity = '1';
        }
    });
    
    // Add hover effect to resurse slide container
    const resurseContainer = document.querySelector('.resurse-container');
    if (resurseContainer) {
        resurseContainer.addEventListener('mouseenter', () => {
            resurseContainer.style.transform = 'translateY(-5px)';
            resurseContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
        
        resurseContainer.addEventListener('mouseleave', () => {
            resurseContainer.style.transform = 'translateY(0)';
            resurseContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    }

    // Resurse Fullscreen functionality
    const enterResurseFullscreenBtn = document.getElementById('resurseFullscreen');
    const exitResurseFullscreenBtn = document.getElementById('exitResurseFullscreen');
    const resurseFullscreenMode = document.getElementById('resurseFullscreenMode');
    const resurseFullscreenSlides = document.getElementById('resurseFullscreenSlides');
    const resursefsIndicators = document.querySelectorAll('.resurse-fs-indicators .indicator');
    const resursefsPrevBtn = document.querySelector('.resurse-fs-prev-btn');
    const resursefsNextBtn = document.querySelector('.resurse-fs-next-btn');
    
    let resursefsCurrentSlide = 0;
    let resurseFullscreenSlidesArray = [];

    // Create progress line for resurse fullscreen indicators
    const resursefsIndicatorsContainer = document.querySelector('.resurse-fs-indicators');
    if (resursefsIndicatorsContainer) {
        const resursefsProgressLine = document.createElement('div');
        resursefsProgressLine.classList.add('progress-line');
        resursefsIndicatorsContainer.appendChild(resursefsProgressLine);
        
        // Set initial width
        updateResursefsProgressLine(0);
    }
    
    function updateResursefsProgressLine(index) {
        const progressLine = document.querySelector('.resurse-fs-indicators .progress-line');
        if (!progressLine) return;
        
        const totalSlides = resursefsIndicators.length;
        if (totalSlides <= 1) return;
        
        // Calculate width based on current index
        const width = (index / (totalSlides - 1)) * 100;
        progressLine.style.width = `${width}%`;
    }

    function createResurseFullscreenSlides() {
        // Clear existing slides
        resurseFullscreenSlides.innerHTML = '';
        resurseFullscreenSlidesArray = [];
        
        // Clone all slides
        resurseSlides.forEach((slide, index) => {
            const fsSlide = document.createElement('div');
            fsSlide.className = 'fullscreen-slide';
            if (index === resursefsCurrentSlide) {
                fsSlide.classList.add('active');
            }
            
            const fsSlideInner = document.createElement('div');
            fsSlideInner.className = 'fullscreen-slide-inner';
            
            // Clone the content
            fsSlideInner.innerHTML = slide.querySelector('.slide-inner').innerHTML;
            
            fsSlide.appendChild(fsSlideInner);
            resurseFullscreenSlides.appendChild(fsSlide);
            resurseFullscreenSlidesArray.push(fsSlide);
        });
    }
    
    function showResursefsSlide(index) {
        // Hide all slides with fade effect
        resurseFullscreenSlidesArray.forEach(slide => {
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.classList.remove('active');
            }, 200);
        });
        
        // Show current slide with fade effect
        setTimeout(() => {
            if (resurseFullscreenSlidesArray[index]) {
                resurseFullscreenSlidesArray[index].classList.add('active');
                resurseFullscreenSlidesArray[index].style.opacity = '0';
                
                setTimeout(() => {
                    resurseFullscreenSlidesArray[index].style.opacity = '1';
                }, 50);
            }
            
            // Update indicators
            resursefsIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update progress line
            updateResursefsProgressLine(index);
            
            // Update button states
            if (resursefsPrevBtn) resursefsPrevBtn.disabled = index === 0;
            if (resursefsNextBtn) resursefsNextBtn.disabled = index === resurseFullscreenSlidesArray.length - 1;
        }, 200);
    }
    
    // Enter resurse fullscreen mode
    if (enterResurseFullscreenBtn) {
        enterResurseFullscreenBtn.addEventListener('click', () => {
            resursefsCurrentSlide = currentResurseSlide;
            createResurseFullscreenSlides();
            resurseFullscreenMode.classList.add('active');
            document.body.classList.add('fs-active');
            showResursefsSlide(resursefsCurrentSlide);
            
            // Bind keyboard navigation
            document.addEventListener('keydown', handleResurseFullscreenKeydown);
        });
    }
    
    // Exit resurse fullscreen mode
    if (exitResurseFullscreenBtn) {
        exitResurseFullscreenBtn.addEventListener('click', () => {
            resurseFullscreenMode.classList.remove('active');
            document.body.classList.remove('fs-active');
            // Sync current slide position with main slides
            currentResurseSlide = resursefsCurrentSlide;
            showResurseSlide(currentResurseSlide);
            
            // Remove keyboard navigation
            document.removeEventListener('keydown', handleResurseFullscreenKeydown);
        });
    }
    
    // Add event listeners to resurse fullscreen indicators
    resursefsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            resursefsCurrentSlide = index;
            showResursefsSlide(resursefsCurrentSlide);
        });
    });
    
    // Add event listeners to resurse fullscreen navigation buttons
    if (resursefsPrevBtn && resursefsNextBtn) {
        resursefsPrevBtn.addEventListener('click', function() {
            if (resursefsCurrentSlide > 0) {
                resursefsCurrentSlide--;
                showResursefsSlide(resursefsCurrentSlide);
            }
        });
        
        resursefsNextBtn.addEventListener('click', function() {
            if (resursefsCurrentSlide < resurseFullscreenSlidesArray.length - 1) {
                resursefsCurrentSlide++;
                showResursefsSlide(resursefsCurrentSlide);
            }
        });
    }
    
    // Keyboard navigation for resurse fullscreen mode
    function handleResurseFullscreenKeydown(e) {
        switch(e.key) {
            case 'Escape':
                exitResurseFullscreenBtn.click();
                break;
            case 'ArrowLeft':
                if (resursefsCurrentSlide > 0) {
                    resursefsCurrentSlide--;
                    showResursefsSlide(resursefsCurrentSlide);
                }
                break;
            case 'ArrowRight':
                if (resursefsCurrentSlide < resurseFullscreenSlidesArray.length - 1) {
                    resursefsCurrentSlide++;
                    showResursefsSlide(resursefsCurrentSlide);
                }
                break;
        }
    }
    
    // Update navigation menu active state based on scroll position
    function updateMenuActiveState() {
        const scrollPosition = window.scrollY;
        
        const sections = [
            document.querySelector('#header'),
            document.querySelector('#presentation'),
            document.querySelector('#resurse')
        ];
        
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach((section, index) => {
            if (!section) return;
            
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }
    
    // Listen for scroll events to update menu
    window.addEventListener('scroll', updateMenuActiveState);
    
    // Initial call to set the active menu item
    updateMenuActiveState();
});

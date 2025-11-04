// Component templates
const HEADER_TEMPLATE = `
    <nav>
        <div class="nav-container">
            <a href="index.html" class="logo-text">
                <img src="voiceflow-icon.svg" alt="Begoo" class="nav-icon" id="navIcon">
                Begoo
            </a>
            <div class="nav-links">
                <a href="privacy.html">Privacy</a>
                <a href="terms.html">Terms</a>
                <a href="#" class="contact-link" onclick="revealAndOpenEmail(event)">Contact</a>
            </div>
        </div>
    </nav>
`;

const FOOTER_TEMPLATE = `
    <footer>
        <div class="footer-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
            <span class="system-requirements">macOS 14.0+ • Apple Silicon</span>
        </div>
        <p>© 2025 Begoo. All rights reserved.</p>
    </footer>
`;

// Component loader for header and footer
document.addEventListener('DOMContentLoaded', function() {
    console.log('Components.js loaded, inserting header and footer...');
    
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        console.log('Header placeholder found, inserting header...');
        headerPlaceholder.innerHTML = HEADER_TEMPLATE;
        
        // Initialize header functionality after loading
        initializeHeader();
    } else {
        console.error('Header placeholder not found!');
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        console.log('Footer placeholder found, inserting footer...');
        footerPlaceholder.innerHTML = FOOTER_TEMPLATE;
    } else {
        console.error('Footer placeholder not found!');
    }
    
    // Replace any email placeholders after components load
    setTimeout(replaceEmailPlaceholders, 100);
});

// Advanced email obfuscation system
function createObfuscatedEmail(type = 'hello') {
    // Multi-layer obfuscation that's very hard for bots to parse
    let userPart;
    
    if (type === 'sales') {
        userPart = String.fromCharCode(115, 97, 108, 101, 115); // 'sales' in char codes
    } else {
        userPart = String.fromCharCode(104, 101, 108, 108, 111); // 'hello' in char codes
    }
    
    const parts = [
        userPart,
        String.fromCharCode(64), // '@' symbol
        ['get', 'be', 'goo'].join(''), // split domain
        String.fromCharCode(46), // '.' symbol  
        ['c', 'o', 'm'].reverse().reverse().join('') // 'com' with fake reverse
    ];
    
    return parts.join('');
}

// Create visual email component that's human-readable but bot-resistant
function createEmailComponent(displayText = null) {
    const container = document.createElement('span');
    container.className = 'email-component';
    container.style.cursor = 'pointer';
    container.style.textDecoration = 'underline';
    container.style.color = 'inherit';
    
    if (displayText) {
        container.textContent = displayText;
    } else {
        // Create visual representation: hello[at]getbegoo[dot]com
        const user = document.createElement('span');
        user.textContent = 'hello';
        
        const atSymbol = document.createElement('span');
        atSymbol.textContent = '[at]';
        atSymbol.style.fontSize = '0.9em';
        atSymbol.style.opacity = '0.7';
        
        const domain = document.createElement('span');
        domain.textContent = 'getbegoo';
        
        const dotSymbol = document.createElement('span');
        dotSymbol.textContent = '[dot]';
        dotSymbol.style.fontSize = '0.9em';
        dotSymbol.style.opacity = '0.7';
        
        const tld = document.createElement('span');
        tld.textContent = 'com';
        
        container.appendChild(user);
        container.appendChild(atSymbol);
        container.appendChild(domain);
        container.appendChild(dotSymbol);
        container.appendChild(tld);
    }
    
    container.onclick = function(e) {
        e.preventDefault();
        revealAndOpenEmail(e);
    };
    
    return container;
}

// Main function to reveal and open email
function revealAndOpenEmail(event, emailType = 'hello') {
    event.preventDefault();
    
    // Get the real email through obfuscation
    const email = createObfuscatedEmail(emailType);
    
    // For header Contact link - just open email client directly
    if (event.target.classList.contains('contact-link')) {
        window.location.href = 'mailto:' + email;
        return false;
    }
    
    // For sales link - just open email client directly
    if (event.target.classList.contains('sales-link') || event.target.closest('.sales-link')) {
        window.location.href = 'mailto:' + email;
        return false;
    }
    
    // For email placeholders in content - show copy feedback then open
    const target = event.target;
    const originalText = target.textContent;
    
    // Try to copy to clipboard first, then open email client
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            target.textContent = 'Copied!';
            setTimeout(() => {
                target.textContent = originalText;
                window.location.href = 'mailto:' + email;
            }, 1000);
        }).catch(() => {
            // Fallback: just open email client
            window.location.href = 'mailto:' + email;
        });
    } else {
        // Fallback: just open email client
        window.location.href = 'mailto:' + email;
    }
    
    return false;
}

// Replace email placeholders with obfuscated components
function replaceEmailPlaceholders() {
    const placeholders = document.querySelectorAll('.email-placeholder');
    
    placeholders.forEach(placeholder => {
        const emailComponent = createEmailComponent();
        placeholder.replaceWith(emailComponent);
    });
    
    // Replace hello@ mailto links with obfuscated versions
    const helloLinks = document.querySelectorAll('a[href*="hello@getbegoo.com"]');
    helloLinks.forEach(link => {
        link.href = '#';
        link.onclick = (e) => revealAndOpenEmail(e, 'hello');
    });
    
    // Replace sales@ mailto links with obfuscated versions
    const salesLinks = document.querySelectorAll('a[href*="sales@getbegoo.com"]');
    salesLinks.forEach(link => {
        link.href = '#';
        link.classList.add('sales-link');
        link.onclick = (e) => revealAndOpenEmail(e, 'sales');
    });
}

// Initialize header functionality (for index.html scroll effects)
function initializeHeader() {
    // Only run scroll effects on index page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Smooth icon transition on scroll
        let lastScrollY = 0;
        const navIcon = document.getElementById('navIcon');
        const heroIcon = document.getElementById('heroIcon');
        const scrollThreshold = 100;
        
        if (navIcon && heroIcon) {
            function handleScroll() {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > scrollThreshold) {
                    navIcon.classList.add('visible');
                    heroIcon.classList.add('hidden');
                } else {
                    navIcon.classList.remove('visible');
                    heroIcon.classList.remove('hidden');
                }
                
                lastScrollY = currentScrollY;
            }
            
            // Throttle scroll events for better performance
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            
            // Initial check
            handleScroll();
        }
    }
}

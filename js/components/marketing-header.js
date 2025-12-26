class MarketingHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="header">
            <div class="pc-menu">
                <div class="header-top">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <ul>
                                    <li><a href="about-us.html" class="link-offset-3">About Us</a></li>
                                    <li><a href="#" class="link-offset-3">News</a></li>
                                    <li><a href="contact.html" class="link-offset-3">Contact</a></li>
                                    <li><a href="tel:(310) 768-8188" class="link-offset-3"><i class="fa fa-phone"></i>(310) 768-8188</a></li>
                                    <li><a href="forms.html" class="link-offset-3">Forms</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-main">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-sm-auto">
                                <div class="pc-logo pb-1">
                                    <a href="home.html">
                                        <img alt="IMPERIAL CFS" src="/_images/logo.png">
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm row pr-0">
                                <ul class="menu-list height-100 main-menu col">
                                    <li>
                                        <a href="our-services.html">Services <i class="fa fa-angle-down rotate ml-1"></i></a>
                                        <div class="sub-menu">
                                            <dl>
                                                <dd><a href="our-services.html">CFS</a></dd>
                                                <dd><a href="inland.html">inland consolidation</a></dd>
                                                <dd><a href="trucking.html">trucking</a></dd>
                                                <dd><a href="technology.html">technology</a></dd>
                                                <dd><a href="security.html">Security</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="availability.html">Availability <i class="fa fa-angle-down rotate ml-1"></i></a>
                                        <div class="sub-menu">
                                            <dl>
                                                <dd><a href="availability.html">Availability Search</a></dd>
                                                <dd><a href="contact.html#pickup-window-hours">PICK-UP HOURS</a></dd>
                                                <dd><a href="/Availability/TerminalStatus">TERMINAL STATUS</a></dd>
                                                <dd><a href="/Availability/TerminalSchedule" target="_blank">TERMINAL SCHEDULE</a></dd>
                                                <dd><a href="/Availability/CFSCharges" target="_blank">CFS Charges</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="ipi.html">IPI Tracing <i class="fa fa-angle-down rotate ml-1"></i></a>
                                        <div class="sub-menu">
                                            <dl>
                                                <dd><a href="ipi.html">IPI Search</a></dd>
                                                <dd><a href="inland.html">INLAND WAREHOUSE LIST</a></dd>
                                                <dd><a href="whse-in-out.html">WAREHOUSE IN / OUT</a></dd>
                                                <dd><a href="transit.html">TRANSIT SCHEDULE</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                                <ul class="menu-list h-100 col-auto ml-auto gap-8 d-flex">
                                    <li><a href="/WarehouseFees">Pay Fees</a></li>
                                    <li class="d-flex align-items-center"><a href="/Home/CustomerLogin" class="btn btn-info btn-sm rounded-pill text-sm">Login <i class="fa fa-angle-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mob-menu">
                <div class="mob-menu-top">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6">
                                <div class="mob-logo">
                                    <a href="home.html">
                                        <img alt="IMPERIAL CFS" src="/_images/logo.png">
                                    </a>
                                </div>
                            </div>
                            <div class="col-6 ar d-flex justify-content-end align-items-center">
                                <div class="mob-menu-link clears">
                                    <div class="hamburger-menu fr">
                                        <div class="bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mob-menu-child" style="display:none;"> 
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <ul>
                                    <li><a href="our-services.html">Services</a></li>
                                    <li><a href="availability.html">Availability</a></li>
                                    <li><a href="ipi.html">IPI Tracing</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        `;

        // Run setup functions
        this.highlightActiveLink();
        this.initMobileMenu();
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname.split("/").pop();
        // Find all links in this component
        const links = this.querySelectorAll('a');
        
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Check if link matches current page
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active'); // Bootstrap/Custom active class
                link.style.fontWeight = 'bold'; // Fallback style
                link.style.color = '#007bff';   // Fallback style
            }
        });
    }

    initMobileMenu() {
        // Simple logic to toggle mobile menu
        const hamburger = this.querySelector('.hamburger-menu');
        const mobMenuChild = this.querySelector('.mob-menu-child');
        
        if(hamburger && mobMenuChild) {
            hamburger.addEventListener('click', () => {
                // Check if currently visible
                const isHidden = mobMenuChild.style.display === 'none';
                mobMenuChild.style.display = isHidden ? 'block' : 'none';
                hamburger.classList.toggle('active'); // For animation if you have one
            });
        }
    }
}

customElements.define('marketing-header', MarketingHeader);
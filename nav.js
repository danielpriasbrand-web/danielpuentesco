(function() {

  // ─── CONFIGURACIÓN ───
  const NAV_LINKS = [
    { label: 'Inicio',         href: '/index.html',        match: ['/', '/index.html'] },
    { label: 'Sobre mí',       href: '/sobre-mi.html',     match: ['/sobre-mi.html'] },
    { label: 'ENTIA',          href: '/entia.html',        match: ['/entia.html', '/entia-prediagnostico.html', '/entia-diagnostico.html', '/entia-capacitacion.html', '/entia-estrategia.html', '/auditoria.html', '/diagnostico-entia.html', '/prediagnostico.html'] },
    { label: 'Capacitaciones', href: '/capacitaciones.html', match: ['/capacitaciones.html'] },
    { label: 'Blog',           href: '/blog.html',         match: ['/blog.html'] },
    { label: 'Recursos',       href: '/recursos.html',     match: ['/recursos.html'] },
    { label: 'Contacto',       href: '/contacto.html',     match: ['/contacto.html'] },
  ];

  const WA_NUMBER   = '34672078094';
  const WA_MESSAGE  = 'Hola%20Daniel%2C%20me%20interesa%20conocer%20más%20sobre%20tus%20servicios%20ENTIA.';
  const CURRENT_PATH = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(matchPaths) {
    return matchPaths.some(p => CURRENT_PATH === p || CURRENT_PATH === p.replace('.html', ''));
  }

  // ─── ESTILOS ───
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --dark: #0d1f14;
      --white: #fafafa;
      --neon: #C8F000;
      --ink: #0f1a0c;
      --border-light: rgba(240,238,234,0.1);
      --cream: #f0eeea;
    }

    #dp-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 52px; height: 64px;
      display: flex; justify-content: space-between; align-items: center;
      background: var(--dark);
      border-bottom: 1px solid var(--border-light);
      font-family: 'DM Sans', sans-serif;
    }
    #dp-nav .nav-logo {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 800; font-size: 17px; letter-spacing: -0.5px;
      color: var(--white); text-decoration: none; flex-shrink: 0;
    }
    #dp-nav .nav-logo span {
      display: inline-block; background: var(--neon); color: var(--ink);
      border-radius: 4px; padding: 1px 6px; margin-left: 4px;
      font-size: 12px; font-weight: 800; line-height: 1.5; letter-spacing: 0;
    }
    #dp-nav .nav-links { display: flex; gap: 2px; }
    #dp-nav .nav-links a {
      color: rgba(250,250,250,0.55); text-decoration: none;
      font-size: 13px; font-weight: 400; padding: 6px 13px;
      border-radius: 6px; transition: all 0.15s;
    }
    #dp-nav .nav-links a:hover {
      background: rgba(250,250,250,0.08); color: var(--white);
    }
    #dp-nav .nav-links a.active {
      background: rgba(250,250,250,0.08); color: var(--white); font-weight: 500;
    }
    #dp-nav .nav-cta {
      background: var(--neon); color: var(--ink);
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 700; font-size: 13px; padding: 9px 22px;
      border-radius: 8px; text-decoration: none; transition: all 0.2s;
      flex-shrink: 0;
    }
    #dp-nav .nav-cta:hover { background: var(--white); transform: translateY(-1px); }
    #dp-nav .nav-hamburger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    #dp-nav .nav-hamburger span {
      display: block; width: 20px; height: 1.5px; background: var(--white);
      transition: all 0.2s;
    }

    #dp-mobile-menu {
      display: none; position: fixed; top: 64px; left: 0; right: 0;
      background: var(--dark); border-bottom: 1px solid var(--border-light);
      flex-direction: column; padding: 16px 24px; gap: 4px; z-index: 999;
      font-family: 'DM Sans', sans-serif;
    }
    #dp-mobile-menu.open { display: flex; }
    #dp-mobile-menu a {
      color: rgba(250,250,250,0.6); text-decoration: none;
      font-size: 15px; padding: 10px 12px; border-radius: 8px; transition: all 0.15s;
    }
    #dp-mobile-menu a:hover { background: rgba(250,250,250,0.06); }
    #dp-mobile-menu a.active { color: var(--white); font-weight: 500; }
    #dp-mobile-menu .nav-cta {
      margin-top: 8px; text-align: center; display: block;
      background: var(--neon); color: var(--ink);
      font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
      font-size: 14px; padding: 12px 20px; border-radius: 8px; text-decoration: none;
    }

    #dp-footer {
      background: var(--dark); padding: 36px 52px;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 20px;
      border-top: 1px solid rgba(255,255,255,0.05);
      font-family: 'DM Sans', sans-serif;
    }
    #dp-footer .footer-logo {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 800; font-size: 16px; color: var(--white); text-decoration: none;
    }
    #dp-footer .footer-logo span { color: var(--neon); }
    #dp-footer p { font-size: 12px; color: rgba(255,255,255,0.25); margin: 0; }
    #dp-footer a {
      color: rgba(255,255,255,0.4); text-decoration: none;
      font-size: 12px; transition: color 0.2s;
    }
    #dp-footer a:hover { color: var(--neon); }
    #dp-footer .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }

    #dp-wa {
      position: fixed; bottom: 28px; right: 28px; z-index: 998;
      display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
    }
    #dp-wa .wa-tooltip {
      background: var(--ink); color: var(--white);
      font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
      font-size: 13px; padding: 10px 16px; border-radius: 8px;
      white-space: nowrap; opacity: 0; transform: translateX(8px);
      transition: all 0.25s; pointer-events: none; position: relative;
    }
    #dp-wa .wa-tooltip::after {
      content: ''; position: absolute; right: -6px; top: 50%;
      transform: translateY(-50%); border: 6px solid transparent;
      border-right: none; border-left-color: var(--ink);
    }
    #dp-wa .wa-btn {
      width: 56px; height: 56px; border-radius: 50%; background: #25D366;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4); text-decoration: none;
      transition: all 0.25s; position: relative;
    }
    #dp-wa .wa-btn:hover { transform: scale(1.1); }
    #dp-wa:hover .wa-tooltip { opacity: 1; transform: translateX(0); }
    #dp-wa .wa-pulse {
      position: absolute; top: 0; right: 0; width: 14px; height: 14px;
      background: var(--neon); border-radius: 50%; border: 2px solid var(--dark);
      animation: waPulse 2s infinite;
    }
    @keyframes waPulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }

    @media(max-width:900px) {
      #dp-nav { padding: 0 24px !important; }
      #dp-nav .nav-links, #dp-nav .nav-cta { display: none !important; }
      #dp-nav .nav-hamburger { display: flex !important; }
      #dp-footer { padding: 32px 24px !important; flex-direction: column; align-items: flex-start; gap: 16px; }
      #dp-footer .footer-links { gap: 16px; }
    }
    @media(max-width:600px) {
      #dp-wa { bottom: 16px !important; right: 16px !important; }
      #dp-wa .wa-btn { width: 48px !important; height: 48px !important; }
    }
  `;
  document.head.appendChild(style);

  // ─── NAV HTML ───
  const nav = document.createElement('nav');
  nav.id = 'dp-nav';
  nav.innerHTML = `
    <a href="/index.html" class="nav-logo">Daniel Puentes <span>GEO</span></a>
    <div class="nav-links">
      ${NAV_LINKS.map(link => `
        <a href="${link.href}" ${isActive(link.match) ? 'class="active"' : ''}>${link.label}</a>
      `).join('')}
    </div>
    <a href="/contacto.html" class="nav-cta">Hablemos →</a>
    <button class="nav-hamburger" id="dp-hamburger" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  // ─── MOBILE MENU ───
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'dp-mobile-menu';
  mobileMenu.innerHTML = `
    ${NAV_LINKS.map(link => `
      <a href="${link.href}" ${isActive(link.match) ? 'class="active"' : ''}>${link.label}</a>
    `).join('')}
    <a href="/contacto.html" class="nav-cta">Hablemos →</a>
  `;
  nav.insertAdjacentElement('afterend', mobileMenu);

  document.getElementById('dp-hamburger').addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
  });

  // ─── FOOTER ───
  const footer = document.createElement('footer');
  footer.id = 'dp-footer';
  footer.innerHTML = `
    <a href="/index.html" class="footer-logo">Daniel<span>.</span>Puentes</a>
    <p>© 2025 · Partners Academy · DMK Tribe · Barcelona</p>
    <div class="footer-links">
      <a href="https://linkedin.com/in/danielpuentesprias" target="_blank" rel="noopener">LinkedIn</a>
      <a href="/blog.html">Blog</a>
      <a href="https://dmktribe.com" target="_blank" rel="noopener">DMK Tribe</a>
      <a href="https://partnersacademy.co" target="_blank" rel="noopener">Partners Academy</a>
      <a href="/privacidad.html">Privacidad</a>
      <a href="/aviso-legal.html">Aviso legal</a>
    </div>
  `;
  document.body.appendChild(footer);

  // ─── WHATSAPP ───
  const wa = document.createElement('div');
  wa.id = 'dp-wa';
  wa.innerHTML = `
    <a href="https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}"
       target="_blank" rel="noopener" class="wa-btn" aria-label="Contactar por WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.845L.057 23.428a.75.75 0 00.914.914l5.638-1.456A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.498-5.24-1.37l-.374-.213-3.882 1.002 1.025-3.762-.231-.389A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span class="wa-pulse"></span>
    </a>
    <span class="wa-tooltip">¿Hablamos por WhatsApp?</span>
  `;
  document.body.appendChild(wa);

})();

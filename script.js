/**
 * CareerBloom Masterclass - WebinarJam Section Injector
 * 
 * INSTRUCTIONS:
 * 1. Copy everything inside the <script>...</script> tags below
 * 2. Paste into WebinarJam's "Custom Code" / "Registration Page" code injection area
 * 3. The sections will automatically inject after the existing page content loads
 *
 * To use: Wrap this entire code in <script>...</script> tags when pasting into WebinarJam.
 */

(function() {
  'use strict';

  // ⚠️ CONFIGURE THIS: Set to your GitHub Pages or raw GitHub URL where images are hosted
  var IMG_BASE = 'https://moratives.github.io/Fonts/images';

  function init() {
    var target = document.querySelector('#js-content-section') || document.querySelector('.content_area') || document.querySelector('.d-flex.flex-column') || document.body;
    
    var container = document.createElement('div');
    container.id = 'cb-injected-sections';
    container.innerHTML = getSectionsHTML();
    
    var style = document.createElement('style');
    style.textContent = getStyles();
    document.head.appendChild(style);
    
    var fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    var contentSection = document.querySelector('#js-header-section');
    if (contentSection) {
      contentSection.insertAdjacentElement('afterend', container);
    } else {
      target.appendChild(container);
    }
  }

  function scrollToForm() {
    var overlay = document.querySelector('.wj_registration-overlay');
    var contentSection = document.querySelector('#js-content-section');
    var target = overlay || contentSection;
    if (target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (overlay) { overlay.style.display = 'block'; }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  window.cbScrollToForm = scrollToForm;

  function fixBrokenImages() {
    var imgs = document.querySelectorAll('#cb-injected-sections img');
    imgs.forEach(function(img) {
      img.onerror = function() {
        this.style.display = 'none';
        var placeholder = document.createElement('div');
        placeholder.style.cssText = 'padding:20px;background:#f0f0f0;border-radius:8px;text-align:center;color:#999;font-style:italic;';
        placeholder.textContent = 'Image unavailable in your region';
        if (this.parentElement) { this.parentElement.insertBefore(placeholder, this); }
      };
      if (img.src) {
        var src = img.src;
        img.src = '';
        img.src = src;
      }
    });
  }

  var origInit = init;
  init = function() {
    origInit();
    setTimeout(fixBrokenImages, 500);
  };

  function getStyles() {
    return '' +
      /* ── Reset & Base ── */
      '#cb-injected-sections { font-family: "Open Sans", sans-serif; color: #4a4a4a; line-height: 1.7; -webkit-font-smoothing: antialiased; }' +
      '#cb-injected-sections *, #cb-injected-sections *::before, #cb-injected-sections *::after { box-sizing: border-box; }' +
      '#cb-injected-sections p { margin: 0 0 16px 0; font-size: 17px; }' +
      '#cb-injected-sections img { max-width: 100%; height: auto; }' +

      /* ── Layout ── */
      '.cb-section { padding: 70px 24px; width: 100%; }' +
      '.cb-container { max-width: 1000px; margin: 0 auto; }' +
      '.cb-container-narrow { max-width: 780px; margin: 0 auto; }' +

      /* ── Backgrounds ── */
      '.cb-bg-cream { background-color: #faf6f1; }' +
      '.cb-bg-white { background-color: #ffffff; }' +
      '.cb-bg-charcoal { background-color: #2d2d2d; color: #ffffff; }' +
      '.cb-bg-charcoal p { color: #d5d5d5; }' +

      /* ── Text ── */
      '.cb-text-center { text-align: center; }' +

      /* ── Headings ── */
      '.cb-heading { font-family: "Playfair Display", Georgia, serif; font-weight: 700; color: #2d2d2d; margin: 0 0 20px 0; }' +
      '.cb-bg-charcoal .cb-heading { color: #ffffff; }' +
      '.cb-h1 { font-size: 40px; line-height: 1.2; }' +
      '.cb-h2 { font-size: 34px; line-height: 1.25; }' +
      '.cb-h3 { font-size: 26px; line-height: 1.35; }' +
      '.cb-h4 { font-size: 22px; line-height: 1.4; }' +

      /* ── Accent Utilities ── */
      '.cb-coral-underline { background-image: linear-gradient(transparent 85%, #F48874 85%); display: inline; }' +
      '.cb-color-orange { color: #f45606; }' +
      '.cb-color-pink { color: #bd135a; }' +
      '.cb-subheading { font-family: "Open Sans", sans-serif; font-size: 16px; letter-spacing: 0.25em; text-transform: uppercase; color: #888; margin: 0 0 16px 0; font-weight: 600; }' +
      '.cb-bg-charcoal .cb-subheading { color: #aaa; }' +

      /* ── Buttons ── */
      '.cb-btn { display: inline-block; background: linear-gradient(135deg, #bd135a 0%, #f45606 100%); color: #fff !important; padding: 18px 48px; border-radius: 50px; text-decoration: none !important; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; cursor: pointer; border: none; transition: transform 0.2s ease, box-shadow 0.2s ease; margin: 10px 0; }' +
      '.cb-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(189,19,90,0.35); }' +

      /* ── Flex Row ── */
      '.cb-row { display: flex; flex-wrap: wrap; gap: 40px; align-items: center; }' +
      '.cb-row-top { align-items: flex-start; }' +
      '.cb-col-half { flex: 1 1 380px; }' +
      '.cb-col-third { flex: 1 1 280px; }' +

      /* ── Avatar ── */
      '.cb-avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid #F48874; flex-shrink: 0; }' +

      /* ── Cards ── */
      '.cb-card { background: #fff; border-radius: 16px; padding: 36px 28px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); text-align: center; height: 100%; display: flex; flex-direction: column; align-items: center; }' +
      '.cb-card p { font-size: 16px; color: #666; }' +
      '.cb-check-img { width: 64px; height: 64px; margin-bottom: 20px; }' +

      /* ── Divider ── */
      '.cb-divider-v { width: 2px; background: linear-gradient(to bottom, transparent, #F48874, transparent); align-self: stretch; flex-shrink: 0; }' +
      '.cb-divider-h { width: 2px; height: 80px; background: linear-gradient(to bottom, transparent, #F48874, transparent); margin: 0 auto 30px auto; }' +

      /* ── Lists ── */
      '.cb-ul { list-style: none; padding: 0; margin: 0 0 20px 0; }' +
      '.cb-ul li { padding: 10px 0 10px 36px; position: relative; font-size: 17px; text-align: left; color: #4a4a4a; }' +
      '.cb-ul li::before { content: "✓"; position: absolute; left: 0; top: 10px; color: #f45606; font-weight: 700; font-size: 20px; }' +
      '.cb-ul-bullet li::before { content: "•"; color: #F48874; font-size: 24px; top: 6px; }' +

      /* ── Bio Image ── */
      '.cb-bio-img { width: 100%; max-width: 320px; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.2); }' +

      /* ── Stars ── */
      '.cb-stars { font-size: 22px; color: #f4a100; margin: 12px 0; letter-spacing: 4px; }' +

      /* ── Testimonial Grid ── */
      '.cb-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }' +
      '.cb-testimonial-img { width: 100%; border-radius: 10px; box-shadow: 0 3px 15px rgba(0,0,0,0.1); display: block; }' +

      /* ── Logo Bar ── */
      '.cb-logo-bar img { max-height: 60px; opacity: 0.8; }' +

      /* ── Spacer ── */
      '.cb-spacer-sm { height: 20px; }' +
      '.cb-spacer { height: 36px; }' +
      '.cb-spacer-lg { height: 50px; }' +

      /* ── Testimonial Quote Block ── */
      '.cb-quote-block { display: flex; gap: 28px; align-items: flex-start; text-align: left; }' +
      '.cb-quote-block p { font-size: 17px; font-style: italic; color: #555; }' +

      /* ── Cards Row (equal height) ── */
      '.cb-cards-row { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }' +
      '.cb-cards-row > div { flex: 1 1 280px; max-width: 320px; display: flex; }' +

      /* ── Responsive ── */
      '@media (max-width: 768px) {' +
        '.cb-col-half { flex: 1 1 100%; }' +
        '.cb-col-third { flex: 1 1 100%; }' +
        '.cb-h1 { font-size: 30px; }' +
        '.cb-h2 { font-size: 26px; }' +
        '.cb-h3 { font-size: 22px; }' +
        '.cb-section { padding: 50px 16px; }' +
        '.cb-divider-v { display: none; }' +
        '.cb-bio-img { max-width: 220px; margin: 0 auto 24px; display: block; }' +
        '.cb-testi-grid { grid-template-columns: 1fr; }' +
        '.cb-quote-block { flex-direction: column; align-items: center; text-align: center; }' +
        '.cb-row { gap: 24px; }' +
        '.cb-cards-row > div { max-width: 100%; }' +
        '.cb-btn { padding: 16px 36px; font-size: 16px; }' +
      '}' +
    '';
  }

  function getSectionsHTML() {
    var I = IMG_BASE;
    return '' +

    /* ── SECTION 1: As Seen In ── */
    '<div class="cb-section cb-bg-cream">' +
      '<div class="cb-container cb-text-center">' +
        '<div class="cb-logo-bar">' +
          '<img src="' + I + '/as-seen-in.png" alt="As seen in media logos" style="max-width:100%;height:auto;">' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 2: Cheryl Testimonial ── */
    '<div class="cb-section cb-bg-cream" style="padding-top:0;">' +
      '<div class="cb-container-narrow">' +
        '<div class="cb-quote-block">' +
          '<img class="cb-avatar" src="' + I + '/cheryl-avatar.png" alt="Cheryl">' +
          '<div>' +
            '<h2 class="cb-heading cb-h3" style="font-style:italic;">Cheryl transitioned into a new career just 2 months after starting her job search!</h2>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 3: Pain Point ── */
    '<div class="cb-section cb-bg-white">' +
      '<div class="cb-container">' +
        '<div class="cb-row">' +
          '<div class="cb-col-half cb-text-center">' +
            '<h2 class="cb-heading cb-h2">You have a <span class="cb-coral-underline">successful</span> career...<br>but you hate it.</h2>' +
          '</div>' +
          '<div class="cb-divider-v"></div>' +
          '<div class="cb-col-half">' +
            '<ul class="cb-ul cb-ul-bullet">' +
              '<li>You <em>literally dread</em> going to work</li>' +
              '<li>You\'ve browsed job opportunities…</li>' +
              '<li>Updated your resume…</li>' +
              '<li>Filled out applications…</li>' +
            '</ul>' +
            '<p style="margin-top:8px;"><strong>But your heart isn\'t in it because you don\'t know WHAT job you really want, OR how to qualify for it.</strong></p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 4: Transition Dark Banner ── */
    '<div class="cb-section cb-bg-charcoal" style="padding:60px 24px;">' +
      '<div class="cb-container-narrow cb-text-center">' +
        '<h2 class="cb-heading cb-h2" style="margin-bottom:16px;">See how to find a career that\'s fulfilling, interesting, and makes you EXCITED for Mondays!</h2>' +
        '<p class="cb-subheading" style="color:#aaa;margin-bottom:0;">(And probably pays better, too!)</p>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 5: 3 Benefits Cards ── */
    '<div class="cb-section cb-bg-cream">' +
      '<div class="cb-container cb-text-center">' +
        '<h2 class="cb-heading cb-h2" style="margin-bottom:48px;">In this free career change Masterclass,<br>see how to:</h2>' +
        '<div class="cb-cards-row">' +
          '<div>' +
            '<div class="cb-card">' +
              '<img class="cb-check-img" src="' + I + '/check1.png" alt="checkmark">' +
              '<h3 class="cb-heading cb-h4 cb-color-orange" style="margin-bottom:14px;">Identify your transferable skills, gifts &amp; strengths</h3>' +
              '<p>You\'ll impress yourself with HOW many \'invisible skills\' you actually have! (<em>You might even blow your own mind</em>)</p>' +
              '<p style="margin-top:4px;">This opens up a world of opportunities that are available to you, that you can\'t even <em>see</em> right now.</p>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="cb-card">' +
              '<img class="cb-check-img" src="' + I + '/check2.png" alt="checkmark">' +
              '<h3 class="cb-heading cb-h4 cb-color-orange" style="margin-bottom:14px;">Turn your existing experience into a new career you LOVE</h3>' +
              '<p><em>Even</em> if you don\'t know what that is yet.</p>' +
              '<p style="margin-top:4px;">You\'ll be amazed how much experience you ALREADY have - which is the perfect fit for the career you\'re meant to do!</p>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="cb-card">' +
              '<img class="cb-check-img" src="' + I + '/check3.png" alt="checkmark">' +
              '<h3 class="cb-heading cb-h4 cb-color-orange" style="margin-bottom:14px;">Position yourself to get your ideal job, without starting over</h3>' +
              '<p>See the simple (yet powerful) secrets to standing out and becoming a preferred candidate for your dream job.</p>' +
              '<p style="margin-top:4px;">Changing careers does NOT mean starting from the bottom (<em>if</em> you do this!). Many clients start with a $20,000 increase - or more!</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="cb-spacer-lg"></div>' +
        '<a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save my seat →</a>' +
        '<div class="cb-spacer-sm"></div>' +
        '<p class="cb-heading cb-h4" style="font-style:italic;">It\'s free!</p>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 6: Testimonial Gallery ── */
    '<div class="cb-section cb-bg-white">' +
      '<div class="cb-container cb-text-center">' +
        '<h3 class="cb-heading cb-h3" style="font-style:italic;margin-bottom:36px;">"I finally feel like I have the tools I need to find a new career!"</h3>' +
        '<div class="cb-testi-grid">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi1.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi2.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi3.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi4.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi5.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi6.webp" alt="testimonial">' +
          '<img class="cb-testimonial-img" src="' + I + '/testi7.webp" alt="testimonial">' +
        '</div>' +
        '<div class="cb-spacer-lg"></div>' +
        '<a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Register now! →</a>' +
        '<div class="cb-spacer-sm"></div>' +
        '<p class="cb-heading cb-h4" style="font-style:italic;">This Career Change Masterclass is 100% free!</p>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 7: DM Conversation ── */
    '<div class="cb-section cb-bg-white" style="padding-top:0;">' +
      '<div class="cb-container-narrow cb-text-center">' +
        '<div class="cb-divider-h"></div>' +
        '<h3 class="cb-heading cb-h3" style="margin-bottom:30px;">I get so many messages like…</h3>' +
        '<img src="' + I + '/dm-conversation.png" alt="DM conversation about career change" style="max-width:480px;width:100%;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">' +
      '</div>' +
    '</div>' +

    /* ── SECTION 8: Skilled Statement ── */
    '<div class="cb-section cb-bg-cream" style="padding:80px 24px;">' +
      '<div class="cb-container-narrow cb-text-center">' +
        '<h2 class="cb-heading cb-h1">You are <span class="cb-coral-underline">skilled</span>, <span class="cb-coral-underline">experienced</span>,<br>and <span class="cb-coral-underline">talented</span>.</h2>' +
        '<p class="cb-subheading" style="margin-top:24px;">Isn\'t it time you have a career you enjoy?</p>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 9: About Theresa Bio ── */
    '<div class="cb-section cb-bg-charcoal" style="padding:80px 24px;">' +
      '<div class="cb-container">' +
        '<div class="cb-row">' +
          '<div class="cb-col-half" style="flex:1.6;">' +
            '<h2 class="cb-heading cb-h2" style="margin-bottom:8px;">Hi! I\'m Theresa,</h2>' +
            '<p class="cb-subheading" style="margin-bottom:24px;">Career Clarity Expert &amp; 5x Certified Career Coach.</p>' +
            '<p>I help women gain career clarity in record time</p>' +
            '<p>...and use their existing skills to find careers they love!</p>' +
            '<p>I understand what you\'re going through, because I\'ve been in your shoes.</p>' +
            '<p>I used to be a recruiter, a job that left me drained, unhappy, and like I was wasting my potential… and my life.</p>' +
            '<p>The worst part is, I didn\'t know WHAT I wanted to do!</p>' +
            '<p>I felt trapped, thinking I couldn\'t give up my salary and benefits.</p>' +
            '<p>I saw that many women felt the same way.</p>' +
            '<p>And I realized my skills as a professional recruiter could translate into helping people find their ideal careers - which is what I\'m deeply passionate about.</p>' +
            '<p style="color:#fff;"><strong>Join me in the Masterclass to get the clear steps to <u>find</u> and <u>transition</u> into your ideal career!</strong></p>' +
            '<div class="cb-spacer-sm"></div>' +
            '<p class="cb-subheading">Participants say,</p>' +
            '<h3 class="cb-heading cb-h4" style="font-style:italic;">"I\'m so glad I attended"</h3>' +
            '<div class="cb-spacer"></div>' +
            '<a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save My Seat! →</a>' +
          '</div>' +
          '<div class="cb-col-half cb-text-center" style="flex:0.8;">' +
            '<img class="cb-bio-img" src="' + I + '/theresa-bio.png" alt="Theresa White, career change coach">' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 10: Benefits + Masterclass Preview ── */
    '<div class="cb-section cb-bg-cream">' +
      '<div class="cb-container">' +
        '<div class="cb-row">' +
          '<div class="cb-col-half cb-text-center">' +
            '<img src="' + I + '/masterclass-preview.webp" alt="Career change masterclass" style="max-width:100%;border-radius:16px;box-shadow:0 6px 30px rgba(0,0,0,0.12);">' +
          '</div>' +
          '<div class="cb-col-half">' +
            '<h2 class="cb-heading cb-h3" style="margin-bottom:24px;"><strong>So if you\'re looking for:</strong></h2>' +
            '<ul class="cb-ul">' +
              '<li>Fulfilling work that makes a positive impact on the world</li>' +
              '<li>Better work-life balance</li>' +
              '<li>A career with exciting opportunities for growth</li>' +
              '<li>A supportive workplace that values you</li>' +
              '<li>Making more money doing more work you love</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="cb-spacer-lg"></div>' +
        '<div class="cb-text-center">' +
          '<p class="cb-subheading">Join the Career Change Masterclass</p>' +
          '<h2 class="cb-heading cb-h3"><strong>and get on the path to your ideal career!</strong></h2>' +
          '<div class="cb-spacer"></div>' +
          '<a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save my seat! →</a>' +
          '<div class="cb-spacer-sm"></div>' +
          '<p class="cb-heading cb-h4" style="font-style:italic;">It\'s free!</p>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── SECTION 11: Brenda Final Testimonial ── */
    '<div class="cb-section cb-bg-white">' +
      '<div class="cb-container-narrow">' +
        '<div class="cb-quote-block">' +
          '<img class="cb-avatar" src="' + I + '/brenda-avatar.png" alt="Brenda L.">' +
          '<div>' +
            '<p>"I didn\'t realize how much I would actually learn about myself. I am 40 years old, and so I thought I knew who I was, but it was so eye-opening! I also didn\'t realize how much my self-confidence would grow through this experience. Thank you from the bottom of my heart!!!!!</p>' +
            '<p><strong>I am so glad I came across your masterclass!! It has been life changing!!"</strong></p>' +
            '<div class="cb-stars">★ ★ ★ ★ ★</div>' +
            '<p class="cb-heading cb-h4" style="text-align:right;margin-bottom:0;">— Brenda L.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 1000);
  }
})();

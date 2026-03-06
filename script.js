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
  console.log("FIXED");
  // ⚠️ CONFIGURE THIS: Set to your GitHub Pages or raw GitHub URL where images are hosted
  // Example: 'https://yourusername.github.io/your-repo/images'
  // Example: 'https://raw.githubusercontent.com/yourusername/your-repo/main/public/images'
  var IMG_BASE = 'https://moratives.github.io/Fonts/images';

  // Wait for DOM to be ready
  function init() {
    // Find the main content area - WebinarJam uses these selectors
    var target = document.querySelector('#js-content-section') || document.querySelector('.content_area') || document.querySelector('.d-flex.flex-column') || document.body;
    
    // Create our injected sections container
    var container = document.createElement('div');
    container.id = 'cb-injected-sections';
    container.innerHTML = getSectionsHTML();
    
    // Inject styles
    var style = document.createElement('style');
    style.textContent = getStyles();
    document.head.appendChild(style);
    
    // Load Google Font
    var fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Append after the main content section
    var contentSection = document.querySelector('#js-content-section') || document.querySelector('.content_area');
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
      // For WebinarJam, trigger the registration overlay or scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Try to show registration overlay if it exists
      if (overlay) { overlay.style.display = 'block'; }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Make scrollToForm available globally for onclick handlers
  window.cbScrollToForm = scrollToForm;

  // Fix broken images - add error handling for geo-blocked CDN
  function fixBrokenImages() {
    var imgs = document.querySelectorAll('#cb-injected-sections img');
    imgs.forEach(function(img) {
      img.onerror = function() {
        this.style.display = 'none'; // Hide broken images gracefully
        // Add a placeholder text if it's a testimonial or important image
        var placeholder = document.createElement('div');
        placeholder.style.cssText = 'padding:20px;background:#f0f0f0;border-radius:8px;text-align:center;color:#999;font-style:italic;';
        placeholder.textContent = 'Image unavailable in your region';
        if (this.parentElement) { this.parentElement.insertBefore(placeholder, this); }
      };
      // Force reload with cache-busting for geo issues
      if (img.src) {
        var src = img.src;
        img.src = '';
        img.src = src;
      }
    });
  }

  // Run image fix after injection
  var origInit = init;
  init = function() {
    origInit();
    setTimeout(fixBrokenImages, 500);
  };

  function getStyles() {
    return '\
      #cb-injected-sections { font-family: "Open Sans", sans-serif; color: #333; line-height: 1.6; }\
      #cb-injected-sections * { box-sizing: border-box; margin: 0; padding: 0; }\
      .cb-section { padding: 60px 20px; max-width: 100%; overflow: hidden; }\
      .cb-container { max-width: 960px; margin: 0 auto; }\
      .cb-bg-light { background-color: #f9f5f0; }\
      .cb-bg-white { background-color: #ffffff; }\
      .cb-bg-dark { background-color: #2d2d2d; color: #ffffff; }\
      .cb-bg-coral { background-color: #1a1a2e; color: #ffffff; }\
      .cb-text-center { text-align: center; }\
      .cb-text-left { text-align: left; }\
      .cb-heading { font-family: "Playfair Display", Georgia, serif; font-weight: 700; margin-bottom: 20px; }\
      .cb-heading-lg { font-size: 36px; line-height: 1.2; }\
      .cb-heading-md { font-size: 28px; line-height: 1.3; }\
      .cb-heading-sm { font-size: 22px; line-height: 1.4; }\
      .cb-underline-coral { background: linear-gradient(transparent 94%, #F48874 94%); }\
      .cb-color-coral { color: #F48874; }\
      .cb-color-pink { color: #bd135a; }\
      .cb-color-orange { color: #f45606; }\
      .cb-btn { display: inline-block; background: linear-gradient(135deg, #bd135a, #f45606); color: #fff !important; padding: 16px 40px; border-radius: 6px; text-decoration: none; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; border: none; transition: transform 0.2s, box-shadow 0.2s; }\
      .cb-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(189,19,90,0.4); }\
      .cb-row { display: flex; flex-wrap: wrap; gap: 30px; align-items: center; justify-content: center; }\
      .cb-col-half { flex: 1 1 400px; max-width: 50%; }\
      .cb-col-third { flex: 1 1 260px; max-width: 33.33%; }\
      .cb-col-full { flex: 1 1 100%; }\
      .cb-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }\
      .cb-testimonial-img { width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }\
      .cb-card { background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; }\
      .cb-check-img { width: 60px; height: 60px; margin-bottom: 15px; }\
      .cb-divider { width: 2px; height: 200px; background: #F48874; margin: 0 auto; }\
      .cb-ul { list-style: none; padding: 0; }\
      .cb-ul li { padding: 8px 0 8px 30px; position: relative; font-size: 16px; text-align: left; }\
      .cb-ul li::before { content: "✓"; position: absolute; left: 0; color: #f45606; font-weight: 700; font-size: 18px; }\
      .cb-ul-bullet li::before { content: "•"; color: #F48874; }\
      .cb-bio-img { width: 100%; max-width: 300px; border-radius: 12px; }\
      .cb-stars { font-size: 24px; color: #f4a100; margin: 10px 0; }\
      .cb-testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; }\
      .cb-logo-bar img { max-height: 50px; margin: 10px 15px; opacity: 0.85; }\
      .cb-spacer { height: 30px; }\
      .cb-subheading { font-size: 18px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 15px; }\
      @media (max-width: 768px) {\
        .cb-col-half, .cb-col-third { max-width: 100%; flex: 1 1 100%; }\
        .cb-heading-lg { font-size: 28px; }\
        .cb-heading-md { font-size: 22px; }\
        .cb-section { padding: 40px 15px; }\
        .cb-divider { height: 80px; }\
        .cb-bio-img { max-width: 200px; margin: 0 auto 20px; display: block; }\
        .cb-testi-grid { grid-template-columns: 1fr; }\
      }\
    ';
  }

  function getSectionsHTML() {
    var I = IMG_BASE; // shorthand
    return '\
    \
    <!-- SECTION 1: As Seen In Logo Bar -->\
    <div class="cb-section cb-bg-light">\
      <div class="cb-container cb-text-center">\
        <h3 class="cb-heading cb-heading-sm" style="margin-bottom:20px;">As seen in:</h3>\
        <div class="cb-logo-bar">\
          <img src="' + I + '/as-seen-in-logos.jpg" alt="As seen in media logos" style="max-width:90%;height:auto;max-height:80px;">\
        </div>\
      </div>\
    </div>\
    \
    <!-- SECTION 2: Cheryl Testimonial -->\
    <div class="cb-section cb-bg-light">\
      <div class="cb-container">\
        <div class="cb-row">\
          <div style="flex:0 0 auto;">\
            <img class="cb-avatar" src="' + I + '/cheryl-avatar.png" alt="Cheryl testimonial">\
          </div>\
          <div style="flex:1;min-width:200px;">\
            <h2 class="cb-heading cb-heading-md"><em>Cheryl transitioned into a new career just 2 months after starting her job search!</em></h2>\
          </div>\
        </div>\
      </div>\
    </div>\
    \
    <!-- SECTION 3: Pain Point -->\
    <div class="cb-section cb-bg-white">\
      <div class="cb-container">\
        <div class="cb-row">\
          <div class="cb-col-half">\
            <h2 class="cb-heading cb-heading-lg cb-text-center">You have a <span class="cb-underline-coral">successful</span> career... but you hate it.</h2>\
          </div>\
          <div style="flex:0 0 2px;align-self:stretch;display:flex;justify-content:center;">\
            <div class="cb-divider"></div>\
          </div>\
          <div class="cb-col-half">\
            <ul class="cb-ul cb-ul-bullet">\
              <li>You *literally dread* going to work</li>\
              <li>You\'ve browsed job opportunities…</li>\
              <li>Updated your resume…</li>\
              <li>Filled out applications…</li>\
            </ul>\
            <p style="margin-top:15px;"><strong>But your heart isn\'t in it because you don\'t know WHAT job you really want, OR how to qualify for it.</strong></p>\
          </div>\
        </div>\
      </div>\
    </div>\
    \
    <!-- SECTION 4: Transition Headline -->\
    <div class="cb-section cb-bg-dark">\
      <div class="cb-container cb-text-center">\
        <h2 class="cb-heading cb-heading-lg" style="color:#fff;">See how to find a career that\'s fulfilling, interesting, and makes you EXCITED for Mondays!</h2>\
        <p class="cb-subheading" style="color:#ccc;">(And probably pays better, too!)</p>\
      </div>\
    </div>\
    \
    <!-- SECTION 5: 3 Benefits with Checkmarks -->\
    <div class="cb-section cb-bg-light">\
      <div class="cb-container cb-text-center">\
        <h1 class="cb-heading cb-heading-lg" style="margin-bottom:40px;">In this free career change Masterclass, see how to:</h1>\
        <div class="cb-row">\
          <div class="cb-col-third">\
            <div class="cb-card">\
              <img class="cb-check-img" src="' + I + '/check1.png" alt="checkmark">\
              <h3 class="cb-heading cb-heading-sm cb-color-orange">Identify your transferable skills, gifts &amp; strengths</h3>\
              <p>You\'ll impress yourself with HOW many \'invisible skills\' you actually have! (<em>You might even blow your own mind</em>)</p>\
              <p style="margin-top:10px;">This opens up a world of opportunities that are available to you, that you can\'t even <em>see</em> right now.</p>\
            </div>\
          </div>\
          <div class="cb-col-third">\
            <div class="cb-card">\
              <img class="cb-check-img" src="' + I + '/check2.png" alt="checkmark">\
              <h3 class="cb-heading cb-heading-sm cb-color-orange">Turn your existing experience into a new career you LOVE</h3>\
              <p><em>Even</em> if you don\'t know what that is yet.</p>\
              <p style="margin-top:10px;">You\'ll be amazed how much experience you ALREADY have - which is the perfect fit for the career you\'re meant to do!</p>\
            </div>\
          </div>\
          <div class="cb-col-third">\
            <div class="cb-card">\
              <img class="cb-check-img" src="' + I + '/check3.png" alt="checkmark">\
              <h3 class="cb-heading cb-heading-sm cb-color-orange">Position yourself to get your ideal job, without starting over</h3>\
              <p>See the simple (yet powerful) secrets to standing out and becoming a preferred candidate for your dream job.</p>\
              <p style="margin-top:10px;">Changing careers does NOT mean starting from the bottom (<em>if</em> you do this!). Many clients start with a $20,000 increase - or more!</p>\
            </div>\
          </div>\
        </div>\
        <div class="cb-spacer"></div>\
        <a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save my seat →</a>\
        <div class="cb-spacer"></div>\
        <h3 class="cb-heading cb-heading-sm"><em>It\'s free!</em></h3>\
      </div>\
    </div>\
    \
    <!-- SECTION 6: Testimonial Screenshots Gallery -->\
    <div class="cb-section cb-bg-white">\
      <div class="cb-container cb-text-center">\
        <h3 class="cb-heading cb-heading-md" style="margin-bottom:10px;">"I finally feel like I have the tools I need to find a new career!"</h3>\
        <div class="cb-spacer"></div>\
        <div class="cb-testi-grid">\
           <img class="cb-testimonial-img" src="' + I + '/testi1.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi2.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi3.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi4.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi5.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi6.webp" alt="testimonial">\
           <img class="cb-testimonial-img" src="' + I + '/testi7.webp" alt="testimonial">\
        </div>\
        <div class="cb-spacer"></div>\
        <a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Register now! →</a>\
        <div class="cb-spacer"></div>\
        <h3 class="cb-heading cb-heading-sm"><em>This Career Change Masterclass is 100% free!</em></h3>\
      </div>\
    </div>\
    \
    <!-- SECTION 7: "I get so many messages like..." -->\
    <div class="cb-section cb-bg-white">\
      <div class="cb-container cb-text-center">\
        <div class="cb-divider" style="height:80px;margin-bottom:30px;"></div>\
        <h3 class="cb-heading cb-heading-md" style="margin-bottom:30px;">I get so many messages like…</h3>\
        <img src="' + I + '/dm-conversation.png" alt="DM conversation about career change" style="max-width:500px;width:100%;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);">\
      </div>\
    </div>\
    \
    <!-- SECTION 8: "You are skilled, experienced, and talented" -->\
    <div class="cb-section cb-bg-light">\
      <div class="cb-container cb-text-center">\
        <h2 class="cb-heading cb-heading-lg">You are <span class="cb-underline-coral">skilled</span>, <span class="cb-underline-coral">experienced</span>, and <span class="cb-underline-coral">talented</span>.</h2>\
        <p class="cb-subheading" style="margin-top:20px;">Isn\'t it time you have a career you enjoy?</p>\
      </div>\
    </div>\
    \
    <!-- SECTION 9: About Theresa Bio -->\
    <div class="cb-section cb-bg-coral" style="background:#2d2d2d;">\
      <div class="cb-container">\
        <div class="cb-row">\
          <div class="cb-col-half" style="max-width:60%;">\
            <h2 class="cb-heading cb-heading-lg" style="color:#fff;">Hi! I\'m Theresa,</h2>\
            <p class="cb-subheading" style="color:#ccc;">Career Clarity Expert & 5x Certified Career Coach.</p>\
            <p style="color:#ddd;margin-bottom:12px;">I help women gain career clarity in record time</p>\
            <p style="color:#ddd;margin-bottom:12px;">...and use their existing skills to find careers they love!</p>\
            <p style="color:#ddd;margin-bottom:12px;">I understand what you\'re going through, because I\'ve been in your shoes.</p>\
            <p style="color:#ddd;margin-bottom:12px;">I used to be a recruiter, a job that left me drained, unhappy, and like I was wasting my potential… and my life.</p>\
            <p style="color:#ddd;margin-bottom:12px;">The worst part is, I didn\'t know WHAT I wanted to do!</p>\
            <p style="color:#ddd;margin-bottom:12px;">I felt trapped, thinking I couldn\'t give up my salary and benefits.</p>\
            <p style="color:#ddd;margin-bottom:12px;">I saw that many women felt the same way.</p>\
            <p style="color:#ddd;margin-bottom:12px;">And I realized my skills as a professional recruiter could translate into helping people find their ideal careers - which is what I\'m deeply passionate about.</p>\
            <p style="color:#fff;margin-bottom:20px;"><strong>Join me in the Masterclass to get the clear steps to <u>find</u> and <u>transition</u> into your ideal career!</strong></p>\
            <p class="cb-subheading" style="color:#ccc;">Participants say,</p>\
            <h3 class="cb-heading cb-heading-sm" style="color:#fff;"><em>"I\'m so glad I attended"</em></h3>\
            <div class="cb-spacer"></div>\
            <a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save My Seat! →</a>\
          </div>\
          <div class="cb-col-half" style="max-width:35%;text-align:center;">\
            <img class="cb-bio-img" src="' + I + '/theresa-bio.png" alt="Theresa White, career change coach">\
          </div>\
        </div>\
      </div>\
    </div>\
    \
    <!-- SECTION 10: "So if you\'re looking for" Benefits List -->\
    <div class="cb-section cb-bg-light">\
      <div class="cb-container">\
        <div class="cb-row">\
          <div class="cb-col-half" style="text-align:center;">\
            <img src="' + I + '/masterclass-preview.webp" alt="Career change masterclass" style="max-width:100%;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.12);">\
          </div>\
          <div class="cb-col-half">\
            <h2 class="cb-heading cb-heading-md cb-text-center"><strong>So if you\'re looking for:</strong></h2>\
            <ul class="cb-ul">\
              <li>Fulfilling work that makes a positive impact on the world</li>\
              <li>Better work-life balance</li>\
              <li>A career with exciting opportunities for growth</li>\
              <li>A supportive workplace that values you</li>\
              <li>Making more money doing more work you love</li>\
            </ul>\
          </div>\
        </div>\
        <div class="cb-spacer"></div>\
        <div class="cb-text-center">\
          <p class="cb-subheading">Join the Career Change Masterclass</p>\
          <h2 class="cb-heading cb-heading-md"><strong>and get on the path to your ideal career!</strong></h2>\
          <div class="cb-spacer"></div>\
          <a href="javascript:void(0)" onclick="cbScrollToForm()" class="cb-btn">Save my seat! →</a>\
          <div class="cb-spacer"></div>\
          <h3 class="cb-heading cb-heading-sm"><em>It\'s free!</em></h3>\
        </div>\
      </div>\
    </div>\
    \
    <!-- SECTION 11: Brenda Final Testimonial -->\
    <div class="cb-section cb-bg-white">\
      <div class="cb-container">\
        <div class="cb-row">\
          <div style="flex:0 0 auto;">\
            <img class="cb-avatar" src="' + I + '/brenda-avatar.png" alt="Brenda L.">\
          </div>\
          <div style="flex:1;min-width:200px;">\
            <p>"I didn\'t realize how much I would actually learn about myself. I am 40 years old, and so I thought I knew who I was, but it was so eye-opening! I also didn\'t realize how much my self-confidence would grow through this experience. Thank you from the bottom of my heart!!!!!</p>\
            <p style="margin-top:10px;"><strong>I am so glad I came across your masterclass!! It has been life changing!!"</strong></p>\
            <div class="cb-stars">⭐ ⭐ ⭐ ⭐ ⭐</div>\
            <h4 class="cb-heading" style="text-align:right;font-size:24px;">Brenda L.</h4>\
          </div>\
        </div>\
      </div>\
    </div>\
    ';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay to ensure WebinarJam content is rendered
    setTimeout(init, 1000);
  }
})();

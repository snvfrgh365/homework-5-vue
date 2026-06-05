document.addEventListener('DOMContentLoaded', function () {
  // Simple slider per .slides_container
  function initSlider(container, interval) {
    var ul = container.querySelector('ul');
    if (!ul) return;
    var viewport = container.querySelector('.bx-viewport') || container;
    var pagerLinks = container.querySelectorAll('.bx-pager-link');
    var lis = ul.querySelectorAll('li');
    var total = lis.length;
    if (total === 0) return;
    var index = 0;
    function slideTo(i) {
      index = ((i % total) + total) % total;
      var w = viewport.clientWidth || container.clientWidth;
      ul.style.transition = 'transform 0.5s';
      ul.style.transform = 'translate3d(' + (-index * w) + 'px,0,0)';
      pagerLinks.forEach(function (a) {
        var si = parseInt(a.getAttribute('data-slide-index') || '0', 10);
        if (si === index) a.classList.add('active'); else a.classList.remove('active');
      });
    }
    // wire pager
    pagerLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var si = parseInt(a.getAttribute('data-slide-index') || '0', 10);
        slideTo(si);
      });
    });
    var timer = setInterval(function () { slideTo(index + 1); }, interval || 3000);
    container.addEventListener('mouseenter', function () { clearInterval(timer); });
    container.addEventListener('mouseleave', function () { timer = setInterval(function () { slideTo(index + 1); }, interval || 3000); });
    window.addEventListener('resize', function () { slideTo(index); });
    // initial
    // find the first non-clone index if possible
    slideTo(0);
  }

  document.querySelectorAll('.slides_container').forEach(function (c) { initSlider(c, 3500); });

  // Password visibility toggle
  var visCheckbox = document.getElementById('list_a2');
  var pwdInput = document.getElementById('password');
  var eye = document.getElementById('password_mask');
  if (visCheckbox && pwdInput) {
    function updatePwd() {
      if (visCheckbox.checked) {
        pwdInput.type = 'text';
        if (eye) eye.style.opacity = '0.6';
      } else {
        pwdInput.type = 'password';
        if (eye) eye.style.opacity = '1';
      }
    }
    visCheckbox.addEventListener('change', updatePwd);
    if (eye) eye.addEventListener('click', function () { visCheckbox.checked = !visCheckbox.checked; updatePwd(); });
  }

  // Captcha reload
  var cap = document.getElementById('code_Cap');
  var regen = Array.from(document.querySelectorAll('a')).find(function (a) { return a.textContent && a.textContent.trim() === '重新產生'; });
  if (regen && cap) {
    regen.addEventListener('click', function (e) { e.preventDefault(); cap.src = 'CaptchaImage_2.jsp?rnd=' + Date.now(); });
  }

  // Login button submits the form
  var loginBtn = document.getElementById('WannaLogin');
  if (loginBtn) loginBtn.addEventListener('click', function () { var f = document.getElementById('LoginForm_post'); if (f) f.submit(); });

  // Reset / 清除重填 button: clear text/password inputs and uncheck checkboxes
  var resetBtn = document.getElementById('resetBottun');
  if (resetBtn) {
    resetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var form = document.getElementById('LoginForm_post') || document.forms['LoginForm'];
      if (form) {
        var inputs = form.querySelectorAll('input');
        inputs.forEach(function (inp) {
          var t = (inp.type || '').toLowerCase();
          if (t === 'text' || t === 'password' || t === 'tel' || t === 'email' || t === 'search' || t === 'number') {
            inp.value = '';
            // remove visual highlight if any
            try { if (inp._vkOldBox!==undefined) inp.style.boxShadow = inp._vkOldBox; } catch (e) {}
          } else if (t === 'checkbox' || t === 'radio') {
            inp.checked = false;
          }
        });
        // clear textareas
        var areas = form.querySelectorAll('textarea');
        areas.forEach(function(a){ a.value = ''; });
        // reset tracked virtual keyboard target
        window._vkTarget = null;
        // reset captcha image if present
        var cap = document.getElementById('code_Cap');
        if (cap && cap.src) cap.src = cap.src.split('?')[0] + '?rnd=' + Date.now();
      }
    });
  }
});
// bank.js
// No inline JavaScript was found in the MHTML source.
// Add extracted or custom scripts here as needed.

/* Placeholder to keep the separated JS file in place. */

// Virtual keyboard implementation
(function(){
  function createKeyboard() {
    if (document.getElementById('virtualKeyboard')) return document.getElementById('virtualKeyboard');
    var kb = document.createElement('div');
    kb.id = 'virtualKeyboard';
    kb.style.position = 'fixed';
    kb.style.right = '20px';
    kb.style.bottom = '20px';
    kb.style.zIndex = 9999;
    kb.style.background = 'rgba(255,255,255,0.98)';
    kb.style.border = '1px solid #ccc';
    kb.style.padding = '8px';
    kb.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    kb.style.borderRadius = '6px';
    kb.style.userSelect = 'none';

    var keysLower = ['1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    var container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(10, 36px)';
    container.style.gridGap = '6px';
    kb.appendChild(container);

    function makeKey(ch) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = ch;
      b.style.width = '36px';
      b.style.height = '36px';
      b.style.borderRadius = '4px';
      b.style.border = '1px solid #bbb';
      b.style.background = '#7b1fa2';
      b.style.color = '#fff';
      b.style.cursor = 'pointer';
      b.addEventListener('click', function(e){
        e.preventDefault();
        insertAtFocus(b.textContent);
      });
      return b;
    }

    keysLower.forEach(function(k){ container.appendChild(makeKey(k)); });

    // special row: shift, space, delete, toggle case
    var footer = document.createElement('div');
    footer.style.marginTop = '8px';
    footer.style.display = 'flex';
    footer.style.gap = '8px';

    var btnShift = document.createElement('button'); btnShift.type='button'; btnShift.textContent='切換大小寫'; btnShift.style.padding='6px 10px';
    var btnSpace = document.createElement('button'); btnSpace.type='button'; btnSpace.textContent='空格'; btnSpace.style.padding='6px 20px';
    var btnDel = document.createElement('button'); btnDel.type='button'; btnDel.textContent='刪除'; btnDel.style.padding='6px 10px';
    var btnClose = document.createElement('button'); btnClose.type='button'; btnClose.textContent='關閉'; btnClose.style.padding='6px 10px';

    btnShift.addEventListener('click', function(){ toggleCase(); });
    btnSpace.addEventListener('click', function(){ insertAtFocus(' '); });
    btnDel.addEventListener('click', function(){ backspaceAtFocus(); });
    btnClose.addEventListener('click', function(){ hideKeyboard(); });

    footer.appendChild(btnShift); footer.appendChild(btnSpace); footer.appendChild(btnDel); footer.appendChild(btnClose);
    kb.appendChild(footer);

    document.body.appendChild(kb);
    kb._uppercase = false;
    return kb;
  }

  function toggleCase(){
    var kb = createKeyboard();
    kb._uppercase = !kb._uppercase;
    var buttons = kb.querySelectorAll('button');
    buttons.forEach(function(b){
      var t = b.textContent;
      if (t.length===1 && /[a-zA-Z]/.test(t)) b.textContent = kb._uppercase ? t.toUpperCase() : t.toLowerCase();
    });
  }

  // insert into tracked focused input (use stored caret positions so keyboard buttons don't need focus)
  function insertAtFocus(ch){
    var el = window._vkTarget || document.activeElement;
    if (!el || (el.tagName!=='INPUT' && el.tagName!=='TEXTAREA')) return;
    var v = el.value || '';
    var start = (typeof window._vkCaretStart === 'number') ? window._vkCaretStart : (typeof el.selectionStart === 'number' ? el.selectionStart : v.length);
    var end = (typeof window._vkCaretEnd === 'number') ? window._vkCaretEnd : (typeof el.selectionEnd === 'number' ? el.selectionEnd : start);
    start = Math.max(0, Math.min(start, v.length));
    end = Math.max(0, Math.min(end, v.length));
    el.value = v.slice(0,start) + ch + v.slice(end);
    var pos = start + ch.length;
    // update stored caret positions
    window._vkCaretStart = window._vkCaretEnd = pos;
    try { el.selectionStart = el.selectionEnd = pos; } catch(e){}
  }

  function backspaceAtFocus(){
    var el = window._vkTarget || document.activeElement;
    if (!el || (el.tagName!=='INPUT' && el.tagName!=='TEXTAREA')) return;
    var v = el.value || '';
    var start = (typeof window._vkCaretStart === 'number') ? window._vkCaretStart : (typeof el.selectionStart === 'number' ? el.selectionStart : v.length);
    var end = (typeof window._vkCaretEnd === 'number') ? window._vkCaretEnd : (typeof el.selectionEnd === 'number' ? el.selectionEnd : start);
    if (start===end && start>0) {
      el.value = v.slice(0,start-1) + v.slice(end);
      start = start-1;
    } else if (start!==end) {
      el.value = v.slice(0,start) + v.slice(end);
    }
    window._vkCaretStart = window._vkCaretEnd = start;
    try { el.selectionStart = el.selectionEnd = start; } catch(e){}
  }

  function showKeyboard(){
    var kb = createKeyboard();
    kb.style.display = 'block';
  }
  function hideKeyboard(){
    var kb = document.getElementById('virtualKeyboard');
    if (kb) kb.style.display = 'none';
  }

  // wire the littleKeyboard toggle link
  document.addEventListener('DOMContentLoaded', function(){
    var little = document.getElementById('littleKeyboard');
    if (!little) return;
    little.style.cursor = 'pointer';
    little.addEventListener('click', function(e){
      e.preventDefault();
      var kb = document.getElementById('virtualKeyboard');
      if (kb && kb.style.display !== 'none') hideKeyboard(); else showKeyboard();
    });
    // focus inputs: track target and highlight (do NOT auto-open keyboard)
    var inputs = document.querySelectorAll('input[type=text], input[type=password], textarea');
    inputs.forEach(function(inp){
      inp.addEventListener('focus', function(){
        // do not auto-open keyboard; only track target when focused
        // track this element as the keyboard target
        window._vkTarget = inp;
        // visual highlight
        inp._vkOldBox = inp.style.boxShadow || '';
        inp.style.boxShadow = '0 0 0 3px rgba(123,31,162,0.15)';
        // initialize caret tracking
        try { window._vkCaretStart = inp.selectionStart; window._vkCaretEnd = inp.selectionEnd; } catch(e) { window._vkCaretStart = (inp.value||'').length; window._vkCaretEnd = window._vkCaretStart; }
      });
      // update caret position on user interactions
      ['click','keyup','mouseup','input','keydown'].forEach(function(evt){
        inp.addEventListener(evt, function(){
          try { window._vkCaretStart = inp.selectionStart; window._vkCaretEnd = inp.selectionEnd; } catch(e){ window._vkCaretStart = (inp.value||'').length; window._vkCaretEnd = window._vkCaretStart; }
          window._vkTarget = inp;
        });
      });
      inp.addEventListener('blur', function(){
        // remove visual highlight when blurred
        try{ if (inp._vkOldBox!==undefined) inp.style.boxShadow = inp._vkOldBox; }catch(e){}
        // if focus moved to a keyboard button, keep _vkTarget until user focuses elsewhere
        setTimeout(function(){
          var a = document.activeElement;
          if (!a || (a.tagName!=='BUTTON' && a.tagName!=='INPUT' && a.tagName!=='TEXTAREA')) {
            // user moved focus away from inputs and keyboard buttons
            window._vkTarget = null;
          }
        }, 20);
      });
      // also allow clicking the input area to show keyboard
      inp.addEventListener('click', function(){
        inp.focus();
      });
    });
  });
})();

// Password info popup: toggle and position near the info icon
document.addEventListener('DOMContentLoaded', function(){
  var origIcon = document.getElementById('pwdInfo');
  var infoBox = document.getElementById('pwdInfoContent');
  if (!infoBox) return;
  // remove any original global icon to avoid duplicates
  if (origIcon && origIcon.parentNode) {
    try { origIcon.parentNode.removeChild(origIcon); } catch(e){}
    origIcon = null;
  }
  // Find the password input wrapper and insert a clear small 'i' button there.
  var pwdInput = document.getElementById('password');
  var wrapper = pwdInput ? pwdInput.closest('.input_box_witheye') : null;
  var icon = null;

  if (wrapper) {
    // ensure wrapper doesn't clip absolutely positioned children
    try { wrapper.style.overflow = 'visible'; } catch(e){}
    // if an HTML fallback button already exists use it, otherwise create one
    var existing = wrapper.querySelector('#pwdInfoBtnHTML') || wrapper.querySelector('#pwdInfoBtn');
    var btn = existing;
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'pwdInfoBtn';
      btn.title = '密碼說明';
      btn.innerHTML = 'i';
      btn.className = 'pwd-exclaim';
    } else {
      // ensure content and class match expected style
      try { btn.innerHTML = btn.innerHTML.trim() ? btn.innerHTML.trim() : 'i'; } catch(e){}
      try { btn.classList.add('pwd-exclaim'); } catch(e){}
    }
    // absolutely position the fallback button inside the wrapper so it stays visible
    btn.style.position = 'absolute';
    // place the button to the left of the eye icon so it doesn't overlap
    btn.style.right = '34px';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.width = '24px';
    btn.style.height = '24px';
    btn.style.borderRadius = '50%';
    btn.style.border = 'none';
    btn.style.background = '#c62828';
    btn.style.color = '#fff';
    btn.style.fontWeight = 'bold';
    btn.style.lineHeight = '24px';
    btn.style.textAlign = 'center';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = 1000;
    btn.style.fontSize = '14px';
    // Move the button outside the input wrapper: append to the wrapper's parent
    var parent = wrapper.parentNode || document.body;
    try { parent.style.position = parent.style.position || 'relative'; } catch(e){}
    // nudge the eye icon inward so it doesn't overlap the external button
    var eye = wrapper.querySelector('.eye-icon');
    if (eye) try { eye.style.right = '6px'; eye.style.zIndex = 900; } catch(e){}

    if (!btn.parentNode) parent.appendChild(btn);
    // position the button to the right of the wrapper (compute after layout)
    function placeBtn(){
      try {
        var rw = wrapper.getBoundingClientRect();
        var rp = parent.getBoundingClientRect();
        var btnW = btn.offsetWidth || 20;
        var left = (rw.right - rp.left) + 8; // 8px gap from wrapper
        // try to center relative to the left-side input box if present
        var leftBox = parent.querySelector('.text_bar, .text_bar_private, input.text_bar');
        var top;
        if (leftBox) {
          var lb = leftBox.getBoundingClientRect();
          top = (lb.top - rp.top) + (lb.height - btnW) / 2;
        } else {
          top = (rw.top - rp.top) + (rw.height - btnW) / 2;
        }
        // nudge slightly downward for visual alignment
        top = top + 6;
        btn.style.position = 'absolute';
        btn.style.left = Math.round(left) + 'px';
        btn.style.top = Math.round(top) + 'px';
      } catch(e) {}
    }
    // run after paint and on resize/scroll
    requestAnimationFrame(placeBtn);
    window.addEventListener('resize', placeBtn);
    window.addEventListener('scroll', placeBtn);
    icon = btn;
    // hide original global icon if exists
    if (origIcon) origIcon.style.display = 'none';
  } else {
    // fallback: use original icon element if exists
    icon = origIcon;
  }

  // prepare infoBox
  infoBox.style.position = 'absolute';
  infoBox.style.display = 'none';
  infoBox.style.zIndex = 10000;

  function positionBox(){
    if (!icon) return;
    var r = icon.getBoundingClientRect();
    var left = window.scrollX + r.left;
    var top = window.scrollY + r.bottom + 6;
    infoBox.style.display = 'block'; // ensure offsetWidth available
    var bw = infoBox.offsetWidth || 260;
    if (left + bw > window.scrollX + window.innerWidth) left = window.scrollX + window.innerWidth - bw - 10;
    infoBox.style.left = Math.max(window.scrollX + 8, left) + 'px';
    infoBox.style.top = top + 'px';
  }

  function showBox(){ positionBox(); infoBox.style.display = 'block'; }
  function hideBox(){ infoBox.style.display = 'none'; }

  if (icon) {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); if (infoBox.style.display === 'block') hideBox(); else showBox(); });
  }
  // hide when clicking outside
  document.addEventListener('click', function(e){ if (!infoBox.contains(e.target) && !(icon && icon.contains(e.target))) hideBox(); });
  // reposition on resize/scroll
  window.addEventListener('resize', function(){ if (infoBox.style.display==='block') positionBox(); });
  window.addEventListener('scroll', function(){ if (infoBox.style.display==='block') positionBox(); });
});


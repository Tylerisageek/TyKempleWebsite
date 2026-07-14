(function() {

    window.addEventListener("load", init);

    // array of all page names on website
    const pages = [
      'abtme',
      'res',
      'prj',
      'thtr',
      'catin',
      'frank',
      'macbeezy',
      'blithe',
      'midsummer',
      //'ws',
      'vm',
      'nd',
      'pdfmerger'
    ];
  
    function init() {
      btnsInit();
      particles();
    };
    
    // Creates the event listeners for any button that changes what page is displayed
    const btnsInit = () => {
      for (const page of pages) {
        document.querySelector(`#${page}Btn`).addEventListener('click', () => pageOpen(`#${page}Container`))
      }
    }
  
    // Automates hiding all pages that are currently being displayed
    const hidePg = () => {
        document.querySelectorAll('.container').forEach((el) => {
          (el.style.display = "none")
        });
    }

    // Hides all pages, then displays the page that corresponds to the button that was clicked
    const pageOpen = (string) => {
      hidePg()
      document.querySelector(string).style.display = "grid";
    }

    // Particle background animation, adapted from 30,000 Particles by Justin Windle
    const particles = () => {
  var THICKNESS = Math.pow(180, 2),
    SPACING = 3,
    TMARGIN = 0,
    BMARGIN = 0,
    LMARGIN = 0,
    RMARGIN = 0,
    COLOR = 180,
    DRAG = 0.95,
    EASE = 0.30,

    container,
    particle,
    canvas,
    stats,
    list,
    ctx,
    tog,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p,
    ROWS, COLS, NUM_PARTICLES,
    resizeTimeout
    ;

  particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
  };

  function buildGrid() {
    // (Re)builds canvas size and particle list based on current container size
    w = canvas.width = container.clientWidth;
    h = canvas.height = container.clientHeight;

    COLS = Math.floor((w - LMARGIN - RMARGIN) / SPACING);
    ROWS = Math.floor((h - TMARGIN - BMARGIN) / SPACING);
    NUM_PARTICLES = ROWS * COLS;

    list = [];
    for (i = 0; i < NUM_PARTICLES; i++) {
      p = Object.create(particle);
      p.x = p.ox = LMARGIN + SPACING * (i % COLS);
      p.y = p.oy = TMARGIN + SPACING * Math.floor(i / COLS);
      list[i] = p;
    }
  }

  function handleResize() {
    // Debounce so rapid resize events don't rebuild the grid excessively
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(buildGrid, 150);
  }

  function init() {
    container = document.querySelector('#particleContainer');
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    tog = true;

    buildGrid();
    container.appendChild(canvas);

    // Watches the container itself, so layout-driven size changes are caught
    // even without a window resize event (e.g. flex/grid reflow).
    if (window.ResizeObserver) {
      new ResizeObserver(handleResize).observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }
  }

  function step() {
    if (tog = !tog) {
      t = +new Date() * 0.001;
      mx = w * 0.5 + (Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45);
      my = h * 0.5 + (Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45);

      for (i = 0; i < NUM_PARTICLES; i++) {
        p = list[i];
        d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
        f = -THICKNESS / d;

        if (d < THICKNESS) {
          t = Math.atan2(dy, dx);
          p.vx += f * Math.cos(t);
          p.vy += f * Math.sin(t);
        }

        p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
        p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
      }
    } else {
      b = (a = ctx.createImageData(w, h)).data;

      for (i = 0; i < NUM_PARTICLES; i++) {
        p = list[i];
        b[n = (~~p.x + (~~p.y * w)) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
      }

      ctx.putImageData(a, 0, 0);
    }

    if (stats) stats.end();
    requestAnimationFrame(step);
  }

  init();
  step();
};
  /*
  // Intended to be implemented for loading purposes, but currently does nothing.
  // Not being called
  const preloader = () => {
    var loader = document.getElementById("preloader");

    window.addEventListener("load", () => {
      loader.style.display = "none";
    });
  }
  */

  })();
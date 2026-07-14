(function() {

    window.addEventListener("load", init);

    // array of all page names on website
    const pages = [
      'abtme',
      'res',
      'prj',
      'thtr',
      'catin',
      'macbeezy',
      'blithe',
      'midsummer',
      //'ws',
      'vm',
      'nd'
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
      var NUM_PARTICLES = ( ( ROWS = 150 ) * ( COLS = 200 ) ),
    THICKNESS = Math.pow( 80, 2 ),
    SPACING = 3,
    TMARGIN = 27,
    BMARGIN = 23,
    LMARGIN = 17,
    RMARGIN = 16,
    COLOR = 180,
    DRAG = 0.95,
    EASE = 0.25,
    
    /*
    
    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,

    */

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
    ;

    particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
    };

    function init() {

    container = document.querySelector('#particleContainer');
    canvas = document.createElement( 'canvas' );

    var cont = window.getComputedStyle(container);
    
    ctx = canvas.getContext( '2d' );
    man = false;
    tog = true;
    
    list = [];
    
    w = canvas.width = COLS * SPACING + LMARGIN + RMARGIN;
    h = canvas.height = ROWS * SPACING + TMARGIN + BMARGIN;
    //NUM_PARTICLES = (ROWS = Math.floor(h / SPACING)) * (COLS = Math.floor((w - MARGIN) / SPACING));
    
    //cont.style.marginLeft = Math.round( w * -0.5 ) + 'px';
    //cont.style.marginTop = Math.round( h * -0.5 ) + 'px';
    
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
        
        p = Object.create( particle );
        p.x = p.ox = LMARGIN + SPACING * ( i % COLS );
        p.y = p.oy = TMARGIN + SPACING * Math.floor( i / COLS );
        
        list[i] = p;
    }
    
    container.appendChild( canvas );
    }

    function step() {

    if ( tog = !tog ) {

        if ( !man ) {

        t = +new Date() * 0.001;
        mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
        my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
        }
        
        for ( i = 0; i < NUM_PARTICLES; i++ ) {
        
        p = list[i];
        
        d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
        f = -THICKNESS / d;

        if ( d < THICKNESS ) {
            t = Math.atan2( dy, dx );
            p.vx += f * Math.cos(t);
            p.vy += f * Math.sin(t);
        }

        p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
        p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

        }

    } else {

        b = ( a = ctx.createImageData( w, h ) ).data;

        for ( i = 0; i < NUM_PARTICLES; i++ ) {

        p = list[i];
        b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
        }

        ctx.putImageData( a, 0, 0 );
    }

    if ( stats ) stats.end();

    requestAnimationFrame( step );
    }

    init();
    step();
  }
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
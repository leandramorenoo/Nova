function t(t,e,i){return Math.max(t,Math.min(e,i))}var e=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let i=!1;if(this.duration&&this.easing){this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}else this.lerp?(this.value=function(t,e,i,s){return function(t,e,i){return(1-i)*t+i*e}(t,e,1-Math.exp(-i*s))}(this.value,this.to,60*this.lerp,e),Math.round(this.value)===this.to&&(this.value=this.to,i=!0)):(this.value=this.to,i=!0);i&&this.stop(),this.onUpdate?.(this.value,i)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:o,onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=r}};var i=class{constructor(t,e,{autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(...s){let o=this;clearTimeout(i),i=setTimeout((()=>{i=void 0,t.apply(o,s)}),e)}}(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},s=class{events={};emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t]?.(...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}},o=100/6,n={passive:!1},r=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,n),this.element.addEventListener("touchstart",this.onTouchStart,n),this.element.addEventListener("touchmove",this.onTouchMove,n),this.element.addEventListener("touchend",this.onTouchEnd,n)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new s;on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,n),this.element.removeEventListener("touchstart",this.onTouchStart,n),this.element.removeEventListener("touchmove",this.onTouchMove,n),this.element.removeEventListener("touchend",this.onTouchEnd,n)}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.options.touchMultiplier,o=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=1===s?o:2===s?this.window.width:1,i*=1===s?o:2===s?this.window.height:1,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},l=t=>Math.min(1,1.001-Math.pow(2,-10*t)),Lenis=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new e;emitter=new s;dimensions;virtualScroll;constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:s=t,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:h=.075,touchInertiaExponent:a=1.7,duration:c,easing:p,lerp:d=.1,infinite:u=!1,orientation:m="vertical",gestureOrientation:v=("horizontal"===m?"both":"vertical"),touchMultiplier:g=1,wheelMultiplier:S=1,autoResize:w=!0,prevent:f,virtualScroll:y,overscroll:E=!0,autoRaf:T=!1,anchors:b=!1,autoToggle:z=!1,allowNestedScroll:_=!1,__experimental__naiveDimensions:L=!1}={}){window.lenisVersion="1.3.11",t&&t!==document.documentElement||(t=window),"number"==typeof c&&"function"!=typeof p?p=l:"function"==typeof p&&"number"!=typeof c&&(c=1),this.options={wrapper:t,content:e,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:h,touchInertiaExponent:a,duration:c,easing:p,lerp:d,infinite:u,gestureOrientation:v,orientation:m,touchMultiplier:g,wheelMultiplier:S,autoResize:w,prevent:f,virtualScroll:y,overscroll:E,autoRaf:T,anchors:b,autoToggle:z,allowNestedScroll:_,__experimental__naiveDimensions:L},this.dimensions=new i(t,e,{autoResize:w}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new r(s,{touchMultiplier:g,wheelMultiplier:S}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}onScrollEnd=t=>{t instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||t.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};onTransitionEnd=t=>{if(t.propertyName.includes("overflow")){const t=this.isHorizontal?"overflow-x":"overflow-y",e=getComputedStyle(this.rootElement)[t];["hidden","clip"].includes(e)?this.internalStop():this.internalStart()}};setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}onClick=t=>{const e=t.composedPath().find((t=>t instanceof HTMLAnchorElement&&(t.getAttribute("href")?.startsWith("#")||t.getAttribute("href")?.startsWith("/#")||t.getAttribute("href")?.startsWith("./#"))));if(e){const t=e.getAttribute("href");if(t){const e="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0;let i=`#${t.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(t)&&(i=0),this.scrollTo(i,e)}}};onPointerDown=t=>{1===t.button&&this.reset()};onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;const{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey)return;if(s.lenisStopPropagation)return;const o=s.type.includes("touch"),n=s.type.includes("wheel");this.isTouching="touchstart"===s.type||"touchmove"===s.type;const r=0===e&&0===i;if(this.options.syncTouch&&o&&"touchstart"===s.type&&r&&!this.isStopped&&!this.isLocked)return void this.reset();const l="vertical"===this.options.gestureOrientation&&0===i||"horizontal"===this.options.gestureOrientation&&0===e;if(r||l)return;let h=s.composedPath();h=h.slice(0,h.indexOf(this.rootElement));const a=this.options.prevent;if(h.find((t=>t instanceof HTMLElement&&("function"==typeof a&&a?.(t)||t.hasAttribute?.("data-lenis-prevent")||o&&t.hasAttribute?.("data-lenis-prevent-touch")||n&&t.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.checkNestedScroll(t,{deltaX:e,deltaY:i})))))return;if(this.isStopped||this.isLocked)return void(s.cancelable&&s.preventDefault());if(!(this.options.syncTouch&&o||this.options.smoothWheel&&n))return this.isScrolling="native",this.animate.stop(),void(s.lenisStopPropagation=!0);let c=i;"both"===this.options.gestureOrientation?c=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===this.options.gestureOrientation&&(c=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&i>0||this.animatedScroll===this.limit&&i<0))&&(s.lenisStopPropagation=!0),s.cancelable&&s.preventDefault();const p=o&&this.options.syncTouch,d=o&&"touchend"===s.type;d&&(c=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+c,{programmatic:!1,...p?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(!1===this.isScrolling||"native"===this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout((()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()}),400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.options.autoToggle?this.rootElement.style.removeProperty("overflow"):this.internalStart())}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.options.autoToggle?this.rootElement.style.setProperty("overflow","clip"):this.internalStop())}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=t=>{const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:h=this.options.lerp,onStart:a,onComplete:c,force:p=!1,programmatic:d=!0,userData:u}={}){if(!this.isStopped&&!this.isLocked||p){if("string"==typeof e&&["top","left","start"].includes(e))e=0;else if("string"==typeof e&&["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):e instanceof HTMLElement&&e?.nodeType&&(t=e),t){if(this.options.wrapper!==window){const t=this.rootElement.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite){if(d){this.targetScroll=this.animatedScroll=this.scroll;const t=e-this.animatedScroll;t>this.limit/2?e-=this.limit:t<-this.limit/2&&(e+=this.limit)}}else e=t(0,e,this.limit);if(e===this.targetScroll)return a?.(this),void c?.(this);if(this.userData=u??{},s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},void requestAnimationFrame((()=>{this.dispatchScrollendEvent()}));d||(this.targetScroll=e),"number"==typeof n&&"function"!=typeof r?r=l:"function"==typeof r&&"number"!=typeof n&&(n=1),this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:r,lerp:h,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(t,e)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),d&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame((()=>{this.dispatchScrollendEvent()})),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame((()=>{this._preventNextNativeScrollEvent=!1}))}checkNestedScroll(t,{deltaX:e,deltaY:i}){const s=Date.now(),o=t._lenis??={};let n,r,l,h,a,c,p,d;const u=this.options.gestureOrientation;if(s-(o.time??0)>2e3){o.time=Date.now();const e=window.getComputedStyle(t);o.computedStyle=e;const i=e.overflowX,s=e.overflowY;if(n=["auto","overlay","scroll"].includes(i),r=["auto","overlay","scroll"].includes(s),o.hasOverflowX=n,o.hasOverflowY=r,!n&&!r)return!1;if("vertical"===u&&!r)return!1;if("horizontal"===u&&!n)return!1;a=t.scrollWidth,c=t.scrollHeight,p=t.clientWidth,d=t.clientHeight,l=a>p,h=c>d,o.isScrollableX=l,o.isScrollableY=h,o.scrollWidth=a,o.scrollHeight=c,o.clientWidth=p,o.clientHeight=d}else l=o.isScrollableX,h=o.isScrollableY,n=o.hasOverflowX,r=o.hasOverflowY,a=o.scrollWidth,c=o.scrollHeight,p=o.clientWidth,d=o.clientHeight;if(!n&&!r||!l&&!h)return!1;if(!("vertical"!==u||r&&h))return!1;if(!("horizontal"!==u||n&&l))return!1;let m,v,g,S,w,f;if("horizontal"===u)m="x";else if("vertical"===u)m="y";else{0!==e&&n&&l&&(m="x"),0!==i&&r&&h&&(m="y")}if(!m)return!1;if("x"===m)v=t.scrollLeft,g=a-p,S=e,w=n,f=l;else{if("y"!==m)return!1;v=t.scrollTop,g=c-d,S=i,w=r,f=h}return(S>0?v<g:v>0)&&w&&f}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){const t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};globalThis.Lenis=Lenis,globalThis.Lenis.prototype=Lenis.prototype;
/* NOVA ORBIT — shared application. Lenis 1.3.11 is bundled above (MIT). */
(() => {
  'use strict';

  /* Entry loader — generated once for every shared page */
  function initEntryLoader() {
    const logoSource = document.querySelector('.site-nav__mark')?.getAttribute('src');
    const loader = document.createElement('div');
    const displayDuration = 1500;
    const exitDuration = 300;
    loader.className = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `<div class="page-loader__content"><img class="page-loader__mark" src="${logoSource}" width="64" height="64" alt=""><span class="page-loader__wordmark">NOVA<br>ORBIT</span><span class="page-loader__progress"><span></span></span></div>`;
    document.body.prepend(loader);
    document.body.classList.add('is-loading');

    window.setTimeout(() => {
      loader.classList.add('page-loader--leaving');
      document.body.classList.remove('is-loading');
      window.setTimeout(() => loader.remove(), exitDuration);
    }, displayDuration - exitDuration);
  }
  initEntryLoader();

  /* 1. Product data — the single source for catalogue, details and cart */
  // Only products with verified, supplied images belong in the active catalogue.
  const products = [
    {
      "id": "orbital-gate",
      "name": "Orbital Gate",
      "category": "transport",
      "type": "Orbital transport portal",
      "price": 9999,
      "description": "An orbital portal that takes your ship between connected worlds in eight seconds. Spend less time travelling and more time being there.",
      "specs": [
        [
          "Journey time",
          "8 seconds"
        ],
        [
          "Range",
          "1,240,000 km"
        ],
        [
          "Connection",
          "Nova Orbit network"
        ]
      ],
      "layout": "featured",
      "alt": "Orbital Gate transport ring with a ship passing through its blue portal above a planet",
      "image": "orbital-gate.webp",
      "fallback": "orbital-gate.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "astra-suit",
      "name": "Astra Suit",
      "category": "personal-technology",
      "type": "Intelligent spacesuit",
      "price": 899,
      "description": "Your next everyday essential. A smart spacesuit with built-in climate control and an easy-to-read visor, so you can step outside with confidence.",
      "specs": [
        [
          "Comfort",
          "Adaptive climate"
        ],
        [
          "Movement",
          "Flexible joints"
        ],
        [
          "Display",
          "Helmet status view"
        ]
      ],
      "layout": "wide",
      "alt": "Astra Suit intelligent spacesuit with a clear helmet display, worn on a planetary surface",
      "image": "astra-suit.webp",
      "fallback": "astra-suit.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "nova-link",
      "name": "Nova Link",
      "category": "communication",
      "type": "Holographic communication device",
      "price": 399,
      "description": "Stay close, wherever you are in the universe. A pocket-sized device for holographic calls and everyday messages that make far away feel familiar.",
      "specs": [
        [
          "Calling",
          "Holographic video"
        ],
        [
          "Messaging",
          "Voice and text"
        ],
        [
          "Design",
          "Pocket-sized"
        ]
      ],
      "alt": "Nova Link handheld communication device projecting a blue holographic video call",
      "image": "nova-link.webp",
      "fallback": "nova-link.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "nomi",
      "name": "Nomi",
      "category": "orbital-living",
      "type": "Personal robotic assistant",
      "price": 699,
      "description": "A little help. A whole new world. Nomi lends a hand with daily tasks, keeps your routines on track and makes your orbital home feel more like home.",
      "specs": [
        [
          "Help",
          "Everyday tasks"
        ],
        [
          "Control",
          "Voice interaction"
        ],
        [
          "At home",
          "Routine assistance"
        ]
      ],
      "alt": "Nomi personal robot carrying a tray of plants inside an orbital home",
      "image": "nomi.webp",
      "fallback": "nomi.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "aero-pack",
      "name": "Aero Pack",
      "category": "personal-technology",
      "type": "Personal mobility backpack",
      "price": 1199,
      "description": "A new way to get around. This compact propulsion backpack helps you move smoothly outside your station, with simple controls and a comfortable fit.",
      "specs": [
        [
          "Movement",
          "Controlled propulsion"
        ],
        [
          "Fit",
          "Wearable backpack"
        ],
        [
          "Use",
          "Outside the station"
        ]
      ],
      "alt": "Aero Pack mobility backpack worn over a spacesuit, with two compact blue thrusters",
      "image": "aero-pack.webp",
      "fallback": "aero-pack.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "terra-bloom",
      "name": "Terra Bloom",
      "category": "orbital-living",
      "type": "Automated hydroponic garden",
      "price": 249,
      "description": "Grow a little Earth, wherever you call home. A compact indoor garden that takes care of light and watering, keeping fresh herbs close to your kitchen.",
      "specs": [
        [
          "Growing",
          "Soil-free hydroponics"
        ],
        [
          "Care",
          "Automatic light and water"
        ],
        [
          "Placement",
          "Kitchen counter"
        ]
      ],
      "alt": "Terra Bloom compact glass hydroponic garden growing fresh herbs beside a spacecraft window",
      "image": "terra-bloom.webp",
      "fallback": "terra-bloom.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "ares",
      "name": "Ares",
      "category": "space-exploration",
      "type": "Planetary exploration rover",
      "price": 2499,
      "description": "Every great discovery starts with a first step. Ares maps unfamiliar ground and collects samples, making your next planet a little easier to explore.",
      "specs": [
        [
          "Navigation",
          "Terrain mapping"
        ],
        [
          "Tools",
          "Sample collection"
        ],
        [
          "Mobility",
          "All-terrain wheels"
        ]
      ],
      "layout": "wide",
      "alt": "Ares six-wheel planetary exploration rover collecting a rock sample on rocky terrain",
      "image": "ares.webp",
      "fallback": "ares.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "vela",
      "name": "Vela",
      "category": "space-exploration",
      "type": "Atmospheric exploration glider",
      "price": 3999,
      "description": "See a new world from above. Vela glides through planetary skies, gathering weather and terrain information to help you choose where to go next.",
      "specs": [
        [
          "Flight",
          "Atmospheric gliding"
        ],
        [
          "Discovery",
          "Weather and terrain"
        ],
        [
          "Sensors",
          "Environmental mapping"
        ]
      ],
      "alt": "Vela atmospheric exploration glider with swept wings flying above pale planetary clouds",
      "image": "vela.webp",
      "fallback": "vela.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "noctis",
      "name": "Noctis",
      "category": "communication",
      "type": "Deep-space communication satellite",
      "price": 4999,
      "description": "Keep the conversation going. Noctis connects your station or outpost to the wider network, carrying calls, messages and discoveries across deep space.",
      "specs": [
        [
          "Connection",
          "Deep-space relay"
        ],
        [
          "Purpose",
          "Calls, messages and data"
        ],
        [
          "Coverage",
          "Stations and outposts"
        ]
      ],
      "alt": "Noctis deep-space communication satellite with a large dish and optical relay connections",
      "image": "noctis.webp",
      "fallback": "noctis.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "luma",
      "name": "Luma",
      "category": "orbital-living",
      "type": "Orbital energy station",
      "price": 7999,
      "description": "Bring a little sunshine home. Luma collects solar energy in orbit and sends it to your station, helping power the places where everyday life happens.",
      "specs": [
        [
          "Energy",
          "Solar collection"
        ],
        [
          "Delivery",
          "Wireless power"
        ],
        [
          "Use",
          "Orbital homes and stations"
        ]
      ],
      "alt": "Luma orbital energy station with large lavender solar arrays sending power to a nearby station",
      "image": "luma.webp",
      "fallback": "luma.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    },
    {
      "id": "helios",
      "name": "Helios",
      "category": "transport",
      "type": "Ion propulsion engine",
      "price": 1499,
      "description": "Make the next trip a smooth one. An efficient ion engine that gives your spacecraft steady propulsion for everyday routes and longer adventures.",
      "specs": [
        [
          "Drive",
          "Ion propulsion"
        ],
        [
          "Thrust",
          "Steady and efficient"
        ],
        [
          "Use",
          "Personal spacecraft"
        ]
      ],
      "alt": "Helios ion propulsion engine emitting a narrow blue exhaust beam in orbit",
      "image": "helios.webp",
      "fallback": "helios.jpg",
      "availability": "Available",
      "imageWidth": 2048,
      "imageHeight": 2048
    }
  ];
  const categoryLabels = {all:'All Products', 'personal-technology':'Personal Technology', 'space-exploration':'Space Exploration', transport:'Transport', communication:'Communication', 'orbital-living':'Orbital Living'};

  /* 2. Initialization and shared DOM helpers */
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const prefix = document.body.dataset.page === 'home' ? '' : '../';
  const asset = file => `${prefix}assets/images/${file}`;
  const creditFormatter = new Intl.NumberFormat('en-US', {maximumFractionDigits:0});
  const formatPrice = value => `${creditFormatter.format(value)} OC`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const getProduct = id => products.find(product => product.id === id);
  const announce = message => { $('[data-announcement]').textContent = message; };
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let lenis;
  let lastOpener;
  const contactMarkup = $('[data-contact-container]')?.innerHTML;
  const modal = $('#modal-dialog');
  const cartDialog = $('#cart-dialog');
  const heroVideo = $('[data-hero-video]');

  function syncHeroVideo() {
    if (!heroVideo) return;
    if (motionPreference.matches) {
      heroVideo.pause();
      return;
    }
    heroVideo.play().catch(() => { /* The poster remains available if autoplay is blocked. */ });
  }
  syncHeroVideo();
  motionPreference.addEventListener('change', syncHeroVideo);
  const themeStorageKey = 'nova-orbit-theme-v1';

  function applyTheme(theme, persist = true) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    $$('[data-action="theme-toggle"]').forEach(button => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.innerHTML = `Theme <span class="theme-toggle__track" aria-hidden="true"><span>☾</span><span>☀</span></span>`;
    });
    if (persist) {
      try { localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light'); }
      catch { /* The theme still works for this visit if storage is unavailable. */ }
    }
  }

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light'; }
  catch { /* Use the light theme when storage is unavailable. */ }
  applyTheme(savedTheme, false);


  function productPicture(product, className = '', priority = false) {
    return `<picture class="product-image ${className}"><source srcset="${asset(product.image)}" type="image/webp"><img src="${asset(product.fallback)}" width="${product.imageWidth}" height="${product.imageHeight}" loading="${priority ? 'eager' : 'lazy'}"${priority ? ' fetchpriority="high"' : ''} alt="${product.alt}"></picture>`;
  }
  // A picture element handles unsupported WebP; this also handles a failed WebP request.
  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackTried) return;
    const picture = image.closest('picture');
    if (!picture?.querySelector('source')) return;
    image.dataset.fallbackTried = 'true';
    picture.querySelectorAll('source').forEach(source => source.remove());
    image.src = image.getAttribute('src');
  }, true);
  $$('[data-product-price]').forEach(node => {
    const product = getProduct(node.dataset.productPrice);
    if (product) node.textContent = formatPrice(product.price);
  });
  $$('[data-catalogue-total]').forEach(node => { node.textContent = products.length; });

  /* 3. Navigation and mobile menu */
  const nav = $('.site-nav');
  const menuToggle = $('.site-nav__toggle');
  function setMenu(open, returnFocus = false) {
    nav.classList.toggle('site-nav--open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.innerHTML = `${open ? 'Close' : 'Menu'} <span aria-hidden="true">${open ? '×' : '☰'}</span>`;
    $('.site-main').inert = open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { lenis?.stop(); $('.site-nav__link').focus(); }
    else { if (!$('dialog[open]')) lenis?.start(); if (returnFocus) menuToggle.focus(); }
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true', true));
  nav.addEventListener('keydown', event => {
    if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const controls = [menuToggle, ...$$('a, button', $('.site-nav__content'))];
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
      if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
    }
  });
  $$('.site-nav__link').forEach(link => link.addEventListener('click', () => setMenu(false)));
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if(event.matches) setMenu(false); });

  /* 4. Product catalogue and category filtering */
  function specMarkup(product) {
    return `<dl class="spec-list">${product.specs.map(([label, value]) => `<div class="spec-list__item"><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
  }
  function cardMarkup(product, featured = false) {
    const tag = featured ? 'h3' : 'h2';
    const className = featured ? '' : product.layout ? ` product-card--${product.layout}` : '';
    const detail = product.id === 'orbital-gate'
      ? `<a class="product-card__action" href="${prefix}pages/orbital-gate.html">View product ↗</a>`
      : `<button class="product-card__action" data-action="details" data-product="${product.id}">View product<span class="sr-only">: ${product.name}</span> ↗</button>`;
    return `<article class="product-card${className}" data-product-card="${product.id}"><div class="product-card__top"><span class="eyebrow muted">${categoryLabels[product.category]}</span><span class="badge">${product.availability}</span></div><div class="product-card__visual">${productPicture(product)}</div><div class="product-card__info"><p class="product-card__category">${product.type}</p><${tag}>${product.name.toUpperCase()}</${tag}><p class="product-card__description">${product.description}</p>${!featured && product.layout === 'featured' ? specMarkup(product) : ''}</div><div class="product-card__bottom"><span class="product-card__price">${formatPrice(product.price)}</span><div class="product-card__actions">${detail}<button class="product-card__buy" data-action="add" data-product="${product.id}">Add to cart<span class="sr-only">: ${product.name}</span> +</button></div></div></article>`;
  }
  const featuredSelections = {personal:['astra-suit','nova-link','nomi'], exploration:['orbital-gate','ares']};
  $$('[data-featured-products]').forEach(grid => {
    grid.innerHTML = (featuredSelections[grid.dataset.featuredProducts] || []).map(id => cardMarkup(getProduct(id), true)).join('');
  });
  const requestedCategory = new URLSearchParams(location.search).get('category');
  let activeCategory = Object.hasOwn(categoryLabels, requestedCategory) ? requestedCategory : 'all';
  $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeCategory)));

  const catalogue = $('[data-catalogue]');
  const catalogueSearch = $('[data-catalogue-search]');
  function renderCatalogue() {
    if (!catalogue) return;
    const term = catalogueSearch.value.trim().toLowerCase();
    const matches = products.filter(p => (activeCategory === 'all' || p.category === activeCategory) && `${p.name} ${p.type} ${categoryLabels[p.category]} ${p.description}`.toLowerCase().includes(term));
    catalogue.innerHTML = matches.length ? matches.map(p => cardMarkup(p)).join('') : '<div class="catalogue__empty"><h2>No products found.</h2><p>Try another category or a different search.</p><button class="text-link" data-action="reset-filters">Reset filters ↗</button></div>';
    $('[data-result-count]').textContent = `${matches.length} ${matches.length === 1 ? 'product' : 'products'} available`;
    attachTilt();
  }
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    $$('[data-filter]').forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    renderCatalogue();
  }));
  catalogueSearch?.addEventListener('input', renderCatalogue);
  renderCatalogue();

  /* 5. Cart state and localStorage */
  const storageKey = 'nova-orbit-cart-v1';
  let storageAvailable = true;
  function sanitizeCart(raw) {
    if (!Array.isArray(raw)) return [];
    const entries = new Map();
    raw.slice(0, 100).forEach(item => {
      if (!item || typeof item !== 'object') return;
      const product = getProduct(item.id);
      if (!product || product.price === null || !Number.isInteger(item.quantity) || item.quantity < 1) return;
      entries.set(product.id, Math.min(99, (entries.get(product.id) || 0) + item.quantity));
    });
    return [...entries].map(([id, quantity]) => ({id, quantity}));
  }
  function loadCart() {
    try { return sanitizeCart(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
    catch { return []; }
  }
  let cart = loadCart();
  function saveCart() {
    try { localStorage.setItem(storageKey, JSON.stringify(cart)); }
    catch { storageAvailable = false; announce('Browser storage is unavailable. Your collection will last for this visit only.'); }
    renderCart();
  }
  const countCart = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = () => cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
  function addToCart(id) {
    const product = getProduct(id);
    if (!product) return;
    if (product.price === null) { requestAccess(id); return; }
    const item = cart.find(entry => entry.id === id);
    if (item?.quantity >= 99) { announce('Maximum quantity is 99 per product.'); return; }
    if (item) item.quantity += 1; else cart.push({id, quantity:1});
    saveCart();
    announce(`${product.name} added to your collection.`);
    showModal('A new possibility.', `<p>${product.name} has been added to your collection.</p><p class="muted">${countCart()} ${countCart() === 1 ? 'item' : 'items'} · ${formatPrice(subtotal())}</p><div class="button-group"><button class="button" data-action="cart">View collection ↗</button><button class="button button--secondary" data-close>Keep exploring</button></div>`);
  }
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      cart = loadCart(); renderCart();
      if ($('[data-checkout-form]')) showCheckout();
    }
  });

  /* 6. Cart rendering and quantity controls */
  function renderCart() {
    $$('[data-cart-count]').forEach(node => { node.textContent = countCart(); });
    const body = $('[data-cart-body]');
    if (!cart.length) {
      body.innerHTML = `<div class="cart__empty"><p class="eyebrow muted">Room for possibility</p><h3>Your next journey<br>starts here.</h3><p>Explore the collection and add a product.</p><a class="button" href="${prefix}pages/shop.html">Explore technologies ↗</a></div>`;
      return;
    }
    body.innerHTML = `<div>${cart.map(item => {
      const p = getProduct(item.id);
      return `<article class="cart-item">${productPicture(p, 'cart-item__image')}<div><h3 class="cart-item__name">${p.name}</h3><p class="cart-item__price">${formatPrice(p.price)} / item</p><div class="cart-item__controls"><div class="cart-item__quantity"><button data-quantity="decrease" data-product="${p.id}" aria-label="Decrease ${p.name} quantity" ${item.quantity === 1 ? 'disabled' : ''}>−</button><span aria-label="Quantity">${item.quantity}</span><button data-quantity="increase" data-product="${p.id}" aria-label="Increase ${p.name} quantity" ${item.quantity === 99 ? 'disabled' : ''}>+</button></div><button class="cart-item__remove" data-action="remove" data-product="${p.id}">Remove<span class="sr-only"> ${p.name}</span></button></div></div></article>`;
    }).join('')}</div><div class="cart__summary"><div class="cart__subtotal"><span>Subtotal</span><span>${formatPrice(subtotal())}</span></div><p class="cart__note">Prices are in Orbit Credits (OC), a fictional currency. This demo does not take real payments.</p>${!storageAvailable ? '<p class="cart__note">Storage is unavailable. Your collection is saved only for this visit.</p>' : ''}<button class="button button--full" data-action="checkout">Continue to demo checkout ↗</button><button class="cart__clear" data-action="clear-cart">Clear collection</button></div>`;
  }
  function updateQuantity(id, change) {
    const item = cart.find(entry => entry.id === id);
    if (!item) return;
    item.quantity = Math.max(1, Math.min(99, item.quantity + change));
    saveCart();
    const control = $(`[data-quantity="${change > 0 ? 'increase' : 'decrease'}"][data-product="${id}"]`);
    if (control && !control.disabled) control.focus();
    else $(`[data-quantity][data-product="${id}"]:not(:disabled)`)?.focus();
    announce(`Quantity ${item.quantity}. Subtotal ${formatPrice(subtotal())}.`);
  }
  saveCart(); // Persist the sanitized cart, dropping discontinued IDs from older visits.

  /* 7. Checkout simulation */
  const destinationOptions = '<option value="">Select destination</option>' + ['Terra','Ares','Vela','Noctis','Luma'].map(name => `<option>${name}</option>`).join('');
  function showCheckout() {
    if (!cart.length) { showModal('Your collection is empty.', `<p>Add a product before starting demo checkout.</p><a class="button" href="${prefix}pages/shop.html">Explore technologies ↗</a>`); return; }
    showModal('Your next chapter.', `<p>Orbit Credits (OC) are a fictional currency used in the Nova Orbit universe. This demo checkout does not place a real order or take a payment.</p><ul class="checkout-summary">${cart.map(item => `<li><span>${getProduct(item.id).name} × ${item.quantity}</span><strong>${formatPrice(getProduct(item.id).price * item.quantity)}</strong></li>`).join('')}<li><strong>Demo total (OC)</strong><strong>${formatPrice(subtotal())}</strong></li></ul><form class="form" data-checkout-form><div class="form__field"><label for="checkout-name">Full name *</label><input id="checkout-name" name="name" autocomplete="name" required maxlength="100"></div><div class="form__field"><label for="checkout-email">Email *</label><input id="checkout-email" name="email" type="email" autocomplete="email" required maxlength="160"></div><div class="form__field form__field--full"><label for="checkout-destination">Delivery destination *</label><select id="checkout-destination" name="destination" required>${destinationOptions}</select></div><p class="form__notice">Your personal details are not transmitted or stored. No payment details are needed.</p><button class="button form__field--full" type="submit">Complete demo order ↗</button></form>`);
  }
  function validForm(form) {
    $$('input[required], textarea[required]', form).forEach(input => {
      input.setCustomValidity(input.value.trim() ? '' : 'Please complete this field.');
    });
    return form.reportValidity();
  }
  document.addEventListener('input', event => { if (event.target.matches('input,textarea')) event.target.setCustomValidity(''); });
  document.addEventListener('submit', event => {
    if (!event.target.matches('[data-checkout-form]')) return;
    event.preventDefault();
    if (!validForm(event.target)) return;
    if (!cart.length) { showCheckout(); return; }
    const data = new FormData(event.target);
    const total = formatPrice(subtotal());
    const count = countCart();
    const destination = escapeHtml(data.get('destination'));
    const name = escapeHtml(data.get('name').trim());
    const order = `NO-${Date.now().toString(36).toUpperCase()}`;
    cart = []; saveCart();
    showModal('A future, imagined.', `<div class="confirmation"><p class="eyebrow">Demo order complete / ${order}</p><h3>See you beyond,<br>${name}.</h3><p>${count} ${count === 1 ? 'item' : 'items'} · ${total} · Destination: ${destination}</p><p class="section__intro">This simulation is complete. No money was charged, no order was placed and no email was sent.</p></div><div class="button-group"><button class="button" data-close>Continue exploring ↗</button></div>`);
  });

  /* 8. Reusable modal functionality */
  function openDialog(dialog) {
    if (!$('dialog[open]')) lastOpener = document.activeElement;
    if (menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); lastOpener = menuToggle; }
    $$('dialog[open]').forEach(open => open.close());
    dialog.showModal();
    lenis?.stop();
    dialog.scrollTop = 0;
  }
  function showModal(title, html) {
    $('#modal-title').textContent = title;
    $('[data-modal-body]').innerHTML = html;
    openDialog(modal);
  }
  function closeDialog(dialog) {
    dialog.close();
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = $$('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]', dialog).filter(node => node.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    });
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) {
        lenis?.start();
        if (lastOpener?.isConnected) lastOpener.focus();
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
  });
  function showDetails(id) {
    const p = getProduct(id);
    if (!p) return;
    showModal(p.name, `${productPicture(p, 'dialog__product-image', true)}<p class="eyebrow muted">${categoryLabels[p.category]} / ${p.type}</p><p>${p.description}</p>${specMarkup(p)}<div class="button-group"><button class="button" data-action="add" data-product="${p.id}">Add to cart · ${formatPrice(p.price)} ↗</button><button class="button button--secondary" data-action="request" data-product="${p.id}">Ask about this product</button></div><p class="cart__note">Orbit Credits (OC) are fictional. This is a demo store, with no real payments.</p>`);
  }
  function requestAccess(id) {
    const p = getProduct(id);
    const name = p?.name || 'Nova Orbit products';
    showModal('A place in the future.', `<p>Tell us about your interest in <strong>${name}</strong>. Our product team can help you choose. This form is a demonstration.</p><form class="form" data-request-form><div class="form__field"><label for="request-name">Name *</label><input id="request-name" name="name" autocomplete="name" required maxlength="100"></div><div class="form__field"><label for="request-email">Email *</label><input id="request-email" name="email" type="email" autocomplete="email" required maxlength="160"></div><div class="form__field form__field--full"><label for="request-organization">Organization</label><input id="request-organization" name="organization" autocomplete="organization" maxlength="120"></div><div class="form__field form__field--full"><label for="request-message">How can we help? *</label><textarea id="request-message" name="message" required minlength="10" maxlength="2000" placeholder="Tell us what you would like to know."></textarea></div><p class="form__notice">Your details will not be transmitted or stored.</p><button type="submit" class="button form__field--full">Send demo enquiry ↗</button></form>`);
  }
  document.addEventListener('submit', event => {
    if (!event.target.matches('[data-request-form]')) return;
    event.preventDefault();
    if (!validForm(event.target)) return;
    showModal('Possibility starts here.', '<div class="confirmation"><p class="eyebrow">Demonstration complete</p><h3>Thanks for getting<br>in touch.</h3><p>Your demo enquiry is complete. No request was sent and no personal details were saved.</p></div><div class="button-group"><button class="button" data-close>Keep exploring ↗</button></div>');
  });
  function searchSite() {
    showModal('Find your next possibility.', '<div class="form__field"><label for="site-search">Search the collection</label><input id="site-search" type="search" placeholder="Try Astra Suit, Nomi or Nova Link…" autocomplete="off"></div><div class="search-results" data-search-results></div>');
    const input = $('#site-search');
    const results = $('[data-search-results]');
    const update = () => {
      const term = input.value.trim().toLowerCase();
      const matches = products.filter(p => `${p.name} ${p.type} ${p.category} ${p.description}`.toLowerCase().includes(term));
      results.innerHTML = `<p role="status" class="muted">${matches.length} products found</p>` + matches.map(p => `<button class="search-results__item" data-action="details" data-product="${p.id}"><span>${p.name}</span><span>${categoryLabels[p.category]} · ${formatPrice(p.price)} ↗</span></button>`).join('');
    };
    input.addEventListener('input', update); update(); input.focus();
  }
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close]');
    if (close) { closeDialog(close.closest('dialog')); return; }
    const card = event.target.closest('.product-card');
    if (card && !event.target.closest('a, button, input, select, textarea')) {
      showDetails(card.dataset.productCard);
      return;
    }
    const quantity = event.target.closest('[data-quantity]');
    if (quantity) { updateQuantity(quantity.dataset.product, quantity.dataset.quantity === 'increase' ? 1 : -1); return; }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = button.dataset.product;
    switch (button.dataset.action) {
      case 'theme-toggle': applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); break;
      case 'cart': renderCart(); openDialog(cartDialog); break;
      case 'search': searchSite(); break;
      case 'details': showDetails(id); break;
      case 'add': addToCart(id); break;
      case 'request': requestAccess(id); break;
      case 'checkout': showCheckout(); break;
      case 'remove': cart = cart.filter(item => item.id !== id); saveCart(); announce('Product removed from your collection.'); $('[data-close]', cartDialog).focus(); break;
      case 'clear-cart': showModal('Start a new journey?', '<p>Remove all items from your collection?</p><div class="button-group"><button class="button" data-action="confirm-clear">Clear collection</button><button class="button button--secondary" data-action="cart">Keep collection</button></div>'); break;
      case 'confirm-clear': cart = []; saveCart(); openDialog(cartDialog); announce('Collection cleared.'); break;
      case 'reset-filters': activeCategory = 'all'; catalogueSearch.value = ''; $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all'))); renderCatalogue(); $('[data-filter]').focus(); break;
      case 'privacy': showModal('A little space for privacy.', '<p>This fictional concept store uses browser localStorage only to remember product IDs and quantities in your collection. It does not send form submissions, accept payments or use analytics.</p><p>Contact, access-request and checkout details are discarded when their dialogs or pages are closed. Clear your collection to remove its saved contents.</p><p class="muted">Product artwork supplied for Nova Orbit. Products, specifications and Orbit Credits are fictional.</p>'); break;
      case 'traffic': showTraffic(); break;
      case 'reset-contact': $('[data-contact-container]').innerHTML = contactMarkup; $('#contact-name').focus(); break;
    }
  });

  /* 9. Connected Worlds interactions */
  const worlds = {
    terra: {name:'Terra', index:'01', role:'Origin world & headquarters', description:'The first point of departure. Our shared home and the heart of the Nova Orbit network.', distance:'0 AU', atmosphere:'O₂ / N₂', gateways:'4 operational', traffic:'18 freighters', sector:'Earth / Origin'},
    ares: {name:'Ares', index:'02', role:'Surface exploration outpost', description:'A new perspective on the ground beneath us. Ares connects exploration habitats with the wider network.', distance:'0.52 AU', atmosphere:'Low-pressure CO₂', gateways:'2 operational', traffic:'8 survey vessels', sector:'Mars / Surface'},
    vela: {name:'Vela', index:'03', role:'Atmospheric harvesting station', description:'A research and resource node above an ever-changing atmosphere. Discovery, carried on a current.', distance:'1.18 AU', atmosphere:'Dense gas layers', gateways:'3 operational', traffic:'6 harvest vessels', sector:'Atmospheric / Station'},
    noctis: {name:'Noctis', index:'04', role:'Deep-space communications', description:'A quiet point in the distance, keeping every world in conversation. Optical relays extend the shared horizon.', distance:'2.44 AU', atmosphere:'Vacuum', gateways:'1 operational', traffic:'4 relay vessels', sector:'Deep reach / Relay'},
    luma: {name:'Luma', index:'05', role:'Orbital solar energy array', description:'An open horizon powered by our nearest star. Luma gathers light and sends possibility across the network.', distance:'0.88 AU', atmosphere:'Orbital vacuum', gateways:'2 operational', traffic:'6 cargo vessels', sector:'Solar / Sector 05'}
  };
  let selectedWorld = 'terra';
  const worldPanel = $('[data-world-panel]');
  function selectWorld(id) {
    if (!worldPanel || !worlds[id]) return;
    selectedWorld = id;
    const w = worlds[id];
    $$('[data-world]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.world === id)));
    worldPanel.innerHTML = `<p class="eyebrow muted">Node ${w.index} / Online</p><h2>${w.name.toUpperCase()}</h2><p><strong>${w.role}</strong></p><p>${w.description}</p><dl class="spec-list"><div class="spec-list__item"><dt>Distance</dt><dd>${w.distance}</dd></div><div class="spec-list__item"><dt>Gateways</dt><dd>${w.gateways}</dd></div><div class="spec-list__item"><dt>Atmosphere</dt><dd>${w.atmosphere}</dd></div><div class="spec-list__item"><dt>Docked</dt><dd>${w.traffic}</dd></div></dl><button class="button button--full" data-action="traffic">Orbital traffic ↗</button>`;
  }
  function showTraffic() {
    const world = worlds[selectedWorld];
    showModal(`${world.name} / Orbital traffic`, `<p class="eyebrow muted">Simulated network traffic · ${world.sector}</p><p>${world.traffic} currently connected. All incoming approaches are synchronized.</p><ul class="checkout-summary"><li><span>Cargo approach / TR–049</span><strong>00:04:18</strong></li><li><span>Outbound survey / EX–012</span><strong>00:12:40</strong></li><li><span>Next transit window</span><strong>00:18:22</strong></li></ul><p>Illustrative telemetry for the Nova Orbit concept. This is not live orbital tracking.</p>`);
  }
  $$('[data-world]').forEach(button => {
    button.addEventListener('click', () => selectWorld(button.dataset.world));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const siblings = $$('[data-world]', button.parentElement);
      let index = siblings.indexOf(button);
      if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = siblings.length - 1;
      else index = (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + siblings.length) % siblings.length;
      siblings[index].focus(); selectWorld(siblings[index].dataset.world);
    });
  });
  const urlWorld = new URLSearchParams(location.search).get('world');
  selectWorld(worlds[urlWorld] ? urlWorld : 'terra');

  /* 10. Contact form */
  document.addEventListener('submit', event => {
    if (!event.target.matches('[data-contact-form]')) return;
    event.preventDefault();
    if (!validForm(event.target)) return;
    const name = escapeHtml(new FormData(event.target).get('name').trim());
    $('[data-contact-container]').innerHTML = `<div class="confirmation" tabindex="-1"><p class="eyebrow">Channel open / Demo complete</p><h3>Thank you, ${name}.</h3><p>Your next mission starts with a conversation. This demonstration is complete; your message was not sent or stored.</p><div class="button-group"><button class="text-link" data-action="reset-contact">Write another message ↗</button></div></div>`;
    $('.confirmation', $('[data-contact-container]')).focus();
    announce('Demo message complete. No data was sent.');
  });

  /* 11. Lenis scrolling — native fallback and dynamic reduced-motion support */
  function setupScrolling() {
    lenis?.destroy(); lenis = undefined;
    if (!motionPreference.matches && typeof window.Lenis === 'function') {
      try { lenis = new window.Lenis({autoRaf:true, anchors:true, smoothWheel:true, duration:1.05, prevent:node => Boolean(node.closest('dialog'))}); }
      catch { /* Native scrolling remains fully functional. */ }
    }
  }
  setupScrolling();
  motionPreference.addEventListener('change', setupScrolling);

  /* 12. Animations and responsive interactions */
  function setupStorytelling() {
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;
    const sections = $$('.site-main > section');
    sections.forEach((section, index) => {
      section.classList.add('story-section');
      if (index > 0) section.classList.add('story-section--pending');
    });
    const storyObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('story-section--visible');
        storyObserver.unobserve(entry.target);
      }
    }), { threshold: .18, rootMargin: '0px 0px -10% 0px' });
    sections.slice(1).forEach(section => storyObserver.observe(section));
  }
  setupStorytelling();

  function setupParallax() {
    if (motionPreference.matches) return;
    const parallaxImages = $$('.home-hero__art img, .home-hero__art video, .destination__image img, .product-hero__visual img, .about-hero__media img, .blueprint__visual img, .stage__visual img');
    const parallaxSections = $$('.story-section');
    if (!parallaxImages.length && !parallaxSections.length) return;
    let framePending = false;

    const updateParallax = () => {
      framePending = false;
      const viewportHeight = window.innerHeight || 1;
      parallaxImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const distanceFromCenter = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        image.style.setProperty('--parallax-offset', `${distanceFromCenter * -1.25}rem`);
      });
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const distanceFromCenter = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        section.style.setProperty('--story-offset', `${distanceFromCenter * -0.75}rem`);
      });
    };
    const requestParallax = () => {
      if (!framePending) {
        framePending = true;
        requestAnimationFrame(updateParallax);
      }
    };
    window.addEventListener('scroll', requestParallax, {passive: true});
    window.addEventListener('resize', requestParallax, {passive: true});
    requestParallax();
  }
  setupParallax();

  function attachTilt() {
    if (motionPreference.matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('.product-card').forEach(card => {
      if (card.dataset.tiltReady) return;
      card.dataset.tiltReady = 'true';
      card.addEventListener('pointermove', event => {
        if (motionPreference.matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1200px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
  attachTilt();
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal--visible'); observer.unobserve(entry.target); }
    }), {threshold:.08});
    $$('.principle, .stage, .network-service, .manifesto__quote').forEach(node => {
      node.classList.add('reveal', 'reveal--pending'); observer.observe(node);
    });
  }
})();

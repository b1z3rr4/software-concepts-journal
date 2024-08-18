const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/ui-core.BJzgo2HV.js","_astro/Tabs.astro_astro_type_script_index_0_lang.CCIyraCc.js"])))=>i.map(i=>d[i]);
import"./Tabs.astro_astro_type_script_index_0_lang.CCIyraCc.js";class w extends HTMLElement{constructor(){super();const e=this.querySelector("select");e&&e.addEventListener("change",t=>{t.currentTarget instanceof HTMLSelectElement&&(window.location.pathname=t.currentTarget.value)})}}customElements.define("starlight-lang-select",w);const L="modulepreload",T=function(n){return"/software-concepts-journal/"+n},E={},k=function(e,t,o){let u=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");u=Promise.all(t.map(l=>{if(l=T(l),l in E)return;E[l]=!0;const h=l.endsWith(".css"),r=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${r}`))return;const i=document.createElement("link");if(i.rel=h?"stylesheet":L,h||(i.as="script",i.crossOrigin=""),i.href=l,c&&i.setAttribute("nonce",c),document.head.appendChild(i),h)return new Promise((d,s)=>{i.addEventListener("load",d),i.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${l}`)))})}))}return u.then(()=>e()).catch(a=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a})};class q extends HTMLElement{constructor(){super();const e=this.querySelector("button[data-open-modal]"),t=this.querySelector("button[data-close-modal]"),o=this.querySelector("dialog"),u=this.querySelector(".dialog-frame"),a=s=>{("href"in(s.target||{})||document.body.contains(s.target)&&!u.contains(s.target))&&l()},c=s=>{o.showModal(),document.body.toggleAttribute("data-search-modal-open",!0),this.querySelector("input")?.focus(),s?.stopPropagation(),window.addEventListener("click",a)},l=()=>o.close();e.addEventListener("click",c),e.disabled=!1,t.addEventListener("click",l),o.addEventListener("close",()=>{document.body.toggleAttribute("data-search-modal-open",!1),window.removeEventListener("click",a)}),window.addEventListener("keydown",s=>{(s.metaKey===!0||s.ctrlKey===!0)&&s.key==="k"&&(o.open?l():c(),s.preventDefault())});let h={};try{h=JSON.parse(this.dataset.translations||"{}")}catch{}const d=this.dataset.stripTrailingSlash!==void 0?s=>s.replace(/(.)\/(#.*)?$/,"$1$2"):s=>s;window.addEventListener("DOMContentLoaded",()=>{(window.requestIdleCallback||(g=>setTimeout(g,1)))(async()=>{const{PagefindUI:g}=await k(async()=>{const{PagefindUI:m}=await import("./ui-core.BJzgo2HV.js");return{PagefindUI:m}},__vite__mapDeps([0,1]));new g({element:"#starlight__search",baseUrl:"/software-concepts-journal",bundlePath:"/software-concepts-journal".replace(/\/$/,"")+"/pagefind/",showImages:!1,translations:h,showSubResults:!0,processResult:m=>{m.url=d(m.url),m.sub_results=m.sub_results.map(f=>(f.url=d(f.url),f))}})})})}}customElements.define("site-search",q);const S="starlight-theme",y=n=>n==="auto"||n==="dark"||n==="light"?n:"auto",v=()=>y(typeof localStorage<"u"&&localStorage.getItem(S));function x(n){typeof localStorage<"u"&&localStorage.setItem(S,n==="light"||n==="dark"?n:"")}const I=()=>matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";function p(n){StarlightThemeProvider.updatePickers(n),document.documentElement.dataset.theme=n==="auto"?I():n,x(n)}matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{v()==="auto"&&p("auto")});class C extends HTMLElement{constructor(){super(),p(v()),this.querySelector("select")?.addEventListener("change",e=>{e.currentTarget instanceof HTMLSelectElement&&p(y(e.currentTarget.value))})}}customElements.define("starlight-theme-select",C);class H extends HTMLElement{constructor(){super(),this.btn=this.querySelector("button"),this.btn.addEventListener("click",()=>this.toggleExpanded());const e=this.closest("nav");e&&e.addEventListener("keyup",t=>this.closeOnEscape(t))}setExpanded(e){this.setAttribute("aria-expanded",String(e)),document.body.toggleAttribute("data-mobile-menu-expanded",e)}toggleExpanded(){this.setExpanded(this.getAttribute("aria-expanded")!=="true")}closeOnEscape(e){e.code==="Escape"&&(this.setExpanded(!1),this.btn.focus())}}customElements.define("starlight-menu-button",H);const M="_top";class b extends HTMLElement{constructor(){super(),this._current=this.querySelector('a[aria-current="true"]'),this.minH=parseInt(this.dataset.minH||"2",10),this.maxH=parseInt(this.dataset.maxH||"3",10),this.onIdle=e=>(window.requestIdleCallback||(t=>setTimeout(t,1)))(e),this.init=()=>{const e=[...this.querySelectorAll("a")],t=r=>{if(r instanceof HTMLHeadingElement){if(r.id===M)return!0;const i=r.tagName[1];if(i){const d=parseInt(i,10);if(d>=this.minH&&d<=this.maxH)return!0}}return!1},o=r=>{if(!r)return null;const i=r;for(;r;){if(t(r))return r;for(r=r.previousElementSibling;r?.lastElementChild;)r=r.lastElementChild;const d=o(r);if(d)return d}return o(i.parentElement)},u=r=>{for(const{isIntersecting:i,target:d}of r){if(!i)continue;const s=o(d);if(!s)continue;const g=e.find(m=>m.hash==="#"+encodeURIComponent(s.id));if(g){this.current=g;break}}},a=document.querySelectorAll("main [id], main [id] ~ *, main .content > *");let c;const l=()=>{c||(c=new IntersectionObserver(u,{rootMargin:this.getRootMargin()}),a.forEach(r=>c.observe(r)))};l();let h;window.addEventListener("resize",()=>{c&&c.disconnect(),clearTimeout(h),h=setTimeout(()=>this.onIdle(l),200)})},this.onIdle(()=>this.init())}set current(e){e!==this._current&&(this._current&&this._current.removeAttribute("aria-current"),e.setAttribute("aria-current","true"),this._current=e)}getRootMargin(){const e=document.querySelector("header")?.getBoundingClientRect().height||0,t=this.querySelector("summary")?.getBoundingClientRect().height||0,o=e+t+32,u=o+53,a=document.documentElement.clientHeight;return`-${o}px 0% ${u-a}px`}}customElements.define("starlight-toc",b);class _ extends b{set current(e){super.current=e;const t=this.querySelector(".display-current");t&&(t.textContent=e.textContent)}constructor(){super();const e=this.querySelector("details");if(!e)return;const t=()=>{e.open=!1};e.querySelectorAll("a").forEach(o=>{o.addEventListener("click",t)}),window.addEventListener("click",o=>{e.contains(o.target)||t()}),window.addEventListener("keydown",o=>{if(o.key==="Escape"&&e.open){const u=e.contains(document.activeElement);if(t(),u){const a=e.querySelector("summary");a&&a.focus()}}})}}customElements.define("mobile-starlight-toc",_);export{k as _};

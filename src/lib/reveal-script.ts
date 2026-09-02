/**
 * The reveal bootstrapper, as a string because it runs before React.
 *
 * The rule this is built around: **CSS never hides anything.** An earlier
 * cut had the stylesheet set `opacity: 0` and left it to script to put it
 * back, which means every way the script can fail — a bundle that never
 * arrives, an extension, a throwing polyfill, a backgrounded tab at the
 * wrong moment — is a way to serve a blank page. On a marketing site that
 * is the worst bug available.
 *
 * So the hiding is done here instead, by the same code that owns the
 * revealing. Nothing is `data-armed` until an observer exists to disarm it.
 * If any line above the arming loop throws, the page renders exactly as it
 * would with no script at all: complete, static, correct.
 *
 * Only content below the fold is armed. Something already on screen when you
 * arrive should not fade in — you are looking straight at it — and not
 * touching it means there is no flash of shown-then-hidden content either.
 *
 * Triggered, not scroll-linked. A scroll-linked reveal is tied to the
 * scrollbar, so at any normal scrolling speed it finishes within a couple of
 * frames and nobody ever sees it move. This fires once, when the element is
 * properly in view, and then plays on its own 700ms clock.
 *
 * Two mechanisms, and the second is what makes it correct rather than merely
 * pleasant:
 *
 *   observer — reveals each block as it comes into view, in sequence.
 * Above-fold ornaments (the readiness meter, the coverage ring) animate on
 * load instead — they are never below the fold, so there is nothing to
 * trigger on.
 *
 *   sweep    — an IntersectionObserver only reports what intersects *now*, so
 *              anything jumped over by an End key, a scrollbar drag or an
 *              in-page anchor would never fire. After scrolling settles,
 *              everything that has reached the viewport is revealed whether
 *              the observer saw it or not.
 */
export const REVEAL_SCRIPT = `(function(){
var d=document,t;
if(!window.IntersectionObserver)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
function go(){
  var n=[].slice.call(d.querySelectorAll('[data-reveal],[data-reveal-group]>*,[data-rule]'));
  var armed=[],root=d.documentElement;
  /* Hiding an element that already has a transition on it *animates* the
   * hiding. It happens below the fold so nobody sees it, but it means an
   * element revealed within that window fades in from a partial state. Kill
   * transitions for the arming frame and let them back in after. */
  root.setAttribute('data-arming','');
  function done(){root.removeAttribute('data-arming')}
  setTimeout(done,100);
  if(window.requestAnimationFrame)requestAnimationFrame(function(){requestAnimationFrame(done)});
  function reveal(el){el.setAttribute('data-revealed','')}
  var o=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      if(!es[i].isIntersecting)continue;
      reveal(es[i].target);o.unobserve(es[i].target);
    }
  },{rootMargin:'0px 0px -10% 0px'});
  for(var i=0;i<n.length;i++){
    var el=n[i];
    if(el.getBoundingClientRect().top<innerHeight)continue;
    el.setAttribute('data-armed','');
    armed.push(el);
    o.observe(el);
  }
  function sweep(){
    for(var j=0;j<armed.length;j++){
      var e=armed[j];
      if(e.hasAttribute('data-revealed'))continue;
      if(e.getBoundingClientRect().top<innerHeight){reveal(e);o.unobserve(e)}
    }
  }
  addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(sweep,150)},{passive:true});
  addEventListener('resize',function(){clearTimeout(t);t=setTimeout(sweep,150)},{passive:true});
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',go);else go();
})();`;

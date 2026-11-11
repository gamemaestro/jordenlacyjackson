/* Slow candle-dust motes. Decorative only; off for reduced motion. */
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('canvas.motes').forEach(function(c){
    var ctx=c.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,2), W=0, H=0, P=[];
    function size(){ var r=c.getBoundingClientRect(); W=r.width; H=r.height; c.width=W*dpr; c.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(Math.min(70, W*H/14000)); P=[]; for(var i=0;i<n;i++) P.push({x:Math.random()*W,y:Math.random()*H,r:.6+Math.random()*1.8,s:.08+Math.random()*.22,a:Math.random()*6.28,t:.25+Math.random()*.55}); }
    function tick(){ ctx.clearRect(0,0,W,H);
      for(var i=0;i<P.length;i++){ var p=P[i]; p.y-=p.s; p.a+=.01; p.x+=Math.sin(p.a)*.15; if(p.y<-4){p.y=H+4;p.x=Math.random()*W;}
        var tw=p.t*(.6+.4*Math.sin(p.a*2)); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fillStyle='rgba(214,186,132,'+tw.toFixed(3)+')'; ctx.shadowColor='rgba(214,186,132,.8)'; ctx.shadowBlur=6; ctx.fill(); }
      requestAnimationFrame(tick); }
    size(); addEventListener('resize', size); tick();
  });
})();

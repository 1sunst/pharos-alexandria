"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HomeHistoryCarousel({photos,className="home-history-media",autoPlay=false}:{photos:string[][];className?:string;autoPlay?:boolean}) {
  const [slide,setSlide]=useState({index:0,previous:null as number|null,direction:1});
  const [ready,setReady]=useState(false);
  const [paused,setPaused]=useState(false);
  const touchStart=useRef<number|null>(null);
  useEffect(()=>{
    if(!autoPlay||paused||slide.previous!==null||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const timer=setTimeout(()=>{setReady(false);setSlide(current=>({previous:current.index,index:(current.index+1)%photos.length,direction:1}))},7000);
    return()=>clearTimeout(timer);
  },[autoPlay,paused,slide.index,slide.previous,photos.length]);
  useEffect(()=>{
    if(!ready||slide.previous===null)return;
    const delay=matchMedia("(prefers-reduced-motion: reduce)").matches?0:620;
    const timer=setTimeout(()=>setSlide(current=>({...current,previous:null})),delay);
    return()=>clearTimeout(timer);
  },[ready,slide.index,slide.previous]);
  const busy=slide.previous!==null;
  const move=(direction:number)=>{
    if(busy)return;
    setReady(false);
    setSlide(current=>({previous:current.index,index:(current.index+direction+photos.length)%photos.length,direction}));
  };
  return <div className={className} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false)}}>
    <div className={`home-carousel-frame sliding-photos ${busy&&ready?"is-sliding":""} ${slide.direction>0?"slide-forward":"slide-backward"}`} aria-busy={busy&&!ready} onTouchStart={e=>{touchStart.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touchStart.current!==null){const delta=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(delta)>40)move(delta<0?1:-1);touchStart.current=null}}}>
      {slide.previous!==null&&<img className="slide-outgoing" src={photos[slide.previous][0]} alt="" aria-hidden="true"/>}
      <img key={slide.index} className="slide-incoming" src={photos[slide.index][0]} alt={photos[slide.index][1]} loading={className==='detail-gallery'?'eager':'lazy'} decoding="async" onLoad={()=>setReady(true)} onError={()=>setReady(true)}/>
    </div>
    <div className="carousel-controls">
      <button onClick={()=>move(-1)} disabled={busy} aria-label="Anterior"><ArrowLeft/></button>
      <button className="active" onClick={()=>move(1)} disabled={busy} aria-label="Próxima"><ArrowRight/></button>
      <span aria-live="polite">{String(slide.index+1).padStart(2,"0")} / {String(photos.length).padStart(2,"0")}</span>
      <i><b style={{width:`${photos.length>1?slide.index/(photos.length-1)*100:0}%`}}/></i>
    </div>
  </div>;
}

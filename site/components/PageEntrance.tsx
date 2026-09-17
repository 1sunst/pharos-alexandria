'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {enhance} from './HomeEntrance';
import './page-entrance.css';

export default function PageEntrance({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 const pathname=usePathname();
 useEffect(()=>{
  const container=root.current;
  if(!container||!('IntersectionObserver' in window))return;
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches)return;
  const textures=[...container.querySelectorAll<HTMLElement>('.history-art,.xp-texture,.detail-texture,.detail-route-textures img,.booking-texture,.booking-extras-texture img,.confirmation-frame')];
  textures.forEach((element,index)=>{
   element.style.setProperty('--texture-opacity',getComputedStyle(element).opacity);
   element.style.setProperty('--texture-origin',index%2?'105%':'-105%');
   element.dataset.pageTexture='true';
  });
  const targets=[...container.querySelectorAll<HTMLElement>('[data-home-reveal],.site-header,.site-footer,.detail-gallery,.xp-hero-photo,.history-hero-photo,.history-reconstruction-photo,.architecture-photo,.booking-summary,.confirmation-receipt,.confirmation-content,.button,img[alt]:not([alt=""])')].filter(element=>!element.closest('[aria-hidden="true"],.booking-stepper,[hidden],.carousel-controls'));
  targets.forEach(element=>{element.dataset.homeReveal??='block';delete element.dataset.homeVisible;});
  textures.forEach(element=>delete element.dataset.textureVisible);
  const waiting=new Set(textures);
  const revealTextures=()=>{
   waiting.forEach(texture=>{
    const section=texture.closest('section')??container.querySelector('.confirmation-content')??container.querySelector('.booking-container');
    const anchors=section?[...section.querySelectorAll<HTMLElement>('h1,h2')]:[];
    if(anchors.some(anchor=>anchor.dataset.homeVisible==='true')){
     texture.dataset.textureVisible='true';waiting.delete(texture);
    }
   });
  };
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){
    (entry.target as HTMLElement).dataset.homeVisible='true';
    if(entry.target.classList.contains('xp-card')){
     entry.target.closest('.xp-cards')?.querySelectorAll<HTMLElement>('[data-home-reveal]').forEach(target=>{target.dataset.homeVisible='true';observer.unobserve(target);});
    }
    observer.unobserve(entry.target);
   }});
   revealTextures();
  },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  container.classList.add('home-entrance-enabled','site-entrance-enabled');
  targets.forEach(element=>observer.observe(element));
  const handlePreference=()=>{if(preference.matches)container.classList.remove('home-entrance-enabled','site-entrance-enabled');};
  preference.addEventListener('change',handlePreference);
  return ()=>{observer.disconnect();waiting.clear();preference.removeEventListener('change',handlePreference);container.classList.remove('home-entrance-enabled','site-entrance-enabled');};
 },[pathname]);
 return <div ref={root} className="home-entrance-root">{enhance(children,true)}</div>;
}

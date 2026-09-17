'use client';
import {Children,Fragment,cloneElement,isValidElement,useEffect,useRef,type ReactNode,type CSSProperties} from 'react';
import './home-entrance.css';
import HomeExploreTexture from './HomeExploreTexture';
import HomeHistoryTexture from './HomeHistoryTexture';

type NativeProps={children?:ReactNode;className?:string;src?:string;style?:CSSProperties;'data-home-reveal'?:string;'aria-hidden'?:boolean|string};
function words(children:ReactNode,counter:{value:number}):ReactNode{
 return Children.map(children,child=>{
  if(typeof child==='string')return child.split(/(\s+)/).map((word,i)=>/^\s*$/.test(word)?word:<span className="home-generated-word" key={`${i}-${word}`} style={{'--word-delay':`${Math.min(counter.value++,18)*45}ms`} as CSSProperties}>{word}</span>);
  if(isValidElement<NativeProps>(child)&&typeof child.type==='string')return cloneElement(child,{},words(child.props.children,counter));
  return child;
 });
}
export function enhance(children:ReactNode,extended=false):ReactNode{
 return Children.map(children,child=>{
  if(isValidElement<NativeProps>(child)&&child.props.src==='/images/home-explore-texture.svg')return <HomeExploreTexture/>;
  if(isValidElement<NativeProps>(child)&&child.props.src==='/images/home-history-texture.svg')return <HomeHistoryTexture/>;
  if(isValidElement<NativeProps>(child)&&child.type===Fragment)return cloneElement(child,{},enhance(child.props.children,extended));
  if(!isValidElement<NativeProps>(child)||typeof child.type!=='string')return child;
  if(child.props['aria-hidden']===true||child.props['aria-hidden']==='true')return child;
  const name=child.type;
  const className=child.props.className??'';
  const text=/^h[1-3]$/.test(name)||name==='p'||className==='eyebrow'||className==='closing-label'||className==='hero-coordinates'||(extended&&(['dt','dd','th','td'].includes(name)||/label|kicker|metadata|panel-month/.test(className)));
  const block=name==='article'||name==='footer'||name==='a'||['hero-coordinates','history-facts','navigation-compass','home-card-grid'].includes(className);
  const image=name==='img'||className==='home-card-image';
  return cloneElement(child,{'data-home-reveal':text?'text':block||image?'block':undefined},text?words(child.props.children,{value:0}):enhance(child.props.children,extended));
 });
}
export default function HomeEntrance({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const container=root.current;
  if(!container||!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  // Artwork and section backgrounds are intentionally excluded.
  const targets=[...container.querySelectorAll<HTMLElement>('[data-home-reveal], .site-header, .home-final > section .button, .home-history-media, .explore-body > img, .navigation-compass, .home-closing > img, .home-practical .map-art')];
  targets.forEach(target=>target.dataset.homeReveal??='block');
  const heroTargets=targets.filter(target=>target.closest('.home-hero'));
  heroTargets.sort((a,b)=>{
   if(a.classList.contains('hero-coordinates'))return 1;
   if(b.classList.contains('hero-coordinates'))return -1;
   return a.getBoundingClientRect().top-b.getBoundingClientRect().top;
  });
  heroTargets.forEach((target,index)=>target.style.setProperty('--home-delay',`${index*550+(target.classList.contains('hero-coordinates')?900:0)}ms`));
  let heroStarted=false;
  const explore=container.querySelector<HTMLElement>('.home-explore');
  const exploreTargets=targets.filter(target=>target.closest('.home-explore'));
  const history=container.querySelector<HTMLElement>('.home-history');
  const historyTargets=targets.filter(target=>target.closest('.home-history'));
  const experiences=container.querySelector<HTMLElement>('.home-experiences');
  const experienceTargets=targets.filter(target=>target.matches('.home-experiences > .eyebrow, .experience-heading h2, .experience-heading p, .home-card-grid, .home-card-grid > article:first-child'));
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){
    if(entry.target.classList.contains('home-card-grid')){
     entry.target.querySelectorAll<HTMLElement>('[data-home-reveal]').forEach(target=>{target.dataset.homeVisible='true';observer.unobserve(target);});
    }
    if(heroTargets.includes(entry.target as HTMLElement)&&!heroStarted){
     heroStarted=true;
     heroTargets.forEach(target=>{target.dataset.homeVisible='true';observer.unobserve(target);});
    }else{(entry.target as HTMLElement).dataset.homeVisible='true';observer.unobserve(entry.target);}
   }});
   if(explore&&exploreTargets.length&&exploreTargets.every(target=>target.dataset.homeVisible==='true'))explore.dataset.vectorsReady='true';
   if(history&&historyTargets.length&&historyTargets.every(target=>target.dataset.homeVisible==='true'))history.dataset.vectorsReady='true';
   if(experiences&&experienceTargets.length&&experienceTargets.every(target=>target.dataset.homeVisible==='true'))experiences.dataset.vectorsReady='true';
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  container.classList.add('home-entrance-enabled');
  targets.forEach(target=>observer.observe(target));
  return ()=>{observer.disconnect();container.classList.remove('home-entrance-enabled');};
 },[]);
 return <div ref={root} className="home-entrance-root">{enhance(children)}</div>;
}

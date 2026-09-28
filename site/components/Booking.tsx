"use client";
import Link from "next/link";
import PageEntrance from '@/components/PageEntrance';
import { createContext, useContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import {experienceOptions,isExperienceId,type ExperienceId} from '@/lib/experiences';
import { Footer, Header } from "./SiteChrome";
import BookingStepper from "./BookingStepper";
import {enhance} from "./HomeEntrance";
import {useLanguage} from './LanguageSwitcher';

export type Booking = { experience:ExperienceId; date:string; time:string; adults:number; youths:number; children:number; extras:string[]; confirmed:boolean };
export const sessions=[{date:'Sex · 18 set',time:'17h15'},{date:'Sáb · 19 set',time:'17h15'},{date:'Dom · 20 set',time:'17h15'}];
export const extras=[{id:'audio',label:'Audioguia premium',price:8,perPerson:true},{id:'tasting',label:'Degustação ampliada',price:18,perPerson:true},{id:'book',label:'Livro ilustrado de Pharos',price:24,perPerson:false}];
const initial:Booking={experience:'pharos-por-do-sol',date:sessions[0].date,time:sessions[0].time,adults:2,youths:0,children:0,extras:[],confirmed:false};
const key='pharos-booking-v1';
function count(value:unknown,fallback:number){return typeof value==='number'&&Number.isInteger(value)&&value>=0&&value<=12?value:fallback}
const BookingContext=createContext<readonly [Booking,Dispatch<SetStateAction<Booking>>,boolean]|null>(null);
export function BookingProvider({children,experience}:{children:ReactNode;experience?:string|null}){
 const [booking,setBookingState]=useState<Booking>(initial);const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=sessionStorage.getItem(key);if(raw){const value=JSON.parse(raw);const session=sessions.find(s=>s.date===value.date);const id:ExperienceId=isExperienceId(value.experience)?value.experience:initial.experience;setBookingState({...initial,experience:id,date:session?.date??initial.date,time:experienceOptions[id].time,adults:Math.max(1,count(value.adults,2)),youths:count(value.youths,0),children:count(value.children,0),extras:Array.isArray(value.extras)?[...new Set<string>(value.extras.filter((x:unknown)=>extras.some(e=>e.id===x)))]:[],confirmed:value.confirmed===true});}}catch{/* A blocked or stale browser store must not break the demo. */}setReady(true)},[]);
 useEffect(()=>{if(ready&&isExperienceId(experience)){setBookingState(current=>current.experience===experience?current:{...current,experience,time:experienceOptions[experience].time,confirmed:false})}},[experience,ready]);
 useEffect(()=>{if(ready){try{sessionStorage.setItem(key,JSON.stringify(booking))}catch{/* Continue without persistence when storage is unavailable. */}}},[booking,ready]);
 return <BookingContext.Provider value={[booking,setBookingState,ready]}>{children}</BookingContext.Provider>;
}
export function useBooking(){const context=useContext(BookingContext);if(!context)throw new Error('BookingProvider is required');return context}
export function visitors(b:Booking,language:'pt'|'en'='pt'){const words=language==='en'?[['adult','adults'],['young person','young people'],['child','children']]:[['adulto','adultos'],['jovem','jovens'],['criança','crianças']];return [b.adults,b.youths,b.children].map((n,i)=>[n,words[i][0],words[i][1]] as const).filter(([n])=>n>0).map(([n,s,p])=>`${n} ${n===1?s:p}`).join(' · ')||(language==='en'?'No visitors':'Nenhum visitante')}
export function bookingDate(date:string,language:'pt'|'en'){if(language==='pt')return date;return date.replace('Sex','Fri').replace('Sáb','Sat').replace('Dom','Sun').replace('set','Sep')}
export function ticketTotal(b:Booking){const option=experienceOptions[b.experience];return b.adults*option.price+b.youths*option.youthPrice}
export function extraTotal(b:Booking,id:string){const e=extras.find(e=>e.id===id);return e?e.price*(e.perPerson?b.adults+b.youths:1):0}
export function bookingTotal(b:Booking){return ticketTotal(b)+b.extras.reduce((sum,id)=>sum+extraTotal(b,id),0)}
export function validBooking(b:Booking){return b.adults>=1&&b.adults+b.youths+b.children<=12}

export function BookingShell({step,title,description,children,aside,confirmation}:{step:number;title:string;description:string;children?:ReactNode;aside?:ReactNode;confirmation?:ReactNode}){
 const {language}=useLanguage();
 return <PageEntrance><main className={`booking-page booking-step-${step} ${step===4?'booking-confirmation':''}`}>
  <div className="booking-header"><Header/></div>
  {step===2&&<div className="booking-extras-texture" aria-hidden="true"><img src="/images/tela6-imgGroup.svg" alt=""/><img src="/images/tela6-imgGroup1.svg" alt=""/><img src="/images/tela6-imgGroup2.svg" alt=""/></div>}
  {step===1&&<img className="booking-texture" src="/images/tela5-imgBackgroundTextureReservaEtapa1.svg" alt="" aria-hidden="true"/>}
  {step===3&&<img className="booking-texture" src="/images/tela7-imgBackgroundTextureReservaResumo.svg" alt="" aria-hidden="true"/>}
  <div className="booking-container">
   <div className="booking-heading" hidden={step===4}><span className="eyebrow">0{step+4} · {language==='en'?`Booking / Step ${step} of 4`:`Reserva / Etapa ${step} de 4`}</span><h1>{title}</h1><p>{description}</p></div>
   {step!==4&&<BookingStepper step={step}/>}
   <section className="booking-layout" hidden={step===4}><div className="booking-panel">{children}</div><aside className="booking-summary">{aside}</aside></section>
  </div>
  {confirmation}
  <Footer light={step!==4}/>
 </main></PageEntrance>;
}
export function Total({amount}:{amount:number}){return <div className="total-row"><span>Total</span><strong>€{amount}</strong></div>}
export function BookingSummary({booking,children}:{booking:Booking;children:ReactNode}){const option=experienceOptions[booking.experience];const{language}=useLanguage();return enhance(<><span className="booking-kicker">Sua experiência</span><h2>{option.title}</h2><p className="booking-summary-meta">{option.duration} · {language==='en'?'up to 12 visitors':'até 12 visitantes'}</p><dl><div><dt>Data</dt><dd>{bookingDate(booking.date,language)} · {booking.time}</dd></div><div><dt>Visitantes</dt><dd>{visitors(booking,language)}<small className="booking-summary-extras">{booking.extras.map(id=>extras.find(e=>e.id===id)?.label).join(' · ')}</small></dd></div></dl><Total amount={bookingTotal(booking)}/>{children}</>,true)}
export function Quantity({label,value,min=0,max,onChange}:{label:string;value:number;min?:number;max:number;onChange:(n:number)=>void}){const{language}=useLanguage();const translatedLabel=language==='en'?label.replace('Adultos','Adults').replace('Adulto','Adult').replace('Jovens','Young people').replace('Jovem','Young person').replace('Crianças','Children').replace('Criança','Child').replace('até 11','under 12'):label;return <div className="booking-quantity" role="group" aria-label={language==='en'?`Quantity: ${translatedLabel}`:`Quantidade: ${label}`}><button type="button" aria-label={language==='en'?`Decrease ${translatedLabel}`:`Diminuir ${label}`} disabled={value<=min} onClick={()=>onChange(value-1)}>−</button><output aria-live="polite" aria-label={language==='en'?`Quantity of ${translatedLabel}`:`Quantidade de ${label}`}>{value}</output><button type="button" aria-label={language==='en'?`Increase ${translatedLabel}`:`Aumentar ${label}`} disabled={value>=max} onClick={()=>onChange(value+1)}>+</button></div>}
export function VisitorRows({booking,onChange,tickets=false}:{booking:Booking;onChange:(next:Booking)=>void;tickets?:boolean}){const total=booking.adults+booking.youths+booking.children;const option=experienceOptions[booking.experience];return <div className="booking-visitors">{[{field:'adults' as const,label:tickets?'Adulto':'Adultos',price:`€${option.price}`,min:1},{field:'youths' as const,label:tickets?'Jovem · 12–17':'Jovens · 12–17',price:`€${option.youthPrice}`,min:0},{field:'children' as const,label:tickets?'Criança · até 11':'Crianças · até 11',price:'Gratuito',min:0}].map(({field,label,price,min})=><div className="booking-row" key={field}><span>{label}</span><span className="booking-row-price">{tickets?`${booking[field]} × ${price.toLowerCase()}`:price}</span><Quantity label={label} value={booking[field]} min={min} max={Math.max(booking[field],12-total+booking[field])} onChange={n=>onChange({...booking,[field]:n,confirmed:false})}/></div>)}</div>}
export function Choice({active,onClick,children}:{active?:boolean;onClick?:()=>void;children:ReactNode}){return <button type="button" aria-pressed={!!active} className={`booking-date ${active?'selected':''}`} onClick={onClick}>{children}</button>}
export function BookingContinue({href,disabled,label='Continuar'}:{href:string;disabled?:boolean;label?:string}){return disabled?<button disabled className="button button-large booking-continue">{label} →</button>:<Link className="button button-large booking-continue" href={href} scroll={false}>{label} →</Link>}

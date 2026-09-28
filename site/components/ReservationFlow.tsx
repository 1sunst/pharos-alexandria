'use client';
import Link from 'next/link';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';
import {useEffect,useState} from 'react';
import {BookingProvider,BookingShell,BookingSummary,BookingContinue,Choice,VisitorRows,Total,sessions,extras,useBooking,validBooking,visitors,ticketTotal,extraTotal,bookingTotal,bookingDate} from './Booking';
import ConfirmationContent from './ConfirmationContent';
import {experienceOptions} from '@/lib/experiences';
import {useLanguage} from './LanguageSwitcher';

const headings=[
 ['Escolha a data e os visitantes.','Defina quando deseja visitar Pharos e informe quem estará com você.'],
 ['Ingressos e adicionais.','Personalize a experiência antes de revisar sua reserva.'],
 ['Revise sua reserva.','Confira os dados abaixo antes de confirmar sua experiência.'],
 ['',''],
];
export default function ReservationFlow(){
 const search=useSearchParams();
 return <BookingProvider experience={search.get('experiencia')}><ReservationSteps/></BookingProvider>;
}
function ReservationSteps(){
 const {language}=useLanguage();
 const pathname=usePathname();
 const step=pathname.endsWith('/confirmacao')?4:pathname.endsWith('/resumo')?3:pathname.endsWith('/adicionais')?2:1;
 const [booking,setBooking,ready]=useBooking();
 const [loading,setLoading]=useState(false);
 useEffect(()=>{setLoading(false);},[step]);
 const router=useRouter();
 const option=experienceOptions[booking.experience];
 const confirm=()=>{
  if(!ready||!validBooking(booking)||loading)return;
  setLoading(true);
  setBooking({...booking,confirmed:true});
  router.push('/reserva/confirmacao',{scroll:false});
 };
 const rows=[
  {label:'Experiência',value:option.title,detail:`Duração aproximada: ${option.duration}`,href:`/experiencias/${booking.experience}`},
  {label:'Data e visitantes',value:`${bookingDate(booking.date,language)} · ${booking.time}`,detail:visitors(booking,language),href:'/reserva/data'},
  {label:'Adicionais',value:booking.extras.length?booking.extras.map(id=>extras.find(e=>e.id===id)?.label).join(' · '):'Nenhum adicional selecionado',detail:booking.extras.length?`${booking.adults+booking.youths} visitantes pagantes`:'Você pode personalizar sua experiência.',href:'/reserva/adicionais'},
  {label:'Encontro',value:'Terminal marítimo de Qaitbay',detail:'Chegue com 30 minutos de antecedência',href:'/reserva/data'},
 ];
 const aside=step===3?<><span className="booking-kicker">Resumo do valor</span><div className="booking-costs"><div><span>{language==='en'?'Tickets':'Ingressos'} · {visitors(booking,language)}</span><span>€{ticketTotal(booking)}</span></div>{booking.extras.map(id=><div key={id}><span>{extras.find(e=>e.id===id)?.label}</span><span>€{extraTotal(booking,id)}</span></div>)}</div><Total amount={bookingTotal(booking)}/><p className="booking-cancellation">Cancelamento gratuito até 48 horas antes da visita.</p><button className="button button-large booking-confirm" disabled={!ready||!validBooking(booking)||loading} aria-busy={loading} onClick={confirm}>{loading?'Confirmando…':'Confirmar reserva →'}</button></>:<BookingSummary booking={booking}><BookingContinue href={step===1?'/reserva/adicionais':'/reserva/resumo'} label={step===1?'Continuar':'Revisar reserva'} disabled={!ready||!validBooking(booking)}/></BookingSummary>;
 return <div className="reservation-unified"><BookingShell step={step} title={headings[step-1][0]} description={headings[step-1][1]} aside={aside} confirmation={step===4?<ConfirmationContent/>:undefined}>
  {step===1&&<><span className="booking-panel-month">Setembro 2028</span><h2 className="booking-panel-title">Escolha uma sessão</h2><div className="booking-session-options">{sessions.map(s=><Choice key={s.date} active={booking.date===s.date} onClick={()=>setBooking({...booking,date:s.date,time:option.time,confirmed:false})}><span>{s.date}</span><time>{option.time}</time></Choice>)}</div><h3 className="booking-panel-label">Visitantes</h3><VisitorRows booking={booking} onChange={setBooking}/></>}
  {step===2&&<><h2 className="booking-panel-label booking-tickets-label">Ingressos</h2><VisitorRows booking={booking} onChange={setBooking} tickets/><h3 className="booking-panel-label booking-extras-label">Adicionais</h3><div className="booking-extras">{extras.map(e=><label className="booking-row" key={e.id}><span>{e.id==='audio'?'Audioguia':e.label}</span><span className="booking-row-price">€{e.price}{e.perPerson?' por pessoa':''}</span><span className="booking-checkbox-wrap"><input type="checkbox" aria-label={e.label} checked={booking.extras.includes(e.id)} onChange={event=>setBooking({...booking,confirmed:false,extras:event.target.checked?[...booking.extras,e.id]:booking.extras.filter(id=>id!==e.id)})}/></span></label>)}</div></>}
  {step===3&&rows.map(row=><article className="booking-review-row" key={row.label}><span className="booking-panel-label">{row.label}</span><div><h2>{row.value}</h2><Link href={row.href} scroll={false}>Editar</Link></div><p>{row.detail}</p></article>)}
  {step<4&&!validBooking(booking)&&<p role="alert" className="booking-error">Selecione ao menos um adulto e no máximo 12 visitantes.</p>}
 </BookingShell></div>;
}

"use client";
import {useLanguage} from './LanguageSwitcher';
const labels=['Data e visitantes','Ingressos e adicionais','Resumo','Confirmação'];
export default function BookingStepper({step}:{step:number}){
 const {language}=useLanguage();
 const translatedLabels=['Date and visitors','Tickets and extras','Summary','Confirmation'];
 return <ol className="booking-stepper" aria-label="Progresso da reserva">{labels.map((label,i)=>{
 const visibleLabel=language==='en'?translatedLabels[i]:label;
 return <li key={label} className={i<step?'done':''} aria-current={i+1===step?'step':undefined}><span key={`${step}-${i}`} className={`booking-progress-fill${i+1===step&&step>1?' booking-progress-entering':''}`} aria-hidden="true" style={{transform:`scaleX(${i<step?1:0})`}}/><span className="booking-sr">{language==='en'?'Step':'Etapa'} {i+1}: {visibleLabel}</span></li>
 })}</ol>;
}

'use client';
import {useEffect,useState} from 'react';
import {ArrowRight} from 'lucide-react';
export default function PortfolioNotice(){
 const[open,setOpen]=useState(false);
 useEffect(()=>{try{setOpen(localStorage.getItem('pharos-notice')!=='seen')}catch{setOpen(true)}},[]);
 const dismiss=()=>{try{localStorage.setItem('pharos-notice','seen')}catch{}setOpen(false)};
 if(!open)return null;
 return <div className="notice-backdrop"><section className="notice" role="dialog" aria-modal="true" aria-labelledby="portfolio-notice-title"><span className="eyebrow">Projeto conceitual</span><h2 id="portfolio-notice-title">Uma Alexandria imaginada.</h2><p>Este site foi criado para fins de portfólio. Reservas e pagamentos são demonstrativos; as imagens foram produzidas com inteligência artificial.</p><button className="button button-large" onClick={dismiss}>Explorar o projeto <ArrowRight size={18}/></button></section></div>;
}

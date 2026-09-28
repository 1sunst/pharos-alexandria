"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {createPortal} from 'react-dom';
import { LanguageSwitcher, useLanguage } from "./LanguageSwitcher";

export function Header({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [closing,setClosing]=useState(false);
  const closeMenu=useCallback(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setOpen(false);setClosing(false);}
    else setClosing(true);
  },[]);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
      if (event.key !== "Tab") return;
      const elements = menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open,closeMenu]);
  return <header className={`site-header pharos-navbar ${dark ? "" : "header-on-light"}`}>
    <Link className="brand" href="/">PHAROS / ALEXANDRIA</Link>
    <nav className="desktop-nav" aria-label="Navegação principal"><Link href="/historia">História</Link><Link href="/experiencias">Experiências</Link><Link href="/reserva/data">Planeje sua visita</Link></nav>
    <div className="header-actions"><LanguageSwitcher/><Link className="button button-small header-cta" href="/reserva/data">Reservar <ArrowRight size={14}/></Link></div>
    <button ref={triggerRef} className="menu-button" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>{setClosing(false);setOpen(true)}}><span/><span/></button>
    {open && createPortal(<div ref={menuRef} id="mobile-navigation" className={`mobile-menu${closing?' is-closing':''}`} onAnimationEnd={event=>{if(closing&&event.target===event.currentTarget){setOpen(false);setClosing(false)}}} role="dialog" aria-modal="true" aria-label="Menu de navegação"><button aria-label="Fechar menu" onClick={closeMenu}>×</button><nav onClick={event=>{if((event.target as HTMLElement).closest('a')){setOpen(false);setClosing(false)}}}><Link href="/historia">História</Link><Link href="/experiencias">Experiências</Link><Link href="/reserva/data">Planeje sua visita</Link><Link href="/duvidas-frequentes">Dúvidas frequentes</Link><Link href="/reserva/data">Reservar</Link></nav><LanguageSwitcher mobile/></div>,document.body)}
  </header>;
}

export function Footer({ light = false, imageContrast = false }: { light?: boolean; imageContrast?: boolean }) {
  const {language}=useLanguage();
  const location=language==='en'?'PHAROS ISLAND · EASTERN HARBOUR · ALEXANDRIA, EGYPT':'ILHA DE PHAROS · PORTO ORIENTAL · ALEXANDRIA, EGITO';
  const contrastStart=language==='en'?location.indexOf('EASTERN'):location.indexOf('RIENTAL')+1;
  return <footer className={`site-footer ${light ? "footer-light" : ""}`}>
    <Link className="footer-faq" href="/duvidas-frequentes">Dúvidas frequentes</Link>
    <span>© 2028 PHAROS / ALEXANDRIA · @PHAROS.ALEXANDRIA</span><span>{imageContrast?<><span>{location.slice(0,contrastStart)}</span><span className="footer-image-contrast">{location.slice(contrastStart)}</span></>:location}</span>
    <span className="socials">{[['Instagram','Instagram'],['X','XOfficial'],['LinkedIn','LinkedIn'],['YouTube','YouTube']].map(([name,asset])=>imageContrast?<span key={name} className="social-image-contrast" role="img" aria-label={name} style={{maskImage:`url(/images/tela2-imgSocial${asset}.svg)`}}/>:<img key={name} src={`/images/tela2-imgSocial${asset}.svg`} alt={name} width={18} height={18}/>)}</span>
  </footer>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) { return <span className="eyebrow">{children}</span>; }

export function Pattern({ variant = "waves" }: { variant?: "waves"|"meander"|"map" }) { return <span aria-hidden="true" className={`pattern pattern-${variant}`}/>; }

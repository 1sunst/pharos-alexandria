import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Experience = { index:string; title:string; copy:string; image:string; meta:string; href:string };
export function ExperienceCard({ item }: { item:Experience }) { return <article className="experience-card">
  <div className="card-image"><Image src={item.image} alt={`Cena da experiência ${item.title}`} fill sizes="(max-width: 767px) 84vw, 30vw"/></div>
  <div className="card-body"><span>{item.index} · {item.meta}</span><h3>{item.title}</h3><p>{item.copy}</p><Link className="button button-small" href={item.href}>Ver detalhes <ArrowRight size={14}/></Link></div>
  </article>; }

export const experiences:Experience[] = [
  {index:"01",title:"Visita essencial",copy:"Galerias, exposição histórica e mirante em um percurso livre pelo monumento.",image:"/images/visita-essencial-card-v2.webp",meta:"1H30 · €29",href:"/experiencias/visita-essencial"},
  {index:"02",title:"Jornada histórica",copy:"Uma visita guiada pelas camadas arqueológicas e pela reconstrução de Pharos.",image:"/images/card-jornada-historica.webp",meta:"2H30 · €49",href:"/experiencias/jornada-historica"},
  {index:"03",title:"Pharos ao pôr do sol",copy:"Mirante, galerias e degustação mediterrânea durante a hora dourada.",image:"/images/pharos-por-do-sol-card-v2.webp",meta:"3H · €89",href:"/experiencias/pharos-por-do-sol"},
];

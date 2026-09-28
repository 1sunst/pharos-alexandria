import Link from 'next/link';
import PageEntrance from '@/components/PageEntrance';
import Image from 'next/image';
import HomeHistoryCarousel from './HomeHistoryCarousel';
import {Header,Footer} from './SiteChrome';
import {experienceOptions} from '@/lib/experiences';
import '@/app/experiencias/pharos-por-do-sol/detalhe.css';
import '@/app/experiencias/placeholder-details.css';
import {LocalizedText} from './LanguageSwitcher';

const content={
 'visita-essencial':{
  title:['Visita','essencial.'],intro:'Descubra Pharos no seu ritmo: percorra as galerias, conheça a história do farol e encontre o Mediterrâneo do alto do mirante.',
  heading:'Uma primeira descoberta, no seu ritmo.',
  description:'Um percurso livre para conhecer o essencial de Pharos. Depois da travessia, explore a exposição histórica com audioguia, descubra os vestígios do farol antigo e suba ao mirante. Você escolhe onde permanecer mais tempo, seguindo a sinalização e as orientações da equipe.',
  highlights:[['Percurso livre','Explore as áreas públicas sem acompanhar um grupo guiado.'],['Audioguia incluído','Conheça as histórias do farol com comentários em 12 idiomas.'],['Mirante panorâmico','Observe Alexandria e o Porto Oriental durante o horário regular.']],
  routeTitle:'Seu primeiro olhar sobre Pharos.',
  itinerary:[['11h00','Chegada e travessia','Encontro no terminal de Qaitbay e embarque para a ilha.'],['11h15','Introdução histórica','Conheça a trajetória do farol na base monumental.'],['11h40','Galerias e exposição','Explore as coleções no seu ritmo com o audioguia.'],['12h00','Mirante panorâmico','Contemple o Mediterrâneo e a paisagem de Alexandria.'],['12h30','Retorno','Desça e embarque de volta ao continente.']],
  includedHeading:'O essencial para uma boa descoberta.',
  included:['Travessia marítima de ida e volta','Entrada no monumento e áreas públicas','Acesso às galerias e exposição histórica','Audioguia em 12 idiomas','Acesso regular ao mirante','Mapa e sinalização do percurso','Elevadores e rota acessível','Apoio da equipe durante a visita'],
  details:[['Horários','Sessões entre 09h e 18h. Neste fluxo demonstrativo, a saída acontece às 11h.'],['Duração','Aproximadamente 1h30, incluindo as travessias. O roteiro é uma sugestão de percurso.'],['Regras','Chegue 30 minutos antes do embarque. Menores devem estar acompanhados por um responsável.'],['Clima','O acesso ao mirante e a travessia dependem das condições marítimas.'],['Acessibilidade','Percurso essencial com elevadores e rotas acessíveis. Apoio mediante solicitação.'],['Cancelamento','Alteração sem custo ou reembolso integral até 48 horas antes da visita.']],
  cta:'Escolha seu primeiro encontro com Pharos.',photos:['Galerias e exposição histórica','Percurso livre pelo monumento','Panorama do mirante'],
 },
 'jornada-historica':{
  title:['Jornada','histórica.'],intro:'Aprofunde seu olhar sobre Pharos com um guia: das descobertas arqueológicas às decisões que deram forma à reconstrução.',
  heading:'Camadas de história, reveladas de perto.',
  description:'Uma visita guiada para compreender o farol além de sua silhueta. Percorra as galerias e coleções, acompanhe a leitura dos vestígios arqueológicos e observe a maquete da reconstrução. A jornada inclui áreas especiais e uma demonstração na Câmara da Luz antes da subida ao mirante.',
  highlights:[['Guia especializado','História, arqueologia e arquitetura em um grupo reduzido.'],['Coleções e maquete','Entenda as evidências e os estudos que orientaram o novo Pharos.'],['Câmara da Luz','Uma demonstração sobre óptica e navegação antes do mirante.']],
  routeTitle:'Das evidências ao novo horizonte.',
  itinerary:[['10h00','Encontro em Qaitbay','Recepção pelo guia e travessia até a ilha.'],['10h20','Galerias históricas','Leitura das coleções e dos vestígios arqueológicos.'],['11h00','Projeto e reconstrução','Maquete, estudos históricos e acesso às áreas especiais.'],['11h40','Câmara da Luz e mirante','Demonstração sobre navegação e panorama de Alexandria.'],['12h30','Retorno','Encerramento da visita e travessia ao continente.']],
  includedHeading:'Uma jornada para ir além da superfície.',
  included:['Travessia marítima de ida e volta','Entrada no monumento e galerias','Guia especializado durante o percurso','Visita às coleções arqueológicas','Apresentação da maquete de Pharos','Acesso às áreas especiais do roteiro','Demonstração na Câmara da Luz','Audioguia e acesso regular ao mirante'],
  details:[['Horários','Saídas guiadas às 10h e 15h. Neste fluxo demonstrativo, a sessão é às 10h.'],['Duração','Aproximadamente 2h30, incluindo as travessias e a visita guiada.'],['Regras','Chegue 30 minutos antes. O grupo permanece com o guia nas áreas especiais.'],['Idiomas','Visita guiada demonstrativa em português; audioguia em 12 idiomas.'],['Acessibilidade','Galerias e mirante acessíveis por elevadores. Consulte as condições das áreas especiais.'],['Cancelamento','Alteração sem custo ou reembolso integral até 48 horas antes da visita.']],
  cta:'Reserve tempo para conhecer cada camada.',photos:['Guia e coleções arqueológicas','Estudos e maquete da reconstrução','Câmara da Luz e mirante'],
 },
} as const;
export default function ExperienceDetails({id}:{id:keyof typeof content}){
 const c=content[id],option=experienceOptions[id];
 const img=(name:string)=>`/images/tela4-img${name}.svg`;
 const essentialPhotos=['Família explorando as galerias históricas','Panorama de Alexandria visto do mirante','Visitantes observando um relevo do farol','Percurso acessível pelas galerias','Chegada à ilha pela travessia marítima'].map((alt,index)=>[`/images/visita-essencial-0${index+1}.webp`,alt]);
 const historicalPhotos=['Guia apresentando a maquete do farol a um grupo de visitantes','Visita guiada aos vestígios arqueológicos','Estudo de mapas e desenhos da reconstrução','Demonstração de óptica na Câmara da Luz','Guia explicando a paisagem de Alexandria no mirante'].map((alt,index)=>[`/images/jornada-historica-carrossel-0${index+1}.webp`,alt]);
 return <PageEntrance><main className="detail-page placeholder-detail"><Header/>
  <section className="detail-hero"><img className="detail-texture" src={img('BackgroundTextureReusoExploreOFarol')} alt=""/><div className="detail-wrap"><div className="detail-hero-copy"><h1>{c.title[0]}<br/>{c.title[1]}</h1><p>{c.intro}</p><div className="detail-metadata"><LocalizedText pt={`${option.duration} · Até 12 visitantes · A partir de €${option.price}`} en={`${option.duration} · Up to 12 visitors · From €${option.price}`}/></div><a className="button button-large" href="#datas">Escolher data →</a></div><HomeHistoryCarousel photos={id==='visita-essencial'?essentialPhotos:historicalPhotos} className="detail-gallery"/></div></section>
  <section className="detail-description detail-light"><div className="detail-wrap"><span className="detail-label">02 · A experiência</span><h2>{c.heading}</h2><div className="detail-description-grid"><p>{c.description}</p><div>{c.highlights.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></div></section>
  <section className="detail-route"><div className="detail-route-textures" aria-hidden="true">{['Group4','Group5','Group6'].map(name=><img key={name} src={img(name)} alt=""/>)}</div><div className="detail-wrap"><span className="detail-label">03 · Roteiro sugerido</span><h2>{c.routeTitle}</h2><ol className="detail-itinerary">{c.itinerary.map(([time,title,copy])=><li key={time}><time>{time}</time><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>
  <section className="detail-inclusions detail-light"><div className="detail-wrap"><span className="detail-label">04 · O que está incluído</span><h2>{c.includedHeading}</h2><ul className="detail-included">{c.included.map(copy=><li key={copy}><span aria-hidden="true">●</span>{copy}</li>)}</ul></div></section>
  <section className="detail-important"><img className="detail-texture" src={img('BackgroundTextureReusoExperiencias')} alt=""/><div className="detail-wrap"><span className="detail-label">05 · Informações importantes</span><h2>Antes de visitar.</h2><div className="detail-info-grid">{c.details.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
  <section className="detail-ending detail-light" id="datas"><div className="detail-ending-photo experience-ending-photo"><Image src={`/images/${id}-cta.webp`} alt={id==='visita-essencial'?'Família percorrendo a galeria de Pharos com vista para o Mediterrâneo':'Guia apresentando vestígios arqueológicos e a maquete de Pharos'} fill sizes="(max-width:767px) 100vw, 45vw" style={{objectFit:'cover'}}/></div><div className="detail-wrap"><span className="detail-label">06 · Reserva</span><h2>{c.cta}</h2><p>Continue para escolher sua data, participantes e adicionais.</p><Link className="button button-large" href={`/reserva/data?experiencia=${id}`}>Continuar reserva →</Link></div><Footer light/></section>
 </main></PageEntrance>;
}

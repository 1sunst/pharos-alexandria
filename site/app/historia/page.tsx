import Link from "next/link";
import PageEntrance from '@/components/PageEntrance';
import { Header, Footer } from "@/components/SiteChrome";
import "./historia.css";

const asset=(name:string,svg=false)=>name==="PlaceholderCorteVertical"?"/images/pharos-arquitetura-v2.webp":`/images/tela2-img${name}.${svg?"svg":"webp"}`;
function Art({name,style}:{name:string;style?:React.CSSProperties}){return <img className="history-art" src={asset(name,true)} alt="" style={style}/>}
const events=[
  ["c. 280 a.C.","Inauguração","O farol se torna referência de navegação e engenharia."],
  ["1303–1323","Terremotos","Abalos sucessivos comprometem sua estrutura."],
  ["1480","Nova função","Suas pedras passam a integrar a fortaleza de Qaitbay."],
  ["2028","Reconstrução","O projeto contemporâneo começa sobre estudos arqueológicos."],
  ["2032","Uma luz retorna","Pharos reabre ao público e ao Mediterrâneo."]
];
export default function Historia(){return <PageEntrance><main className="history-page"><Header/>
  <section className="history-hero history-dark">
    <Art name="Group" style={{left:0,top:"78.66%",width:"100%",height:"15.12%"}}/><Art name="Group1" style={{left:0,top:"92.07%",width:"100%",height:"1.83%"}}/><Art name="Group2" style={{left:"1.25%",top:"91.22%",width:"96.67%",height:"8.05%"}}/>
    <div className="history-hero-copy"><h1>Erguido para guiar.<br/>Reconstruído para permanecer.</h1><p>A trajetória de Pharos atravessa impérios, terremotos e séculos de ausência. Agora, arqueologia e engenharia devolvem sua luz ao Mediterrâneo.</p></div>
    <div className="history-hero-photo"><img src={asset("PlaceholderAlexandriaHistorica")} alt="Equipe estudando o projeto de reconstrução de Pharos"/></div><div className="history-hero-divider"/>
  </section>
  <section className="history-timeline history-light">
    <Art name="Group3" style={{left:"68.06%",top:"6.59%",width:"26.73%",height:"20%"}}/><Art name="Group4" style={{left:0,top:"76.83%",width:"100%",height:"18.62%"}}/><Art name="Group5" style={{right:"3.61%",top:"75.85%",width:"9.45%",height:"16.59%"}}/>
    <div className="history-content"><span className="eyebrow">02 · LINHA DO TEMPO</span><h2>Do projeto de Sóstrato ao novo horizonte.</h2><div className="history-events">{events.map(e=><article key={e[0]}><i/><h3>{e[0]}</h3><span className="eyebrow">{e[1]}</span><p>{e[2]}</p></article>)}</div></div>
  </section>
  <section className="history-importance history-dark">
    <div className="history-texture-opacity"><Art name="Group6" style={{left:0,top:"26.12%",width:"100%",height:"53.68%"}}/><Art name="Group7" style={{left:"22.78%",top:"14.46%",width:"50.55%",height:"60.09%"}}/><Art name="Group8" style={{left:"23.75%",top:"7.62%",width:"74.03%",height:"53.92%"}}/></div>
    <div className="history-content"><span className="eyebrow">03 · UM SÍMBOLO DO MUNDO ANTIGO</span><div className="importance-heading"><h2>Muito além de um farol.</h2><p>Uma obra que uniu ciência, comércio e imaginação às margens de uma das cidades mais cosmopolitas da Antiguidade.</p></div><div className="history-stat-grid">{[["+ 1.600 anos","como referência histórica"],["≈ 100 metros","de altura estimada"],["3 níveis","de arquitetura monumental"]].map(s=><article key={s[0]}><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></div>
  </section>
  <section className="history-discoveries history-light">
    <Art name="Group9" style={{left:0,top:"23.82%",width:"100%",height:"27.89%"}}/><Art name="Group10" style={{left:0,top:"68.95%",width:"100%",height:"34.2%"}}/>
    <div className="history-content"><span className="eyebrow">04 · DESCOBERTAS ARQUEOLÓGICAS</span><h2>As evidências que tornaram o retorno possível.</h2><div className="discovery-images"><figure><img src={asset("PlaceholderVestigiosSubmersos")} alt="Blocos monumentais submersos no Porto Oriental"/></figure><figure><img src={asset("PlaceholderPesquisaArqueologica")} alt="Documentos, fotografias e levantamento digital de Pharos"/></figure></div></div>
  </section>
  <section className="history-rebuild history-dark">
    <Art name="BackgroundTextureReconstrucao" style={{inset:0,width:"100%",height:"100%"}}/><Art name="Group12" style={{left:"7.29%",top:"8.44%",width:"85.7%",height:"83.78%"}}/>
    <div className="history-content"><span className="eyebrow">05 · JUSTIFICATIVA DA RECONSTRUÇÃO</span><h2>Reconstruir sem apagar o tempo.</h2><div className="rebuild-columns"><div><p>O novo Pharos não ocupa vestígios originais nem reivindica ser uma réplica arqueológica absoluta. É uma reconstrução crítica: fiel ao conhecimento disponível e transparente sobre cada decisão contemporânea.</p><img src={asset("PlaceholderConstrucaoContemporanea")} alt="Construção contemporânea do farol"/></div><ol>{[["PESQUISA","Decisões baseadas em iconografia, descrições e arqueologia."],["REVERSIBILIDADE","Soluções modernas que preservam futuras interpretações."],["ACESSO PÚBLICO","Um monumento vivo, educativo e acessível."]].map((s,i)=><li key={s[0]}><span>0{i+1}</span><div><h3>{s[0]}</h3><p>{s[1]}</p></div></li>)}</ol></div></div>
  </section>
  <section className="history-adaptations history-light">
    <div className="adaptation-art">{["Group13","Group14","Group15","Group16"].map(name=><Art key={name} name={name} style={{right:"9.03%",top:"12.19%",width:"26.39%",height:"76.87%"}}/>)}</div>
    <div className="history-content"><span className="eyebrow">06 · PASSADO E PRESENTE</span><h2>Onde termina a história e começa o presente.</h2><div className="adaptation-grid">{[["FIDELIDADE HISTÓRICA","Proporções gerais, organização em níveis, materiais minerais e presença da chama como símbolo."],["ADAPTAÇÕES MODERNAS","Estrutura reforçada, elevadores, rotas acessíveis, climatização, segurança e operação sustentável."],["TECNOLOGIA INVISÍVEL","Sistemas contemporâneos integrados para não disputar atenção com a arquitetura."]].map(x=><article key={x[0]}><span className="eyebrow">{x[0]}</span><p>{x[1]}</p></article>)}</div></div>
  </section>
  <section className="history-architecture history-dark">
    <Art name="Group17" style={{left:0,top:"14.36%",width:"100%",height:"17.37%"}}/><Art name="Group18" style={{right:"4.86%",top:"33.08%",width:"20.14%",height:"47.18%"}}/>
    <div className="history-content"><span className="eyebrow">07 · ARQUITETURA INTERNA</span><h2>Quatro níveis, uma jornada ascendente.</h2><div className="architecture-columns"><ol>{[["BASE MONUMENTAL","Recepção e introdução histórica"],["GALERIAS","Coleções e vestígios arqueológicos"],["CÂMARA DA LUZ","Ciência, navegação e tecnologia"],["MIRANTE","O Mediterrâneo em 360°"]].map((x,i)=><li key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></li>)}</ol><div className="architecture-photo"><img src={asset("PlaceholderCorteVertical")} alt="Estudo arquitetônico dos níveis internos de Pharos"/></div></div></div>
  </section>
<section className="history-ending history-light"><Art name="Group20" style={{left:"1.67%",top:"3.69%",width:"42.91%",height:"83.08%"}}/><div className="history-content"><span className="eyebrow">08 · CONTINUE A JORNADA</span><h2>Agora, conheça Pharos por dentro.</h2><p>A história está de volta. Escolha como deseja conhecê-la e prepare sua visita a Pharos.</p><Link className="button button-large" href="/experiencias">VER EXPERIÊNCIAS →</Link></div><img className="history-ending-photo" src={asset("PlaceholderAreaOrganicaDeImagem")} alt="Paisagem do Farol de Alexandria ao entardecer"/><Footer light imageContrast/></section>
</main></PageEntrance>}

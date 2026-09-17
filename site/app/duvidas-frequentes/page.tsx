import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight,Plus} from 'lucide-react';
import PageEntrance from '@/components/PageEntrance';
import {Header,Footer} from '@/components/SiteChrome';
import './faq.css';

export const metadata:Metadata={title:'Dúvidas frequentes | Pharos de Alexandria',description:'Informações sobre as experiências e o fluxo demonstrativo de reserva de Pharos.'};
const questions=[
 ['Este é um monumento que posso visitar de verdade?','Não. Pharos é um projeto conceitual de portfólio inspirado no Farol de Alexandria. As experiências, imagens e reservas apresentadas fazem parte dessa proposta; não representam uma atração disponível para compra.'],
 ['Qual experiência devo escolher?','A Visita essencial apresenta as galerias e o mirante em um percurso de aproximadamente 1h30. A Jornada histórica aprofunda a descoberta com guia e áreas especiais em cerca de 2h30. Pharos ao Pôr do Sol combina história, mirante ao entardecer e sabores mediterrâneos em aproximadamente 3 horas.'],
 ['Como funciona a reserva?','Escolha uma experiência, selecione a sessão e os visitantes, personalize os adicionais e revise o resumo. Ao confirmar, você verá um comprovante demonstrativo. Não há pagamento, emissão de ingresso real ou envio de e-mail.'],
 ['Preciso criar uma conta?','Não. O fluxo pode ser explorado como visitante, sem login ou cadastro.'],
 ['Crianças podem participar?','Na proposta do projeto, crianças até 11 anos têm entrada gratuita e jovens de 12 a 17 anos contam com um valor reduzido. Os valores de cada categoria aparecem durante a seleção de visitantes.'],
 ['Onde seria o ponto de encontro?','O ponto de encontro previsto é o terminal marítimo de Qaitbay, em Alexandria, com chegada 30 minutos antes da sessão. A travessia integra a proposta das experiências.'],
 ['O percurso é acessível?','A proposta prevê um percurso essencial integralmente acessível. As áreas especiais podem exigir condições específicas, e o pacote ao pôr do sol prevê apoio de acessibilidade mediante solicitação. Como este é um projeto conceitual, essas condições não constituem uma oferta real de serviço.'],
 ['Quais idiomas estão previstos?','A proposta inclui atendimento em árabe, inglês, francês e português, além de audioguia em 12 idiomas. A disponibilidade apresentada é ilustrativa.'],
 ['Posso alterar ou cancelar a reserva?','A política ilustrativa prevê alterações e cancelamento gratuitos até 48 horas antes da visita. No protótipo, você pode editar os dados no resumo antes de confirmar; nenhuma reserva real é criada.'],
];
export default function FAQ(){return <PageEntrance><main className="faq-page"><Header/><section className="faq-hero"><img className="xp-texture faq-texture" src="/images/home-explore-texture.svg" alt="" aria-hidden="true"/><div className="faq-wrap"><span className="eyebrow">Informações práticas · Dúvidas frequentes</span><h1>Antes de viver<br/>esta história.</h1><p>Respostas para escolher sua experiência e explorar a proposta de Pharos com tranquilidade.</p></div></section><section className="faq-questions"><div className="faq-wrap"><span className="eyebrow">01 · Tudo o que você precisa saber</span><h2>Uma visita sem dúvidas.</h2><div className="faq-list">{questions.map(([question,answer])=><article key={question}><details><summary><span>{question}</span><Plus size={20} aria-hidden="true"/></summary><p>{answer}</p></details></article>)}</div></div></section><section className="faq-ending"><div className="faq-wrap"><span className="eyebrow">02 · Encontre o seu ritmo</span><h2>Escolha como viver Pharos.</h2><p>Conheça os três percursos e descubra qual combina com você.</p><Link className="button button-large" href="/experiencias">Ver experiências <ArrowRight size={17}/></Link></div></section><Footer/></main></PageEntrance>}

import HomeHistoryCarousel from '../../../components/HomeHistoryCarousel';
const photos=[
 ['/images/tela4-imgImagemDoCarrosselSubstituirFill.webp','Visitantes no mirante com degustação ao anoitecer'],
 ['/images/pharos-por-do-sol-card-v2.webp','Vista do Mediterrâneo no fim do pôr do sol'],
 ['/images/pharos-sunset-tasting.webp','Degustação mediterrânea no mirante ao pôr do sol'],
 ['/images/pharos-sunset-gallery.webp','Galerias históricas banhadas pela luz do fim da tarde'],
 ['/images/pharos-night-mirante.webp','Mirante e luz de Pharos ao anoitecer'],
];
export default function Gallery(){return <HomeHistoryCarousel photos={photos} className="detail-gallery" autoPlay/>}

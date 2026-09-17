'use client';
import {useState} from 'react';
import {ArrowLeft,ArrowRight} from 'lucide-react';
export default function PlaceholderGallery({labels}:{labels:string[]}){
 const [index,setIndex]=useState(0);
 const [touch,setTouch]=useState<number|null>(null);
 const move=(direction:number)=>setIndex(current=>(current+direction+labels.length)%labels.length);
 return <div className="detail-gallery" aria-roledescription="carrossel" aria-label="Registros da experiência">
  <div className="home-carousel-frame neutral-photo" onTouchStart={event=>setTouch(event.touches[0].clientX)} onTouchEnd={event=>{if(touch!==null){const distance=event.changedTouches[0].clientX-touch;if(Math.abs(distance)>40)move(distance<0?1:-1)}setTouch(null)}}><span>Imagem a definir<small>{labels[index]}</small></span></div>
  <div className="carousel-controls"><button type="button" aria-label="Anterior" onClick={()=>move(-1)}><ArrowLeft size={17}/></button><button type="button" className="active" aria-label="Próxima" onClick={()=>move(1)}><ArrowRight size={17}/></button><span aria-live="polite">{String(index+1).padStart(2,'0')} / {String(labels.length).padStart(2,'0')}</span><i aria-hidden="true"><b style={{width:`${index/(labels.length-1)*100}%`}}/></i></div>
 </div>;
}

'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export default function NavigationPosition(){
 const pathname=usePathname();
 useEffect(()=>{
  const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
  if(target)target.scrollIntoView({behavior:'instant',block:'start'});
  else window.scrollTo({top:0,left:0,behavior:'instant'});
 },[pathname]);
 return null;
}

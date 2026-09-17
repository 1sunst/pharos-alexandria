import './reserva.css';
import './refinements.css';
import './summary-proportions.css';
import './flow.css';
import {Suspense} from 'react';
import ReservationFlow from '@/components/ReservationFlow';
export default function ReservationLayout(){return <Suspense fallback={<main className="booking-page" aria-busy="true"/>}><ReservationFlow/></Suspense>}

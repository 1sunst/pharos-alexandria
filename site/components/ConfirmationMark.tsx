export default function ConfirmationMark(){
 return <svg className="confirmation-mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
  <circle className="confirmation-mark-ring" cx="60" cy="60" r="59" stroke="var(--turquoise)" strokeWidth="2" pathLength="1"/>
  <path className="confirmation-mark-check" d="M37 60L52 75L83 44" stroke="var(--sun)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1"/>
 </svg>;
}

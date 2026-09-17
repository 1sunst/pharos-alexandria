export const experienceOptions = {
  'visita-essencial': {title:'Visita essencial',duration:'1h30',price:29,youthPrice:19,time:'11h00'},
  'jornada-historica': {title:'Jornada histórica',duration:'2h30',price:49,youthPrice:29,time:'10h00'},
  'pharos-por-do-sol': {title:'Pharos ao Pôr do Sol',duration:'3 horas',price:89,youthPrice:59,time:'17h15'},
} as const;
export type ExperienceId = keyof typeof experienceOptions;
export function isExperienceId(value:unknown):value is ExperienceId {
  return typeof value==='string' && Object.hasOwn(experienceOptions,value);
}

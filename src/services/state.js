export const KEY='devpath:v1';
export const defaults={name:'Dev',startDate:'',goal:5,progress:{},notes:{},sessions:[]};
export function cleanState(raw){const x=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};return {...defaults,name:typeof x.name==='string'?x.name.slice(0,50):'Dev',startDate:typeof x.startDate==='string'?x.startDate:'',goal:Number.isInteger(x.goal)&&x.goal>=1&&x.goal<=7?x.goal:5,progress:x.progress&&typeof x.progress==='object'&&!Array.isArray(x.progress)?x.progress:{},notes:x.notes&&typeof x.notes==='object'&&!Array.isArray(x.notes)?x.notes:{},sessions:Array.isArray(x.sessions)?x.sessions.filter(s=>s&&Number.isFinite(s.minutes)&&s.minutes>0&&s.minutes<=1440&&typeof s.date==='string').slice(-1500):[]};}
export function load(){try{return cleanState(JSON.parse(localStorage.getItem(KEY)))}catch{return {...defaults,progress:{},notes:{},sessions:[]}}}
export function save(s){localStorage.setItem(KEY,JSON.stringify(s));}
export function completed(s){return Object.values(s.progress).filter(x=>x?.done===true).length;}
export function minutes(s){return s.sessions.reduce((n,x)=>n+x.minutes,0)}
export function monthCompleted(s,m){return Array.from({length:30},(_,i)=>(m-1)*30+i+1).filter(id=>s.progress[id]?.done).length;}
export function nextDay(s){for(let i=1;i<=180;i++)if(!s.progress[i]?.done)return i;return 180;}
export function dayState(s,id){return s.progress[id]||{done:false,checks:[]};}
export function dayCountThisWeek(s){const dates=new Set(s.sessions.map(x=>x.date));const d=new Date(),dow=(d.getDay()+6)%7;let n=0;for(let i=0;i<=dow;i++){const t=new Date(d);t.setDate(d.getDate()-i);if(dates.has(localDate(t)))n++}return n}
export function localDate(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function streak(s){const dates=new Set(s.sessions.map(x=>x.date));let d=new Date(),n=0;if(!dates.has(localDate(d)))d.setDate(d.getDate()-1);while(dates.has(localDate(d))){n++;d.setDate(d.getDate()-1)}return n}
export function backup(s){return JSON.stringify({app:'devpath',version:1,exportedAt:new Date().toISOString(),data:s},null,2)}
export function parseBackup(text){const v=JSON.parse(text);if(v?.app!=='devpath'||v?.version!==1||!v?.data||typeof v.data!=='object'||Array.isArray(v.data))throw Error('Arquivo de backup incompatível.');return cleanState(v.data)}

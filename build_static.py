from pathlib import Path
import json,re,shutil
root=Path(__file__).parent; out=root/'dist';out.mkdir(exist_ok=True)
html=(root/'index.html').read_text();css=(root/'src/styles/main.css').read_text();js=(root/'src/main.js').read_text();icons=(root/'src/icons.js').read_text();state=(root/'src/services/state.js').read_text();data=json.loads((root/'src/data/roadmap.json').read_text())
# Bundle ES Modules into one plain JavaScript file, preserving direct file deployment.
icons=icons.replace('export function createIcons','function createIcons')
state=state.replace('export const ','const ').replace('export function ','function ')
js=js.replace("import './styles/main.css';",'').replace("import roadmap from './data/roadmap.json';",f'const roadmap={json.dumps(data,ensure_ascii=False)};').replace("import {createIcons} from './icons.js';",'')
js=re.sub(r"import \{KEY,load,save,completed,monthCompleted,minutes,nextDay,dayState,dayCountThisWeek,localDate,streak,backup,parseBackup\} from './services/state.js';",'',js)
(out/'app.js').write_text(icons+'\n'+state+'\n'+js)
(out/'style.css').write_text(css)
html=html.replace('<script type="module" src="/src/main.js"></script>','<script src="./app.js" defer></script>').replace('</head>','<link rel="stylesheet" href="./style.css"/></head>').replace('href="/favicon.svg"','href="./favicon.svg"')
(out/'index.html').write_text(html)
shutil.copy(root/'public/favicon.svg',out/'favicon.svg')
print('Static deployment built:',len((out/'app.js').read_bytes()),'bytes JavaScript')

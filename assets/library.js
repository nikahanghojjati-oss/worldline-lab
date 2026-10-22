/* Library reader · public GitHub JSON, no private editing credentials */
(function(){
'use strict';
const host=document.getElementById('page-library');if(!host)return;
const state={q:'',field:'All',type:'All',status:'All',mode:'works'};
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,y=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[y]));
let lib=null,notes=[];
host.innerHTML=[
'<div class="page-head"><div class="kicker">07 / SCIENTIFIC HERITAGE & SOURCE PROVENANCE</div><h1 class="page-title">The <em>Scholar Library</em></h1><p class="dek">A growing intellectual map of papers, books, lectures, archival evidence and the people behind them. Registration is not the same thing as having studied a work. Our accounting preserves that difference.</p></div>',
'<div class="library-hero"><div><small>THE RESEARCH CANON / VOL. 01</small><h2>Every great argument<br>begins with a source.</h2><p>From Einstein and Gödel to Everett, Bell, Pearl, and cognitive scientists, follow the lineage of ideas—and see which claims actually alter our view of time and competing histories.</p></div><div class="library-constellation"><div class="library-stars"><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div><div class="library-orb"><div><strong id="lib-hero-total">—</strong><span>SOURCE WORKS</span></div></div></div></div>',
'<div class="library-metrics"><div class="library-stat"><span>WORKS CATALOGUED</span><strong id="lib-count">—</strong><span>distinct works, not author credits</span></div><div class="library-stat"><span>RESEARCHERS INDEXED</span><strong id="lib-people">—</strong><span>contributing named researchers</span></div><div class="library-stat"><span>ABSTRACT / SUMMARY CHECKS</span><strong id="lib-reviewed">—</strong><span>not full-text completion</span></div><div class="library-stat"><span>COMPLETE READINGS</span><strong id="lib-read">—</strong><span>require comprehensive reading notes</span></div></div>',
'<div class="section-heading"><h2>Explore the scholarly record</h2><p>Filter the catalogue by topic, document type, or actual review depth.</p></div>',
'<div class="library-toolbar"><input id="lib-search" type="search" aria-label="Search papers and authors" placeholder="Search author, title, claim, source ID…"><select id="lib-field" aria-label="Filter discipline"><option value="All">Every field</option></select><select id="lib-type" aria-label="Filter medium"><option value="All">All kinds of works</option></select><select id="lib-status" aria-label="Filter review status"><option value="All">All reading stages</option><option value="catalogued">Catalogued, unread</option><option value="abstract-reviewed">Abstract or overview checked</option><option value="partially-studied">Partially studied</option><option value="fully-studied">Fully studied</option></select></div>',
'<div class="library-view"><button type="button" class="active" data-lib-tab="works">Publications & media</button><button type="button" data-lib-tab="scholars">Researchers & thinkers</button><button type="button" data-lib-tab="notes">Research notes</button><button type="button" data-lib-tab="fields">By discipline</button></div>',
'<div id="lib-match" class="library-entry-count" role="status">Loading the repository library…</div><div id="lib-results" class="library-work-list"><div class="library-empty">Loading source records…</div></div>',
'<section class="library-verdict" id="library-verdict"><div class="library-verdict-grid"><div class="library-verdict-number"><strong>59</strong><span>EDITORIAL / 100</span></div><div><div class="kicker">REASONS, NOT SCORES</div><h2>Why the Truth Compass has not changed</h2><p id="lib-verdict-copy">A catalogued paper cannot automatically move our conclusion. We need measurements that distinguish competing models.</p><div id="lib-verdict-log"></div><div class="library-ledger-links"><a href="#ledger">Open the evidence ledger ↗</a><a href="data/library.json" target="_blank" rel="noopener noreferrer">Inspect the raw source index ↗</a><a href="data/reading-notes.json" target="_blank" rel="noopener noreferrer">Inspect the study notes ↗</a><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/research/field-note-001.md" target="_blank" rel="noopener noreferrer">Read first research synthesis ↗</a><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/LIBRARY_PROTOCOL.md" target="_blank" rel="noopener noreferrer">Library research standards ↗</a></div></div></div></section>',
'<div class="session-alert">Library integrity: the counts above are taken from versioned GitHub data. Works in the library are not necessarily endorsed, independently replicated, available in full text, or relevant to every hypothesis. DOI/publisher links identify source records, and claimed study depth is separately documented. The public website cannot silently declare a book read or change the verdict.</div>'
].join('');
const $=id=>document.getElementById(id);
function init(data,reading){
 lib=data;notes=Array.isArray(reading.notes)?reading.notes:[];
 const w=lib.works,p=lib.scholars;
 $('lib-count').textContent=w.length;$('lib-hero-total').textContent=w.length;
 $('lib-people').textContent=p.length;
 $('lib-reviewed').textContent=w.filter(v=>v.access==='abstract-reviewed').length;
 $('lib-read').textContent=w.filter(v=>v.access==='fully-studied').length;
 const fields=[...new Set(w.map(x=>x.field))].sort(),types=[...new Set(w.map(x=>x.type))].sort();
 $('lib-field').innerHTML='<option value="All">Every field</option>'+fields.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
 $('lib-type').innerHTML='<option value="All">All kinds of works</option>'+types.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
 const va=lib.verdictAudit;
 if(va){$('lib-verdict-copy').textContent=va.empiricalConclusion+' '+va.initialScoreExplanation;
  $('lib-verdict-log').innerHTML=va.changeLog.map(e=>'<div class="library-note-card"><div class="kicker">'+esc(e.date)+' · '+esc(e.id)+' · '+esc(e.status)+'</div><h3>Compass '+esc(e.oldScore)+' → '+esc(e.newScore)+' · change '+esc(e.delta)+'</h3><p>'+esc(e.justification)+'</p><div class="library-ledger-links">'+(e.sourceIds||[]).map(id=>{let found=w.find(v=>v.id===id);return found?'<a href="'+esc(found.url)+'" target="_blank" rel="noopener noreferrer">'+esc(id)+' · '+esc(found.authors[0])+' ↗</a>':''}).join('')+'</div></div>').join('')}
 render();
}
function filteredWorks(){
 const q=state.q.toLowerCase();
 return lib.works.filter(x=>(state.field==='All'||x.field===state.field)&&(state.type==='All'||x.type===state.type)&&(state.status==='All'||x.access===state.status)&&(!q||[x.title,x.id,x.field,x.role,x.authors.join(' '),x.type,x.note].join(' ').toLowerCase().includes(q)));
}
function workCard(x){
 const seen=notes.filter(n=>n.workId===x.id);
 return '<article class="library-work"><div><span class="source-id">'+esc(x.id)+'</span><span class="source-type">'+esc(x.type)+' · '+esc(x.year)+'</span></div><div><h3>'+esc(x.title)+'</h3><p class="authors">'+esc(x.authors.join(' · '))+'<br><span class="micro">'+esc(x.field)+'</span></p><p class="relevance">'+esc(x.role)+'</p>'+ (seen.length?'<p class="library-note">'+seen.length+' auditable source note(s) in this repository.</p>':'') +'<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">View source or publisher record ↗</a></div><span class="research-status '+esc(x.access)+'">'+esc(x.access==='abstract-reviewed'?'Abstract checked':x.access==='catalogued'?'Catalogued':x.access==='fully-studied'?'Full study':'Partial study')+'</span></article>'
}
function scholars(){
 const q=state.q.toLowerCase(),m=lib.scholars.filter(x=>(state.field==='All'||x.fields.includes(state.field))&&(!q||[x.name,x.fields.join(' '),x.focus].join(' ').toLowerCase().includes(q)));
 $('lib-match').textContent=m.length+' named researchers match your filters.';
 $('lib-results').className='library-scholar-list';
 $('lib-results').innerHTML=m.length?m.map(x=>'<article class="library-scholar"><div class="kicker">'+esc(x.id)+' / '+esc(x.fields[0])+'</div><h3>'+esc(x.name)+'</h3><p>'+esc(x.focus)+'</p><p class="caption">'+x.works.length+' linked '+(x.works.length===1?'work':'works')+'</p><button type="button" data-scholar-name="'+esc(x.name)+'">Explore work ↗</button></article>').join(''):'<div class="library-empty">No matching scholars. Clear the search or filters.</div>';
 document.querySelectorAll('[data-scholar-name]').forEach(b=>b.addEventListener('click',()=>{state.mode='works';state.q=b.dataset.scholarName;state.field='All';state.type='All';state.status='All';$('lib-search').value=state.q;$('lib-field').value='All';$('lib-type').value='All';$('lib-status').value='All';render();}));
}
function notesPanel(){
 const matched=notes.filter(x=>{const w=lib.works.find(y=>y.id===x.workId);return w&&(state.field==='All'||w.field===state.field)&&(!state.q||[x.label,x.summary,x.workId].join(' ').toLowerCase().includes(state.q.toLowerCase()))});
 $('lib-match').textContent=matched.length+' source-level abstract or summary notes recorded. No full-paper completion is implied.';
 $('lib-results').className='library-notes';
 $('lib-results').innerHTML=matched.length?matched.map(n=>'<article class="library-note-card"><span class="kicker">'+esc(n.workId)+' · '+esc(n.stage)+' · '+esc(n.sessionId)+'</span><h3>'+esc(n.label)+'</h3><p>'+esc(n.summary)+'</p><p><span class="micro">LIMITATION</span><br>'+esc(n.limitations)+'</p><p><span class="micro">VERDICT</span><br>'+esc(n.conclusion)+'</p></article>').join(''):'<div class="library-empty">No notes found for this selection.</div>';
}
function fieldsPanel(){
 const names=[...new Set(lib.works.map(x=>x.field))].sort();
 $('lib-match').textContent=names.length+' fields indexed. Each item counts once in its primary discipline, never once per coauthor.';
 $('lib-results').className='library-field-grid';
 const tiles=names.map(f=>{let w=lib.works.filter(x=>x.field===f),abstract=w.filter(x=>x.access==='abstract-reviewed').length,read=w.filter(x=>x.access==='fully-studied').length;return '<button class="library-field" type="button" data-field-go="'+esc(f)+'"><strong>'+esc(f)+'</strong><small>'+w.length+' works · '+abstract+' summaries · '+read+' full studies</small><span class="mini-track"><i style="width:'+100*(abstract+read)/w.length+'%"></i></span></button>'}).join('');
 const rows=names.map(f=>{
  const w=lib.works.filter(x=>x.field===f),t={paper:0,book:0,ref:0,media:0,checked:0,complete:0};
  w.forEach(x=>{if(['paper','review'].includes(x.type))t.paper++;else if(x.type==='book')t.book++;else if(['lecture','award archive','video','interview'].includes(x.type))t.media++;else t.ref++;
   if(x.access==='abstract-reviewed')t.checked++;
   if(x.access==='fully-studied')t.complete++;
  });
  return '<tr><th scope="row">'+esc(f)+'</th><td>'+t.paper+'</td><td>'+t.book+'</td><td>'+t.ref+'</td><td>'+t.media+'</td><td>'+t.checked+'</td><td>'+t.complete+'</td><td>'+w.length+'</td></tr>'
 }).join('');
 $('lib-results').innerHTML=tiles+'<div class="library-matrix-wrap"><div class="kicker">ACCOUNTING BY MEDIUM AND REVIEW DEPTH</div><h3>Exactly what has been collected and studied</h3><table class="library-matrix"><thead><tr><th scope="col">Discipline</th><th scope="col">Papers / reviews</th><th scope="col">Books</th><th scope="col">Essays / references</th><th scope="col">Lectures / media</th><th scope="col">Summaries checked</th><th scope="col">Full studies</th><th scope="col">Works held</th></tr></thead><tbody>'+rows+'</tbody></table><p class="caption">Summaries checked are not completed full works. Essays and references include encyclopedia, scientific background and research overview records. The catalogue contains no indexed video-specific studies yet. Source records can be inspected in the Publications view.</p></div>';
 document.querySelectorAll('[data-field-go]').forEach(b=>b.addEventListener('click',()=>{state.field=b.dataset.fieldGo;state.mode='works';$('lib-field').value=state.field;render()}));
}
function render(){
 if(!lib)return;
 document.querySelectorAll('[data-lib-tab]').forEach(b=>b.classList.toggle('active',b.dataset.libTab===state.mode));
 if(state.mode==='scholars'){scholars();return}if(state.mode==='notes'){notesPanel();return}if(state.mode==='fields'){fieldsPanel();return}
 const f=filteredWorks();
 $('lib-match').textContent=f.length+' distinct works match your filters. Full-text completion is counted only when verified reading notes exist.';
 $('lib-results').className='library-work-list';
 $('lib-results').innerHTML=f.length?f.map(workCard).join(''):'<div class="library-empty">No works match. Try another topic or reading stage.</div>';
}
['lib-search','lib-field','lib-type','lib-status'].forEach(id=>{$(id).addEventListener(id==='lib-search'?'input':'change',e=>{state[id.replace('lib-','')==='search'?'q':id.slice(4)]=e.target.value;render()})});
document.querySelectorAll('[data-lib-tab]').forEach(b=>b.addEventListener('click',()=>{state.mode=b.dataset.libTab;render()}));
Promise.all(['data/library.json','data/reading-notes.json'].map(u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Could not fetch '+u);return r.json()}))).then(x=>init(...x)).catch(e=>{$('lib-match').textContent='Library unavailable';$('lib-results').innerHTML='<div class="library-empty">The public library record could not be loaded. Inspect <a href="data/library.json">data/library.json</a> in the repository or reload this page.</div>';});
})();

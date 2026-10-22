#!/usr/bin/env node
'use strict';
// Worldline Lab v0.2 Truth Engine integrity gate.
// Validates local schema/provenance and dependent IDs. Does NOT certify external links,
// scientific truth, peer replication, or live availability of any source.
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');
const read=(n)=>JSON.parse(fs.readFileSync(path.join(ROOT,'data',n+'.json'),'utf8'));
const date=/^\d{4}-\d{2}-\d{2}$/;
const idFormats={source:/^SRC-\d{3,}$/,scholar:/^R-\d{3,}$/,note:/^NOTE-\d{3,}$/,ledger:/^WL-\d{3,}$/,audit:/^VC-\d{3,}$/,session:/^S-\d{3}$/};
const goodDate=(s)=>typeof s==='string'&&date.test(s)&&!Number.isNaN(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
const validUrl=(s)=>{try{const u=new URL(s);return ['http:','https:'].includes(u.protocol)&&Boolean(u.hostname)&&!u.username&&!u.password;}catch{return false}};
const keyOfWork=(w)=>{const v=String(w.url||'').toLowerCase().match(/10\.\d{4,9}\/[^?#\s]+/);return v?'doi:'+decodeURIComponent(v[0]).replace(/[.,;]+$/,''):('title:'+String(w.title||'').toLowerCase().replace(/[^a-z0-9]+/g,' ')+'|'+w.year);};
function validate(data){
 const issues=[];const error=(id,message)=>issues.push({level:'error',id,message});
 const warning=(id,message)=>issues.push({level:'warning',id,message});
 const {library,notes,ledger,research,sessions}=data;
 const isArray=(a)=>Array.isArray(a)?a:[];
 for(const [name,obj] of Object.entries(data))if(!obj||typeof obj!=='object')error(name,'document must be an object');
 if(issues.length)return {errors:issues.filter(i=>i.level==='error'),warnings:[]};
 const works=isArray(library.works),scholars=isArray(library.scholars),reviews=isArray(notes.notes),entries=isArray(ledger.entries),audit=isArray(library.verdictAudit?.changeLog);
 const list=(type,things,format)=>{const out=new Set();for(const item of things){const id=item?.id;if(!format.test(String(id||'')))error(type,String(id)+' has an invalid identifier');if(out.has(id))error(type,String(id)+' is duplicated');out.add(id);}return out};
 const sources=list('works',works,idFormats.source),scholarIds=list('scholars',scholars,idFormats.scholar),noteIds=list('notes',reviews,idFormats.note),ledgerIds=list('ledger',entries,idFormats.ledger),auditIds=list('verdict audits',audit,idFormats.audit);
 const seen=new Map();const workStatus=new Set(['catalogued','abstract-reviewed','partially-studied','fully-studied']);
 for(const w of works){
  if(!validUrl(w.url))error(w.id,'invalid original source URL syntax');
  if(!Number.isInteger(w.year)||w.year<1500||w.year>2200)error(w.id,'invalid publication year');
  if(!workStatus.has(w.access))error(w.id,'invalid study-depth status');
  if(!Array.isArray(w.authors)||!w.authors.length)error(w.id,'missing author attribution');
  const key=keyOfWork(w);
  if(seen.has(key))error(w.id,'duplicate DOI or normalized title/year with '+seen.get(key));else seen.set(key,w.id);
  if(w.verifiedAt!==null&&w.verifiedAt!==undefined&&!goodDate(w.verifiedAt))error(w.id,'verifiedAt must be YYYY-MM-DD or null');
  for(const id of isArray(w.linkedLedger))if(!ledgerIds.has(id))error(w.id,'dangling linked ledger '+id);
  const matching=reviews.filter(n=>n.workId===w.id&&n.stage===w.access&&n.fullTextRead===true);
  if(w.access==='fully-studied'&&!matching.some(n=>Array.isArray(n.sectionsRead)&&n.sectionsRead.length&&n.method&&n.limitations&&n.sessionId&&n.date&&n.alternativeExplanations))error(w.id,'full-study flag requires matching full main-text critical note with sections, method, limits, objections and session');
 }
 for(const person of scholars)for(const id of isArray(person.works))if(!sources.has(id))error(person.id,'dangling scholar-work reference '+id);
 for(const n of reviews){
  if(!sources.has(n.workId))error(n.id,'reading note refers to nonexistent work '+n.workId);
  if(!goodDate(n.date))error(n.id,'invalid review date');
  if(n.stage==='fully-studied'&&(n.fullTextRead!==true||!Array.isArray(n.sectionsRead)||!n.sectionsRead.length||!n.method||!n.limitations||!n.alternativeExplanations))error(n.id,'full reading missing section/method/limits/opposition');
  if(n.stage!=='fully-studied'&&n.fullTextRead===true)warning(n.id,'fullTextRead true despite non-full stage');
  if(n.sessionId&&!idFormats.session.test(n.sessionId))error(n.id,'invalid session ID');
  for(const id of isArray(n.ledgerIds))if(!ledgerIds.has(id))error(n.id,'dangling reading-note ledger reference '+id);
 }
 for(const e of entries){
  if(!validUrl(e.url))error(e.id,'invalid evidence source URL syntax');
  if(!goodDate(e.date))error(e.id,'invalid ledger date');
  if(typeof e.impact!=='number'||!Number.isFinite(e.impact))error(e.id,'impact must be numeric; separate editorial likelihood from evidence');
  if(!e.question||!e.finding||!e.kind||!e.status)error(e.id,'missing claim classification/question/finding/status');
  if(!('lat' in e)||!('long' in e)||!e.locationType)error(e.id,'geographic provenance fields required');
  if((e.lat===null)!==(e.long===null))error(e.id,'lat/long must both be null or both numeric');
  if(e.lat!==null&&(!Number.isFinite(e.lat)||!Number.isFinite(e.long)||Math.abs(e.lat)>90||Math.abs(e.long)>180))error(e.id,'out-of-range geographic coordinates');
  if(e.lat!==null&&!e.locationType)error(e.id,'coordinate precision/provenance description required');
  for(const r of isArray(e.reviewRefs)){if(idFormats.source.test(r)&&!sources.has(r))error(e.id,'invalid evidence source dependency '+r);if(idFormats.note.test(r)&&!noteIds.has(r))error(e.id,'invalid evidence note dependency '+r);}
 }
 for(const event of audit){
  if(!goodDate(event.date))error(event.id,'invalid verdict audit date');
  if(!Number.isFinite(event.oldScore)||!Number.isFinite(event.newScore)||event.delta!==event.newScore-event.oldScore)error(event.id,'invalid old/new/delta score relation');
  if(!event.justification)error(event.id,'missing scientific rationale');
  for(const id of isArray(event.sourceIds))if(!sources.has(id))error(event.id,'missing audited source '+id);
  for(const id of isArray(event.ledgerIds))if(!ledgerIds.has(id))error(event.id,'missing audit ledger '+id);
  for(const id of isArray(event.readingNotes))if(!noteIds.has(id))error(event.id,'missing audit reading note '+id);
 }
 const last=audit.at(-1);
 if(last&&ledger.editorialMeter?.score!==last.newScore)error('score','editorial meter not reconciled to last verdict audit');
 for(const d of isArray(research.disciplines)){
  for(const id of [...isArray(d.prioritySourceIds),...isArray(d.additionalSourceIds)])if(!sources.has(id))error(d.name||'discipline','dangling lab source ID '+id);
  for(const h of isArray(d.caseHighlights))for(const id of isArray(h.sourceIds))if(!sources.has(id))error(d.name||'discipline','dangling highlight source '+id);
 }
 for(const j of isArray(research.journal))for(const id of isArray(j.sourceIds))if(!ledgerIds.has(id))error(j.id,'journal references missing evidence '+id);
 const actualFull=works.filter(w=>w.access==='fully-studied').length;
 if(research.fullStudyMilestone?.completed!==actualFull)error('research','full study milestone not derived from current source statuses');
 if(!idFormats.session.test(sessions.activeSession))error('sessions','invalid current session');
 if(isArray(sessions.workstreams).length!==7)error('sessions','exactly seven workstreams required in Observatory');
 if(!isArray(sessions.roundLog).length)error('sessions','missing canonical round history');
 for(const sr of isArray(sessions.sessionHistory))if(!idFormats.session.test(sr.id))error('sessions','invalid historic session ID '+sr.id);
 if(!isArray(sessions.sessionHistory).some(sr=>sr.id===sessions.activeSession))error('sessions','active session absent from historical registry');
 const latest=isArray(sessions.roundLog).at(-1);
 if(latest?.sessionId!==sessions.activeSession)error('sessions','latest round belongs to different active session');
 const gate=data.truthEngine;
 if(gate){
  if(gate.schema!=='worldline-truth-engine/v0.2')error('truthEngine','invalid gate schema');
  if(gate.baseline?.score!==ledger.editorialMeter?.score)error('truthEngine','baseline score must agree with current editorial meter while no new score changes exist');
  if(!Array.isArray(gate.proposals))error('truthEngine','proposals must be an array');
  const required=['claimClass','hypothesis','nullHypothesis','prediction','counterevidenceSearch','alternativeExplanations','sourceIds','readingNoteIds','uncertainty','impactRationale','priorAuditId','reviewedEvidenceCommit','oldScore','proposedScore'];
  for(const p of isArray(gate.proposals)){
   if(!p.id)error('proposal','id missing');
   for(const k of required)if(p[k]===undefined||p[k]===null||p[k]===''||(Array.isArray(p[k])&&!p[k].length))error(p.id||'proposal','required field missing: '+k);
   if(!/^([a-f0-9]{40})$/.test(String(p.reviewedEvidenceCommit||'')))error(p.id||'proposal','reviewed evidence commit must be exact 40-char SHA');
   for(const ref of isArray(p.sourceIds))if(!sources.has(ref))error(p.id,'unknown source '+ref);
   for(const ref of isArray(p.readingNoteIds))if(!noteIds.has(ref))error(p.id,'unknown note '+ref);
   if(!auditIds.has(p.priorAuditId))error(p.id,'prior audit ID not present');
   if(p.oldScore!==ledger.editorialMeter?.score)warning(p.id,'proposal baseline differs from current score; review stale proposal');
  }
 }
 const pg=data.pageFreshness;
 if(pg){
  const routes=['home','dashboard','ledger','journal','disciplines','atlas','library','sessions'];
  if(pg.schema!=='worldline-page-freshness/v1')error('pageFreshness','invalid freshness schema');
  if(!Array.isArray(pg.pages)||pg.pages.length!==8||new Set(pg.pages.map(x=>x.route)).size!==8)error('pageFreshness','eight unique route freshness records required');
  for(const route of routes)if(!isArray(pg.pages).some(x=>x.route===route))error('pageFreshness','missing page '+route);
  const count=isArray(sessions.roundLog).length;
  const first=pg.nextMandatorySweepRoundLogCount;
  if(!Number.isInteger(first)||first<1||pg.cadenceRounds!==5)error('pageFreshness','five-round cadence/first sweep invalid');
  if(Number.isInteger(first)&&count>=first){
   const expected=first+5*Math.floor((count-first)/5);
   for(const page of isArray(pg.pages)){
    if(!Number.isInteger(page.lastFullSweepRoundLogCount)||page.lastFullSweepRoundLogCount<expected)error(page.route,'five-round website sweep missing for round-log index '+expected);
    if(!/^([a-f0-9]{40})$/.test(String(page.lastFullSweepEvidenceCommit||'')))error(page.route,'five-round audit must link an evidence commit SHA');
    if(!['updated-from-source','revalidated-no-new-evidence'].includes(page.lastFullSweepAction))error(page.route,'five-round sweep lacks explicit update or evidence-based revalidation');
    if(typeof page.lastFullSweepReason!=='string'||page.lastFullSweepReason.length<20)error(page.route,'five-round sweep missing substantive documented research relevance');
   }
  }
 }
 const dq=data.discriminator;
 if(dq){
  if(dq.schema!=='worldline-central-question/v1')error('discriminator','invalid primary-question schema');
  if(dq.scorePolicy?.centralScore!==ledger.editorialMeter?.score)error('discriminator','primary-question score must match editorial meter');
  if(!isArray(dq.candidates).length||new Set(isArray(dq.candidates).map(x=>x.id)).size!==dq.candidates.length)error('discriminator','discriminator candidate list or IDs invalid');
  for(const proposal of isArray(dq.candidates)){
   if(!proposal.candidateObservable||!proposal.manyHypothesis||!proposal.oneHypothesis||!proposal.nextTask)error(proposal.id,'missing paired hypotheses and operational observable');
   for(const id of isArray(proposal.sources))if(!sources.has(id))error(proposal.id,'unknown discriminator primary source '+id);
  }
  if(dq.fixedBackgroundDiagnostic?.warning?.length<40)error('discriminator','conditional likelihood warning missing');
 }
 return {errors:issues.filter(i=>i.level==='error'),warnings:issues.filter(i=>i.level==='warning'),counts:{works:works.length,scholars:scholars.length,notes:reviews.length,fullStudies:actualFull,ledgerEntries:entries.length,verdictAudits:audit.length,rounds:isArray(sessions.roundLog).length}};
}
function load(){const d={library:read('library'),notes:read('reading-notes'),ledger:read('ledger'),research:read('research'),sessions:read('sessions')};const tp=path.join(ROOT,'data','truth-engine.json');if(fs.existsSync(tp))d.truthEngine=JSON.parse(fs.readFileSync(tp,'utf8'));
 for(const [key,file] of [['pageFreshness','page-freshness.json'],['discriminator','discriminator-program.json']]){
  const filename=path.join(ROOT,'data',file);
  if(fs.existsSync(filename))d[key]=JSON.parse(fs.readFileSync(filename,'utf8'));
 }
 return d;}
if(require.main===module){try{const result=validate(load());const machine=process.argv.includes('--json');if(machine)console.log(JSON.stringify(result,null,2));else{console.log('Worldline Truth Engine · local schema audit · '+(result.errors.length?'FAIL':'PASS'));console.log('Counts: '+JSON.stringify(result.counts));for(const item of [...result.errors,...result.warnings])console.log(item.level.toUpperCase()+' '+item.id+': '+item.message);console.log('This validates local integrity, not external URL reachability, scientific correctness or browser behavior.');}process.exitCode=result.errors.length?1:0;}catch(e){console.error('Cannot validate project data:',e.message);process.exitCode=1;}}
module.exports={load,validate};

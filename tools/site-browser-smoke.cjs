#!/usr/bin/env node
'use strict';
// Headless acceptance for v0.2 read-only Truth Ledger and v0.25 nine three-view labs.
// These tests are browser integration checks, NOT a human design/accessibility signoff.
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const research=JSON.parse(fs.readFileSync(path.join(root,'data/research.json'),'utf8'));
const expected=research.disciplines.map(d=>d.slug);
const sessions=JSON.parse(fs.readFileSync(path.join(root,'data/sessions.json'),'utf8'));
const latestRound=sessions.roundLog.at(-1).id;
const port=Number(process.env.WORLDLINE_TEST_PORT||8765);
const base='http://127.0.0.1:'+port+'/';
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
const fail=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function waitForServer(){
 for(let i=0;i<90;i++){try{const r=await fetch(base);if(r.ok)return}catch{}await sleep(250)}
 throw Error('HTTP server did not start');
}
async function assertRoute(page,route){
 await page.evaluate(r=>{location.hash='#'+r},route);
 await page.waitForFunction(r=>document.querySelector('.page.active')?.dataset.page===r,route);
 assert.equal(await page.locator('.page.active').count(),1,'exactly one active route '+route);
 const status=page.locator('#research-round-banner');
 await status.waitFor({state:'visible',timeout:10000});
 assert.ok((await status.innerText()).includes(latestRound),'current canonical research round '+route+' '+latestRound);
}
async function run(viewportName,viewport){
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport,isMobile:viewportName==='mobile',hasTouch:viewportName==='mobile'});
 const exceptions=[];
 page.on('pageerror',e=>exceptions.push(String(e.message)));
 try{
  await page.goto(base+'#home',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(r=>document.querySelector('#research-round-banner')?.textContent?.includes(r),latestRound,{timeout:15000});
  for(const route of ['home','dashboard','ledger','journal','disciplines','atlas','library','sessions']){
   await assertRoute(page,route);
  }
  await page.waitForFunction(()=>document.querySelectorAll('#disciplines-list .lab-tile-link').length===9);
  assert.equal(await page.locator('#research-program .research-stage').count(),8,'eight gated stages');
  assert.equal(await page.locator('#disciplines-list .lab-tile-link').count(),9,'nine lab entry points');
  for(const slug of expected){
   await page.evaluate(s=>{location.hash='#disciplines?lab='+s},slug);
   await page.waitForFunction(s=>document.querySelector('#lab-detail')?.hidden===false&&document.querySelector('#lab-detail .lab-hero h2')?.textContent?.length>0&&location.hash.includes(s),slug);
   assert.ok(await page.locator('#lab-source-list .lab-source a[href^="https://"]').count()>0,'source links '+slug);
   const search=page.locator('#lab-source-search');
   await search.fill('no-matching-work-absolute-token');
   assert.match(await page.locator('#lab-source-list').innerText(),/No sources match/,'filter '+slug);
   await search.fill('');
   assert.ok(await page.locator('#lab-source-list .lab-source').count()>0,'unfiltered source list '+slug);
   await page.evaluate(s=>{location.hash='#disciplines?lab='+s+'&room=presentation'},slug);
   await page.waitForFunction(()=>document.querySelector('#lab-room-stage')?.textContent?.trim()?.length>50 && !!document.querySelector('.lab-rooms-switcher a.chosen[href*="presentation"]'));
   assert.equal(await page.locator('.lab-rooms-switcher a').count(),3,'three room selectors '+slug);
   // Exercise the actual deck, not only the location hash. Keyboard activation must
   // change the source-grounded slide and expose a reversible, bounded index.
   const deckIndex=page.locator('#deck-index');
   assert.match(await deckIndex.innerText(),/^01 \/ 06$/,'deck opens at first topic '+slug);
   const prev=page.locator('#deck-prev'),next=page.locator('#deck-next');
   assert.equal(await prev.isDisabled(),true,'previous disabled at slide one '+slug);
   await next.focus();
   await page.keyboard.press('Enter');
   await page.waitForFunction(()=>document.querySelector('#deck-index')?.textContent?.trim()==='02 / 06');
   assert.equal(await prev.isEnabled(),true,'previous available after advancing '+slug);
   await prev.focus();
   await page.keyboard.press('Enter');
   await page.waitForFunction(()=>document.querySelector('#deck-index')?.textContent?.trim()==='01 / 06');
   await page.evaluate(s=>{location.hash='#disciplines?lab='+s+'&room=interactive'},slug);
   await page.waitForFunction(()=>!!document.querySelector('.lab-rooms-switcher a.chosen[href*="interactive"]')&&!!document.querySelector('#lab-control'));
   const slider=page.locator('#lab-control');
   const before=await page.locator('#lab-control-result').innerText();
   await slider.focus();
   await page.keyboard.press('ArrowRight');
   const after=await page.locator('#lab-control-result').innerText();
   assert.notEqual(after,before,'interactive instrument responds to keyboard '+slug);
   const back=page.locator('#lab-detail .lab-back');
   await back.focus();assert.equal(await back.evaluate(e=>document.activeElement===e),true,'back link keyboard focus '+slug);
   await back.click();
   await page.waitForFunction(()=>document.querySelector('#lab-detail')?.hidden===true);
  }
  await assertRoute(page,'ledger');
  const ledgerText=await page.locator('#page-ledger').innerText();
  assert.ok(ledgerText.includes('WL-019')||ledgerText.includes('Born-rule'),'R010 primary question source finding displayed');
  assert.equal(exceptions.length,0,'no uncaught client JS errors: '+exceptions.join('; '));
  console.log('PASS '+viewportName+': 8 routes, 9 labs x 3 views, original links, keyboard instrument and back, 8 stage gates, R010 live decision.');
 }finally{await page.close();await browser.close()}
}
(async()=>{
 try{await waitForServer();assert.equal(expected.length,9);await run('desktop',{width:1440,height:900});await run('mobile',{width:390,height:844});console.log('PASS 0.25 browser integration suite (Chromium only; not a human accessibility audit)')}
 catch(e){console.error('FAIL v0.25 browser suite:',e.stack||e.message);process.exitCode=1}
 finally{server.kill('SIGTERM')}
})();

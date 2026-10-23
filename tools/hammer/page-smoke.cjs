#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const ledger=JSON.parse(fs.readFileSync(path.join(root,'data/ledger.json'),'utf8'));
const sessions=JSON.parse(fs.readFileSync(path.join(root,'data/sessions.json'),'utf8'));
const library=JSON.parse(fs.readFileSync(path.join(root,'data/library.json'),'utf8'));
const port=8768,url='http://127.0.0.1:'+port;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(){for(let i=0;i<80;i++){try{if((await fetch(url+'/hammer.html')).ok)return}catch{}await sleep(250)}throw Error('HAMMER site static server unavailable')}
(async()=>{
 let browser;
 try{
  await ready();
  browser=await chromium.launch({headless:true});
  for(const vp of [{width:1440,height:900,name:'desktop'},{width:390,height:844,name:'phone-width'}]){
   const page=await browser.newPage({viewport:{width:vp.width,height:vp.height},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(String(e.message)));
   await page.goto(url+'/hammer.html',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.getElementById('hp-round')?.textContent?.includes('S-003-'),{timeout:15000});
   await page.waitForFunction(()=>document.querySelector('#hammer-design option')&&document.querySelector('#hammer-outcome')?.textContent?.includes('Jensen'));
   assert.equal(await page.title(),'HAMMER — Worldline Lab Scientific Research Forge');
   assert.equal(await page.locator('.hc-nav .wl-more summary').count(),1,'shared resources navigation exists');
   assert.equal(await page.locator('link[href="assets/worldline-unified.css"]').count(),1,'HAMMER references the unified design system');
   assert.equal(await page.evaluate(()=>document.body.classList.contains('wl-unified')),true,'HAMMER uses same design tokens');
   await page.locator('.hc-nav .wl-more summary').click();
   assert.equal(await page.locator('.hc-nav .wl-menu a[href="index.html#journal"]').count(),1,'journal accessible on HAMMER');
   await page.locator('.hc-nav .wl-more summary').click();

   assert.equal(await page.locator('#hp-score').innerText(),String(ledger.editorialMeter.score),'central science gauge must be bound to ledger');
   assert.equal(await page.locator('#hp-findings').innerText(),String(ledger.entries.length));
   assert.equal(await page.locator('#hp-movement-count').innerText(),String(ledger.scientificMovements.length));
   assert.equal(await page.locator('#hp-sources').innerText(),String(library.works.length));
   assert.equal(await page.locator('#hp-round').innerText(),sessions.roundLog.at(-1).id);
   assert.equal(await page.locator('#hp-notes').innerText(),String(JSON.parse(fs.readFileSync(path.join(root,'data/reading-notes.json'),'utf8')).notes.length),'honest notes count from source');
   assert.equal(await page.locator('#hp-labs').innerText(),String(JSON.parse(fs.readFileSync(path.join(root,'data/research.json'),'utf8')).disciplines.length),'nine live lab paths');
   assert.equal(await page.locator('.hc-stat').count(),6,'six metrics in sketch');
   assert.equal(await page.locator('.hc-flow li').count(),6,'six genuinely described scientific method steps');
   assert.ok(await page.locator('.hc-hero-picture img').count()===1,'hero hammer illustration');
   assert.ok(await page.locator('.hc-compass-card').count()===1,'visible dedicated editorial meter');
   assert.equal(await page.locator('#hp-score').innerText(),String(ledger.editorialMeter.score),'design must NEVER replace true source score with sketch fictitious 56');
      assert.ok(await page.locator('.hp-movement').count()>=6,'real movements from source');
   await page.locator('#hp-movements-more').click();
   assert.equal(await page.locator('#hp-movements-more').getAttribute('aria-expanded'),'true');
   assert.ok(await page.locator('.hp-movement').count()>=6,'older movements remain accessible');
   await page.locator('#hp-rounds-more').click();
   assert.equal(await page.locator('#hp-rounds-more').getAttribute('aria-expanded'),'true');
   assert.match(await page.locator('#hp-movement-feed').innerText(),/MOVE-012/,'newest empirical model movement');
   assert.ok(await page.locator('.hp-round').count()>=6,'versioned work checkpoints');
   assert.ok(await page.locator('a[href="hammer.html"][aria-current="page"]').count()===1,'navigation dedicated page');
   assert.ok(await page.locator('img[src="assets/hammer-art.svg"]').evaluate(img=>img.complete&&img.naturalWidth>0),'research forge picture loads');
   assert.match(await page.locator('.hp-requirements').innerText(),/Predict different records/,'explicit real-data ontology test');
   assert.match(await page.locator('.hp-muted').innerText(),/not a measured probability/,'no invented central confidence');
   assert.ok((await page.locator('#hp-freshness').innerText()).includes('Published data checked'),'dynamic GitHub data freshness');
   const challenge=page.locator('#hammer-design');await challenge.selectOption('HM-002');
   assert.match(await page.locator('#hammer-outcome').innerText(),/Jensen/,'embedded HAMMER forge responds');
   await page.locator('#hp-refresh').click();
   await page.waitForFunction(()=>!document.querySelector('#hp-refresh')?.disabled);
   assert.equal(await page.locator('#hp-score').innerText(),String(ledger.editorialMeter.score),'refresh never fakes movement');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
   assert.equal(overflow,false,'no horizontal overflow '+vp.name);
   assert.equal(errors.length,0,'browser errors: '+errors.join('; '));
   console.log('PASS HAMMER page '+vp.name+': SVG picture, source-bound '+ledger.scientificMovements.length+' movements, editorial score, updated versioned research, live refresh, working experiment forge, responsive.');
   await page.close();
  }
 }catch(e){console.error('FAIL HAMMER standalone page:',e.stack||e);process.exitCode=1}
 finally{if(browser)await browser.close();server.kill('SIGTERM')}
})();

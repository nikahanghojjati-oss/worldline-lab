#!/usr/bin/env node
'use strict';
// Automated WCAG audit only. Does not replace human keyboard, iOS Safari or screen-reader review.
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..'),port=Number(process.env.WORLDLINE_AXE_PORT||8767),url='http://127.0.0.1:'+port+'/';
const labs=JSON.parse(fs.readFileSync(path.join(root,'data/research.json'),'utf8')).disciplines.map(x=>x.slug);
const latest=JSON.parse(fs.readFileSync(path.join(root,'data/sessions.json'),'utf8')).roundLog.at(-1).id;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
const sleep=ms=>new Promise(done=>setTimeout(done,ms));
async function ready(){for(let i=0;i<80;i++){try{const r=await fetch(url);if(r.ok)return}catch{}await sleep(250)}throw Error('local static server unavailable')}
async function scan(page,name,include){
 const axe=new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']);
 if(include)axe.include(include);
 const report=await axe.analyze();
 const serious=report.violations.filter(x=>['critical','serious'].includes(x.impact));
 console.log(JSON.stringify({scan:name,violations:report.violations.map(x=>({id:x.id,impact:x.impact,description:x.help,nodes:x.nodes.length,examples:x.nodes.slice(0,5).map(n=>({target:n.target.join(' '),detail:(n.any||[]).filter(c=>c.id==='color-contrast').map(c=>({contrast:c.data?.contrastRatio,expected:c.data?.expectedContrastRatio,fg:c.data?.fgColor,bg:c.data?.bgColor,summary:c.message})).slice(0,1)}))})),serious:serious.length}));
 return serious.map(x=>name+': '+x.id+' ('+x.nodes.map(n=>n.target.join(' ')).slice(0,3).join('; ')+')');
}
(async()=>{
 let browser;
 try{
  await ready();browser=await chromium.launch({headless:true});const issues=[];
  const routes=['home','dashboard','ledger','journal','disciplines','atlas','library','sessions'];
  for(const [viewportName,width,height] of [['desktop',1440,900],['phone-width',390,844]]){
   const context=await browser.newContext({viewport:{width,height}});
   const page=await context.newPage();
   await page.goto(url+'#home',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(r=>document.querySelector('#research-round-banner')?.textContent?.includes(r),latest,{timeout:15000});
   for(const route of routes){
    await page.evaluate(r=>location.hash='#'+r,route);
    await page.waitForFunction(r=>document.querySelector('.page.active')?.dataset.page===r,route);
    issues.push(...await scan(page,viewportName+'/'+route));
   }
   for(const slug of ['physics','quantum-computing','chemistry']){
    if(!labs.includes(slug))continue;
    for(const room of ['reading','interactive']){
     await page.evaluate(({slug,room})=>location.hash='#disciplines?lab='+slug+'&room='+room,{slug,room});
     await page.waitForFunction(s=>document.querySelector('#lab-detail')?.hidden===false&&location.hash.includes(s),slug,{timeout:15000});
     if(room==='interactive')await page.waitForFunction(()=>!!document.querySelector('#lab-control'));
     issues.push(...await scan(page,viewportName+'/'+slug+'/'+room,'#lab-detail'));
    }
   }
   await context.close();
  }
  if(issues.length)throw Error('Severe automated WCAG findings:\n'+issues.join('\n'));
  console.log('PASS automated axe WCAG A/AA serious/critical: eight routes and six lab views, desktop and phone widths. Human/physical-device review NOT performed.');
 }catch(e){console.error(e.stack||e);process.exitCode=1}
 finally{if(browser)await browser.close();server.kill('SIGTERM')}
})();

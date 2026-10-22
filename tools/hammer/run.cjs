#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const {forge}=require('../../assets/hammer-core.js');
const file=path.join(__dirname,'../../data/hammer.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const report=forge(data);
if(process.argv.includes('--check')){
 if(report.centralVerdict!=='UNRESOLVED'||report.proposedLedgerScoreChange!==0)throw Error('HAMMER may not move the central ledger from theory alone');
 for(const d of report.results)if(!Number.isFinite(d.robustJSBits)||d.robustJSBits<0||d.robustJSBits>1)throw Error('invalid JSD '+d.id);
}
console.log(JSON.stringify(report,null,2));

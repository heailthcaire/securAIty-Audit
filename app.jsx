const { useState, useEffect, useMemo, useCallback } = React;

const QUESTIONS = window.SECUREASSESS_QUESTIONS;
const SCORING = window.SECUREASSESS_SCORING;
const RECS = window.SECUREASSESS_RECOMMENDATIONS;
const SERVICES = window.SECUREASSESS_SERVICES;
const FRAMEWORKS = window.SECUREASSESS_FRAMEWORKS;
const NAV = window.SECUREASSESS_NAV;

/* ── Helpers ──────────────────────────────────── */
function getMaturity(score) {
  return SCORING.maturityLevels.find(l => score >= l.min && score <= l.max) || SCORING.maturityLevels[0];
}
function shouldSkipPillar(p, prof) {
  if (!p.skipCondition) return false;
  return prof[p.skipCondition.field] === p.skipCondition.equals;
}
function shouldSkipQ(q, prof, ans) {
  if (!q.conditionalOn) return false;
  const c = q.conditionalOn;
  const v = prof[c.field] || ans[c.field];
  if (c.notEqual) return Array.isArray(c.notEqual) ? c.notEqual.includes(v) : v === c.notEqual;
  if (c.includesAny) return !c.includesAny.includes(v);
  if (c.equals) return v !== c.equals;
  return false;
}
function getServiceById(id) {
  for (const p of SERVICES.pillars) {
    const s = p.services.find(s => s.id === id);
    if (s) return {...s, pillar: p.title};
  }
  return null;
}

/* ── Scoring Engine ───────────────────────────── */
function computeScores(ans, prof) {
  const res = {pillars:{}, overall:0, maturity:null, gaps:[], idkCount:0};
  const ind = prof.cp_industry || 'other';
  const sz = prof.cp_size || '26-100';
  const iw = SCORING.industryWeightOverrides[ind] || {};
  const sw = SCORING.sizeWeightOverrides[sz] || {};

  QUESTIONS.pillars.forEach(pil => {
    if (shouldSkipPillar(pil, prof)) return;
    let tw=0, ws=0, cnt=0, idk=0;
    pil.questions.forEach(q => {
      if (shouldSkipQ(q, prof, ans)) return;
      const a = ans[q.id];
      if (a === undefined) return;
      const opt = q.options.find(o => o.value === a);
      if (!opt || opt.score === null) return;
      let sc = opt.score === -1 ? (idk++, res.idkCount++, SCORING.idkPenalty.scoreValue) : opt.score;
      let w = (q.weight||5) * (iw[pil.id]||1) * (sw[pil.id]||1);
      tw += w; ws += sc*w; cnt++;
      if (sc < 50) res.gaps.push({pillar:pil.id, pillarTitle:pil.title, qId:q.id, qText:q.text, score:sc, isIdk:opt.score===-1});
    });
    const ps = tw>0 ? Math.round(ws/tw) : 0;
    const bm = SCORING.industryBenchmarks[ind]?.[pil.id] || 40;
    res.pillars[pil.id] = {score:ps, benchmark:bm, count:cnt, idkCount:idk, maturity:getMaturity(ps), icon:pil.icon, title:pil.title};
  });

  const scores = Object.values(res.pillars).map(p=>p.score);
  res.overall = scores.length > 0 ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  res.maturity = getMaturity(res.overall);
  res.gaps.sort((a,b)=>a.score-b.score);
  return res;
}

function getTriggeredRecs(ans, prof) {
  return RECS.filter(rec => {
    const a = ans[rec.triggerQuestion];
    if (!a) return false;
    const pil = QUESTIONS.pillars.find(p=>p.id===rec.pillar);
    if (!pil) return false;
    const q = pil.questions.find(q=>q.id===rec.triggerQuestion);
    if (!q) return false;
    const opt = q.options.find(o=>o.value===a);
    if (!opt || opt.score===null) return false;
    const sc = opt.score===-1 ? SCORING.idkPenalty.scoreValue : opt.score;
    return sc < rec.triggerScoreBelow;
  });
}

/* ── Radar Chart SVG ──────────────────────────── */
function RadarChart({data, benchmarks, size=300}) {
  const cx=size/2, cy=size/2, r=size*0.36, n=data.length;
  const step=(Math.PI*2)/n;
  const pt=(i,v)=>{const a=step*i-Math.PI/2; const d=(v/100)*r; return {x:cx+d*Math.cos(a),y:cy+d*Math.sin(a)};};
  const mkPath=(pts)=>pts.map((p,i)=>(i===0?'M':'L')+p.x+','+p.y).join(' ')+'Z';
  const rings=[20,40,60,80,100];
  const dp=data.map((d,i)=>pt(i,d.score));
  const bp=benchmarks?benchmarks.map((b,i)=>pt(i,b)):[];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="gauge-svg">
      {rings.map(ring=>{const pts=Array.from({length:n},(_,i)=>pt(i,ring));return <path key={ring} d={mkPath(pts)} fill="none" stroke="var(--border-subtle)" strokeWidth="1" opacity=".5"/>;})}
      {data.map((_,i)=>{const p=pt(i,100);return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border-subtle)" strokeWidth="1" opacity=".3"/>;})}
      {bp.length>0 && <path d={mkPath(bp)} fill="rgba(139,158,194,.08)" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4"/>}
      <path d={mkPath(dp)} fill="rgba(56,189,248,.12)" stroke="var(--accent)" strokeWidth="2"/>
      {dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill="var(--accent)" stroke="var(--bg-root)" strokeWidth="2"/>)}
      {data.map((d,i)=>{const lp=pt(i,120);return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="var(--font-body)" fontWeight="600">{d.icon} {d.score}</text>;})}
    </svg>
  );
}

/* ── Score Gauge ──────────────────────────────── */
function ScoreGauge({score, maturity}) {
  const rad=80, circ=Math.PI*rad, off=circ-(score/100)*circ;
  return (
    <div className="gauge-container fade-up">
      <svg width="200" height="120" viewBox="0 0 200 120" className="gauge-svg">
        <path d={`M ${100-rad} 100 A ${rad} ${rad} 0 0 1 ${100+rad} 100`} fill="none" stroke="var(--border-subtle)" strokeWidth="10" strokeLinecap="round"/>
        <path d={`M ${100-rad} 100 A ${rad} ${rad} 0 0 1 ${100+rad} 100`} fill="none" stroke={maturity.color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} style={{transition:'stroke-dashoffset 1s ease'}}/>
      </svg>
      <div className="gauge-score" style={{color:maturity.color, marginTop:-40}}>{score}</div>
      <div className="gauge-maturity" style={{color:maturity.color}}>{maturity.label}</div>
      <div className="gauge-label">{maturity.description}</div>
    </div>
  );
}

/* ── Welcome ──────────────────────────────────── */
function Welcome({onStart}) {
  return (
    <div className="welcome-container fade-up">
      <div className="welcome-icon">🛡</div>
      <h1 className="welcome-title">Cybersecurity<br/><span>Readiness Assessment</span></h1>
      <p className="welcome-desc">Evaluate your organization's security posture across 6 critical domains in about 12 minutes. Get a personalized maturity score, actionable recommendations mapped to industry frameworks, and guidance on closing your gaps.</p>
      <div className="welcome-features">
        {['40+ expert questions','NIST & CIS aligned','Industry benchmarks','Free & actionable'].map(f=>(
          <div key={f} className="welcome-feat"><span className="welcome-feat-icon">✓</span> {f}</div>
        ))}
      </div>
      <button className="btn btn-primary btn-lg" onClick={onStart}>Begin Assessment →</button>
      <div className="powered-by">Powered by <a href="https://HEaiLTHCaiRE.ai/" target="_blank" rel="noopener">HEaiLTHCaiRE.ai</a> — Identify. Detect. Protect.</div>
    </div>
  );
}

/* ── Survey Panel ─────────────────────────────── */
function SurveyPanel({answers, setAnswers, profile, setProfile, onComplete}) {
  const [phase, setPhase] = useState('profile');
  const [qIdx, setQIdx] = useState(0);

  const activePillars = QUESTIONS.pillars.filter(p=>!shouldSkipPillar(p,profile));
  const curPillar = phase==='profile'?null:activePillars.find(p=>p.id===phase);

  const curQuestions = useMemo(()=>{
    if(phase==='profile') return QUESTIONS.companyProfile.questions;
    if(!curPillar) return [];
    return curPillar.questions.filter(q=>!shouldSkipQ(q,profile,answers));
  },[phase,curPillar,profile,answers]);

  const q = curQuestions[qIdx];

  const totalQ = QUESTIONS.companyProfile.questions.length + activePillars.reduce((s,p)=>s+p.questions.filter(q=>!shouldSkipQ(q,profile,answers)).length,0);
  const answered = Object.keys(profile).length + Object.keys(answers).length;
  const progress = Math.round((answered/totalQ)*100);

  const completedPillars = activePillars.filter(p=>{
    const qs=p.questions.filter(q=>!shouldSkipQ(q,profile,answers));
    return qs.length>0 && qs.every(q=>answers[q.id]!==undefined);
  });

  const handleAns = (qId, val) => {
    if(phase==='profile'){
      const qDef = QUESTIONS.companyProfile.questions.find(q=>q.id===qId);
      if(qDef.type==='multi_select'){
        const cur = profile[qId]||[];
        setProfile(prev=>({...prev,[qId]:cur.includes(val)?cur.filter(v=>v!==val):[...cur,val]}));
      } else {
        setProfile(prev=>({...prev,[qId]:val}));
        setTimeout(()=>{if(qIdx<curQuestions.length-1)setQIdx(i=>i+1);},300);
      }
    } else {
      setAnswers(prev=>({...prev,[qId]:val}));
      setTimeout(()=>{if(qIdx<curQuestions.length-1)setQIdx(i=>i+1);},300);
    }
  };

  const goNext = () => {
    if(qIdx<curQuestions.length-1){setQIdx(i=>i+1);return;}
    if(phase==='profile'){if(activePillars.length>0){setPhase(activePillars[0].id);setQIdx(0);}}
    else{const idx=activePillars.findIndex(p=>p.id===phase);if(idx<activePillars.length-1){setPhase(activePillars[idx+1].id);setQIdx(0);}else{onComplete();}}
  };
  const goPrev = () => {
    if(qIdx>0){setQIdx(i=>i-1);return;}
    if(phase==='profile')return;
    const idx=activePillars.findIndex(p=>p.id===phase);
    if(idx>0){const pp=activePillars[idx-1];const pqs=pp.questions.filter(q=>!shouldSkipQ(q,profile,answers));setPhase(pp.id);setQIdx(pqs.length-1);}
    else{setPhase('profile');setQIdx(QUESTIONS.companyProfile.questions.length-1);}
  };
  const jumpTo = (id) => {setPhase(id);setQIdx(0);};

  if(!q) return null;

  const isMulti = q.type==='multi_select';
  const curVal = phase==='profile'?profile[q.id]:answers[q.id];
  const isAns = curVal!==undefined;
  const isLast = qIdx===curQuestions.length-1;
  const isLastPillar = phase!=='profile' && activePillars.findIndex(p=>p.id===phase)===activePillars.length-1;

  return (
    <div className="content-area centered">
      <div className="content-inner fade-up">
        <div style={{marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <span style={{fontSize:12,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>{progress}% complete</span>
            <span style={{fontSize:12,color:'var(--text-muted)'}}>~{Math.max(1,Math.round((totalQ-answered)*0.3))} min left</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:progress+'%'}}/></div>
        </div>

        <div className="pillar-tabs">
          <button className={`pillar-tab ${phase==='profile'?'active':Object.keys(profile).length>=4?'completed':''}`} onClick={()=>jumpTo('profile')}>
            {Object.keys(profile).length>=4 && <span className="tab-check">✓</span>} 🏢 Profile
          </button>
          {activePillars.map(p=>(
            <button key={p.id} className={`pillar-tab ${phase===p.id?'active':completedPillars.includes(p)?'completed':''}`} onClick={()=>jumpTo(p.id)}>
              {completedPillars.includes(p) && <span className="tab-check">✓</span>} {p.icon} {p.title}
            </button>
          ))}
        </div>

        {phase!=='profile' && curPillar && (
          <div style={{fontSize:12,color:'var(--text-muted)',fontFamily:'var(--font-mono)',marginBottom:8}}>{curPillar.icon} {curPillar.title}</div>
        )}

        <div className="question-counter">Question {qIdx+1} of {curQuestions.length}</div>
        <div className="question-text">{q.text}</div>
        {q.frameworkRef && <div className="question-framework">{q.frameworkRef}</div>}

        <div style={{marginTop:16}}>
          {q.options.map(opt=>{
            const sel = isMulti ? (curVal||[]).includes(opt.value) : curVal===opt.value;
            return (
              <div key={opt.value} className={`survey-option ${isMulti?'multi':''} ${sel?'selected':''}`} onClick={()=>handleAns(q.id,opt.value)}>
                <div className={isMulti?'option-checkbox':'option-radio'}/><span className="option-label">{opt.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:24}}>
          <button className="btn btn-ghost" onClick={goPrev} disabled={phase==='profile'&&qIdx===0}>← Back</button>
          <div style={{display:'flex',gap:8}}>
            {isMulti && isAns && <button className="btn" onClick={goNext}>Continue →</button>}
            {isLast && isLastPillar && isAns && <button className="btn btn-primary" onClick={onComplete}>View Results →</button>}
            {isLast && !isLastPillar && isAns && !isMulti && <button className="btn btn-primary" onClick={goNext}>Next Section →</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Results Dashboard ────────────────────────── */
function ResultsPanel({scores}) {
  const pillarData = QUESTIONS.pillars.map(p=>scores.pillars[p.id]).filter(Boolean);
  const benchmarks = pillarData.map(p=>p.benchmark);

  return (
    <div className="content-area centered">
      <div className="content-wide fade-up">
        <h1 className="section-heading">Your Security Posture</h1>
        <p className="section-sub">Overall assessment based on your responses, weighted by industry and organizational context.</p>

        <div className="grid-2" style={{gap:32,alignItems:'start'}}>
          <div>
            <ScoreGauge score={scores.overall} maturity={scores.maturity}/>
            <div style={{textAlign:'center',marginTop:8}}>
              {scores.idkCount>0 && <div style={{fontSize:12,color:'var(--warning)'}}>⚠ {scores.idkCount} question{scores.idkCount>1?'s':''} answered "I don't know" — these are scored as gaps</div>}
            </div>
          </div>
          <div className="radar-container">
            <RadarChart data={pillarData} benchmarks={benchmarks} size={320}/>
          </div>
        </div>

        <div style={{marginTop:8,marginBottom:8,display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <div style={{fontSize:12,color:'var(--text-muted)',display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:12,height:3,background:'var(--accent)',borderRadius:2,display:'inline-block'}}/> Your Score
          </div>
          <div style={{fontSize:12,color:'var(--text-muted)',display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:12,height:3,background:'var(--text-muted)',borderRadius:2,display:'inline-block',borderTop:'1px dashed var(--text-muted)'}}/> Industry Avg
          </div>
        </div>

        <div className="card" style={{marginTop:24}}>
          <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginBottom:16}}>Score by Domain</h3>
          {pillarData.map(p=>(
            <div key={p.title} className="score-row">
              <div className="score-icon">{p.icon}</div>
              <div className="score-info">
                <div className="score-name">{p.title}</div>
                <div className="score-bar-bg">
                  <div className="score-bar-fill" style={{width:p.score+'%',background:p.maturity.color}}/>
                </div>
                <div className="score-benchmark">Industry avg: {p.benchmark}</div>
              </div>
              <div className="score-value" style={{color:p.maturity.color}}>{p.score}</div>
            </div>
          ))}
        </div>

        {scores.gaps.length>0 && (
          <div className="card" style={{marginTop:16,borderColor:'var(--warning)',borderLeftWidth:4}}>
            <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginBottom:12,color:'var(--warning)'}}>⚠ Top Critical Gaps</h3>
            {scores.gaps.slice(0,5).map((g,i)=>(
              <div key={i} style={{padding:'8px 0',borderBottom:i<4?'1px solid var(--border-subtle)':'none',fontSize:13}}>
                <span style={{color:'var(--text-muted)',fontFamily:'var(--font-mono)',marginRight:8}}>{g.pillarTitle}</span>
                {g.qText}
                {g.isIdk && <span style={{marginLeft:8,fontSize:11,color:'var(--warning)',fontFamily:'var(--font-mono)'}}>IDK</span>}
              </div>
            ))}
          </div>
        )}

        <div className="powered-by" style={{marginTop:24,textAlign:'center'}}>
          Need help improving your score? <a href="https://cybersecandi.com/" target="_blank" rel="noopener">CyberSecAndI</a> can help you close these gaps.
        </div>
      </div>
    </div>
  );
}

/* ── Recommendations Panel ────────────────────── */
function RecsPanel({recs}) {
  const [filter, setFilter] = useState('all');
  const sevOrder = {critical:0,high:1,medium:2,low:3};
  const sorted = [...recs].sort((a,b)=>(sevOrder[a.severity]||9)-(sevOrder[b.severity]||9));
  const filtered = filter==='all'?sorted:filter==='quick'?sorted.filter(r=>r.effort==='quick_win'):sorted.filter(r=>r.severity===filter);

  return (
    <div className="content-area centered">
      <div className="content-wide fade-up">
        <h1 className="section-heading">Recommendations</h1>
        <p className="section-sub">{recs.length} actionable recommendations based on your gaps, prioritized by severity and effort.</p>

        <div className="filter-bar">
          {[{k:'all',l:'All ('+recs.length+')'},{k:'critical',l:'Critical'},{k:'high',l:'High'},{k:'medium',l:'Medium'},{k:'low',l:'Low'},{k:'quick',l:'⚡ Quick Wins'}].map(f=>(
            <button key={f.k} className={`filter-chip ${filter===f.k?'active':''}`} onClick={()=>setFilter(f.k)}>{f.l}</button>
          ))}
        </div>

        {filtered.map(rec=>{
          const svc = getServiceById(rec.serviceId);
          return (
            <div key={rec.id} className={`rec-card sev-${rec.severity}`}>
              <div className="rec-header">
                <div className="rec-title">{rec.title}</div>
                <div className="rec-badges">
                  <span className={`badge badge-${rec.severity}`}>{rec.severity}</span>
                  <span className={`badge badge-${rec.effort==='quick_win'?'quick':rec.effort==='moderate'?'moderate':'major'}`}>
                    {rec.effort==='quick_win'?'Quick Win':rec.effort==='moderate'?'Moderate':'Major'}
                  </span>
                  {rec.frameworkRef && <span className="badge badge-framework">{rec.frameworkRef}</span>}
                </div>
              </div>
              <div className="rec-desc">{rec.description}</div>
              <div className="rec-action"><strong>Action: </strong>{rec.action}</div>
              {svc && (
                <a className="rec-cta" href="https://cybersecandi.com/" target="_blank" rel="noopener">
                  CyberSecAndI: {svc.name} →
                </a>
              )}
            </div>
          );
        })}

        {filtered.length===0 && (
          <div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
            <div style={{fontSize:32,marginBottom:12}}>✅</div>
            <div>No recommendations match this filter.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Services Panel ───────────────────────────── */
function ServicesPanel({recs}) {
  const matchedServiceIds = new Set(recs.map(r=>r.serviceId));

  return (
    <div className="content-area centered">
      <div className="content-wide fade-up">
        <div style={{textAlign:'center',marginBottom:32}}>
          <h1 className="section-heading">CyberSecAndI Services</h1>
          <p className="section-sub">Services matched to your specific gaps. Highlighted services address weaknesses found in your assessment.</p>
          <a href="https://cybersecandi.com/" target="_blank" rel="noopener" className="btn btn-primary" style={{marginTop:8}}>
            Visit cybersecandi.com →
          </a>
        </div>

        {SERVICES.pillars.map(pillar=>(
          <div key={pillar.id} className="pillar-section">
            <div className="pillar-section-header">
              <h3>{pillar.title}</h3>
              <span style={{fontSize:12,color:'var(--text-muted)',flex:1,marginLeft:12}}>{pillar.description.slice(0,120)}...</span>
            </div>
            <div className="svc-grid">
              {pillar.services.map(svc=>{
                const isMatched = matchedServiceIds.has(svc.id);
                const matchingRecs = recs.filter(r=>r.serviceId===svc.id);
                return (
                  <div key={svc.id} className={`svc-card ${isMatched?'matched':'covered'}`}>
                    <div className="svc-icon">{svc.icon}</div>
                    <div className="svc-name">{svc.name}</div>
                    <div className="svc-desc">{svc.description}</div>
                    {isMatched ? (
                      <div>
                        <div className="svc-gaps">⚠ Addresses {matchingRecs.length} gap{matchingRecs.length>1?'s':''} in your assessment</div>
                        <a className="rec-cta" href="https://cybersecandi.com/" target="_blank" rel="noopener">Learn More →</a>
                      </div>
                    ) : (
                      <div className="svc-covered">✓ You're covered here</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="contact-card">
          <h3>Ready to strengthen your security?</h3>
          <p style={{color:'var(--text-secondary)',marginBottom:20,lineHeight:1.6}}>
            Our team at CyberSecAndI can help you implement these recommendations. We offer free initial consultations to discuss your assessment results and build a tailored remediation roadmap.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="https://cybersecandi.com/" target="_blank" rel="noopener" className="btn btn-primary">Request Consultation →</a>
            <a href="https://cybersecandi.com/" target="_blank" rel="noopener" className="btn">Visit Our Website</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Export Panel ──────────────────────────────── */
function ExportPanel({answers, profile, scores, recs}) {
  const doExport = (type) => {
    const data = {
      meta:{exported:new Date().toISOString(),tool:'securAIty-Audit v1.0',poweredBy:'HEaiLTHCaiRE.ai — https://heailthcaire.ai/'},
      companyProfile:profile, answers, scores:{overall:scores.overall,maturity:scores.maturity.label,pillars:scores.pillars},
      recommendations:recs.map(r=>({title:r.title,severity:r.severity,effort:r.effort,action:r.action,framework:r.frameworkRef}))
    };
    let content, ext, mime;
    if(type==='js'){
      content = 'window.SECUREASSESS_RESULTS = '+JSON.stringify(data,null,2)+';';
      ext='js'; mime='application/javascript';
    } else {
      content = JSON.stringify(data,null,2);
      ext='json'; mime='application/json';
    }
    const blob = new Blob([content],{type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`secureassess-report-${Date.now()}.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    const w = window.open('','_blank');
    const pillarRows = Object.values(scores.pillars).map(p=>`<tr><td>${p.icon} ${p.title}</td><td><strong style="color:${p.maturity.color}">${p.score}/100</strong></td><td>${p.maturity.label}</td><td>${p.benchmark}</td></tr>`).join('');
    const recRows = recs.map(r=>`<tr><td><span style="color:${r.severity==='critical'?'#f43f5e':r.severity==='high'?'#f59e0b':'#8b9ec2'}">${r.severity.toUpperCase()}</span></td><td><strong>${r.title}</strong><br/><small>${r.action}</small></td><td>${r.frameworkRef||''}</td></tr>`).join('');
    w.document.write(`<!DOCTYPE html><html><head><title>securAIty-Audit Report</title><style>body{font-family:system-ui;max-width:900px;margin:0 auto;padding:40px;color:#1a1a2e}h1{color:#0ea5e9}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#f5f5f5}small{color:#666}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #0ea5e9;text-align:center;color:#666}</style></head><body>
    <h1>🛡 Cybersecurity Readiness Assessment Report</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    <h2>Overall Score: <span style="color:${scores.maturity.color}">${scores.overall}/100 — ${scores.maturity.label}</span></h2>
    <p>${scores.maturity.description}</p>
    <h2>Score by Domain</h2>
    <table><thead><tr><th>Domain</th><th>Score</th><th>Maturity</th><th>Industry Avg</th></tr></thead><tbody>${pillarRows}</tbody></table>
    <h2>Recommendations (${recs.length})</h2>
    <table><thead><tr><th>Severity</th><th>Recommendation</th><th>Framework</th></tr></thead><tbody>${recRows}</tbody></table>
    <div class="footer"><strong>CyberSecAndI</strong> — Identify. Detect. Protect.<br/><a href="https://cybersecandi.com/">cybersecandi.com</a><br/><small>We can help you implement these recommendations. Contact us for a free consultation.</small></div>
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="content-area centered">
      <div className="content-inner fade-up">
        <h1 className="section-heading">Export Report</h1>
        <p className="section-sub">Save or share your assessment results.</p>

        <div className="export-option" onClick={printReport}>
          <span className="export-icon">🖨</span>
          <div className="export-info"><h4>Print / PDF Report</h4><p>Printable report with scores, recommendations, and CyberSecAndI contact info</p></div>
        </div>
        <div className="export-option" onClick={()=>doExport('js')}>
          <span className="export-icon">📜</span>
          <div className="export-info"><h4>Export as JavaScript</h4><p>window.SECUREASSESS_RESULTS = {'{ ... }'} — portable data file</p></div>
        </div>
        <div className="export-option" onClick={()=>doExport('json')}>
          <span className="export-icon">📋</span>
          <div className="export-info"><h4>Export as JSON</h4><p>Standard JSON format for integration or archival</p></div>
        </div>
      </div>
    </div>
  );
}

/* ── Main App ─────────────────────────────────── */
function App() {
  const [view, setView] = useState('welcome'); // welcome, survey, results, recommendations, services, export
  const [profile, setProfile] = useState({});
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const scores = useMemo(()=>completed?computeScores(answers,profile):null,[answers,profile,completed]);
  const recs = useMemo(()=>completed?getTriggeredRecs(answers,profile):[],[answers,profile,completed]);

  const handleComplete = () => { setCompleted(true); setView('results'); };
  const handleStart = () => setView('survey');

  const navClick = (id) => {
    const item = NAV.find(n=>n.id===id);
    if(!item||!item.enabled) return;
    if(item.requiresCompletion && !completed) return;
    setView(id);
  };

  const renderContent = () => {
    switch(view) {
      case 'welcome': return <Welcome onStart={handleStart}/>;
      case 'survey': return <SurveyPanel answers={answers} setAnswers={setAnswers} profile={profile} setProfile={setProfile} onComplete={handleComplete}/>;
      case 'results': return scores ? <ResultsPanel scores={scores}/> : null;
      case 'recommendations': return <RecsPanel recs={recs}/>;
      case 'services': return <ServicesPanel recs={recs}/>;
      case 'export': return <ExportPanel answers={answers} profile={profile} scores={scores} recs={recs}/>;
      default: return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)'}}>
          <div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>🚧</div><div>Coming in Phase 2</div></div>
        </div>
      );
    }
  };

  return (
    <div className="app">
      <div className="left-nav">
        <div className="nav-logo">SA</div>
        {NAV.map(item=>{
          const isActive = view===item.id;
          const isLocked = !item.enabled || (item.requiresCompletion && !completed);
          return (
            <button key={item.id} className={`nav-item ${isActive?'active':''} ${!item.enabled?'disabled':isLocked?'locked':''}`}
              onClick={()=>navClick(item.id)}>
              {item.icon}
              <span className="nav-tooltip">{item.label}{!item.enabled?' (Phase 2)':isLocked?' (Complete survey first)':''}</span>
            </button>
          );
        })}
        <div className="nav-spacer"/>
        <div className="nav-brand">securAIty-Audit</div>
      </div>
      <div className="main">
        <div className="top-bar">
          <div className="top-bar-title">securAIty<span>-Audit</span></div>
          <div className="top-bar-divider"/>
          <div className="top-bar-sub">CYBERSECURITY READINESS ASSESSMENT</div>
          <div className="top-bar-right">
            {completed && <span style={{fontSize:12,fontFamily:'var(--font-mono)',color:scores?.maturity?.color}}>Score: {scores?.overall}/100 — {scores?.maturity?.label}</span>}
            <a href="https://cybersecandi.com/" target="_blank" rel="noopener" className="top-bar-link">🛡 cybersecandi.com ↗</a>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

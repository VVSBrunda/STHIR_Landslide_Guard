
(function(){
 const root=document.getElementById('sthir-login'); if(!root)return;
 let role='District Administration',answer=11;
 const roles=root.querySelectorAll('.sl-role'),challenge=document.getElementById('sl-challenge'),msg=document.getElementById('sl-message');
 function refresh(){const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+1;answer=a+b;challenge.textContent=a+' + '+b+' = ?';document.getElementById('sl-captcha').value='';}
 roles.forEach(btn=>btn.addEventListener('click',()=>{roles.forEach(x=>x.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');role=btn.dataset.role;}));
 document.getElementById('sl-refresh').addEventListener('click',refresh);
 document.getElementById('sl-phone').addEventListener('input',e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,10);});
 document.getElementById('sl-form').addEventListener('submit',e=>{e.preventDefault();const phone=document.getElementById('sl-phone').value.trim();const cap=document.getElementById('sl-captcha').value.trim();if(!/^\d{10}$/.test(phone)){msg.textContent='Please enter a valid 10-digit Indian mobile number.';return;}if(Number(cap)!==answer){msg.textContent='That answer is not correct. Please try the new security check.';refresh();return;}try{sessionStorage.setItem('sthir_demo_role',role);sessionStorage.setItem('sthir_demo_phone','+91 '+phone.slice(0,2)+'******'+phone.slice(-2));}catch(_e){}root.style.display='none';document.body.style.overflow='';window.dispatchEvent(new Event('sthir-login-complete'));setTimeout(()=>{if(window.sthirMap&&window.sthirMap.invalidateSize)window.sthirMap.invalidateSize();window.dispatchEvent(new Event('resize'));},350);});
 refresh();
 document.body.style.overflow='hidden';
})();


/* Extracted inline script */
(function(){const el=document.getElementById('sthirNerMap');if(!el||typeof L==='undefined'){if(el)el.innerHTML='<p style="padding:24px">Interactive mapping requires an internet connection.</p>';return;}const map=L.map('sthirNerMap',{scrollWheelZoom:false}).setView([25.8,93.2],6);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);const data=[['Arunachal Pradesh','Itanagar',27.0844,93.6053,'High',78,'#d93636'],['Assam','Dispur',26.1433,91.7898,'Moderate',56,'#f59e0b'],['Meghalaya','Shillong',25.5788,91.8933,'High',73,'#d93636'],['Manipur','Imphal',24.817,93.9368,'Moderate',48,'#f59e0b'],['Mizoram','Aizawl',23.7271,92.7176,'High',69,'#d93636'],['Nagaland','Kohima',25.6751,94.1086,'Moderate',52,'#f59e0b'],['Tripura','Agartala',23.8315,91.2868,'Low / Safe',24,'#159b68'],['Sikkim','Gangtok',27.3389,88.6065,'Low / Safe',19,'#159b68']];const group=L.featureGroup().addTo(map);data.forEach(p=>{const m=L.circleMarker([p[2],p[3]],{radius:15,color:'#fff',weight:3,fillColor:p[6],fillOpacity:.92}).addTo(group);m.bindPopup('<b>'+p[0]+'</b><br>Capital: '+p[1]+'<br><b style="color:'+p[6]+'">'+p[4]+'</b><br>Demo risk index: '+p[5]+'/100<br><small>Illustrative value only</small>');m.bindTooltip(p[0],{direction:'top',offset:[0,-12]});});map.fitBounds(group.getBounds().pad(.18));setTimeout(()=>map.invalidateSize(),250);})();

/* Extracted inline script */

const areas=[
 {name:"Tawang, Arunachal Pradesh",risk:"High",rain:"Heavy rainfall advisory (sample)",detail:"Steep slopes and intense rainfall can increase instability. Avoid unnecessary travel near cut slopes; report fresh cracks or falling debris.",className:"high"},
 {name:"Dima Hasao, Assam",risk:"High",rain:"Persistent rain / saturated ground (sample)",detail:"Slope saturation may contribute to landslide and road-blockage risk. Follow district advisories and avoid closed stretches.",className:"high"},
 {name:"Kohima, Nagaland",risk:"Moderate",rain:"Intermittent showers (sample)",detail:"Monitor retaining walls and road-cut slopes. Be alert for small slips, rockfall and drainage overflow.",className:"medium"},
 {name:"Churachandpur, Manipur",risk:"High",rain:"Heavy showers possible (sample)",detail:"Remain alert around vulnerable hillside routes. Authorities should verify field reports before issuing route guidance.",className:"high"},
 {name:"East Khasi Hills, Meghalaya",risk:"Moderate",rain:"Rainfall watch (sample)",detail:"Check drainage channels and watch for cracks, seepage or leaning trees. Use official updates before travel.",className:"medium"},
 {name:"Sivasagar, Assam",risk:"Low",rain:"No severe trigger represented (sample)",detail:"Continue routine monitoring. Risk can change rapidly with rainfall, ground conditions and local slope features.",className:"low"}
];

function runRiskPrediction(){
 const rain=Math.max(0,Math.min(500,Number(document.getElementById('rainInput').value)||0));
 const moisture=Math.max(0,Math.min(100,Number(document.getElementById('moistInput').value)||0));
 const slope=Math.max(0,Math.min(90,Number(document.getElementById('slopeInput').value)||0));
 const reports=Math.max(0,Math.min(100,Number(document.getElementById('reportInput').value)||0));
 // Weighted illustrative score, designed for UI demonstration only.
 const score=Math.round(Math.min(100,(Math.min(rain/250,1)*40)+(moisture/100*25)+(Math.min(slope/45,1)*25)+(Math.min(reports/10,1)*10)));
 const level=score>=70?['HIGH','high','Restrict access to vulnerable slopes where authorities advise; verify conditions immediately.']:score>=40?['MODERATE','medium','Increase monitoring and check local advisories, drainage and field reports.']:['LOW','low','Continue routine monitoring; low demo score does not mean there is no danger.'];
 const drivers=[]; if(rain>=100)drivers.push('substantial rainfall');if(moisture>=65)drivers.push('high soil moisture');if(slope>=30)drivers.push('steep terrain');if(reports>=3)drivers.push('multiple field reports');
 document.getElementById('predictionResult').innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><small style="color:var(--muted);font-weight:800">DEMO RISK SCORE</small><div style="font-size:34px;font-weight:900;color:var(--navy)">${score}<span style="font-size:15px"> / 100</span></div></div><span class="risk ${level[1]}" style="font-size:13px;padding:8px 13px">${level[0]} RISK</span></div><div style="height:10px;background:#e6edf0;border-radius:10px;overflow:hidden;margin:12px 0"><div style="width:${score}%;height:100%;background:${score>=70?'#d94b4b':score>=40?'#f4a340':'#12a89d'}"></div></div><p style="margin:0 0 7px;font-size:13px"><b>Model interpretation:</b> ${level[2]}</p><p style="margin:0;color:var(--muted);font-size:12px"><b>Contributing indicators:</b> ${drivers.length?drivers.join(', '):'no indicator crossed the demo trigger levels'}. Score combines rainfall (40%), moisture (25%), slope (25%) and reports (10%).</p>`;
}

function showArea(i){const a=areas[i];document.getElementById('areaDetails').innerHTML=`<div class="area-row"><div><strong>${a.name}</strong><small>${a.rain}</small><p style="font-size:12px;color:#647987;margin:7px 0 0">${a.detail}</p></div><span class="risk ${a.className}">${a.risk} risk</span></div>`}
const roads=[
 {name:"NH-13 · Sela approach (illustrative)",place:"Tawang district",state:"closed",label:"Blocked",reason:"Sample closure: reported debris after heavy rain."},
 {name:"Haflong–Silchar road (illustrative)",place:"Dima Hasao, Assam",state:"closed",label:"Blocked",reason:"Sample closure: slope slip and debris clearance."},
 {name:"Kohima–Mao route (illustrative)",place:"Nagaland border area",state:"caution",label:"Caution",reason:"Sample advisory: wet slope, drive carefully; verify locally."},
 {name:"Shillong–Cherrapunji road (illustrative)",place:"East Khasi Hills, Meghalaya",state:"caution",label:"Caution",reason:"Sample advisory: rain-linked rockfall watch."}
];
function renderRoads(filter){const list=roads.filter(r=>filter==='all'||r.state===filter);document.getElementById('roadList').innerHTML=list.map(r=>`<div class="road"><div><strong>${r.name}</strong><p>${r.place} · ${r.reason}</p></div><span class="${r.state==='closed'?'closed':'caution'}">${r.label}</span></div>`).join('')}
function filterRoads(filter,el){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');renderRoads(filter)}
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'})}
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');scrollToId(b.dataset.scroll)}));
let selectedHelp='';
function openHelp(type){selectedHelp=type;document.getElementById('modalTitle').textContent=`Request ${type}`;document.getElementById('helpIntro').textContent=`This creates a demonstration ${type.toLowerCase()} request on this page only. It will not contact a real response team.`;document.getElementById('helpNotice').classList.remove('show');document.getElementById('helpModal').classList.add('show');document.getElementById('helpLocation').focus()}
function closeHelp(){document.getElementById('helpModal').classList.remove('show')}
document.getElementById('helpModal').addEventListener('click',e=>{if(e.target.id==='helpModal')closeHelp()});
document.getElementById('helpForm').addEventListener('submit',e=>{e.preventDefault();const loc=document.getElementById('helpLocation').value.trim();document.getElementById('helpNotice').textContent=`Demo ${selectedHelp} request noted for ${loc}. No message has been sent to emergency services.`;document.getElementById('helpNotice').classList.add('show')});
document.getElementById('incidentForm').addEventListener('submit',e=>{e.preventDefault();const type=document.getElementById('incidentType').value,loc=document.getElementById('district').value.trim();document.getElementById('reportCount').textContent=Number(document.getElementById('reportCount').textContent)+1;const box=document.createElement('div');box.className='area-row';box.innerHTML=`<div><strong>Report submitted · ${type}</strong><small>${loc} · Prototype confirmation only</small></div><span class="risk medium">Received</span>`;document.getElementById('areaDetails').prepend(box);alert(`Thank you. Your ${type.toLowerCase()} report for ${loc} has been recorded in this page's demo view only. It was not transmitted.`);e.target.reset()});
renderRoads('all');

// Demonstration-only refresh loop: changes mock risk indices to show how a live dashboard could behave.
// No real weather, sensor, satellite, model, or road-authority feed is connected.
const demoDistricts = ["Tawang","Dima Hasao","Churachandpur","East Khasi Hills","Kohima","Sivasagar"];
const demoColors = value => value >= 70 ? "#d94b4b" : value >= 40 ? "#f4a340" : "#12a89d";
function refreshDemoAnalytics(){
  const rows = document.querySelectorAll("#riskBars .bar-row");
  rows.forEach((row, i) => {
    const fill = row.querySelector(".bar-fill");
    const valueEl = row.querySelector(".bar-value");
    const current = parseInt(valueEl.textContent, 10);
    const next = Math.max(8, Math.min(96, current + Math.round((Math.random() - .5) * 8)));
    fill.style.width = next + "%";
    fill.style.background = demoColors(next);
    valueEl.textContent = next;
  });
  document.getElementById("lastUpdated").textContent = "demo refreshed " + new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
setInterval(refreshDemoAnalytics, 12000);
/* =========================================
   STHIR ROLE-BASED DASHBOARD VISIBILITY
   ========================================= */

function showRoleDashboard(role) {
  document.querySelectorAll("[data-role-view]").forEach(section => {
    const allowedRoles = section.dataset.roleView
      .split(",")
      .map(item => item.trim());

    section.hidden = !allowedRoles.includes(role);
  });
}

/* When the login finishes, read the selected role
   and display the matching dashboard. */

window.addEventListener("sthir-login-complete", () => {
  let role = "";

  try {
    role = sessionStorage.getItem("sthir_demo_role") || "";
  } catch (error) {
    console.error("Could not read the selected role:", error);
  }

  if (role) {
    showRoleDashboard(role);
  } else {
    console.warn("No dashboard role was found.");
  }
});


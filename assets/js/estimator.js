(() => {
const packages={one:{name:'One-page website',setup:3000,monthly:149},five:{name:'Up to 5 pages',setup:6500,monthly:500},ten:{name:'Up to 10 pages',setup:12500,monthly:750},shop:{name:'E-commerce',setup:20000,monthly:1150}};
const select=document.getElementById('digital-package');
const money=n=>'R'+n.toLocaleString('en-US');
function render(){
const sale=Date.now()<Date.parse('2026-12-01T00:00:00+02:00');
const p=packages[select.value], discounted=sale&&select.value==='one', setup=discounted?1500:p.setup;
document.getElementById('bf-offer').hidden=!sale;
document.getElementById('setup-cost').textContent=(select.value==='shop'?'From ':'')+money(setup);
document.getElementById('monthly-cost').textContent=money(p.monthly)+'/month';
const saving=document.getElementById('saving');saving.hidden=!discounted;saving.textContent=discounted?'Black Friday: save R1,500 (50% off)':'';
const params=new URLSearchParams({package:select.value});
document.getElementById('estimate-quote').href='contact.html?'+params.toString()+'#quote';
}
select.addEventListener('change',render);
document.getElementById('claim-offer').addEventListener('click',()=>{select.value='one';render();select.focus();});
render();setInterval(render,30000);
})();
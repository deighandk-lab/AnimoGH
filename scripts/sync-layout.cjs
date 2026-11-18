// Node.js standard library only. Run node scripts/sync-layout.cjs from the repository root.
const fs = require('node:fs');
const pages = ["index.html","about.html","services.html","industries.html","portfolio.html","portfolio-apparel.html","portfolio-printing.html","portfolio-web.html","pricing.html","process.html","contact.html","privacy.html"];
const header = "<header id=\"header\"><nav class=\"navbar container\" aria-label=\"Main navigation\">\n    <a href=\"index.html\" class=\"logo\" aria-label=\"Animo Group Holdings home\"><img src=\"assets/images/animo-a.svg\" alt=\"Animo\"></a>\n    <ul class=\"nav-menu\">\n      <li><a href=\"index.html#divisions\">Our Divisions</a></li><li><a href=\"services.html\">Services</a></li><li><a href=\"industries.html\">Who We Help</a></li><li><a href=\"portfolio.html\">Our Work</a></li><li><a href=\"about.html\">About</a></li><li><a href=\"contact.html\">Contact</a></li>\n    </ul>\n    <a href=\"contact.html#quote\" class=\"btn btn-primary nav-cta\">Request a Quote <span aria-hidden=\"true\">↗</span></a>\n    <button class=\"menu-toggle\" aria-label=\"Open navigation menu\" aria-expanded=\"false\">☰</button>\n  </nav></header>";
const footer = "<footer class=\"site-footer red-footer\"><div class=\"container footer-inner\"><a href=\"index.html\" class=\"footer-brand footer-brand-image\" aria-label=\"Animo Group Holdings\"><img loading=\"lazy\" decoding=\"async\" src=\"assets/images/logo-transparent.png\" alt=\"Animo Group Holdings\"></a><p>One group. Many solutions.</p><div class=\"footer-links\"><a href=\"services.html\">Services</a><a href=\"about.html\">About</a><a href=\"contact.html\">Contact</a><a href=\"privacy.html\">Privacy</a></div><small>© Animo Group Holdings. All rights reserved.</small></div></footer>";
const logos = {'portfolio-apparel.html':['assets/images/logo(printing).png','Animo Printing'],'portfolio-printing.html':['assets/images/logo(printing).png','Animo Printing'],'portfolio-web.html':['animo-digital-footer-clean.png','Animo Digital Solutions']};
for(const page of pages){
 const original=fs.readFileSync(page,'utf8');
 const [src,alt]=logos[page]||['assets/images/logo-transparent.png','Animo Group Holdings'];
 const nextHeader=page==='index.html'?header.replace('index.html#divisions','#divisions'):header;
 const nextFooter=footer.replace('assets/images/logo-transparent.png',src).replace('aria-label="Animo Group Holdings"','aria-label="'+alt+'"').replace('alt="Animo Group Holdings"','alt="'+alt+'"');
 if(!/<header\\b[\\s\\S]*?<\\/header>/.test(original)||!/<footer\\b[\\s\\S]*?<\\/footer>/.test(original))throw new Error('Missing layout: '+page);
 const next=original.replace(/<header\\b[\\s\\S]*?<\\/header>/,()=>nextHeader).replace(/<footer\\b[\\s\\S]*?<\\/footer>/,()=>nextFooter);
 if(next!==original){if(process.argv.includes('--check')){console.error('Layout differs: '+page);process.exitCode=1;}else{fs.writeFileSync(page,next);console.log('Updated '+page);}}
}

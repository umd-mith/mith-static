"use strict";(self.webpackChunkmith_static=self.webpackChunkmith_static||[]).push([[21],{760:function(e,t,a){var l=a(4810),n=a(6540);t.A=e=>{let{count:t,path:a}=e;return n.createElement("section",{className:"pagination-wrap"},n.createElement("ul",{className:"pagination"},Array.from({length:t},((e,t)=>n.createElement("li",{className:"page-link",key:`pa${t}`},n.createElement(l.N_,{activeClassName:"active",className:"page-link",key:`pagination-number${t+1}`,to:`/${a}/${0===t?"":t+1}`},t+1))))))}},3626:function(e,t,a){var l=a(6540),n=a(4810),i=a(2532),s=a(6784);t.A=e=>{let{person:t,type:a}=e,r=null;const c=t.group_type&&t.group_type.includes("Staff");c&&(r=t.slug?t.slug:null);let m,o=r?l.createElement(n.N_,{className:"name",id:t.new_id,key:`p-${t.new_id}`,to:`../../people/${r}`,"aria-label":`View ${t.name}'s Profile`,title:`View ${t.name}'s Profile`},t.name):l.createElement("div",{className:"name",id:t.new_id},t.name),d=null;if("director"===a){const e=t.affiliations;if(e&&e[0]){const t=e[0].data,a=t.start?l.createElement("span",{className:"start"},t.start):null,n=t.end?l.createElement("span",{className:"end"},t.end):null;if(t.start&&t.end&&(d=l.createElement("div",{className:"date-span"},"(",a," – ",n,")")),t.start&&!t.end){const e=c?l.createElement(l.Fragment,null," ","– ",l.createElement("span",{className:"end"},"present")):null;d=l.createElement("div",{className:"date-span"},"(",a,e,")")}}}t.affiliations&&(m=t.affiliations.map((e=>{const t=e.data;let n=null,i=null,s=null;return c||("speaker"!==a&&"dialogue"!==a&&"participant"!==a&&"director"!==a||(n=t.title?l.createElement("span",{className:"title"},t.title):null,s=t.department?l.createElement("span",{className:"dept"},t.department):null,i=t.institution?l.createElement("span",{className:"institution"},t.institution):null),"dialogue-index"===a&&(i=t.institution?l.createElement("span",{className:"institution"},t.institution):null)),l.createElement(l.Fragment,{key:t.title},n,s,i)})));let p=null,u=null,h=null,g="";if("speaker"===a||"dialogue"===a||"dialogue-index"===a){const e=l.createElement(s.g,{icon:["fab","twitter"]});if(p=t.twitter?l.createElement("a",{href:`https://twitter.com/${t.twitter}`,className:"twitter",target:"_blank",rel:"noreferrer"},e," ",t.twitter):null,t.headshot){const e=t.headshot.localFiles[0];u=e.childImageSharp?l.createElement(i.G,{image:e.childImageSharp.gatsbyImageData,alt:t.name,className:"headshot"}):l.createElement("img",{src:e.url,alt:`Headshot of ${t.name}`,className:"headshot",style:{objectFit:"cover"}}),g="has-headshot"}}const E=t.bio&&t.bio.childMarkdownRemark?l.createElement("a",{href:`#${t.slug}`,className:"bio-link"},"Read Bio"):null,f=t.bio&&t.bio.childMarkdownRemark?l.createElement("div",{className:"bio",dangerouslySetInnerHTML:{__html:t.bio.childMarkdownRemark.html}}):"";if(t.website){const e=t.website.startsWith("http")?t.website:`http://${t.website}`;h=l.createElement("a",{href:e,target:"_blank",rel:"noreferrer"},"Website")}return"dialogue-index"===a?l.createElement("div",{className:`speaker person ${g}`,id:t.new_id,title:t.name,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m))):"dialogue"===a?l.createElement("span",{className:`speaker person ${g}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,p,h,E))):"speaker"===a?l.createElement("span",{className:`speaker person ${g}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,p,h)),f):"dialogue-index"!==a&&"dialogue"!==a?l.createElement("div",{className:`person ${g}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,d,p,h))):void 0}},5837:function(e,t,a){a.r(t);var l=a(6540),n=a(4810),i=a(3226),s=a(760),r=a(1010),c=a(9899),m=a(3626);const o=e=>{var t;let{item:a,headshots:i}=e;const s="/digital-dialogues/"+a.id+"/",r=a.event_title,o=a.talk_title,d=o||r,p=a.talk_subtitle?l.createElement("h2",{className:"title"},l.createElement(n.N_,{to:s},d,l.createElement("span",{className:"subtitle"},a.talk_subtitle))):l.createElement("h2",{className:"title"},l.createElement(n.N_,{to:s},d)),u=a.location?l.createElement("div",{className:"location"},a.location):"";let h=null,g=null;const E=a.speakers?a.speakers:[];return E.length>0&&(h=E.map(((e,t)=>(null!=e&&e.data&&(e.data.headshot=i[e.data.slug]),l.createElement(m.A,{key:`p${t}`,person:null==e?void 0:e.data,type:"dialogue-index"})))),g=l.createElement("div",{className:"speakers"},h)),l.createElement("article",{className:"post dialogue event",id:null===(t=a.id)||void 0===t?void 0:t.toLowerCase().replace(/-/g,"_"),key:`dialogue-${a.id}`},p,l.createElement("div",{className:"meta"},g,u,l.createElement(c.A,{start:parseInt(a.start)})))};t.default=e=>{let{data:t,pageContext:a}=e;const n=t.allAirtableEvents.nodes,c=t.allAirtableEvents.pageInfo.pageCount,m=a.headshots,d=n.reduce(((e,t)=>{var a;return new Date(null===(a=t.data)||void 0===a?void 0:a.start)>new Date?e.future.unshift(t):e.past.push(t),e}),{future:[],past:[]});return l.createElement(i.A,null,l.createElement(r.A,{title:"MITH Digital Dialogues"}),l.createElement("div",{className:"page-dialogues"},l.createElement("section",{className:"posts dialogues events"},l.createElement("h1",{className:"page-title"},"Digital Dialogues"),l.createElement("p",null,"Digital Dialogues convenes prominent digital humanities, new media, and information technology practitioners to present their field-defining research. The series, which celebrated its 40th season in Spring 2024, invites intellectual exchange around topics critical to the digital humanities. Follow us on social media (",l.createElement("a",{href:"https://twitter.com/UMD_MITH"},"@umd_mith")," on X/Twitter and",l.createElement("a",{href:"https://www.instagram.com/mith_umd"},"@mith_umd")," on Instagram) for more details."),d.future.map((e=>l.createElement(o,{item:e.data,headshots:m,key:e.id}))),l.createElement("h2",{className:"page-title"},"Past Digital Dialogues"),d.past.map((e=>l.createElement(o,{item:e.data,headshots:m,key:e.id})))),l.createElement(s.A,{count:c,path:"digital-dialogues"})))}}}]);
//# sourceMappingURL=component---src-templates-dialogue-index-tsx-157bef858c5cb23f8472.js.map
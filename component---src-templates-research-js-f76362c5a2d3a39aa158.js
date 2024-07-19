"use strict";(self.webpackChunkmith_static=self.webpackChunkmith_static||[]).push([[895],{9600:function(e,t,a){var l=a(6540),r=a(4353),n=a.n(r),s=a(5750),c=a.n(s);n().extend(c());t.A=e=>{let{start:t,end:a,active:r}=e;const s=["YYYY","YYYY-M"];t=n()(t,s),a=a?n()(a,s):"";const c=t?l.createElement("time",{itemProp:"startDate",dateTime:t.format("YYYY-MM")},t.format("MMMM YYYY")):"";let i="";return i="TRUE"===r?a?l.createElement("time",{itemProp:"endDate",dateTime:a.format("YYYY-MM")},a.format("MMMM YYYY")):l.createElement("span",{itemProp:"endDate"},"Present"):a?l.createElement("time",{itemProp:"endDate",dateTime:a.format("YYYY-MM")},a.format("MMMM YYYY")):"",c&&i?l.createElement("span",{className:"time date research-date"},c," – ",i):l.createElement("span",{className:"time date research-date"},c)}},734:function(e,t,a){var l=a(6540);t.A=e=>{let{supporters:t,type:a}=e;const r=t.length>1?`${a.charAt(0).toUpperCase()+a.slice(1)}s`:a.charAt(0).toUpperCase()+a.slice(1),n=`${a}s`;return l.createElement("div",{className:`supporters ${n}`},l.createElement("h2",null,r),l.createElement("ul",null,t.map((e=>{const t=e.data,a="umdlib"!==t.slug&&"Internal"===t.type?"University of Maryland ":"",r=t.website?t.website.startsWith("http")?l.createElement("a",{href:t.website,title:t.name,target:"_blank",rel:"noreferrer"},a,t.name):l.createElement("a",{href:`http://${t.website}`,title:t.name,target:"_blank",rel:"noreferrer"},a,t.name):t.name;return l.createElement("li",{id:t.slug,className:t.type.toLowerCase()},r)}))))}},3151:function(e,t,a){var l=a(6540);t.A=e=>{let{terms:t,type:a}=e;const r=a?l.createElement("h2",null,a.charAt(0).toUpperCase()+a.slice(1)):"";return l.createElement("div",{className:`taxonomy ${a}`},l.createElement("h2",null,r),l.createElement("ul",{className:"terms"},t.map((e=>l.createElement("li",{className:"term"},e.term)))))}},2855:function(e,t,a){a.r(t);var l=a(6540),r=a(4810),n=a(2532),s=a(6852),c=a(2269),i=a(9600),m=a(2496),o=a(8224),d=a(3151),p=a(734),u=a(6784);t.default=e=>{let{pageContext:t}=e,a=l.createElement("h1",{className:"title"},t.title),E="";const h=t.image;console.log(h),h&&h.localFiles&&(a=l.createElement(n.G,{image:h.localFiles[0].childImageSharp.gatsbyImageData,alt:t.title,className:"research-image"})),t.description&&(E=l.createElement("div",{className:"description",dangerouslySetInnerHTML:{__html:t.description.childMarkdownRemark.html}}));const _=t.month_start?`${t.year_start}-${t.month_start}`:t.year_start;let N="";t.year_end&&(N=t.month_end?`${t.year_end}-${t.month_end}`:t.year_end);const v=l.createElement(i.A,{start:_,end:N,active:t.active});let k=null,Y=null;t.participants&&(k=t.participants.map(((e,t)=>l.createElement(o.A,{key:`p${t}`,person:e.data,showTitle:"true",type:"participant"}))),Y=l.createElement("div",{className:"participants"},l.createElement("h2",null,"Participants"),l.createElement("ul",null,k)));let g=null,w=null;if(t.directors){const e=t.directors.length>1?"Directors":"Director";g=t.directors.map((e=>l.createElement(o.A,{person:e.data,showTitle:"true",type:"director"}))),w=l.createElement("div",{className:"directors"},l.createElement("h2",null,e),l.createElement("ul",null,g))}let f=null;if(t.twitter_account||t.twitter_hashtag){const e=l.createElement(u.g,{icon:["fab","twitter"]}),a=t.twitter_account?l.createElement("span",{className:"twitter_acct"},l.createElement("a",{href:`https://twitter.com/${t.twitter_account}`,target:"_blank",rel:"noreferrer"},t.twitter_account)):null,r=t.twitter_hashtag?l.createElement("span",{className:"twitter_hash"},l.createElement("a",{href:`https://twitter.com/hashtag/${t.twitter_hashtag}`,target:"_blank",rel:"noreferrer"},"#",t.twitter_hashtag)):null;f=l.createElement("div",{className:"twitter"},e," ",a," ",r)}let y=null,M=null,$=null;t.linked_links&&(y=t.linked_links.map((e=>{const t=e.data;return $=t.url.startsWith("http")?t.url:`http://${t.url}`,l.createElement("li",{id:t.link_id},l.createElement("a",{href:$,title:t.title,target:"_blank",rel:"noreferrer"},t.title))})),M=l.createElement("div",{className:"links"},l.createElement("h2",null,"Links"),l.createElement("ul",null,y)));const b=t.linked_sponsors&&t.linked_sponsors.length>0?l.createElement(p.A,{supporters:t.linked_sponsors,type:"sponsor"}):"",A=t.linked_partners&&t.linked_partners.length>0?l.createElement(p.A,{supporters:t.linked_partners,type:"partner"}):"";let C=null,D=null;t.linked_events&&(C=t.linked_events.map((e=>{const t=e.data;return l.createElement("li",{id:t.id,className:"event"},l.createElement("h3",{className:"title"},l.createElement(r.N_,{key:`e-${t.id}`,to:`../../events/${t.id}`},t.talk_title||t.event_title)),l.createElement(m.A,{start:t.start,end:t.end}),l.createElement("div",{itemProp:"location",className:"location"},t.location),l.createElement("div",{className:"description"}),l.createElement(r.N_,{className:"button",key:`e-${t.id}`,to:`../../events/${t.id}`},"View Event Details"))})),D=l.createElement("div",{className:"events"},l.createElement("h2",null,"Events"),l.createElement("ul",null,C)));let P=null,T=null;t.linked_posts&&(P=t.linked_posts.map((e=>{const t=e.data;return l.createElement("li",{id:t.slug.toLowerCase().replace(/-/g,"_")},l.createElement("div",{className:"post-title"},l.createElement(r.N_,{key:`n-${t.record_id}`,to:`../../news/${t.slug}`},t.post_title)),l.createElement("div",{className:"meta"},l.createElement("time",{className:"post-date"},t.post_date),l.createElement("div",{className:"author hidden"},t.author_name)))})),T=l.createElement("div",{className:"news"},l.createElement("h2",null,"News"),l.createElement("ul",null,P)));t.disciplines&&(d.A,t.disciplines),t.methods&&(d.A,t.methods);return l.createElement(s.A,null,l.createElement(c.A,{title:t.title}),l.createElement("div",{className:"page-research-item"},l.createElement("section",{className:"research-item"},a,l.createElement("div",{className:"content"},E,D),l.createElement("div",{className:"sidebar metadata"},v,f,w,Y,M,T,A,b))))}}}]);
//# sourceMappingURL=component---src-templates-research-js-f76362c5a2d3a39aa158.js.map
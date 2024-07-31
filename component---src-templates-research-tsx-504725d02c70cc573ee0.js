"use strict";(self.webpackChunkmith_static=self.webpackChunkmith_static||[]).push([[983],{3626:function(e,t,a){var l=a(6540),n=a(4810),r=a(2532),s=a(6784);t.A=e=>{let{person:t,type:a}=e,i=null;const c=t.group_type&&t.group_type.includes("Staff");c&&(i=t.slug?t.slug:null);let m,o=i?l.createElement(n.N_,{className:"name",id:t.new_id,key:`p-${t.new_id}`,to:`../../people/${i}`,"aria-label":`View ${t.name}'s Profile`,title:`View ${t.name}'s Profile`},t.name):l.createElement("div",{className:"name",id:t.new_id},t.name),d=null;if("director"===a){const e=t.affiliations;if(e&&e[0]){const t=e[0].data,a=t.start?l.createElement("span",{className:"start"},t.start):null,n=t.end?l.createElement("span",{className:"end"},t.end):null;if(t.start&&t.end&&(d=l.createElement("div",{className:"date-span"},"(",a," – ",n,")")),t.start&&!t.end){const e=c?l.createElement(l.Fragment,null," ","– ",l.createElement("span",{className:"end"},"present")):null;d=l.createElement("div",{className:"date-span"},"(",a,e,")")}}}t.affiliations&&(m=t.affiliations.map((e=>{const t=e.data;let n=null,r=null,s=null;return c||("speaker"!==a&&"dialogue"!==a&&"participant"!==a&&"director"!==a||(n=t.title?l.createElement("span",{className:"title"},t.title):null,s=t.department?l.createElement("span",{className:"dept"},t.department):null,r=t.institution?l.createElement("span",{className:"institution"},t.institution):null),"dialogue-index"===a&&(r=t.institution?l.createElement("span",{className:"institution"},t.institution):null)),l.createElement(l.Fragment,{key:t.title},n,s,r)})));let p=null,u=null,E=null,h="";if("speaker"===a||"dialogue"===a||"dialogue-index"===a){const e=l.createElement(s.g,{icon:["fab","twitter"]});if(p=t.twitter?l.createElement("a",{href:`https://twitter.com/${t.twitter}`,className:"twitter",target:"_blank",rel:"noreferrer"},e," ",t.twitter):null,t.headshot){const e=t.headshot.localFiles[0];u=e.childImageSharp?l.createElement(r.G,{image:e.childImageSharp.gatsbyImageData,alt:t.name,className:"headshot"}):l.createElement("img",{src:e.url,alt:`Headshot of ${t.name}`,className:"headshot",style:{objectFit:"cover"}}),h="has-headshot"}}const v=t.bio&&t.bio.childMarkdownRemark?l.createElement("a",{href:`#${t.slug}`,className:"bio-link"},"Read Bio"):null,N=t.bio&&t.bio.childMarkdownRemark?l.createElement("div",{className:"bio",dangerouslySetInnerHTML:{__html:t.bio.childMarkdownRemark.html}}):"";if(t.website){const e=t.website.startsWith("http")?t.website:`http://${t.website}`;E=l.createElement("a",{href:e,target:"_blank",rel:"noreferrer"},"Website")}return"dialogue-index"===a?l.createElement("div",{className:`speaker person ${h}`,id:t.new_id,title:t.name,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m))):"dialogue"===a?l.createElement("span",{className:`speaker person ${h}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,p,E,v))):"speaker"===a?l.createElement("span",{className:`speaker person ${h}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,p,E)),N):"dialogue-index"!==a&&"dialogue"!==a?l.createElement("div",{className:`person ${h}`,id:t.new_id,key:`p-${t.new_id}`,itemProp:"performer",itemScope:"https://schema.org/Person"},u,l.createElement("div",{className:"details"},o,l.createElement("div",{className:"info"},m,d,p,E))):void 0}},1808:function(e,t,a){var l=a(6540);t.A=e=>{let{supporters:t,type:a}=e;const n=t.length>1?`${a.charAt(0).toUpperCase()+a.slice(1)}s`:a.charAt(0).toUpperCase()+a.slice(1),r=`${a}s`;return l.createElement("div",{className:`supporters ${r}`},l.createElement("h2",null,n),l.createElement("ul",null,t.map((e=>{const t=e.data,a="umdlib"!==t.slug&&"Internal"===t.type?"University of Maryland ":"",n=t.website?t.website.startsWith("http")?l.createElement("a",{href:t.website,title:t.name,target:"_blank",rel:"noreferrer"},a,t.name):l.createElement("a",{href:`http://${t.website}`,title:t.name,target:"_blank",rel:"noreferrer"},a,t.name):t.name;return l.createElement("li",{id:t.slug,className:t.type.toLowerCase()},n)}))))}},5871:function(e,t,a){a.r(t);var l=a(6540),n=a(4810),r=a(2532),s=a(3226),i=a(1010),c=a(9899),m=a(3626),o=a(1808),d=a(6784);t.default=e=>{let t,{pageContext:a}=e,p=l.createElement("h1",{className:"title"},a.title);const u=a.image;var E,h,v;u&&u.localFiles&&(p=l.createElement(r.G,{image:null===(E=u.localFiles[0])||void 0===E||null===(h=E.childImageSharp)||void 0===h?void 0:h.gatsbyImageData,alt:a.title||"",className:"research-image"}));a.description&&(t=l.createElement("div",{className:"description",dangerouslySetInnerHTML:{__html:(null===(v=a.description.childMarkdownRemark)||void 0===v?void 0:v.html)||""}}));let N=null,_=null;a.participants&&(N=a.participants.map(((e,t)=>l.createElement(m.A,{key:`p${t}`,person:e.data,type:"participant"}))),_=l.createElement("div",{className:"participants"},l.createElement("h2",null,"Participants"),l.createElement("ul",null,N)));let g=null,k=null;if(a.directors){const e=a.directors.length>1?"Directors":"Director";g=a.directors.map((e=>l.createElement(m.A,{person:e.data,type:"director"}))),k=l.createElement("div",{className:"directors"},l.createElement("h2",null,e),l.createElement("ul",null,g))}let f=null;if(a.twitter_account){const e=l.createElement(d.g,{icon:["fab","twitter"]}),t=a.twitter_account?l.createElement("span",{className:"twitter_acct"},l.createElement("a",{href:`https://twitter.com/${a.twitter_account}`,target:"_blank",rel:"noreferrer"},a.twitter_account)):null;f=l.createElement("div",{className:"twitter"},e," ",t)}let w=null,b=null,$=null;a.linked_links&&(w=a.linked_links.map((e=>{var t;const a=null==e?void 0:e.data;return $=null!==(t=a.url)&&void 0!==t&&t.startsWith("http")?a.url:`http://${a.url}`,l.createElement("li",{id:a.title||""},l.createElement("a",{href:$,title:a.title||"",target:"_blank",rel:"noreferrer"},a.title))})),b=l.createElement("div",{className:"links"},l.createElement("h2",null,"Links"),l.createElement("ul",null,w)));const y=a.linked_sponsors&&a.linked_sponsors.length>0?l.createElement(o.A,{supporters:a.linked_sponsors,type:"sponsor"}):"",P=a.linked_partners&&a.linked_partners.length>0?l.createElement(o.A,{supporters:a.linked_partners,type:"partner"}):"";let A=null,I=null;a.linked_events&&(A=a.linked_events.map((e=>{const t=null==e?void 0:e.data;return l.createElement("li",{id:t.id,className:"event"},l.createElement("h3",{className:"title"},l.createElement(n.N_,{key:`e-${t.id}`,to:`../../events/${t.id}`},t.talk_title||t.event_title)),l.createElement(c.A,{start:parseInt(t.start_date),end:parseInt(t.end_date)}),l.createElement("div",{itemProp:"location",className:"location"},t.location),l.createElement("div",{className:"description"}),l.createElement(n.N_,{className:"button",key:`e-${t.id}`,to:`../../events/${t.id}`},"View Event Details"))})),I=l.createElement("div",{className:"events"},l.createElement("h2",null,"Events"),l.createElement("ul",null,A)));let S=null,C=null;return a.linked_posts&&(S=a.linked_posts.map((e=>{var t;const a=null==e?void 0:e.data;return l.createElement("li",{id:null===(t=a.slug)||void 0===t?void 0:t.toLowerCase().replace(/-/g,"_")},l.createElement("div",{className:"post-title"},l.createElement(n.N_,{key:`n-${a.slug||""}`,to:`../../news/${a.slug}`},a.post_title)),l.createElement("div",{className:"meta"},l.createElement("time",{className:"post-date"},a.post_date),l.createElement("div",{className:"author hidden"},a.author_name)))})),C=l.createElement("div",{className:"news"},l.createElement("h2",null,"News"),l.createElement("ul",null,S))),l.createElement(s.A,null,l.createElement(i.A,{title:a.title||""}),l.createElement("div",{className:"page-research-item"},l.createElement("section",{className:"research-item"},p,l.createElement("div",{className:"content"},t,I),l.createElement("div",{className:"sidebar metadata"},f,k,_,b,C,P,y))))}}}]);
//# sourceMappingURL=component---src-templates-research-tsx-504725d02c70cc573ee0.js.map
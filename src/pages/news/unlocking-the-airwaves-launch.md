---
author:
  - Stephanie Sapienza
date: "2021-07-29T13:00:00.000Z"
layout: ../../layouts/PostLayout.astro
slug: unlocking-the-airwaves-launch
title: "On Forks and Completion: Reflections on a Five-year Digital Humanities Project"
---

After five years of planning, fundraising, development, and execution, the _[Unlocking the Airwaves](https://unlockingtheairwaves.org)_ application, an online digital resource about early public radio, is launching this week. The post below is a personal reflection on this long journey. Including how it fundamentally changed my notions about the boundaries of a ‘project,’ and how knowledge transfer and collaboration create interdisciplinary ‘forks’ along the path towards completion. If ‘completion’ is even a term I subscribe to anymore.

### Beginnings

Before I started with MITH in fall 2013, I managed the American Archive of Public Broadcasting (AAPB) at the Corporation for Public Broadcasting. At the tail end of a long and difficult struggle to keep the AAPB afloat and thriving, we succeeded in securing a contract with Crawford Media in Atlanta to digitize roughly 40,000 hours of historic public radio and television from 120+ stations. A small percentage of that number was ‘discretionary’ for particularly important collections that weren’t part of the AAPB’s original inventory. The entire collection of the National Association of Educational Broadcasters (NAEB) was part of that category. In the final months of my tenure with CPB, I worked with the Libraries at University of Maryland to ingest their metadata and get the collection digitized.

A few months later I found myself working here, with MITH encouraging me to seek out and develop projects. I immediately started trying to coax a project out of the Libraries to do something new and interesting focusing on the digitized NAEB materials. These were precious radio programs from the era before CPB, NPR, or PBS existed. Back when ‘public radio’ was educational radio, and a loose network of University stations shared content as part of a ‘bicycle network.’ Then I learned from my friend and collaborator Chuck Howell at the Libraries here that the paper collections of the NAEB were housed across the country at the Wisconsin Historical Society. My project suddenly had a more targeted vision: a [virtual reunification](https://www.journals.uchicago.edu/doi/abs/10.1086/676489) of two geographically-separated collections. The audio and the papers stay where they are. The online resource is the rhizomatic interlocutor getting users to either or both collections, while demonstrating how audio and paper collections can enrich the other. With some snazzy touches (visualizations, exhibit) baked in for good measure.

### Game of Grants

It took us four tries to get the grant from the National Endowment for the Humanities. From all I could surmise from reviewer notes, this had less to do with the project’s merit and more to do with it being a strange hybrid of all the NEH’s funding programs. I initially thought of it as an innovative archival project which might help provide better answers to [long-existing challenges with providing better access to audiovisual materials](http://www.digitalhumanities.org/dhq/vol/15/1/000509/000509.html). Therefore, a grant from the NEH’s Preservation Division.

But this was far too simple. It was an online resource (Humanities Collections & Reference Resources), but it was also a research experiment in virtual reunification (Research and Development). It also had elements of a public humanities project (Digital Projects for the Public?). And It was definitely a digital humanities initiative (so, Office of Digital Humanities?), because MITH is a digital humanities center and we do not actually steward collections ourselves. In reality, it was all of these things. This was my first teaser trailer for the journey ahead: be innovative and interdisciplinary. But write a grant that picks one discipline and merely gestures towards the others’ existence.

In the end, we succeeded. I brought in a Co-Principal Investigator (Eric Hoyt), who I think was key to helping us shape the proposal (in the end, a Humanities Collections & Reference Resources project) to be its strongest version. I also leaned heavily on our Lead Advisor Josh Shepperd during this time to help me translate this vision to the scholars who would be using the resource. Lastly, I learned much from my MITH coworkers Trevor Muñoz and Ed Summers about how things like linked data and minimal computing could give this project a longer and more sustainable future on the web.

Later this month you’ll see the fruits of all of our efforts. The beta site has been up and available to a small group of test users and advisors for a year and a half now, and the final site will include much more. But in addition to the resource itself, this work has forked out and spawned all kinds of other insights and unexpected outcomes. Here are a few highlights.

### Airtable is the Little Engine that Could

At the beginning of this project I became acquainted with Airtable through the work of Miriam Posner on [a project on early race film at UCLA](https://earlyracefilm.github.io/database/databasics.html). Immediately I saw that this tool could help me do so many things that I struggled to achieve for many years as an archivist. It could handle one to many relationships. It could store controlled vocabularies and taxonomies in their own separate linked table. It was online and easy to use. It looked like Excel but functioned better than FileMaker Pro and OpenRefine combined.

Since then, Airtable’s merits has never stopped growing, at times exponentially. Now it is the backbone of our project, not only managing our sustainability planning, digitization tracking, and various project management tasks, but actually becoming the backend for the very complex data model we’re hosting at the Airwaves site. This acquired knowledge has led to countless other outcomes. A workshop, [Airtable for A/V Archivists](https://drive.google.com/file/d/1C7Gn7YBNgxd_HYTxcTA1wR49LeYy-yaC/view?usp=sharing), that Ed Summers and I gave at AMIA 2019 was so popular that we repeated it during the pandemic [as a webinar](http://www.amiaonline.org/?p=531) for AMIA’s Continuing Education Advocacy Task Force for 100+ participants. Purdom Lindblad and I taught Airtable three separate times to graduate students in our [Anatomy of Digital Humanities course](https://vimeo.com/451285322). It heavily informed an even more complex data model for another concurrent MITH project, the [Lakeland Digital Archive](https://mith.umd.edu/research/lakeland/). I’ve done at least five consultations on how to implement an Airtable base for projects both tiny and massive, including most recently for the folks working on the The Baltimore Afro-American newspaper archives, who are migrating a massive collection out of Archon and want to digitize thousands of pages and eventually host them online. MITH is now using Airtable as the backend of the very website you’re looking at right now. And the list goes (and will continue to go) on.

### Redefining ‘Minimal’ Computing and Pushing the Limits of the ‘Static Website’

MITH has been exploring the land of minimal computing for years now. As a framework that privileges simpler designs and significantly reduces dependencies on large servers, the process of building a static website can prove more challenging than its alternatives, but results in a resource that is far simpler to maintain, more environmentally responsible, and far less expensive in the long run.

A fact that has not yet been socialized in our various outreach and presentations is just how much the [Airwaves application has pushed the limits of what a static website can do](https://github.com/umd-mith/airwaves). When you finally see the end product, it will be hard to comprehend the fact that what is loaded into your browser is a simple stack of HTML, Javascript, and CSS. There are of course many elements you’ll see that require a host server, but the means of storing and providing access to those materials are being handled with a light touch and as few reliances on server-side software as possible. Airtable lets us use a very complex data model. But the application accesses that data through the Airtable API as a JSON file that it loads into your browser, so that complexity doesn’t impede search times or get bogged down by an unwieldy search index. At times we’ve reflected that we may have successfully drawn an outline around the limits of what a static website can do, as well as learning some things about what not to do in the future. All of these discoveries will be documented in our white paper and final reports. They will inform our other projects. And hopefully the next team to build such a resource will be able to use what we’ve learned to do this even better.

### Linked Data is Not Just About Triplestores

This is a heavily paraphrased statement that Ed Summers made to me at some point. It had the effect of lifting a thousand pounds of impostor syndrome off my shoulders. Admittedly, I do not have the brain of a developer, and RDF and triplestores (historically the defining characteristic of linked data) previously intimidated me enough to watch it from a distance. _Airwaves_ uses the [International Image Interoperability Framework](https://iiif.archivelab.org/iiif/documentation) (IIIF) to display the scanned NAEB paper documents via a Mirador viewer on the site, which are hosted at the Internet Archive. This is linked data. The final enhanced metadata will be published as JSON-LD and sent back to UMD Libraries and the American Archive. That is linked data. The landing pages we developed for entities (People and Organizations) represented in the collections were developed after a process of reconciling the names to [Wikidata](https://www.wikidata.org/) and the [Social Networks and Archival Context](https://snaccooperative.org/) (SNAC) databases, and the URIs for those entity pages use the [Wikidata Q-item identifiers](https://www.wikidata.org/wiki/Wikidata:Identifiers). That is also linked data. And we don’t maintain one triplestore database on this project.

In November 2017 I hosted [a workshop at MITH](https://mith.umd.edu/research/using-the-digital-to-engage-archival-radio-collections/) as part of the Radio Preservation Task Force (RPTF) conference about using Wikidata for enhancing access to radio collections. I was told it was one of the most popular and practically useful events at the conference. I learned a lot from our instructors Andrew Lih and Alex Stinson. In fact, this workshop led to me developing a sequel project to _Airwaves_, specifically about how to develop a linked data framework using Wikidata and SNAC, in order to increase understanding and contextual associations between disparate radio collections. That project, [Broadcasting Audiovisual Data](https://mith.umd.edu/research/broadcasting-av-data/), was just funded by the NEH (this time as a Digital Humanities Advancement Grant), and has already begun in earnest, and we’ve hired an absolutely amazing new Graduate Research Assistant, [Emily Frazier](https://mith.umd.edu/news/broadcasting-av-data-ga). Be on the lookout for many easy to understand video tutorials on how to take your flat dataset, extract authority data, and use OpenRefine to reconcile and pull data from the web to make your collections or project look as if three full-time catalogers worked on them for two years. This is linked data too.

### Radio’s History Has More to Teach Us Than Just Radio History

Earlier this year I received an email from a woman named Chana Smith, who excitedly informed me that her father’s late-60s radio series, “Seeds of Discontent,” was on our beta website. She had been seeking a way to make the series available online and more widely known for some time. She informed me that her father was still alive in Detroit, and was still a tireless advocate for social justice, and for uplifting the voices of those who would otherwise not be heard.

I had featured “Seeds of Discontent” twice at conferences already, so I knew the series. I also knew it to be unique in the fact that it featured Studs Terkel-style ‘man on the street’ interviews with average people, at a time when a lot of educational radio content was highly controlled and studio-produced. It also immediately followed the Detroit riots, and featured black citizens of Detroit speaking their minds comfortably and candidly. It’s among the best series in the collection.

What I did not know was that Chana’s father, Hartford Smith, Jr., had so much more to say about the series itself, and the story (his story) that surrounded it. He came to Detroit as part of the Great Migration, was working in the social work system helping rehabilitate juvenile offenders, and was being very vocal in barber shops about his opinions on the media’s coverage of riots. An employee of Wayne State’s WDET station heard him, and told him he had a voice. A summer later, the 26-part series had aired and had been exceedingly well-received. And Mr. Smith became Professor Smith in the School of Social Work, a position he held for over 40 years until retirement. Lastly, Professor Smith informed me that he had all the original audio tapes from the interviews he did, as well as the missing first episode we did not have. Six months later, his collection has been successfully inventoried and is in the hands of the [Wisconsin Center for Film & Theater Research](https://wcftr.commarts.wisc.edu/) (WCFTR) at the University of Wisconsin-Madison, under the direction of my Co-PI Eric Hoyt. Soon they’ll be digitized and transcribed. Thus, _Airwaves_’ influence continues to spread even before its final launch.

This story is one of several borne out of working with and writing about the materials. Many of our exhibit curators found other, new insights during the writing of their pieces. Allison Perlman changed the topic of her exhibit to be about Morris Novik after poring over 300 pages of materials about how Novik was instrumental in negotiating labor rights and acknowledged the jurisdiction of unions for stations during his tenure as an NAEB board member in the 50s. This ‘previously invisible’ history will now be told and available on our website.

Last month I [conducted a workshop](https://chssp.sf.ucdavis.edu/events/digital-storytelling-using-audio-primary-sources-workshop) with 100 teachers across the country on how to better integrate digital storytelling into their curricula, and specifically how to find and incorporate archival media. The workshop was followed by a focus group in which many teachers expressed their excitement about knowing more about the various resources we’d highlighted (including _Airwaves_). Many said that the major impediment to doing such work was a lack of awareness of their existence, combined with limited access to digitized or transcribed materials.

Last but not least, Eric Hoyt, Matt St. John and I just completed a draft chapter for the forthcoming Oxford Handbook of Radio Studies on the history of production norms and aesthetic strategies in public radio. This traces backward from our current moment of podcast ubiquity and public radio dominance, weighed against popular notions about so-called ‘NPR Voice’ and its ‘carefully casual’ white hegemony. To bolster and contextualize these arguments, we walked back through and unpacked the nuances of the NAEB’s entire program output, and attempted to paint a more complete picture of how radio’s aesthetic strategies have always been widely varied, parallelling major changes in U.S. history, politics, and culture. One of many reasons this was a rewarding culminating experience was thathas been involved in the project since the beginning, and had personally (alongside J.J. Bersch) digitized and described hundreds of documents at UW-Madison, linking them to radio programs. His knowledge of the collections in many ways exceeds my own, and all three of our combined perspectives on these collections led us to new and interesting ways to frame the chapter.

### Concluding Thoughts

[MITH’s Values Statement](https://mith.umd.edu/values/) includes the following: “As both collaborators and learners, we are dedicated to participatory practices that elevate the many voices and skills involved. Our digital humanities work is often found where research practices and methods are forged and reimagined.” Of all the knowledge I’ve gained during this five year experience with _Unlocking the Airwaves_, the biggest revelation is just how much one project can create small forks along the way. These small forks eventually become full fledged branches with people participating and going in directions I would have never anticipated. I was bouncing around all these forks the entire way, continuously surprised at how much traction and knowledge transfer was happening even before the project was off the ground. As I prepare to start publicizing the _Airwaves_ resource more broadly, I’m simultaneously diving into a new project which has the potential to start a whole new fork of knowledge. And I’m very excited to see where each fork will lead.

_The Airwaves application website is live now at [unlockingtheairwaves.org](https://unlockingtheairwaves.org). Throughout the late summer and fall of 2021, MITH will be rolling out a series of special launch tweets, features, and highlights about the project. Watch our [Twitter feed](https://twitter.com/UMD_MITH) or follow [#unlockairwaves](https://twitter.com/hashtag/unlockairwaves?src=hashtag_click) to hear more about this project!_
---
author:
- Selvam Palanimalai
date: '2013-09-10T14:27:00.000Z'
layout: ../../layouts/PostLayout.astro
slug: visualizing-data-mithgrid
title: Visualizing Data with MITHgrid
---

We are quite a way through GSoC! It has been very interesting and informative experience until now. MITHgrid is a very powerful library because it places data at the center of its activities. It is very structured taking into the fact that JavaScript lacks many of the classical object oriented concepts.

We are working on making interactive use cases of MITHgrid, focusing on visualizing data. The current objective is to be finish building the data analysis web-app which facilitates in importing and visualizing data with help of MITHgrid. The flow of the application is import data, tabulate the data, clean the data, plot the data, and then allow data export. We created a new CSV importer to get data into the application. New presentations (graph and spreadsheet) have been added to MITHgrid to present and let the user interact with the data. Since it’s a two way binding, changes performed by the users on the data in these presentations get reflected in the MITHgrid data store.

[Todomvc](http://todomvc.com/) is a javascript library comparison initiative which helps developers choose the best library for their project. We created a todo app that we will be publishing in the todomvc labs. The demo is temporarily hosted at <http://goo.gl/MF9vN1>.

What’s next? The graph presentation only supports scatter plots between any two variables as of now; we will add more plot types. We plan to add more presentations such as a tab presentation. Options to export data (JSON/csv) need to be added. Good progress has already been made on the exporter. There are many ideas and concepts at the heart of MITHgrid which need more documentation. Attention now turns to documenting the summer progress and creating a getting started manual to talk about the guts of MITHgrid and how you can use them to build responsive web applications.
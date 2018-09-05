---
layout: sidebar
title: Unsere Aktionen
description: Erfahren Sie mehr über unsere zahlreichen Aktionen in Deutschland, Frankreich und der Schweiz.
permalink: /aktionen/
background: false
---

{%- for post in site.posts limit: 10 -%}
  {%- include post.html -%}
{%- endfor -%}
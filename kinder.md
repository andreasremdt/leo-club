---
layout: sidebar
title: Ausflüge mit Kindern
description: Unsere Aktivitäten mit Kindern aus Weißrussland und KiSEL aus Lörrach.
permalink: /aktionen/kinder/
background: false
---

{%- for post in site.posts -%}
  {%- if post.categories contains 'kinder' -%}
    {%- include post.html -%}
  {%- endif -%}
{%- endfor -%}
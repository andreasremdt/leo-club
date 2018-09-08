---
layout: sidebar
title: Besuche im Pflegeheim
description: Berichte unserer Besuche im Weiler Pflegeheim Markgräflerland.
permalink: /aktionen/pflegeheim/
background: false
---

{%- for post in site.posts -%}
  {%- if post.categories contains 'pflegeheim' -%}
    {%- include post.html -%}
  {%- endif -%}
{%- endfor -%}
---
layout: sidebar
title: Weitere Aktionen
description: Andere Aktionen, etwa der Osterhase oder Weihnachtsmann im Rheincenter.
permalink: /aktionen/weitere/
background: false
---

{%- for post in site.posts -%}
  {%- if post.categories contains 'weitere' -%}
    {%- include post.html -%}
  {%- endif -%}
{%- endfor -%}
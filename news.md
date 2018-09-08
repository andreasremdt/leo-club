---
layout: sidebar
title: Aktuelle Neuigkeiten
description: Informationen zum Club, Wahlen und sonstige Änderungen
permalink: /aktionen/news/
background: false
---

{%- for post in site.posts -%}
  {%- if post.categories contains 'news' -%}
    {%- include post.html -%}
  {%- endif -%}
{%- endfor -%}
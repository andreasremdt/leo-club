---
layout: sidebar
title: Begegnungen mit Menschen mit Behinderung
description: Ausflüge mit Heimbewohnern aus Wiechs, welche eine geistige oder körperliche Behinderung aufweisen.
permalink: /aktionen/begegnungen/
background: false
---

{%- for post in site.posts -%}
  {%- if post.categories contains 'begegnungen' -%}
    {%- include post.html -%}
  {%- endif -%}
{%- endfor -%}
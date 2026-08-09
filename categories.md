---
layout: page
title: Categories
permalink: /categories/
description: Browse AI infrastructure, service provider networking, EVPN/VXLAN, Cisco ACI, cloud networking, automation,virtualization, and data center engineering articles.

---
<section class="categories-hero">

  <div class="categories-hero-content">

  </div>

</section>

<section class="category-card-grid">
  {% assign topics = site.categories | sort %}
  {% for topic in topics %}
    {% assign category_id = topic[0] | slugify %}
    <article class="topic-block category-detail-card" id="{{ category_id }}">
      {% include category-icon.html id=category_id %}
      <h2>{{ topic[0] }}</h2>

      {% assign category_key = topic[0] | downcase %}
      {% case category_key %}
        {% when "aci", "cisco aci" %}
          <p>Application-centric policy, tenants, contracts, access policies, and data center fabric operations.</p>
        {% when "vxlan" %}
          <p>EVPN/VXLAN overlays, route exchange, packet flow, fabric validation, and troubleshooting.</p>
        {% when "juniper" %}
          <p>Juniper SRX labs, routing, firewall policy, NAT, and practical verification workflows.</p>
        {% when "cloud" %}
          <p>Hybrid connectivity, cloud networking, enterprise architecture, and infrastructure integration.</p>
        {% when "automation" %}
          <p>Repeatable engineering workflows, templates, operational tooling, and infrastructure automation.</p>
        {% when "data center" %}
          <p>Spine-leaf fabrics, segmentation, service insertion, and enterprise data center design.</p>
        {% else %}
          <p>Technical articles, field notes, and architecture references for this infrastructure domain.</p>
      {% endcase %}

      <strong>{{ topic[1].size }} posts</strong>
      <a class="category-link" href="{{ '/categories/#articles-' | append: category_id | relative_url }}">View articles</a>
    </article>
  {% endfor %}
</section>

<section class="category-article-list" aria-label="Articles by category">
  {% for topic in topics %}
    {% assign category_id = topic[0] | slugify %}
    <article class="category-articles" id="articles-{{ category_id }}">
      <header>
        <h2>{{ topic[0] }}</h2>
        <span>{{ topic[1].size }} posts</span>
      </header>

      <ul class="clean-list">
        {% for post in topic[1] %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%b %-d, %Y" }}
            </time>
          </li>
        {% endfor %}
      </ul>
    </article>
  {% endfor %}
</section>


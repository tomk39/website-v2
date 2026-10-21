---
layout: tool
title: DNS Lens
permalink: /tools/dns/
description: Look up every DNS record type for a domain in one go - A, AAAA, CNAME, MX, NS, TXT and more - with a DNSSEC verdict, over DNS-over-HTTPS.
nt_tool: dns
nt_script: dns-lens
---

## About this DNS record lookup

Every record type in one pass, with a switch on each card. The DNSSEC banner checks the parent's DS record, the zone's own keys and whether the resolver validated the answer, resolved at the apex so `www.example.com` reports on `example.com`. Queries go straight from your browser over DNS-over-HTTPS, and the `dig` equivalent is shown underneath. Registration data is in [WHOIS &amp; IP info]({{ '/tools/whois/' | relative_url }}).

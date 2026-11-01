---
layout: tool
title: DNS Lens
permalink: /tools/dns/
description: Look up every DNS record type for a domain in one go - A, AAAA, CNAME, MX, NS, TXT and more - with a DNSSEC verdict, over DNS-over-HTTPS.
nt_tool: dns
nt_eyebrow: "DNS lookup"
nt_script: dns-lens
---

## About this DNS record lookup

Every record type in one pass, with a switch on each card. The DNSSEC banner checks the parent's DS record, the zone's own keys and whether the resolver validated the answer, resolved at the apex so `www.example.com` reports on `example.com`. Queries go straight from your browser over DNS-over-HTTPS, and the `dig` equivalent is shown underneath. Registration data is in [WHOIS &amp; IP info]({{ '/tools/whois/' | relative_url }}).

## Common questions

### What does the AD flag mean?

AD stands for Authenticated Data. A validating resolver sets it when the answer passed DNSSEC validation, so it shows that the resolver checked the signatures, not that the records themselves are correct.

### What is a PTR record?

A PTR record maps an IP address back to a name, the reverse of an A or AAAA record. It lives under in-addr.arpa for IPv4 and ip6.arpa for IPv6, and is controlled by whoever holds the address block, which is often the hosting provider rather than the domain owner.

### Why do two resolvers give different answers?

Each resolver caches records for their TTL, so a recent change can show on one before another. Providers that answer by location can also return different addresses on purpose. Switching resolvers here is a quick way to tell the two apart.

---
layout: tool
title: Email security check
permalink: /tools/email/
description: Check MX, SPF and its ten-lookup limit, DMARC, DKIM keys, BIMI, MTA-STS and TLS-RPT for any domain, and grade how well it resists spoofing.
nt_tool: email
nt_eyebrow: "Email authentication"
nt_script: email-check
---

## About this email security check

Can someone send mail pretending to be this domain? A grade summarises MX, SPF, DMARC, DKIM, BIMI, MTA-STS and TLS-RPT. SPF gets a meter counting its DNS lookups against the limit of ten and a tree showing where they come from. DMARC is resolved by walking up from the subdomain. DKIM can only be checked by selector name, so no key found is not proof there is none.

## Common questions

### What is the SPF ten-lookup limit?

RFC 7208 allows at most ten DNS-querying mechanisms during an SPF check, counting include, a, mx, ptr, exists and redirect, including those nested inside includes. Going over produces a permanent error, and receivers may then treat SPF as failed.

### What is the difference between SPF, DKIM and DMARC?

SPF lists the servers allowed to send for a domain. DKIM signs each message so changes can be detected. DMARC ties them to the visible From address and tells receivers what to do when both fail: none, quarantine or reject.

### Which DMARC policy should I use?

Start at p=none and read the reports until every legitimate sender passes, then move to quarantine and finally reject. Only quarantine and reject actually stop spoofed mail from reaching the inbox.

---
layout: tool
title: Email security check
permalink: /tools/email/
description: Check MX, SPF and its ten-lookup limit, DMARC, DKIM keys, BIMI, MTA-STS and TLS-RPT for any domain, and grade how well it resists spoofing.
nt_tool: email
nt_script: email-check
---

## About this email security check

Can someone send mail pretending to be this domain? A grade summarises MX, SPF, DMARC, DKIM, BIMI, MTA-STS and TLS-RPT. SPF gets a meter counting its DNS lookups against the limit of ten and a tree showing where they come from. DMARC is resolved by walking up from the subdomain. DKIM can only be checked by selector name, so no key found is not proof there is none.

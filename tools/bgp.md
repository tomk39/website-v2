---
layout: tool
title: BGP looking glass
permalink: /tools/bgp/
description: What RIPE RIS collectors see for a prefix - AS paths, origin and upstreams, RPKI validity, IRR route objects and visibility.
nt_tool: bgp
nt_script: bgp
---

## About this BGP looking glass

What the public RIPE RIS collectors see for a prefix: whether they agree on the origin AS, whether RPKI authorises it, whether IRR route objects match, how many collectors see it at all, how often it was announced and withdrawn in the last day, and each peer's AS path. A repeated AS number is prepending, not an extra hop. This is collector data, a few minutes behind. Registration data is in [WHOIS &amp; IP info]({{ '/tools/whois/' | relative_url }}).

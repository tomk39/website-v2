---
layout: tool
title: BGP looking glass
permalink: /tools/bgp/
description: What RIPE RIS collectors see for a prefix - AS paths, origin and upstreams, RPKI validity, IRR route objects and visibility.
nt_tool: bgp
nt_eyebrow: "Global routing"
nt_script: bgp
---

## About this BGP looking glass

What the public RIPE RIS collectors see for a prefix: whether they agree on the origin AS, whether RPKI authorises it, whether IRR route objects match, how many collectors see it at all, how often it was announced and withdrawn in the last day, and each peer's AS path. A repeated AS number is prepending, not an extra hop. This is collector data, a few minutes behind. Registration data is in [WHOIS &amp; IP info]({{ '/tools/whois/' | relative_url }}).

## Common questions

### What is a BGP looking glass?

A way to see routes from another network's point of view instead of your own. This one reads the RIPE RIS route collectors, which peer with networks around the world, so it shows how a prefix looks across the internet.

### What is the difference between RPKI and IRR?

RPKI uses cryptographically signed records tied to the address holder. IRR route objects are database entries that are often not verified and can be out of date. Comparing both is a useful check on an unexpected origin.

### Why does my prefix have low visibility?

It may be newly announced, filtered for being more specific than a /24 in IPv4, rejected as RPKI invalid, or sent to only a few upstreams. Check which peers do see it, and compare the origin and AS paths.

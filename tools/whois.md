---
layout: tool
title: WHOIS & IP info
permalink: /tools/whois/
description: RDAP registration data, BGP routing, RPKI validity and approximate location for domains, IP addresses, prefixes and AS numbers.
nt_tool: whois
nt_eyebrow: "Registration & routing"
nt_script: whois
---

## About this WHOIS and RDAP lookup

A domain, an IP address, a prefix or an AS number — the tool picks the right lookup. Registration data comes from RDAP, read straight from the registry that holds it: dates and lock status for a domain, network registration, RPKI validity and rough location for an address, announced prefixes for an AS. Some registries publish no RDAP at all, which the tool says plainly. Routing detail is in the [BGP looking glass]({{ '/tools/bgp/' | relative_url }}).

## Common questions

### What is the difference between WHOIS and RDAP?

RDAP is the modern replacement for WHOIS. It returns structured JSON over HTTPS rather than free-form text, so results are consistent between registries and easy to read by machine.

### What does RPKI valid or invalid mean?

A Route Origin Authorisation is a signed statement of which AS may originate a prefix. Valid means a ROA matches the announcement, invalid means one exists but the origin AS or prefix length does not match, and not found means no ROA covers it.

### How accurate is IP location?

It is an estimate from registration and measurement data. The country is usually right, but the city is often wrong, especially for mobile networks and VPNs.

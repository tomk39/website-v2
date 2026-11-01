---
layout: tool
title: Subnet calculator
permalink: /tools/subnet/
description: sipcalc-style IPv4 and IPv6 subnet calculator with a live prefix slider, network splitting, summarising and range-to-CIDR conversion.
nt_tool: subnet
nt_eyebrow: "IP subnetting"
nt_script: subnet
---

## About this subnet calculator

sipcalc's fields for IPv4 and IPv6: network and broadcast address, every mask notation, the Cisco wildcard, usable range, address type and reverse DNS zone, with a prefix slider that updates them live. Further tabs split a block into equal subnets, summarise a list of networks, and turn a range into CIDR blocks. A /31 has two usable addresses, per RFC 3021. Nothing leaves your browser.

## Common questions

### How many usable hosts are in a subnet?

For IPv4, 2 to the power of (32 minus the prefix length), minus the network and broadcast addresses. A /24 has 254 usable hosts and a /26 has 62. The exceptions are a /31, with two addresses for a point-to-point link, and a /32, which is a single host.

### What is a wildcard mask?

The inverse of the subnet mask, used in Cisco access lists and OSPF network statements. A /24 mask of 255.255.255.0 has the wildcard 0.0.0.255: a 0 bit must match and a 1 bit can be anything.

### How do I summarise several networks into one route?

Paste them into the summarise tab. It merges adjacent and overlapping networks into the shortest list of prefixes that covers exactly the same addresses, so it never advertises space you do not hold.

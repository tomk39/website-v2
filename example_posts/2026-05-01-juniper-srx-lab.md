---
title: Juniper SRX Lab
description: A practical SRX lab structure for zones, policies, and NAT with cleaner reading flow.
date: 2026-05-01
categories: [Juniper, Lab]
tags: [srx, security, nat]
image: /assets/images/topology-lab.svg
---

## What you will learn

Use this opening section to tell readers what the lab covers before they reach the configuration details.

<div class="callout">
  <strong>Tip:</strong> Put assumptions here, such as software version, interface names, and topology notes.
</div>

## Topology

Describe the topology with one diagram and a short table. Readers should understand zones, interfaces, and routing before reading configuration blocks.

## Base configuration

Use focused code blocks. The template adds a copy button automatically.

```text
set security zones security-zone trust interfaces ge-0/0/1.0
set security zones security-zone untrust interfaces ge-0/0/0.0
set security policies from-zone trust to-zone untrust policy allow-web match source-address any
set security policies from-zone trust to-zone untrust policy allow-web match destination-address any
set security policies from-zone trust to-zone untrust policy allow-web match application junos-http
set security policies from-zone trust to-zone untrust policy allow-web then permit
```

## Verification

Show the exact command, the expected healthy output, and what to check when output differs.

```text
show security flow session
show security policies hit-count
show security nat source rule all
```

## Troubleshooting notes

Keep troubleshooting items short and scannable. For deeper explanations, link to a related article.

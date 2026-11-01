---
layout: tool
title: EVPN calculator
permalink: /tools/evpn/
description: VLAN and VRF to VNI allocation, route distinguishers and route targets, VXLAN MTU sizing, leaf configuration and EVPN route scaling.
nt_tool: evpn
nt_eyebrow: "EVPN VXLAN"
nt_script: evpn
---

## About this EVPN and VXLAN calculator

Describe a VXLAN EVPN fabric once — AS number, leaf count, tenants and their VLANs — and it allocates an L2 VNI per VLAN and an L3 VNI per VRF, builds Type 1 route distinguishers from each leaf's router ID, derives route targets, and estimates how many routes each switch holds. The MTU panel sizes the underlay: VXLAN adds 50 bytes over IPv4 and 70 over IPv6, and Juniper counts the Ethernet header where Cisco, Arista and NVIDIA do not. Configuration covers the overlay only.

## Common questions

### How much MTU does VXLAN need?

VXLAN over IPv4 adds 50 bytes: 14 for the outer Ethernet header, 20 for IP, 8 for UDP and 8 for VXLAN. To carry 1500-byte frames the underlay needs an MTU of at least 1550. Many fabrics use about 9000 on the underlay to leave room for jumbo frames.

### What is the difference between an L2 VNI and an L3 VNI?

An L2 VNI maps to a VLAN and bridges traffic within one broadcast domain. An L3 VNI maps to a VRF and carries routed traffic between subnets, as used by symmetric IRB.

### What is the difference between a route distinguisher and a route target?

A route distinguisher makes a route unique in BGP, so overlapping tenants do not collide. A route target controls which VRFs and VLANs import it. The RD identifies a route, and the RT decides where it goes.

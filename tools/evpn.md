---
layout: tool
title: EVPN calculator
permalink: /tools/evpn/
description: VLAN and VRF to VNI allocation, route distinguishers and route targets, VXLAN MTU sizing, leaf configuration and EVPN route scaling.
nt_tool: evpn
nt_script: evpn
---

## About this EVPN and VXLAN calculator

Describe a VXLAN EVPN fabric once — AS number, leaf count, tenants and their VLANs — and it allocates an L2 VNI per VLAN and an L3 VNI per VRF, builds Type 1 route distinguishers from each leaf's router ID, derives route targets, and estimates how many routes each switch holds. The MTU panel sizes the underlay: VXLAN adds 50 bytes over IPv4 and 70 over IPv6, and Juniper counts the Ethernet header where Cisco, Arista and NVIDIA do not. Configuration covers the overlay only.

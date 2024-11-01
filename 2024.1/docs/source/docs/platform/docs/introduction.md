<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1> ZCU670 Evaluation Kit Ethernet TRD Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Design Overview </h1>

 </td>
 </tr>
</table>

Design Overview
===============

Introduction
--------------

The IEEE 1588 PTP + SYNCE Ethernet platform is designed on the ZCU670 evaluvation board for showcasing the XXV MAC IP , Programmable Logic (PL) based Inline time stamping for IEEE 1588 Precision Time Protocol (PTP) solution along with SyncE support in PL. It consists of XXV MAC IP configured to support 2 x 25G or 2 x 10G connected to the TX and RX channels of MCDMA to transmit and receive ethernet Protocol Data Unit (PDU). GT Quad transciever in PL manages the transfer of ethernet packets over the physical link. The SFP quad connector linked to the transciever is connected to an external link partner (another ZCU670 board) using SFP28 to SFP28 cables. 
  

Design Components
------------------

<details>
 <summary><b>Hardware components
 
* ZCU670 Evaluation Boards with power cables

* SFP28 to SFP28 25G/10G copper cables

* Micro-USB cables for the terminal emulation.

* Micro SD cards

</b>
</summary>
</details>

<details>
 <summary><b>Interfaces and IP

* Ethernet Traffic Source/Sink 
   
	* ZCU670 Evaluation Board
   
	* Link Partner (ZCU670 Evaluation Board)
   
* PTP Packet Processing PL IPs

   * PL based PTP HW Master in Transmit direction
   * PL based PTP filter and Timestamp prepend logic in Receive direction

* Auxiliary Peripherals
   * SD
   * I2C
   * UART
   * Ethernet

</b>
</summary>
</details>

<details>
 <summary><b>Software components

* Operating system

   * APU: SMP Linux 
* Linux kernel subsystems
   * TCP/IP Stack
 </b>
 </summary>
 </details> 
   
<details>
<summary><b>Speed Supported

  * 2x25G
  * 2x10G
</b>
</summary>
</details> 

**Next Steps**

* [TRD package Contents](trd_packaging.md)
* Go back to the [ZCU670 Ethernet TRD design start page](../platform_landing.md)

**References**

* ZCU670 Evaluation Board User Guide ([UG1532](https://www.xilinx.com/content/dam/xilinx/support/documents/boards_and_kits/zcu670/ug1532-zcu670-eval-bd.pdf))
* Zynq Ultrascale+ RFSOC DFE Data Sheet: Overview ([DS883]( https://www.xilinx.com/content/dam/xilinx/support/documents/data_sheets/ds883-zynq-rfsoc-dfe-overview.pdf))
* 10G/25G High Speed Ethernet Subsystem v4.1 (<a href="https://www.xilinx.com/content/dam/xilinx/support/documents/ip_documentation/xxv_ethernet/v4_1/pg210-25g-ethernet.pdf"> PG314 </a>)


**License**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center"> Copyright © 2024 Advanced Micro Devices, Inc </p>

ZCU670 Ethernet TRD
===========================================================
The ZCU670-IEEE1588 Ethernet TRD demonstrates the capability of ZCU670 evaluation board to synchronize time, frequency, and phase of Physical Hardware clocks (PHC) connected to a packet network that support IEEE 1588 Precision Time Protocol (PTP) protocol. The PHC (Xilinx Timer-Syncer) of the ZCU670 board is synchronized to the PHC of the link partner that supports telecom profile (an another zcu670 Board2 in this case) using PTP packets. The AXI 25G XXV MAC ethernet subsystem along with the PTP inline packet processors present in the Programmable logic (PL) of FPGA guarantees PTP frequency and phase synchronization while serving TCP/UPD traffic of other applications. 

  
Features
--------
 
* PTP Telecom Profiles for Time and Phase (ITU-T G.8275.1 profile)
* 25G support 
* Two step Precision Time Protocol (PTP)
* PTP packet over IEEEE 802.3
* PTP packet over UDP IPV4
* Supports TCP/UDP Traffic 

**Setups Tested**

*	ZCU 670 Board <-> ZCU 670 Board 

Quick Start
-----------
.. toctree::
   :maxdepth: 1

   docs/introduction.md
   docs/trd_packaging.md
   docs/app_deployment.md
   
Tutorials
---------
.. toctree::
   :maxdepth: 1  

   docs/build_vivado_design.md
   
Architecture Documents
----------------------

.. toctree::
   :maxdepth: 1
  

   docs/hw_arch_platform.md
   docs/hw_arch_ptp_pkt_proc.md
   docs/sw_arch_platform.md   
   


Others
------

.. toctree::
   :maxdepth: 1
  

   docs/issue_sc.md
   docs/revision_history.md


Xilinx Support
---------------

GitHub issues will be used for tracking requests and bugs. For questions go to http://forums.xilinx.com/.


License
-------

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0




Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.




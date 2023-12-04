<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1> Zynq UltraScale+ ZCU670 Ethernet + IEEE 1588 PTP Targeted Reference Design </h1>
   </td>
 </tr>
</table>



The ZCU670 Ethernet TRD consists of a platform to demonstrate various aspects of the design and functionality of various Board interfaces present on the ZCU670 Evaluation Board. A platform is a Vivado design plus a corresponding PetaLinux BSP and image that includes the required kernel drivers and user-space libraries to exercise those interfaces. The reference design currently supports the ZCU670 Production board Rev-B. 

><b>Note : </b>Please note that the Ethernet Subsystem in the <b>ZCU670 OpenRAN Radio (O-RU)</b> TRD differs significantly from the <b>ZCU670 Ethernet TRD</b> from this repository.

The following is a list of Platform Designs available :
| Platform Name  | Description | Links |
| ---------------|------------- | -------------- |
| Platform: Ethernet TRD    | The Ethernet platform is designed to showcase the XXV MAC IP as a peripheral and Programmable Logic (PL) based 1588 Precision Time Protocol (PTP) solution for PTP packet processing on Zynq UltraScale+ ZCU670 Evaluation Board. The TRD consists of XXV IP configured to support 25G to transfer Ethernet and PTP packets using the PL based Inline PTP Packet Processors in Transmit and Receive Direction. The PHC (Xilinx Timer-Syncer) of the ZCU670 board is synchronized to the PHC of the link partner (an another zcu670 Board2 in this case) using PTP packets. |<ul><li><a href="https://xilinx.github.io/ZCU670_Ethernet_TRD">Documentation</a></li><li><a href="https://account.amd.com/en/forms/downloads/design-license-xef.html?filename=zcu670-ethernet-trd-2023.2.zip">2023.2 ZCU670 TRD Package</a></li><li><a href="https://account.amd.com/en/forms/downloads/design-license-xef.html?filename=zcu670-ethernet-trd-2023.2-sources-licenses.zip">2023.2 ZCU670 TRD Sources and Licenses </a></li><div>-----------------</div><li><a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2023.1.zip">2023.1 ZCU670 TRD Package</a></li><li><a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2023.1-sources-licences.zip">2023.1 ZCU670 TRD Sources and Licenses</a></li><div>-----------------</div><li><a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2022.2.zip">2022.2 ZCU670 TRD Package</a></li><li><a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2022.2-sources-licenses.zip">2022.2 ZCU670 TRD Sources and Licenses </a></li></ul>

For more information about the ZCU670 Production Board, see [ZCU670 Evaluation Kit](https://www.xilinx.com/products/boards-and-kits/zcu670.html)

## Xilinx Support

For issue reporting and feature requests, please file a GitHub Issue. For questions go to [forums.xilinx.com](http://forums.xilinx.com/).

## Design Licenses

The design includes files licensed by Xilinx and third parties under the terms
of the GNU General Public License, GNU Lesser General Public License,
BSD License, and other licenses. The Package includes one
zip file named ``sources.zip`` containing the complete set of design source
files and one zip file named ``licenses.zip`` containing licenses extracted from
the design source files. You are solely responsible for checking any files you
use for notices and licenses and for complying with any terms applicable to your
use of the design and any third party files supplied with the design.

To generate licenses and sources for a Petalinux BSP use following command. 

``petalinux-build -a``


To obtain  Xilinx image.ub  license files:

Licenses for image.ub files are included in the ``/usr/share/licenses`` directory when the image file is built.
The DNF package manager can be used to list all packages in the image, as well as download sources for all packages.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">&copy;  Copyright 2022-2023, Xilinx, Inc. Xilinx is now a part of AMD, Inc.</p>

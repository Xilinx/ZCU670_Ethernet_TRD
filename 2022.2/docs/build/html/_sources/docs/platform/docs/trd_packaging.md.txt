<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> ZCU670 Evaluation Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>TRD package contents</h1>

 </td>
 </tr>
</table>

TRD Package Contents
====================
The TRD package contains prebuilt images and binaries to run the TRD. It also contains source files and scripts to build vivado and petalinux. The necessary licensing information for the sources is given as a separate package.

Download the TRD Package
------------------------

<!--- >**Note**: Skip the following steps if the design files have already been cloned and extracted to a working repository --->

### Package Download Links

* a) Download the TRD package <a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2022.2.zip">Source Files </a> .

* b) Download the PetaLinux sources and licensing information  <a href="https://www.xilinx.com/member/forms/download/design-license-xef.html?filename=zcu670-ethernet-trd-2022.2-sources-licenses.zip">Sources and Licenses </a> .


TRD package File Structure:
---------------------------
* After downloading the source files, unzip the TRD package.

* Navigate to the `../zcu670-ethernet-trd-2022.2` which is the working directory.

* The top-level directory structure is described below:

![trd_package](../../media/zcu_670_file_hier.PNG)

The TRD package contains: 

1. `LICENSE`: This file contains the license details for the package contents.
     
2. `Makefile`: This file has scripts to build the entire TRD package hardware and software platforms. 

3. `PetaLinux`: This directory contains PetaLinux recipes and metadata to build the images.

4. `vivado`: This folder contains files to create the zcu670 ethernet hardware platform. 	

5. IMPORTANT_NOTICE_CONCERNING_THIRD_PARTY_CONTENT: This file contains information about Xilinx and other third party licenses.


### Next Steps

* [Setting up the Board and Application Deployment](./app_deployment.md)
* Go back to the [zcu670 Targeted Reference Designs start page](../platform_landing.md)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2023 Xilinx</p>

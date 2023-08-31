<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> ZCU670 Evaluation Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Using Vivado to Build the Hardware Design and petalinux images</h1>

 </td>
 </tr>
</table>



Build Flow
================================================
 
This tutorial explains the steps to build the hardware design and software images from the TRD source package.

### Prerequisites

* Vivado Design Suite 2023.1
* PetaLinux 2023.1 tools

> * **Note: After sourcing the Vivado tool open `../.Xilinx/Vivado/Vivado_init.tcl` and add `enable_beta_device` command into it to enable all beta devices**

To Build the TRD Package with the top Makefile:
---------------------------------------------------

Follow the below steps to generate petalinux images using the top Makefile in **`../zcu670-ethernet-trd-2023.1/Makefile`** path.

1. Go to the working directory

   ```
   cd ../zcu670-ethernet-trd-2023.1
   ```
   
2. Run the following command to build and generate sdcard image. 

   This Makefile calls lower level Makefiles to build hardware XSA and petalinux images. The image generation may take a hour time depends on the system specification.

   ```
   make sdcard
   ```
3. The generated images will be located at:

   ```
   ../zcu670-ethernet-trd-2023.1/petalinux/xilinx-zcu670-trd/images/linux
   
   ```

To Build the Hardware Platform XSA:
-------------------------------------------
Follow the steps below to build XSA using the Makefile in **`../zcu670-ethernet-trd-2023.1/vivado/Makefile`** path.


1. Go to the platform directory.

   ```
   cd ../zcu670-ethernet-trd-2023.1/vivado/
   ```
   
2. To build the XSA, Source Vivado tool and run the following command.

   The Makefile uses scripts/main.tcl file to create a Vivado project, populate the block design and finally build a XSA. The XSA generation may take a hour time depends on the system specification.

   ```
   make design_xsa   
   ```

3.	The generated XSA will be located at:

   ```
    ../zcu670-ethernet-trd-2023.1/vivado/zcu670_25G_PTP_subsys/project/xxv_ptp_subsys_wrapper.xsa
   ```

To Build the Petalinux Images:
-------------------------------
Follow the steps below to build petalinux images using the Makefile in **../zcu670-ethernet-trd-2023.1/petalinux/xilinx-zcu670-trd** path.

1. Go to the petalinux BSP folder.

   ```
   cd ../zcu670-ethernet-trd-2023.1/petalinux/xilinx-zcu670-trd
   
   ```
2. To build boot images, source petalinux tool and run the following command. 
   
   The Makefile configures the hardware platform required to build the petalinux images and create BOOT.BIN, which comprise of  FSBL, UBoot, PMU firmware and hardware bit file.

   ```
   make boot
  
   ```
3. The generated images will be located at:

   ```
   ../zcu670-ethernet-trd-2023.1/petalinux/xilinx-zcu670-trd/images/linux
   
   ```
   **Note**: The XSA used to configure petalinux is available in **../zcu670-ethernet-trd-2023.1/petalinux/xilinx-zcu670-trd/project-spec/hw-description** path.

4. Copy the image (image.ub , BOOT.BIN and boot.scr ) to the FAT32 formatted SD card and insert the card in SD card slot to run the design. This image is functionally
   equivalent to the prebuilt sdcard image provided with package.
   
  

### Next Steps

* [Hardware and Software Architecture](hw_arch_platform.md)
* Go back to the [zcu670 Targeted Reference Designs start page](../platform_landing.md)

### References

* Vivado user guide [UG901](https://docs.xilinx.com/r/en-US/ug901-vivado-synthesis/Running-Synthesis)
* Petalinux user guide [UG1144](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2023 Xilinx</p>

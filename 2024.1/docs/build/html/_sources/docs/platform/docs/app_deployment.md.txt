<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1> ZCU670 Evaluation Kit Tutorial </h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Board Setup and Application Deployment</h1>

 </td>
 </tr>
</table>

Setting up the Board and Application Deployment
===============================================

Introduction
------------
This document shows how to set up the board and run the ZCU670 Ethernet TRD application with prebuilt images.

###  Prerequisites

 * Reference design package `zcu670_ethernet_trd_2024.1.zip` file
 
 * ZCU670 Evaluation Board with power cable - 3 nos.
 
 * Micro-USB cables for the terminal emulation.

 * Micro SD cards
 
 * UART Driver (FTDI CDM).

 * Terminal emulator, for example:

      Windows: teraterm (Refer to <a href="https://docs.xilinx.com/v/u/en-US/ug1036-tera-term-install">UG1036 </a> regarding Tera Term installation)

      Linux: picocom <a href="https://github.com/npat-efault/picocom/releases">Picocom </a>

 * 25G SFP28 copper cable - 3 nos  ([SFP28 cable](https://www.fs.com/products/65868.html?attribute=9360&id=2018970))
  
 * Iperf3 (v 3.12) application.
 
 * ptp4l (v 4.3)
 
### Board Setup

The following figure shows the ZCU670 evaluation board.

![setup](../../media/zcu670_setup_new.png)

  **Board jumper and switch settings**

This is a one-time setup and the board should have been delivered to you with this default setting, however it is good to double check for the first time when you get the board.

* Setup Boot Mode switch **SW2** to (ON,OFF,OFF,OFF) from switch bits 1 to 4 as shown in the above image to set the board in SD BOOT mode.

* Connect two SFP28 cables between Board-1 and Board-2, connecting the Left Top (LT) slot of one board to other board using a cable and the Left Low (LL) slot of one board to other board using an another cable. The SFP quad (J29) layout diagram is shown below.

 ![formatter](../../media/SFP_slot.png)
 
### Flash the SD Card
 
  1. Unzip the package and save it on your computer. 
  
  2. Navigate to the `../zcu670-ethernet-trd-2024.1/prebuilt` folder.
  
  3. Prepare the SD card. There are many options to format the SD Card in the windows tool. But, always format with FAT32 option. Use the SD Card Formatter tool to format the SD card <a href="https://www.sdcard.org/downloads/formatter_4/">SD Card Formatter </a> 
	 
	 ![formatter](../../media/sd-card-format.png).
  
  4. Navigate to ``zcu670_25G_PTP_subsys`` or ``zcu670_10G_PTP_subsys`` folder to Copy `BOOT.BIN, image.ub and boot.scr` to microSD card.
  
  5. Connect the microSD card to the Board.  
  
  6. Repeat steps 3 , 4 and 5 for the second Board. 
    
### GT Reference clocks

The  Renesas 8A34001 synchronization management unit (SMU) chip is the clock source for GT, IEEE 1588 PTP and Synchronous Ethernet (SyncE).  For more details on programming and controlling the 8A34001 chip, refer 8A34001 <a href="https://www.renesas.com/en/products/clocks-timing/application-specific-clocks/network-synchronization/ieee-1588-and-synchronous-ethernet-clocks/8a34001-system-synchronizer-ieee-1588-eight-channels"> Data sheet. </a> 

The GT Reference clock and other clocks required for PTP, syncE are configured by the IDT drivers while booting. The clock configuration files and the binaries used for configuring 8A34001 chip is given in `../zcu670-ethernet-trd-2024.1/IDT` folder.

### UART Driver Install

Prior to connecting and powering on the ZCU670, install the FTDI CDM Drivers <a href="https://www.ftdichip.com/Drivers/CDM/CDM21228_Setup.zip">FTDI CDM Driver </a>  
 
 ![UART](../../media/FTDI_driver.png)


### SD Boot Mode:
 
  * Connect the power supply to the ZCU670 (J52) port and Power on the board

> * **Note:** Ensure the Boot Mode switch SW2 to (ON,OFF,OFF,OFF).

**Serial console settings**

ZCU670 comes with a micro USB connector for JTAG+UART. Connect a Type-A to micro USB cable between the USB UART JTAG (FTDI) connector (J83) of the ZCU670 board and the PC. 

The PC will enumerate and shows three COM ports.

* UART0 (PS)

* UART1 (PL)

* System Controller UART

In a terminal emulator, connect to UART0 using the following settings:

* Baud Rate: 115200

* Data: 8 bit

* Parity: None

* Stop: 1 bit

* Flow Control: None

![TT](../../media/tera_term_serial.PNG)

* After a successful boot, a shell prompt will appear as shown below.
   ```  
   xilinx-zcu670-20241 login:: 
   ```   
* Login with the username **petalinux** and create a new password when prompted.

* To configure the Ethernet interfaces, make sure to log in as super user using the new password created.
   ```
  xilinx-zcu670-20241:~$:sudo su
   ```  
### Running the applications on board
> * **Note:** ZCU670 boards include a Renesas 8A34001 SMU chip preloaded with Clock Manager Firmware (CM FW) version 4.8.0. This version does not fully support PTP. To enable proper PTP functionality, update to CM FW 4.9.9 by following [AR-000038884](https://adaptivesupport.amd.com/s/article/000038884?language=en_US)

Once the zcu670 boards are booted, set up an IP address for the interface (in this case eth1 and eth2) and make sure the Ethernet link is established between boards. Do not proceed until you are able to ping between boards.

> * **Note:** If the link is not established, use the below commands once and ensure the link is up.
   ```  	
	ifconfig <interface_name> down	
	ifconfig <interface_name> <IP-address> up
   ```  
> * **Note:** While making the interface up, make sure a valid IP address is set for the interface.

###  Synchronous Ethernet (SyncE) commands
> * **Note:** SyncE test can be performed between ZCU670 and an external protocol tester or other SyncE compatible device.

#### SyncE master slave Test:
In this test two zcu670 boards are used to test the transfer of Synchronization Status Message (SSM) between two boards over the SyncE Ethernet Synchronization Message Channel (ESMC). The test assumes one board as master (Board-1) and the second board (Board-2) as slave.

![SYNCE](../../media/synce-master-slave.png)

**SyncE Master:** 

* Run synced on master board.
```     
Board-1 > synced -f /usr/bin/synced_master.cfg
```
> * **Note:** To validate the transfer of SSM messages between master and slave boards, Quality level (QL) of master side clock is configured as Primary Reference Time Clock (PRTC) and slave side as Synchronous Equipment Clock (SEC) in order to make the slave device locked to master clock. For more details about syncE configurations refer [Renesas SyncE Source](https://github.com/renesas/synced/tree/main).

**synced master side log** :

The synced log is given below.

<details>
<summary>Click to expand </summary>

```
xilinx-zcu670-20241:/home/petalinux# synced -f /usr/bin/synced_master.cfg
synced[30032.894]: ---Started synced (version: 2.0.5.310964.b166f770 Mar 21 2024 20:32:02)---
synced[30032.894]: Opened configuration file /usr/bin/synced_master.cfg:
# amd_zcu670.cfg

#
# Global parameters
#
[global]
net_opt 1
no_ql_en 0
synce_forced_ql_en 1
lo_ql PRTC
lo_pri 255
max_msg_lvl 7
stdout_en 1
syslog_en 0
# Device configuration file path (applicable for generic device)
device_cfg_file ""
device_name /dev/rsmu0
synce_dpll_idx 0
holdover_ql PRTC 
holdover_tmr 10
hoff_tmr 300
wtr_tmr 10
advanced_holdover_en 0
pcm4l_if_en 1
pcm4l_if_ip_addr 127.0.0.1
pcm4l_if_port_num 2400
mng_if_en 1
mng_if_ip_addr 127.0.0.2
mng_if_port_num 2401

#
# Sync-E clock port
#
[eth1]
clk_idx 1
pri 1
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql PRTC

[eth2]
#clk_idx 255 
pri 2
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql PRTC
synced[30032.895]: No QL mode is disabled
synced[30032.895]: eth1 (2E:E6:17:3A:42:2) is Sync-E clock port
synced[30032.895]: eth2 (1E:0D:31:0B:5F:D) is Sync-E monitoring port
synced[30032.895]: Set ESMC network option to 1
synced[30032.895]: Set LO QL to QL-PRTC (1)
synced[30032.895]: Created ESMC configuration
synced[30032.895]: Set Sync-E DPLL index to 0
synced[30032.895]: Created device configuration
synced[30032.895]: Forced QL for Sync-E ports is enabled
synced[30032.895]: Set LO priority to 255
synced[30032.895]: Set hold-off timer to 300 milliseconds
synced[30032.895]: Set wait-to-restore timer to 10 seconds
synced[30032.895]: Set number of syncs to 2
synced[30032.895]: Created control configuration
synced[30032.895]: Set holdover QL to QL-PRTC (1)
synced[30032.895]: Set holdover timer to 10 seconds
synced[30032.895]: Set advanced holdover enable to 0
synced[30032.895]: Created monitor configuration
synced[30032.895]: Initialized management
synced[30032.895]: Initialized device adaptor
synced[30032.895]: Initialized Sync-E DPLL
synced[30032.896]: eth1 is already assigned to clock index 1
synced[30032.896]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[30032.896]: State of clock index 1 associated with port eth1 changed to qualified
synced[30032.896]: Best clock has clock index 1 and rank 0x010100
synced[30032.898]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[30032.898]: Initialized control
synced[30032.898]: Initialized Sync-E DPLL monitor
synced[30032.916]: Opened TX for port eth1 (port number: 5)
synced[30032.966]: Started TX thread for port eth1 (port number: 5)
synced[30032.966]: Created port eth1 (port number: 5) TX
synced[30032.980]: Opened TX for port eth2 (port number: 6)
synced[30033.030]: Started TX thread for port eth2 (port number: 6)
synced[30033.030]: Created port eth2 (port number: 6) TX
synced[30033.030]: Created 2 TX ports
synced[30033.044]: Opened RX for port eth1 (port number: 5)
synced[30033.094]: Started RX thread for port eth1 (port number: 5)
synced[30033.094]: Created port eth1 (port number: 5) RX
synced[30033.108]: Opened RX for port eth2 (port number: 6)
synced[30033.158]: Started RX thread for port eth2 (port number: 6)
synced[30033.158]: Created port eth2 (port number: 6) RX
synced[30033.158]: Created 2 RX ports
synced[30033.158]: Initialized ESMC
synced[30033.208]: pcm4l interface started in 50 milliseconds
synced[30033.258]: Mangement interface started in 50 milliseconds
synced[30033.259]: Current QL set to QL-PRTC (1)
synced[30033.259]: Current Sync-E DPLL state changed to lock acquisition-recovery
synced[30033.259]: pcm4l_if_send: Cannot send message to pcm4l
synced[30033.259]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[30033.259]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30033.259]: Selected port is eth1 and current QL is QL-PRTC (1)
synced[30033.259]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30033.962]: Current Sync-E DPLL state changed to locked
synced[30034.209]: QL changed to QL-DNU (8) on port eth2 (port number: 6)
synced[30034.209]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[30034.209]: Current state for port eth2 changed to normal
synced[30034.209]: Extended QL TLV appeared on port eth2 (port number: 6)
synced[30034.209]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30034.245]: QL changed to QL-DNU (8) on port eth1 (port number: 5)
synced[30034.245]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[30034.245]: Current state for port eth1 changed to normal
synced[30034.245]: Extended QL TLV appeared on port eth1 (port number: 5)
synced[30034.245]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30034.259]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30034.259]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30034.264]: eth2 becomes active Sync-E clock port for clock index 1
synced[30034.264]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[30034.264]: eth1 becomes active Sync-E clock port for clock index 1
synced[30034.264]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[30034.264]: State of clock index 255 associated with port eth2 changed to qualified
synced[30034.264]: Best clock is LO
synced[30034.267]: Set device clock priorities (0): (ordered list of clock indices)
synced[30034.367]: Current Sync-E DPLL state changed to holdover
synced[30034.367]: <<Sent event ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30034.367]: pcm4l_if_send: Cannot send message to pcm4l
synced[30034.367]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[30034.367]: <<Sent event ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30034.367]: Selected port is LO and current QL is QL-PRTC (1)
synced[30034.446]: QL changed to QL-SEC (7) on port eth1 (port number: 5)
synced[30034.446]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[30034.446]: Current state for port eth1 changed to wait-to-restore
synced[30034.446]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30034.460]: QL changed to QL-SEC (7) on port eth2 (port number: 6)
synced[30034.460]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[30034.460]: Current state for port eth2 changed to wait-to-restore
synced[30034.460]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30034.468]: Best clock is LO
synced[30034.470]: Set device clock priorities (0): (ordered list of clock indices)
synced[30035.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30035.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30035.447]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30035.461]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30036.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30036.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30036.412]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30036.449]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30037.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30037.367]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30037.414]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30037.450]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30038.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30038.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30038.415]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30038.451]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30039.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30039.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30039.416]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30039.453]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30040.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30040.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30040.418]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30040.454]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30041.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30041.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30041.419]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30041.456]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30042.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30042.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30042.421]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30042.457]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30043.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30043.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30043.422]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30043.458]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30044.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30044.368]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30044.405]: Current Sync-E DPLL state changed to freerun
synced[30044.423]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30044.460]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30044.505]: Current state for port eth1 changed to normal
synced[30044.505]: Current state for port eth2 changed to normal
synced[30044.505]: Best clock is LO
synced[30044.508]: Set device clock priorities (0): (ordered list of clock indices)
synced[30044.560]: Originator clock timing loop detected on port eth1 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30044.560]: QL changed to QL-DNU (8) on port eth1 (port number: 5)
synced[30044.560]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[30044.560]: Current state for port eth1 changed to normal
synced[30044.560]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30044.574]: Originator clock timing loop detected on port eth2 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30044.574]: QL changed to QL-DNU (8) on port eth2 (port number: 6)
synced[30044.574]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[30044.574]: Current state for port eth2 changed to normal
synced[30044.574]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30044.608]: eth2 becomes active Sync-E clock port for clock index 1
synced[30044.608]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[30044.609]: eth1 becomes active Sync-E clock port for clock index 1
synced[30044.609]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[30044.609]: Best clock is LO
synced[30044.611]: Set device clock priorities (0): (ordered list of clock indices)
synced[30045.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30045.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30045.562]: Originator clock timing loop detected on port eth1 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30045.562]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30045.575]: Originator clock timing loop detected on port eth2 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30045.575]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30046.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30046.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[30046.563]: Originator clock timing loop detected on port eth1 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30046.563]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[30046.577]: Originator clock timing loop detected on port eth2 (ESMC PDU received from MAC address 2E:E6:17:3A:42:2B)
synced[30046.577]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[30047.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[30047.369]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>

```

</details>

**SyncE Slave:** 

* Run synced on slave board.
```     
Board-2 > synced -f /usr/bin/synced_slave.cfg
```
**synced slave side log** :	

The synced log is given below.

<details>
<summary>Click to expand </summary>

```
xilinx-zcu670-20241:/home/petalinux# synced -f /usr/bin/synced_slave.cfg
synced[16703.902]: ---Started synced (version: 2.0.5.310964.b166f770 Mar 21 2024 20:32:02)---
synced[16703.902]: Opened configuration file /usr/bin/synced_slave.cfg:
# amd_zcu670.cfg

#
# Global parameters
#
[global]
net_opt 1
no_ql_en 0
synce_forced_ql_en 1
lo_ql SEC
lo_pri 255
max_msg_lvl 7
stdout_en 1
syslog_en 0
# Device configuration file path (applicable for generic device)
device_cfg_file ""
device_name /dev/rsmu0
synce_dpll_idx 0
holdover_ql SEC 
holdover_tmr 10
hoff_tmr 300
wtr_tmr 10
advanced_holdover_en 0
pcm4l_if_en 1
pcm4l_if_ip_addr 127.0.0.1
pcm4l_if_port_num 2400
mng_if_en 1
mng_if_ip_addr 127.0.0.2
mng_if_port_num 2401

#
# Sync-E clock port
#
[eth1]
clk_idx 1
pri 1
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC

[eth2]
#clk_idx 255 
pri 2
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC
synced[16703.903]: No QL mode is disabled
synced[16703.903]: eth1 (F6:B3:9A:9E:C2:4) is Sync-E clock port
synced[16703.903]: eth2 (B6:2C:C2:81:CE:5) is Sync-E monitoring port
synced[16703.903]: Set ESMC network option to 1
synced[16703.903]: Set LO QL to QL-SEC (7)
synced[16703.903]: Created ESMC configuration
synced[16703.903]: Set Sync-E DPLL index to 0
synced[16703.903]: Created device configuration
synced[16703.903]: Forced QL for Sync-E ports is enabled
synced[16703.903]: Set LO priority to 255
synced[16703.903]: Set hold-off timer to 300 milliseconds
synced[16703.903]: Set wait-to-restore timer to 10 seconds
synced[16703.903]: Set number of syncs to 2
synced[16703.903]: Created control configuration
synced[16703.903]: Set holdover QL to QL-SEC (7)
synced[16703.903]: Set holdover timer to 10 seconds
synced[16703.903]: Set advanced holdover enable to 0
synced[16703.903]: Created monitor configuration
synced[16703.903]: Initialized management
synced[16703.903]: Initialized device adaptor
synced[16703.903]: Initialized Sync-E DPLL
synced[16703.904]: eth1 is already assigned to clock index 1
synced[16703.904]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[16703.904]: State of clock index 1 associated with port eth1 changed to qualified
synced[16703.904]: Best clock has clock index 1 and rank 0x070100
synced[16703.906]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[16703.906]: Initialized control
synced[16703.906]: Initialized Sync-E DPLL monitor
synced[16703.924]: Opened TX for port eth1 (port number: 5)
synced[16703.974]: Started TX thread for port eth1 (port number: 5)
synced[16703.974]: Created port eth1 (port number: 5) TX
synced[16703.988]: Opened TX for port eth2 (port number: 6)
synced[16704.038]: Started TX thread for port eth2 (port number: 6)
synced[16704.038]: Created port eth2 (port number: 6) TX
synced[16704.038]: Created 2 TX ports
synced[16704.052]: Opened RX for port eth1 (port number: 5)
synced[16704.102]: Started RX thread for port eth1 (port number: 5)
synced[16704.102]: Created port eth1 (port number: 5) RX
synced[16704.116]: Opened RX for port eth2 (port number: 6)
synced[16704.166]: Started RX thread for port eth2 (port number: 6)
synced[16704.166]: Created port eth2 (port number: 6) RX
synced[16704.166]: Created 2 RX ports
synced[16704.166]: Initialized ESMC
synced[16704.216]: pcm4l interface started in 50 milliseconds
synced[16704.266]: Mangement interface started in 50 milliseconds
synced[16704.267]: Current QL set to QL-SEC (7)
synced[16704.267]: Current Sync-E DPLL state changed to locked
synced[16704.267]: pcm4l_if_send: Cannot send message to pcm4l
synced[16704.267]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[16704.267]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16704.267]: Selected port is eth1 and current QL is QL-SEC (7)
synced[16704.267]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16704.352]: QL changed to QL-DNU (8) on port eth1 (port number: 5)
synced[16704.352]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[16704.352]: Current state for port eth1 changed to normal
synced[16704.352]: Extended QL TLV appeared on port eth1 (port number: 5)
synced[16704.352]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16704.366]: QL changed to QL-DNU (8) on port eth2 (port number: 6)
synced[16704.366]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[16704.366]: Current state for port eth2 changed to normal
synced[16704.366]: Extended QL TLV appeared on port eth2 (port number: 6)
synced[16704.366]: >>Received ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16704.367]: eth2 becomes active Sync-E clock port for clock index 1
synced[16704.368]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[16704.368]: eth1 becomes active Sync-E clock port for clock index 1
synced[16704.368]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[16704.368]: State of clock index 255 associated with port eth2 changed to qualified
synced[16704.368]: Best clock is LO
synced[16704.370]: Set device clock priorities (0): (ordered list of clock indices)
synced[16704.452]: QL changed to QL-PRTC (1) on port eth1 (port number: 5)
synced[16704.452]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[16704.452]: Current state for port eth1 changed to wait-to-restore
synced[16704.452]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16704.466]: QL changed to QL-PRTC (1) on port eth2 (port number: 6)
synced[16704.466]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[16704.466]: Current state for port eth2 changed to wait-to-restore
synced[16704.466]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16704.470]: Current Sync-E DPLL state changed to holdover
synced[16704.471]: pcm4l_if_send: Cannot send message to pcm4l
synced[16704.470]: <<Sent event ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16704.471]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[16704.471]: Selected port is LO and current QL is QL-SEC (7)
synced[16704.471]: <<Sent event ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16704.471]: Best clock is LO
synced[16704.473]: Set device clock priorities (0): (ordered list of clock indices)
synced[16705.454]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16705.468]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16705.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16705.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16706.455]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16706.469]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16706.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16706.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16707.457]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16707.470]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16707.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16707.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16708.458]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16708.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16708.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16708.472]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16709.459]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16709.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16709.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16709.473]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16710.461]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16710.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16710.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16710.475]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16711.462]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16711.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16711.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16711.476]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16712.464]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16712.471]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16712.472]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16712.477]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16713.429]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16713.465]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16713.472]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16713.472]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16714.430]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16714.466]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16714.472]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16714.472]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16714.508]: Current Sync-E DPLL state changed to freerun
synced[16714.509]: Current state for port eth1 changed to normal
synced[16714.509]: Current state for port eth2 changed to normal
synced[16714.509]: Best clock has clock index 1 and rank 0x010101
synced[16714.511]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[16714.612]: Current QL upgraded from QL-SEC (7) to QL-PRTC (1)
synced[16714.612]: Current Sync-E DPLL state changed to lock acquisition-recovery
synced[16714.612]: pcm4l_if_send: Cannot send message to pcm4l
synced[16714.612]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16714.612]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[16714.612]: Selected port is eth1 and current QL is QL-PRTC (1)
synced[16714.612]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16715.431]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16715.468]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16715.516]: Current Sync-E DPLL state changed to locked
synced[16715.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16715.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16716.433]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16716.469]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16716.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16716.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[16717.434]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[16717.471]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[16717.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[16717.612]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>

```
</details>

> * **Note:** *`Current Sync-E DPLL state changed to locked`* in the synced log indicate that the slave side DPLL is locked to master and outgoing message  quality level is changed to QL-DNU (Do Not Use) to avoild timing loop as configured in the *`synced_slave.cfg`* file.
  
#### SyncE Switching Test

To perform this test three zcu670 boards are used. Two boards (Board-1 & Board-2) are configured as master boards and Board-3 is configured as slave board. The slave board locks to the clock which has better QL by switching the MUX present in gt_shared IP and, select the best recovered clock among the two ethernet interfaces.

![SYNCE](../../media/synce-switching.png)

**Master-1:**
* Run synced on master board (Board-1).
```     
Board-1 > synced -f /usr/bin/synced_slave.cfg
```
> * **Note:** The QL of Master-1 clock in set to SEC using the *`synced_slave.cfg`* file

**Master-1 side log :**

The synced log is given below.

<details>
<summary>Click to expand </summary>

```
xilinx-zcu670-20241:/home/petalinux# synced -f /usr/bin/synced_slave.cfg 
synced[241.458]: ---Started synced (version: 2.0.5.310964.b166f770 Mar 21 2024 20:32:02)---
synced[241.458]: Opened configuration file /usr/bin/synced_slave.cfg:
# amd_zcu670.cfg
  
#
# Global parameters
#
[global]
net_opt 1
no_ql_en 0
synce_forced_ql_en 1
lo_ql SEC
lo_pri 255
max_msg_lvl 7
stdout_en 1
syslog_en 0
# Device configuration file path (applicable for generic device)
device_cfg_file ""
device_name /dev/rsmu0
synce_dpll_idx 0
holdover_ql SEC
holdover_tmr 10
hoff_tmr 300
wtr_tmr 10
advanced_holdover_en 0
pcm4l_if_en 1
pcm4l_if_ip_addr 127.0.0.1
pcm4l_if_port_num 2400
mng_if_en 1
mng_if_ip_addr 127.0.0.2
mng_if_port_num 2401
  
#
# Sync-E clock port
#
[eth1]
clk_idx 1
pri 1
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC
  
[eth2]
#clk_idx 255
pri 2
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC
synced[241.459]: No QL mode is disabled
synced[241.459]: eth1 (92:14:39:7D:AC:5) is Sync-E clock port
synced[241.459]: eth2 (06:5F:79:AE:58:7) is Sync-E monitoring port
synced[241.459]: Set ESMC network option to 1
synced[241.459]: Set LO QL to QL-SEC (7)
synced[241.459]: Created ESMC configuration
synced[241.459]: Set Sync-E DPLL index to 0
synced[241.459]: Created device configuration
synced[241.459]: Forced QL for Sync-E ports is enabled
synced[241.459]: Set LO priority to 255
synced[241.459]: Set hold-off timer to 300 milliseconds
synced[241.459]: Set wait-to-restore timer to 10 seconds
synced[241.459]: Set number of syncs to 2
synced[241.459]: Created control configuration
synced[241.459]: Set holdover QL to QL-SEC (7)
synced[241.459]: Set holdover timer to 10 seconds
synced[241.459]: Set advanced holdover enable to 0
synced[241.459]: Created monitor configuration
synced[241.459]: Initialized management
synced[241.459]: Initialized device adaptor
synced[241.459]: Initialized Sync-E DPLL
synced[241.460]: eth1 is already assigned to clock index 1
synced[241.460]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[241.460]: State of clock index 1 associated with port eth1 changed to qualified
synced[241.460]: Best clock has clock index 1 and rank 0x070100
synced[241.462]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[241.462]: Initialized control
synced[241.462]: Initialized Sync-E DPLL monitor
synced[241.488]: Opened TX for port eth1 (port number: 5)
synced[241.538]: Started TX thread for port eth1 (port number: 5)
synced[241.538]: Created port eth1 (port number: 5) TX
synced[241.552]: Opened TX for port eth2 (port number: 6)
synced[241.602]: Started TX thread for port eth2 (port number: 6)
synced[241.602]: Created port eth2 (port number: 6) TX
synced[241.602]: Created 2 TX ports
synced[241.616]: Opened RX for port eth1 (port number: 5)
synced[241.666]: Started RX thread for port eth1 (port number: 5)
synced[241.666]: Created port eth1 (port number: 5) RX
synced[241.680]: Opened RX for port eth2 (port number: 6)
synced[241.730]: Started RX thread for port eth2 (port number: 6)
synced[241.730]: Created port eth2 (port number: 6) RX
synced[241.730]: Created 2 RX ports
synced[241.730]: Initialized ESMC
synced[241.780]: pcm4l interface started in 50 milliseconds
synced[241.830]: Mangement interface started in 50 milliseconds
synced[241.831]: Current QL set to QL-SEC (7)
synced[241.831]: Current Sync-E DPLL state changed to lock acquisition-recovery
synced[241.831]: pcm4l_if_send: Cannot send message to pcm4l
synced[241.831]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[241.831]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[241.831]: Selected port is eth1 and current QL is QL-SEC (7)
synced[241.831]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[242.534]: Current Sync-E DPLL state changed to locked
synced[242.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[242.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[243.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[243.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[244.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[244.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[245.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[245.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[246.622]: RX timeout occurred (QL not received within 5 seconds period) on port eth1 (port number: 5)
synced[246.623]: Current state for port eth1 changed to hold-off
synced[246.686]: RX timeout occurred (QL not received within 5 seconds period) on port eth2 (port number: 6)
synced[246.686]: Current state for port eth2 changed to hold-off
synced[246.831]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[246.832]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[246.956]: Current state for port eth1 changed to normal
synced[246.957]: eth2 becomes active Sync-E clock port for clock index 1
synced[246.957]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[246.957]: State of clock index 1 associated with port eth2 changed to qualified
synced[246.957]: Best clock has clock index 1 and rank 0x070200
synced[246.959]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[247.060]: pcm4l_if_send: Cannot send message to pcm4l
synced[247.060]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[247.060]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[247.060]: Selected port is eth2 and current QL is QL-SEC (7)
synced[247.060]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[247.060]: Current state for port eth2 changed to normal
synced[247.060]: eth1 becomes active Sync-E clock port for clock index 1
synced[247.060]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[247.060]: Best clock is LO
synced[247.062]: Set device clock priorities (0): (ordered list of clock indices)
synced[247.163]: Current Sync-E DPLL state changed to holdover
synced[247.163]: pcm4l_if_send: Cannot send message to pcm4l
synced[247.163]: <<Sent event ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[247.163]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[247.163]: Selected port is LO and current QL is QL-SEC (7)
synced[247.163]: <<Sent event ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[248.163]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[248.163]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[249.163]: <<Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)>>
```
</details>

> * **Note:** *`Sent information ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)`* in  master-1 side log indicate syncE message with quality level SEC on eth1 interface.

**Master-2:**
* Run synced on master board.
```     
Board-2 > synced -f /usr/bin/synced_master.cfg
```
> * **Note:** The QL of master-2 clock in set to PRTC using the synced_master.cfg file

**Master-2 side log :**

The synced log is given below.

<details>
<summary>Click to expand </summary>

```
xilinx-zcu670-20241:/home/petalinux# synced -f /usr/bin/synced_master.cfg
synced[232.226]: ---Started synced (version: 2.0.5.310964.b166f770 Mar 21 2024 20:32:02)---
synced[232.226]: Opened configuration file /usr/bin/synced_master.cfg:
# amd_zcu670.cfg
  
#
# Global parameters
#
[global]
net_opt 1
no_ql_en 0
synce_forced_ql_en 1
lo_ql PRTC
lo_pri 255
max_msg_lvl 7
stdout_en 1
syslog_en 0
# Device configuration file path (applicable for generic device)
device_cfg_file ""
device_name /dev/rsmu0
synce_dpll_idx 0
holdover_ql PRTC
holdover_tmr 10
hoff_tmr 300
wtr_tmr 10
advanced_holdover_en 0
pcm4l_if_en 1
pcm4l_if_ip_addr 127.0.0.1
pcm4l_if_port_num 2400
mng_if_en 1
mng_if_ip_addr 127.0.0.2
mng_if_port_num 2401
  
#
# Sync-E clock port
#
[eth1]
clk_idx 1
pri 1
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql PRTC
  
[eth2]
#clk_idx 255
pri 2
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql PRTC
synced[232.227]: No QL mode is disabled
synced[232.227]: eth1 (FE:15:3E:41:F3:9) is Sync-E clock port
synced[232.227]: eth2 (12:4D:DF:F7:3C:1) is Sync-E monitoring port
synced[232.227]: Set ESMC network option to 1
synced[232.227]: Set LO QL to QL-PRTC (1)
synced[232.227]: Created ESMC configuration
synced[232.227]: Set Sync-E DPLL index to 0
synced[232.227]: Created device configuration
synced[232.227]: Forced QL for Sync-E ports is enabled
synced[232.227]: Set LO priority to 255
synced[232.227]: Set hold-off timer to 300 milliseconds
synced[232.227]: Set wait-to-restore timer to 10 seconds
synced[232.227]: Set number of syncs to 2
synced[232.227]: Created control configuration
synced[232.227]: Set holdover QL to QL-PRTC (1)
synced[232.227]: Set holdover timer to 10 seconds
synced[232.227]: Set advanced holdover enable to 0
synced[232.227]: Created monitor configuration
synced[232.227]: Initialized management
synced[232.227]: Initialized device adaptor
synced[232.227]: Initialized Sync-E DPLL
synced[232.228]: eth1 is already assigned to clock index 1
synced[232.228]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[232.228]: State of clock index 1 associated with port eth1 changed to qualified
synced[232.228]: Best clock has clock index 1 and rank 0x010100
synced[232.230]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[232.230]: Initialized control
synced[232.230]: Initialized Sync-E DPLL monitor
synced[232.252]: Opened TX for port eth1 (port number: 5)
synced[232.302]: Started TX thread for port eth1 (port number: 5)
synced[232.302]: Created port eth1 (port number: 5) TX
synced[232.316]: Opened TX for port eth2 (port number: 6)
synced[232.366]: Started TX thread for port eth2 (port number: 6)
synced[232.366]: Created port eth2 (port number: 6) TX
synced[232.366]: Created 2 TX ports
synced[232.380]: Opened RX for port eth1 (port number: 5)
synced[232.430]: Started RX thread for port eth1 (port number: 5)
synced[232.430]: Created port eth1 (port number: 5) RX
synced[232.452]: Opened RX for port eth2 (port number: 6)
synced[232.502]: Started RX thread for port eth2 (port number: 6)
synced[232.502]: Created port eth2 (port number: 6) RX
synced[232.502]: Created 2 RX ports
synced[232.502]: Initialized ESMC
synced[232.552]: pcm4l interface started in 50 milliseconds
synced[232.602]: Mangement interface started in 50 milliseconds
synced[232.603]: Current QL set to QL-PRTC (1)
synced[232.603]: Current Sync-E DPLL state changed to lock acquisition-recovery
synced[232.603]: pcm4l_if_send: Cannot send message to pcm4l
synced[232.603]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[232.603]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[232.603]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[232.603]: Selected port is eth1 and current QL is QL-PRTC (1)
synced[233.306]: Current Sync-E DPLL state changed to locked
synced[233.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[233.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[234.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[234.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[235.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[235.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[236.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[236.603]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[237.386]: RX timeout occurred (QL not received within 5 seconds period) on port eth1 (port number: 5)
synced[237.386]: Current state for port eth1 changed to hold-off
synced[237.458]: RX timeout occurred (QL not received within 5 seconds period) on port eth2 (port number: 6)
synced[237.458]: Current state for port eth2 changed to hold-off
synced[237.604]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[237.604]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[237.728]: Current state for port eth1 changed to normal
synced[237.728]: eth2 becomes active Sync-E clock port for clock index 1
synced[237.728]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[237.729]: State of clock index 1 associated with port eth2 changed to qualified
synced[237.729]: Best clock has clock index 1 and rank 0x010200
synced[237.731]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[237.831]: pcm4l_if_send: Cannot send message to pcm4l
synced[237.831]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[237.832]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[237.832]: Selected port is eth2 and current QL is QL-PRTC (1)
synced[237.832]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[237.832]: Current state for port eth2 changed to normal
synced[237.832]: eth1 becomes active Sync-E clock port for clock index 1
synced[237.832]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[237.832]: Best clock is LO
synced[237.834]: Set device clock priorities (0): (ordered list of clock indices)
synced[237.934]: Current Sync-E DPLL state changed to holdover
synced[237.935]: pcm4l_if_send: Cannot send message to pcm4l
synced[237.934]: <<Sent event ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[237.935]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[237.935]: Selected port is LO and current QL is QL-PRTC (1)
synced[237.935]: <<Sent event ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[238.935]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[238.935]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[239.935]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[239.935]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[240.935]: <<Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)>>
```
</details>

> * **Note:** *`Sent information ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth1 (port number: 5)`* in  master-2 side log indicate syncE message with quality level PRTC on eth1 interface.

**Slave:**
* Run synced on slave board.

```     
Board-3 > synced -f /usr/bin/synced_slave.cfg
```
**synced slave side log** :	

The synced log is given below.

<details>
<summary>Click to expand </summary>

```
xilinx-zcu670-20241:/home/petalinux# synced -f /usr/bin/synced_slave.cfg
synced[246.410]: ---Started synced (version: 2.0.5.310964.b166f770 Mar 21 2024 20:32:02)---
synced[246.410]: Opened configuration file /usr/bin/synced_slave.cfg:
# amd_zcu670.cfg
  
#
# Global parameters
#
[global]
net_opt 1
no_ql_en 0
synce_forced_ql_en 1
lo_ql SEC
lo_pri 255
max_msg_lvl 7
stdout_en 1
syslog_en 0
# Device configuration file path (applicable for generic device)
device_cfg_file ""
device_name /dev/rsmu0
synce_dpll_idx 0
holdover_ql SEC
holdover_tmr 10
hoff_tmr 300
wtr_tmr 10
advanced_holdover_en 0
pcm4l_if_en 1
pcm4l_if_ip_addr 127.0.0.1
pcm4l_if_port_num 2400
mng_if_en 1
mng_if_ip_addr 127.0.0.2
mng_if_port_num 2401
  
#
# Sync-E clock port
#
[eth1]
clk_idx 1
pri 1
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC
  
[eth2]
#clk_idx 255
pri 2
tx_en 1
rx_en 1
tx_bundle_num 0
init_ql SEC
synced[246.411]: No QL mode is disabled
synced[246.411]: eth1 (62:A2:12:A0:76:B) is Sync-E clock port
synced[246.411]: eth2 (F2:4F:21:0A:5A:9) is Sync-E monitoring port
synced[246.411]: Set ESMC network option to 1
synced[246.411]: Set LO QL to QL-SEC (7)
synced[246.411]: Created ESMC configuration
synced[246.411]: Set Sync-E DPLL index to 0
synced[246.411]: Created device configuration
synced[246.411]: Forced QL for Sync-E ports is enabled
synced[246.411]: Set LO priority to 255
synced[246.411]: Set hold-off timer to 300 milliseconds
synced[246.411]: Set wait-to-restore timer to 10 seconds
synced[246.411]: Set number of syncs to 2
synced[246.411]: Created control configuration
synced[246.411]: Set holdover QL to QL-SEC (7)
synced[246.411]: Set holdover timer to 10 seconds
synced[246.411]: Set advanced holdover enable to 0
synced[246.411]: Created monitor configuration
synced[246.411]: Initialized management
synced[246.411]: Initialized device adaptor
synced[246.411]: Initialized Sync-E DPLL
synced[246.412]: eth1 is already assigned to clock index 1
synced[246.412]: management_example_ext_mux_control: selected port eth1 on external mux 0 for primary clock index 1
synced[246.412]: State of clock index 1 associated with port eth1 changed to qualified
synced[246.412]: Best clock has clock index 1 and rank 0x070100
synced[246.414]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[246.414]: Initialized control
synced[246.414]: Initialized Sync-E DPLL monitor
synced[246.440]: Opened TX for port eth1 (port number: 5)
synced[246.490]: Started TX thread for port eth1 (port number: 5)
synced[246.490]: Created port eth1 (port number: 5) TX
synced[246.504]: Opened TX for port eth2 (port number: 6)
synced[246.554]: Started TX thread for port eth2 (port number: 6)
synced[246.554]: Created port eth2 (port number: 6) TX
synced[246.554]: Created 2 TX ports
synced[246.576]: Opened RX for port eth1 (port number: 5)
synced[246.626]: Started RX thread for port eth1 (port number: 5)
synced[246.626]: Created port eth1 (port number: 5) RX
synced[246.640]: Opened RX for port eth2 (port number: 6)
synced[246.690]: Started RX thread for port eth2 (port number: 6)
synced[246.690]: Created port eth2 (port number: 6) RX
synced[246.690]: Created 2 RX ports
synced[246.690]: Initialized ESMC
synced[246.740]: pcm4l interface started in 50 milliseconds
synced[246.790]: Mangement interface started in 50 milliseconds
synced[246.791]: Current QL set to QL-SEC (7)
synced[246.791]: Current Sync-E DPLL state changed to lock acquisition-recovery
synced[246.791]: pcm4l_if_send: Cannot send message to pcm4l
synced[246.791]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[246.791]: pcm4l_msg_set_clock_category: clock category 4 - not sent to pcm4l
synced[246.791]: Selected port is eth1 and current QL is QL-SEC (7)
synced[246.791]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[247.140]: QL changed to QL-PRTC (1) on port eth2 (port number: 6)
synced[247.140]: Extended QL TLV data changed on port eth2 (port number: 6)
synced[247.140]: Current state for port eth2 changed to normal
synced[247.140]: Extended QL TLV appeared on port eth2 (port number: 6)
synced[247.140]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[247.193]: eth2 becomes active Sync-E clock port for clock index 1
synced[247.193]: management_example_ext_mux_control: selected port eth2 on external mux 0 for primary clock index 1
synced[247.193]: Best clock has clock index 1 and rank 0x010201
synced[247.195]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[247.296]: Current QL upgraded from QL-SEC (7) to QL-PRTC (1)
synced[247.296]: pcm4l_if_send: Cannot send message to pcm4l
synced[247.296]: pcm4l_msg_set_clock_category: clock category 1 - not sent to pcm4l
synced[247.296]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[247.296]: Selected port is eth2 and current QL is QL-PRTC (1)
synced[247.296]: <<Sent event ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[247.296]: State of clock index 1 associated with port eth2 changed to qualified
synced[247.327]: QL changed to QL-SEC (7) on port eth1 (port number: 5)
synced[247.327]: Extended QL TLV data changed on port eth1 (port number: 5)
synced[247.327]: Extended QL TLV appeared on port eth1 (port number: 5)
synced[247.327]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[247.397]: Best clock has clock index 1 and rank 0x010201
synced[247.399]: Set device clock priorities (1): 1 (ordered list of clock indices)
synced[247.500]: Current Sync-E DPLL state changed to locked
synced[248.142]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[248.296]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[248.296]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[248.328]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[249.143]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[249.296]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
synced[249.296]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth2 (port number: 6)>>
synced[249.330]: >>Received ESMC PDU with QL-SEC (7) (extended QL TLV: yes) on port eth1 (port number: 5)<<
synced[250.145]: >>Received ESMC PDU with QL-PRTC (1) (extended QL TLV: yes) on port eth2 (port number: 6)<<
synced[250.296]: <<Sent information ESMC PDU with QL-DNU (8) (extended QL TLV: yes) on port eth1 (port number: 5)>>
```
</details>

> * **Note:** *`Current QL upgraded from QL-SEC (7) to QL-PRTC (1)`* in slave side log indicates syncE has switched the external MUX and, the clock port of *`eth2`* is selected as primary clock.

### PPS commands
* To enable PPS signal from Renesas ClockMatrix PHC :
``` 
> testptp -d /dev/ptp0 -i 2 -p 1000000000
```

* To check the PPS external timestamp event of AMD Timer-Syncer PHC:
``` 
> testptp -e 10 -d /dev/ptp1
``` 
> * **Note:** Make sure to re-enable PPS after running ts2phc, as it temporarily disables PPS during execution.

**testptp log** :
``` 
xilinx-zcu670-20241:/home/petalinux# testptp -e 10 -d /dev/ptp1
external time stamp request okay
event index 0 at 3264.000000434
event index 0 at 3265.000000434
event index 0 at 3266.000000434
event index 0 at 3267.000000434
event index 0 at 3268.000000434
event index 0 at 3269.000000434
event index 0 at 3270.000000434
event index 0 at 3271.000000434
event index 0 at 3272.000000434
event index 0 at 3273.000000434
```

### PTP commands
> * **Note:** PTP commands in this section are given assuming one board as master (Board-1) and the second board as slave (Board-2).

#### Phase Synchronization

PTP phase synchronization commands given in this section uses the ITU-T profile G.8275.1 and ITU-T G.8275.2 config files. The ITU-T profile for PTP is designed to meet the frequency and time synchronization requirements of telecom networks.
> * **Note:** PTP test commands are given assuming the zcu670 board as Time Slave clock (T-SC), the same test can be performed considering the board as boundary clock (T-BC) using suitable ITU-T config files.

##### Multicast Mode (G.8275.1):
G.8275.1 profile transport PTP packets directly over L2 ethernet for accurate synchronization of time and phase. This profile is used for networks with full timing support, where every network element participates in PTP.
	
**Master:**

* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-1 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 
   
* Run ptp4l using G.8275.1 configuration on master board:
```     
Board-1 > ptp4l -i <interface-name> -f  /usr/bin/linkpartner_G.8275.1.cfg -m
```

**ptp4l master side log** :
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -i eth1 -f /usr/bin/linkpartner_G.8275.1.cfg -m
option masterOnly is deprecated, please use serverOnly instead
ptp4l[13018.067]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[13018.068]: selected /dev/ptp1 as PTP clock
ptp4l[13018.120]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[13018.120]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[13018.120]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[13018.533]: port 1 (eth1): LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[13018.534]: selected local clock 8215f9.fffe.ca805f as best master
ptp4l[13018.534]: port 1 (eth1): assuming the grand master role
``` 

**Slave:**	
* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-2 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 
 
* Run ptp4l using G.8275.1 configuration on slave board:

> * **Note:** Ensure that only one instance of ptp4l master is running in Link partner.   

``` 	
Board-2 > ptp4l -mqf /usr/bin/standalone_G.8275.1.cfg -p /dev/ptp0 
``` 
> * **Note:** Interface name in `standalone_G.8275.1.cfg` is configured as `eth1`, change the interface name while running it on other interface.    

**ptp4l phase synchronization log** :	
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -mqf /usr/bin/standalone_G.8275.1.cfg -p /dev/ptp0
option masterOnly is deprecated, please use serverOnly instead
option slaveOnly is deprecated, please use clientOnly instead
ptp4l[12781.908]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[12781.908]: selected /dev/ptp0 as PTP clock
ptp4l[12781.910]: port 1 (eth1): taking /dev/ptp0 from the command line, not the attached ptp1
ptp4l[12781.952]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[12781.952]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[12781.952]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[12781.952]: port 1 (eth1): taking /dev/ptp0 from the command line, not the attached ptp1
ptp4l[12782.076]: port 1 (eth1): new foreign master 8215f9.fffe.ca805f-1
ptp4l[12782.326]: selected best master clock 8215f9.fffe.ca805f
ptp4l[12782.326]: port 1 (eth1): LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[12788.704]: port 1 (eth1): UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
ptp4l[12789.391]: rms 177395279808 max 354790559620 freq   -115 +/-  81 delay   171 +/-   2
ptp4l[12790.392]: rms   25 max   34 freq    -13 +/-  32 delay   173 +/-   1
ptp4l[12791.392]: rms   23 max   33 freq    +31 +/-   2 delay   174 +/-   1
ptp4l[12792.393]: rms    6 max   13 freq    +21 +/-   6 delay   174 +/-   1
ptp4l[12793.393]: rms    2 max    3 freq    +12 +/-   2 delay   174 +/-   1
ptp4l[12794.393]: rms    3 max    5 freq    +10 +/-   4 delay   174 +/-   1
ptp4l[12795.394]: rms    1 max    2 freq    +10 +/-   2 delay   174 +/-   1
ptp4l[12796.394]: rms    2 max    5 freq    +11 +/-   4 delay   174 +/-   1

```
#### Unicast Mode (G.8275.2):
G.8275. 2 profile transport PTP packets over IPv4 or IPv6 in unicast mode. It is aimed at operating in existing network not necessarily all devices in the network are PTP aware.

**Master:**

* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-1 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 
   
* Run ptp4l using G.8275.2 configuration on master board:
```     
Board-1 > ptp4l -i <interface-name> -m -f /usr/local/etc/ptp4l/zcu670_unicast_master.cfg &
```
**ptp4l master side log** :
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -i eth1 -m -f /usr/local/etc/ptp4l/zcu670_unicast_master.cfg
option slaveOnly is deprecated, please use clientOnly instead
option masterOnly is deprecated, please use serverOnly instead
ptp4l[5457.096]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[5457.096]: selected /dev/ptp1 as PTP clock
ptp4l[5457.097]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5457.097]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5457.097]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5461.497]: port 1 (eth1): LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[5461.497]: selected local clock 0ec438.fffe.4dda81 as best master
ptp4l[5461.497]: port 1 (eth1): assuming the grand master role
``` 

**Slave:**	
* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-2 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 

* Run ptp4l using G.8275.2 configuration on slave board:

> * **Note:**  Before running ptp4l on the slave board, add the master’s UDPv4 IP to unicast_master_table in the `zcu670_standalone_unicast_1port.cfg` config file. Also, update the default interface eth1 if using a different one.

``` 	
Board-2 > ptp4l -mqf /usr/local/etc/ptp4l/zcu670_standalone_unicast_1port.cfg -p /dev/ptp0 
```     
> * **Note:** Ensure that only one instance of ptp4l master is running in Link partner.   


**ptp4l phase synchronization log** :	
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -mqf /usr/local/etc/ptp4l/zcu670_standalone_unicast_1port.cfg -p /dev/ptp0 
option slaveOnly is deprecated, please use clientOnly instead
option masterOnly is deprecated, please use serverOnly instead
ptp4l[5514.664]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[5514.664]: selected /dev/ptp0 as PTP clock
ptp4l[5514.666]: port 1 (eth1): taking /dev/ptp0 from the command line, not the attached ptp1
ptp4l[5514.667]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5514.667]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5514.667]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[5514.667]: port 1 (eth1): taking /dev/ptp0 from the command line, not the attached ptp1
ptp4l[5516.013]: port 1 (eth1): new foreign master 0ec438.fffe.4dda81-1
ptp4l[5519.924]: selected local clock b69a81.fffe.30b74a as best master
ptp4l[5520.013]: selected best master clock 0ec438.fffe.4dda81
ptp4l[5520.013]: port 1 (eth1): LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[5526.355]: port 1 (eth1): UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
ptp4l[5527.042]: rms 5720717720 max 11441435445 freq   -154 +/- 106 delay   169 +/-   3
ptp4l[5528.043]: rms   25 max   37 freq    -47 +/-  40 delay   169 +/-   2
ptp4l[5529.043]: rms   32 max   37 freq    +26 +/-   8 delay   172 +/-   0
ptp4l[5530.043]: rms   18 max   22 freq    +41 +/-   5 delay   173 +/-   0
ptp4l[5531.044]: rms    4 max    7 freq    +30 +/-   5 delay   173 +/-   0
ptp4l[5532.044]: rms    5 max    6 freq    +15 +/-   3 delay   171 +/-   0
ptp4l[5533.044]: rms    4 max    6 freq    +12 +/-   3 delay   172 +/-   0
ptp4l[5534.045]: rms    2 max    4 freq    +16 +/-   3 delay   172 +/-   1
ptp4l[5535.045]: rms    3 max    5 freq    +24 +/-   2 delay   172 +/-   0
ptp4l[5536.046]: rms    2 max    3 freq    +18 +/-   2 delay   172 +/-   1
ptp4l[5537.046]: rms    2 max    4 freq    +20 +/-   3 delay   172 +/-   0
ptp4l[5538.046]: rms    2 max    4 freq    +22 +/-   4 delay   172 +/-   0
ptp4l[5539.047]: rms    3 max    7 freq    +29 +/-   3 delay   172 +/-   0
```

### PTP clock manager for Linux (pcm4l)
Renesas pcm4l utility, has external servo and Packet Delay Variation (PDV) filters specifically meant for the functional requirements of ITU-telecom profile specifications. 

> * **Note:** For `pcm4l` tests, the `ts2phc` utility used to sync Renesas ClockMatrix PHC and AMD Timer-Syncer PHC is replaced by `pcm4l`. Ensure all `ts2phc` instances are terminated before running `pcm4l`.

#### Multicast Mode(G.8275.1):

**Master:**
* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-1 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 

* Run ptp4l using G.8275.1 configuration on master board:

``` 
Board -1 > ptp4l -i <interface-name> -m -f /usr/local/etc/ptp4l/zcu670_multicast_master.cfg
 ``` 
**ptp4l master side log**:
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -i eth1 -m -f /usr/local/etc/ptp4l/zcu670_multicast_master.cfg
option slaveOnly is deprecated, please use clientOnly instead
option masterOnly is deprecated, please use serverOnly instead
ptp4l[260.319]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[260.320]: selected /dev/ptp1 as PTP clock
ptp4l[260.364]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[260.364]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[260.364]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[260.815]: port 1 (eth1): LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[260.816]: selected local clock 4ad1c5.fffe.4721fe as best master
ptp4l[260.816]: port 1 (eth1): assuming the grand master role
``` 
**Slave:**

* Run ptp4l enabling external servo on slave board:
```
Board -2 > ptp4l -mqf /usr/local/etc/ptp4l/zcu670_externServo_multicast_1port.cfg -p /dev/ptp0 &
```

> * **Note:** Interface name in `zcu670_externServo_multicast_1port.cfg` is configured as `eth1`, change the interface name while running it on other interface.  

**ptp4l slave side log**:
```
xilinx-zcu670-20241:/home/petalinux# ptp4l -mqf /usr/local/etc/ptp4l/zcu670_externServo_multicast_1port.cfg -p /dev/ptp0 &
[1] 659
option slaveOnly is deprecated, please use clientOnly instead
xilinx-zcu670-20241:/home/petalinux# option masterOnly is deprecated, please use serverOnly instead
ptp4l[1526.464]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[1526.504]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1526.504]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1526.504]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1526.539]: port 1 (eth1): new foreign master 4ad1c5.fffe.4721fe-1
ptp4l[1526.789]: selected best master clock 4ad1c5.fffe.4721fe
ptp4l[1526.789]: port 1 (eth1): LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[1528.852]: master offset 1758718775620075969 s0 freq     +24 path delay       170
ptp4l[1530.853]: master offset 1758718775620076027 s0 freq     +29 path delay       173
ptp4l[1532.854]: master offset 1758718775620076055 s0 freq     +14 path delay       171
ptp4l[1534.854]: master offset 1758718775620076124 s0 freq     +33 path delay       171
ptp4l[1536.855]: master offset 1758718775620076176 s0 freq     +26 path delay       171
ptp4l[1538.856]: master offset 1758718775620076230 s0 freq     +27 path delay       169
ptp4l[1540.857]: master offset 1758718775620076267 s0 freq     +19 path delay       173
ptp4l[1542.857]: master offset 1758718775620076294 s0 freq     +13 path delay       171
ptp4l[1544.858]: master offset 1758718775620076342 s0 freq     +24 path delay       171
ptp4l[1546.859]: master offset 1758718775620076384 s0 freq     +21 path delay       171
ptp4l[1548.860]: master offset 1758718775620076430 s0 freq     +24 path delay       171
```  
> * **Note:** PTP clock servo state remains in unlocked state (s0), expecting pcm4l to control the servo.

* Run pcm4l:
```
Board -2 > pcm4l -f /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
```
> * **Note:** If you see RE::SyncError messages related to PPS while running pcm4l, enable PPS using `testptp -d /dev/ptp0 -i 2 -p 1000000000`


**pcm4l log**:

The pcm4l log is given below.

<details>
<summary>Click to expand </summary>
   
	xilinx-zcu670-20241:/home/petalinux# pcm4l -f /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json	
	The file is /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
	JSON file: /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
	Initialize default configuration values for linux Extern
	Start Logger
	RE::SyncAnalysis: 2025-09-24 13:04:36 880301365 ns [0, Main] (3561) RE PTP Software Release ID = 4.3.4.518632, Commit ID = 07229d8c4548eebfbdb068ff4fef304398b817ba    Jul 31 2025  12:40:52  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880378016 ns [0, Main] (3561) Configuration file: /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880402616 ns [0, Main] (3561) {  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880423636 ns [0, Main] (3561)   "versionId": "4.3",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880448506 ns [0, Main] (3561)   "testModeEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880472407 ns [0, Main] (3561)   "referenceTrackerType": "WritePhase",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880497967 ns [0, Main] (3561)   "remoteUdsAddress": "/var/run/ptp4l",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880520487 ns [0, Main] (3561)   "localUdsAddress": "/var/run/pcm4l",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880541877 ns [0, Main] (3561)   "mngApiTimeoutMilliseconds": 100,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880563937 ns [0, Main] (3561)   "stepWindowSeconds": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880588208 ns [0, Main] (3561)   "phc4lConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880610668 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880632038 ns [0, Main] (3561)       "dcoDevice": "/dev/ptp0",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880652458 ns [0, Main] (3561)       "tsDevice":  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880672279 ns [0, Main] (3561)       [  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880692139 ns [0, Main] (3561)           {  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880711629 ns [0, Main] (3561)               "tsDeviceName": "/dev/ptp1",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880733349 ns [0, Main] (3561)               "tsDevicePinIndex": -1,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880754009 ns [0, Main] (3561)               "tsDeviceExttsChannel": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880775270 ns [0, Main] (3561)               "tsDeviceExttsCorrectionNs": -434  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880797960 ns [0, Main] (3561)           }  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880817890 ns [0, Main] (3561)       ],  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880837470 ns [0, Main] (3561)       "charDevice": "/dev/rsmu0",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880858230 ns [0, Main] (3561)       "phaseSnapDelaySeconds": 3,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880878561 ns [0, Main] (3561)       "tsCalibrationEnable": 0  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880898771 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880918341 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:04:36 880937661 ns [0, Main] (3561)   "deviceConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880960071 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880979672 ns [0, Main] (3561)       "oscillatorType": "Tcxo",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 880999922 ns [0, Main] (3561)       "dpll1588Instance": 1,  
	
	Starting RE PTP with external Linux stack...
	RE PTP Software Release ID = 4.3.4.518632, Commit ID = 07229d8c4548eebfbdb068ff4fef304398b817ba
	RE::SyncAnalysis: 2025-09-24 13:04:36 881019862 ns [0, Main] (3561)       "tsDeviceAlignmentDisable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881080203 ns [0, Main] (3561)       "holdover":  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881110133 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881131703 ns [0, Main] (3561)           "holdoverType": "HardwareEnhanced",  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881152363 ns [0, Main] (3561)           "holdoverLossPhysicalOosEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881173454 ns [0, Main] (3561)           "holdoverTimeoutSeconds": 1000,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881194264 ns [0, Main] (3561)           "holdoverQualificationSeconds": 100,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881218594 ns [0, Main] (3561)           "unqualifiedTimeoutSeconds": 10000,  
	RE::SyncAnalysis: 2025-09-24 13:04:36 881249254 ns [0, Main] (3561)           "outOfSpecUserDefinedFrequencyOffsetEnable": 0,  
	ptp4l[1554.862]: master offset 1758718775620076571 s0 freq     +26 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:04:37 214575438 ns [0, Main] (3561)           "outOfSpecUserDefinedFrequencyOffsetPpb": 0  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214605238 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214625749 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214645839 ns [0, Main] (3561)   "profileConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214666519 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214686159 ns [0, Main] (3561)       "physicalPllClockCategory": 4,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214707719 ns [0, Main] (3561)       "physicalPllClockCategoryThreshold": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214729120 ns [0, Main] (3561)       "physicalPllInstance": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214749950 ns [0, Main] (3561)       "physicalPllWaitToRestoreTimeoutValue": 10  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214771070 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214790740 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:04:37 214810190 ns [0, Main] (3561)   "loggerConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214829821 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214848991 ns [0, Main] (3561)       "stdoutLog":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214869391 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214888861 ns [0, Main] (3561)           "enable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214908811 ns [0, Main] (3561)           "selectionMask": "0000000000011111",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214929412 ns [0, Main] (3561)           "_description_": "        | ||||||___ 0: Sync error                ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214951932 ns [0, Main] (3561)           "_description_": "        | |||||____ 1: Sync warning              ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214973762 ns [0, Main] (3561)           "_description_": "        | ||||_____ 2: Sync analysis             ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 214995552 ns [0, Main] (3561)           "_description_": "        | |||______ 3: Error                     ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215017612 ns [0, Main] (3561)           "_description_": "        | ||_______ 4: Warning                   ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215040173 ns [0, Main] (3561)           "_description_": "        | |________ 5: Debug                     ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215062023 ns [0, Main] (3561)           "_description_": "        |__________ 7: Timestamp                 "  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215084283 ns [0, Main] (3561)       },  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215103853 ns [0, Main] (3561)         
	RE::SyncAnalysis: 2025-09-24 13:04:37 215123994 ns [0, Main] (3561)       "externalFdLog":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215144704 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215164544 ns [0, Main] (3561)           "enable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215184684 ns [0, Main] (3561)           "selectionMask": "0000000000011111",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215205364 ns [0, Main] (3561)           "_description_": "        | ||||||___ 0: Sync error                ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215228105 ns [0, Main] (3561)           "_description_": "        | |||||____ 1: Sync warning              ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215250275 ns [0, Main] (3561)           "_description_": "        | ||||_____ 2: Sync analysis             ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 215272415 ns [0, Main] (3561)           "_description_": "        | |||______ 3: Error                     ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548572899 ns [0, Main] (3561)           "_description_": "        | ||_______ 4: Warning                   ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548599059 ns [0, Main] (3561)           "_description_": "        | |________ 5: Debug                     ",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548622819 ns [0, Main] (3561)           "_description_": "        |__________ 7: Timestamp                 "  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548645209 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548664849 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548684960 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:04:37 548704920 ns [0, Main] (3561)   "instanceConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548725280 ns [0, Main] (3561)   [  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548744640 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548764430 ns [0, Main] (3561)           "correctionFieldEnable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548785141 ns [0, Main] (3561)           "lostMasterTimeoutMilliseconds": 2000,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548806381 ns [0, Main] (3561)           "manageClockClassEnable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548827561 ns [0, Main] (3561)           "manageClockClassExtendedEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548848591 ns [0, Main] (3561)           "ptpDomainNumber": -1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548868582 ns [0, Main] (3561)           "numberOfTrackerInstances": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548889512 ns [0, Main] (3561)             
	RE::SyncAnalysis: 2025-09-24 13:04:37 548909072 ns [0, Main] (3561)           "trackerConfig":  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548929372 ns [0, Main] (3561)           {  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548949182 ns [0, Main] (3561)             "delayAsymmetryNanoseconds": 0,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548970393 ns [0, Main] (3561)             "phaseSnapThresholdSeconds": 0.00001,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 548991373 ns [0, Main] (3561)             "floorDelayEstimateSeconds": -1.0,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549012203 ns [0, Main] (3561)             "__timeLockThresholdNanoseconds": "Set to 200 to meet enhanced SyncE limits",  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549034403 ns [0, Main] (3561)             "timeLockThresholdNanoseconds": 580,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549055813 ns [0, Main] (3561)             "willCorrectFrequencyAtFirstSnap": 1,  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549077334 ns [0, Main] (3561)             "frequencyLockThresholdPpb": 16.0,   
	RE::SyncAnalysis: 2025-09-24 13:04:37 549098044 ns [0, Main] (3561)             "lockFilterWindowLengthSeconds": 1.0  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549118824 ns [0, Main] (3561)           }  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549138874 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549158204 ns [0, Main] (3561)   ]  
	RE::SyncAnalysis: 2025-09-24 13:04:37 549177555 ns [0, Main] (3561) }  
	RE::Warning: 2025-09-24 13:04:37 549196895 ns [0, Main] (5060) ** Alert - the following values are non default:  
	RE::Warning: 2025-09-24 13:04:37 549217715 ns [0, Main] (5060) ** referenceTrackerType = 2 **  
	RE::Warning: 2025-09-24 13:04:37 549238205 ns [0, Main] (5060) ** phc4lConfig.dcoDevice = /dev/ptp0 **  
	RE::Warning: 2025-09-24 13:04:37 549258845 ns [0, Main] (5060) ** phc4lConfig.phaseSnapDelaySeconds = 3 **  
	RE::Warning: 2025-09-24 13:04:37 549279206 ns [0, Main] (5060) ** deviceConfig.oscillatorType = 0 **  
	RE::Warning: 2025-09-24 13:04:37 549299806 ns [0, Main] (5060) ** deviceConfig.dpll1588Instance = 1 **  
	RE::Warning: 2025-09-24 13:04:37 882670470 ns [0, Main] (5060) ** phc4lConfig.tsDevice[0] = /dev/ptp1 **  
	RE::Warning: 2025-09-24 13:04:37 882695950 ns [0, Main] (5060) ** phc4lConfig.tsDeviceExttsCorrectionNs[0] = -434 **  
	RE::Warning: 2025-09-24 13:04:37 882718481 ns [0, Main] (5060) ** deviceConfig.holdoverConfig.holdoverType = 2 **  
	RE::Warning: 2025-09-24 13:04:37 882739941 ns [0, Main] (5060) ** deviceConfig.holdoverConfig.holdoverTimeoutSeconds = 1000 **  
	RE::Warning: 2025-09-24 13:04:37 882761641 ns [0, Main] (5060) ** profileConfig.physicalPllClockCategory = 4 **  
	RE::Warning: 2025-09-24 13:04:37 882782461 ns [0, Main] (5060) ** profileConfig.physicalPllInstance = 0 **  
	RE::Warning: 2025-09-24 13:04:37 882803581 ns [0, Main] (5060) ** The following non default reference tracker parameters are for stack instance 0 (each reference tracker configuration is identical) **  
	RE::Warning: 2025-09-24 13:04:37 882827452 ns [0, Main] (5060) ** instanceConfig.trackerConfig.willCorrectFrequencyAtFirstSnap = 1 **  
	RE::Warning: 2025-09-24 13:04:37 882849172 ns [0, Main] (5060) ** instanceConfig.trackerConfig.frequencyLockThresholdPpb = 16.000000 **  
	RE::Warning: 2025-09-24 13:04:37 882870852 ns [0, Main] (5060) ** instanceConfig.trackerConfig.timeLockThresholdNanoseconds = 580.000000 **  
	RE::SyncWarning: 2025-09-24 13:04:37 882904292 ns [0, Main] (2114) Stack instance 0, port 1 not enabled, skip profile checking  
	RE::SyncAnalysis: 2025-09-24 13:04:37 882943763 ns [0, Main] (3102) Configuring IDT Phc4l timestamper (/dev/ptp1).
	
	RE::SyncAnalysis: 2025-09-24 13:04:37 882974203 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> Start.  
	RE::SyncAnalysis: 2025-09-24 13:04:37 882995093 ns [0, Main] (3579) QR: Qualified reference is not supported  
	RE::SyncAnalysis: 2025-09-24 13:04:37 883016214 ns [0, Main] (3004) RE PTP Software Release ID: 4.3.4.518632 & Commit ID: 07229d8c4548eebfbdb068ff4fef304398b817ba.  
	RE::SyncAnalysis: 2025-09-24 13:04:37 883060634 ns [3, Supervisor] (3101) Configuring Phc4l device driver (/dev/ptp0).  
	RE::SyncAnalysis: 2025-09-24 13:04:37 883081624 ns [3, Supervisor] (3236) phc4l initialization: set initial FFO value to 0 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 087879972 ns [3, Supervisor] (3220) HW device configuration complete.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 087932993 ns [3, Supervisor] (3153) Clock category changed:  E_CATEGORY_INVALID (6) -> E_CATEGORY4 (4).  
	RE::SyncAnalysis: 2025-09-24 13:04:38 088348657 ns [3, Supervisor] (3562) Set combo mode Hold/Freeze  
	RE::SyncAnalysis: 2025-09-24 13:04:38 089247506 ns [3, Supervisor] (3521) Sync-e Supervisor state: Unqualified  
	RE::SyncAnalysis: 2025-09-24 13:04:38 089279516 ns [3, Supervisor] (3520) Sync-e Supervisor is started.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 089397958 ns [3, Supervisor] (3066) LO state: 'Initial' to 'Free Run'    Event: 'LO initialized'.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 089606450 ns [0, Main] (3252) Tracker run mode: 'Snapping'     3165.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 089875442 ns [3, Supervisor] (3225) Register tracker S0.Tracker#0: stack instance number 0; reference tracker instance number 0  
	RE::SyncAnalysis: 2025-09-24 13:04:38 090203896 ns [5, MngIf] (3049) Listening on IP Address 127.0.0.1 on port 2400.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 092300287 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestDefaultDataSet.  
	
	Stack instance 0 Default data set received:
		twoStep:     1
		clockId:     7e:e5:e1:ff:fe:e1:30:26
		ports:       1
		clkClass:    255
		clkAccur:    254
		clkScldVar:  65535
		prio1:       128
		prio2:       255
		domain:      24
		slaveOnly:   1
	RE::SyncAnalysis: 2025-09-24 13:04:38 100371127 ns [0, Main] (3279) CCM: disabled    (Initial clockClass: 255, JSON: manageClockClassEnable 1, manageClockClassExtendedEnable 0)  
	RE::SyncAnalysis: 2025-09-24 13:04:38 104164045 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestParentDataSet.  
	
	Stack instance 0 Parent data set received:
		parentPortId: 4a:d1:c5:ff:fe:47:21:fe.1
		parentStats:   0
		oposlv:        65535
		opcpcr:        2147483647
		gmPriority1:   128
		gmPriority2:   255
		clkClass:      248
		clkAccur:      254
		clkScldVar:    65535
		gmClockId:     4a:d1:c5:ff:fe:47:21:fe
	RE::SyncAnalysis: 2025-09-24 13:04:38 116161185 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestTimePropertiesDataSet.  
	
	Stack instance 0 Time Properties data set received:
		curUtcOffs:     37
		tmSrc:          160
		leap_61:        0
		leap_59:        0
		curUtcOffsVal:  0
		ptpTmScale:     1
		timeTraceable:  0
		freqTraceable:  0
	RE::SyncAnalysis: 2025-09-24 13:04:38 128159655 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestClockDescription.  
	
	Stack instance 0 Clock Description 0 received:
		clockType:           OC   
		phyLayerProtocol:    IEEE 802.3
		phyAddress:          7E: E5: E1: E1: 30: 26: 
		protocolAddress:     IEEE 802.3:  7e:e5:e1:e1:30:26
		manufacturer id:     000000
		productDescription:  ;;
		revision:            ;;
		userDescription:     
		profile id:          0019a7010203
	RE::SyncAnalysis: 2025-09-24 13:04:38 140504749 ns [0, Main] (3221) Timestamper device eth1 is used by external Linux stack  
	RE::SyncAnalysis: 2025-09-24 13:04:38 140552659 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> Running.  
	RE::SyncAnalysis: 2025-09-24 13:04:38 144189156 ns [3, Supervisor] (3280) Notified frequency traceability for stack instance 0: 0  
	RE::SyncAnalysis: 2025-09-24 13:04:38 164181936 ns [0, Main] (3283) Inserted master information list node: actual 4a:d1:c5:ff:fe:47:21:fe.1; local stack 7e:e5:e1:ff:fe:e1:30:26.0  
	RE::SyncAnalysis: 2025-09-24 13:04:38 164226646 ns [0, Main] (3268) Instance 0: 4a:d1:c5:ff:fe:47:21:fe.1 state transition --> WaitGetPortDataSet  
	RE::Warning: 2025-09-24 13:04:38 224191456 ns [3, Supervisor] (5073) Target port number = 0, override to 1 - check PTP stack is sending non-zero port number when sending timestsamps  
	RE::SyncAnalysis: 2025-09-24 13:04:38 228225496 ns [2, LinuxExtern] (3268) Instance 0: 4a:d1:c5:ff:fe:47:21:fe.1 state transition --> WaitTimestamps  
	RE::SyncAnalysis: 2025-09-24 13:04:39 089510710 ns [0, Main] (3524) Sync-e Supervisor: physical clock category changed to 4  
	RE::SyncAnalysis: 2025-09-24 13:04:39 089582901 ns [0, Main] (3525) Sync-e Supervisor: physical clock category threshold changed to 1  
	RE::SyncWarning: 2025-09-24 13:04:39 089608391 ns [0, Main] (2190) Sync-e Supervisor: physical clock category (4) does not meet the threshold (1)  
	ptp4l[1556.863]: master offset 1244709254781 s0 freq +1000000001 path delay       171
	ptp4l[1558.864]: master offset 1244709254805 s0 freq     +11 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:04:42 356198772 ns [0, Main] (3268) Instance 0: 4a:d1:c5:ff:fe:47:21:fe.1 state transition --> UpdateMasterInfo  
	RE::SyncAnalysis: 2025-09-24 13:04:42 360166272 ns [0, Main] (3301) Set master timeout to 375 ms for 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 360214412 ns [0, Main] (3275) Single path active: 0.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 360236573 ns [0, Main] (3223) Measured sync interval is 62500 us for master 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 360258783 ns [0, Main] (3224) Measured delay request interval is 62500 us for master 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 360281253 ns [0, Main] (3268) Instance 0: 4a:d1:c5:ff:fe:47:21:fe.1 state transition --> Running  
	RE::SyncAnalysis: 2025-09-24 13:04:42 380240653 ns [3, Supervisor] (3258) Stack instance 0: Attempt to register new master 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 380290123 ns [3, Supervisor] (3260) Stack instance 0, tracker instance 0: Allocated new tracker S0.Tracker#0.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 380313123 ns [3, Supervisor] (3125) Assign tracker S0.Tracker#0 to track 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 380334744 ns [3, Supervisor] (3126) S0.Tracker#0: New registered master 4a:d1:c5:ff:fe:47:21:fe.1 has clock class 0.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 380367014 ns [4, S0.Tracker#0] (3276) processSinglePathInfo: Single path active = 0.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 400282243 ns [0, Main] (3285) Best master changed from 00:00:00:00:00:00:00:00.0 to 4a:d1:c5:ff:fe:47:21:fe.1  
	RE::SyncAnalysis: 2025-09-24 13:04:42 400325614 ns [3, Supervisor] (3123) 1588 reference acquired, S0.Tracker#0 is the chosen tracker (4a:d1:c5:ff:fe:47:21:fe.1)  
	RE::SyncAnalysis: 2025-09-24 13:04:42 400350344 ns [3, Supervisor] (3066) LO state: 'Free Run' to 'Lock Acquisition'    Event: 'LO reference acquired'.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 400397394 ns [4, S0.Tracker#0 *] (3252) Tracker run mode: 'Snapping'     3164.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 665051161 ns [3, Supervisor] (3109) Corrected: 0.000000 ppb from S0.Tracker#0    Total Aged: 0.000000 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 667053601 ns [4, S0.Tracker#0 *] (3204) snapSubStage: 'Initial' to 'Frequency Measurements'.  
	RE::SyncAnalysis: 2025-09-24 13:04:42 667089012 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254821.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:42 728203363 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254822.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:42 788202663 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254822.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:42 852201403 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254822.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:42 916213333 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254825.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:42 976205603 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254825.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 040203803 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254825.0 ns    delay: 173.0 ns  
	ptp4l[1560.864]: master offset 1244709254829 s0 freq     +13 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:04:43 104205724 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254829.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 164208444 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254829.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 228206234 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254829.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 288205604 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254830.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 352207264 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254832.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 416206654 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254831.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 476206614 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254832.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 540205984 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254834.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 604202624 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254835.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 664203534 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254835.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 728205775 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254838.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 788220915 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254838.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 852210505 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254838.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 916211335 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254842.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:43 976208435 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254841.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 040211435 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254844.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 104209645 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254845.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 164207705 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254848.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 228223465 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254850.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 292207625 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254851.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 352207326 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254854.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 416209476 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254854.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 476208806 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254855.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 540208586 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254856.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 604206516 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254857.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 664207116 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254857.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 728208256 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254857.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 792207726 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254857.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 852206536 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254859.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 916207106 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254861.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:44 976206926 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254860.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 040210317 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254861.0 ns    delay: 173.0 ns  
	ptp4l[1562.865]: master offset 1244709254862 s0 freq     +15 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:04:45 104209257 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254862.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 164208047 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254864.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 228207857 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254864.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 292209167 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254864.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 352206647 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254867.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 416207927 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254867.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 480208577 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254867.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 540206547 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254867.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 604206207 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254870.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 664207098 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254870.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 728223788 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254870.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 792210018 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254871.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 852205778 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254873.5 ns    delay: 173.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 916208258 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254873.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:45 980222118 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254873.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 040209918 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254873.5 ns    delay: 173.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 104207408 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254873.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 164206098 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254875.0 ns    delay: 172.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 228210508 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254877.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 292208879 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254876.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 352206069 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254880.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 416207879 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254880.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 480209549 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254882.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 540210679 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254883.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 604206799 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254883.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 668209779 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254883.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 728209189 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254885.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 792209109 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254886.5 ns    delay: 173.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 852207959 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254886.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 916207360 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254889.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:46 980229100 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254889.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 040210200 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254891.0 ns    delay: 171.0 ns  
	ptp4l[1564.866]: master offset 1244709254891 s0 freq     +14 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:04:47 104208880 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254891.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 168208450 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254891.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 228210490 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254892.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 292208230 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254892.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 352207100 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254894.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 416207940 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254896.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 480208610 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254895.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 540207850 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254896.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 604220281 ns [4, S0.Tracker#0 *] (3240) offset: 1244709254898.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:47 668209101 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 4.94 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:04:47 668278961 ns [3, Supervisor] (3213) Sync time of day: -1244.709254901 s  
	ptp4l[1566.867]: master offset         -5 s0 freq +1001610008 path delay       171
	ptp4l[1568.867]: master offset         49 s0 freq     +27 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:04:51 673977315 ns [3, Supervisor] (3121) Corrected: -1244.709254901 s from S0.Tracker#0    Max FFO req/gnt: -1.000000 / -1.000000 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:52 732233079 ns [4, S0.Tracker#0 *] (3240) offset: 81.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:52 792208429 ns [4, S0.Tracker#0 *] (3240) offset: 83.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:52 856204609 ns [4, S0.Tracker#0 *] (3240) offset: 83.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:52 920206539 ns [4, S0.Tracker#0 *] (3240) offset: 86.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:52 980206409 ns [4, S0.Tracker#0 *] (3240) offset: 88.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:53 044205759 ns [4, S0.Tracker#0 *] (3240) offset: 89.5 ns    delay: 172.5 ns  
	ptp4l[1570.868]: master offset         91 s0 freq     +22 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:04:53 108209589 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 0.38 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:04:53 109106458 ns [3, Supervisor] (3109) Corrected: -26.563286 ppb from S0.Tracker#0    Total Aged: -26.563286 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:53 111109188 ns [3, Supervisor] (3214) Phase pull-in:  -92 ns. blocking 1.  
	RE::SyncAnalysis: 2025-09-24 13:04:53 203294170 ns [3, Supervisor] (3121) Corrected: -0.000000092 s from S0.Tracker#0    Max FFO req/gnt: 1000.000000 / 1000.000000 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:54 232224741 ns [4, S0.Tracker#0 *] (3240) offset: 16.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 292225091 ns [4, S0.Tracker#0 *] (3240) offset: 17.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 356204971 ns [4, S0.Tracker#0 *] (3240) offset: 16.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 420204711 ns [4, S0.Tracker#0 *] (3240) offset: 16.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 480219961 ns [4, S0.Tracker#0 *] (3240) offset: 19.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 544206561 ns [4, S0.Tracker#0 *] (3240) offset: 21.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 608206001 ns [4, S0.Tracker#0 *] (3240) offset: 22.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:54 668206792 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 0.44 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:04:54 668944289 ns [3, Supervisor] (3109) Corrected: -16.945653 ppb from S0.Tracker#0    Total Aged: -16.945653 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:04:54 670985279 ns [3, Supervisor] (3214) Phase pull-in:  -23 ns. blocking 1.  
	RE::SyncAnalysis: 2025-09-24 13:04:54 694174201 ns [3, Supervisor] (3121) Corrected: -0.000000023 s from S0.Tracker#0    Max FFO req/gnt: 1000.000000 / 1000.000000 ppb.  
	ptp4l[1572.869]: master offset         -9 s0 freq     -51 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:04:55 796223884 ns [4, S0.Tracker#0 *] (3240) offset: -20.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:55 856206883 ns [4, S0.Tracker#0 *] (3240) offset: -21.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:55 920203054 ns [4, S0.Tracker#0 *] (3240) offset: -21.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:55 984257354 ns [4, S0.Tracker#0 *] (3240) offset: -21.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:56 044206004 ns [4, S0.Tracker#0 *] (3240) offset: -23.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:56 108208634 ns [4, S0.Tracker#0 *] (3240) offset: -24.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:56 168201704 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 0.38 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:04:56 168266255 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Snapping' to 'Converging'     3160.  
	ptp4l[1574.870]: master offset        -25 s0 freq      -8 path delay       170
	RE::SyncAnalysis: 2025-09-24 13:04:57 108228736 ns [4, S0.Tracker#0 *] (3240) offset: -25.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:58 108234767 ns [4, S0.Tracker#0 *] (3240) offset: -42.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:04:58 420226778 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Converging' to 'Statistics Collecting'     3159.  
	RE::SyncAnalysis: 2025-09-24 13:04:58 420626022 ns [3, Supervisor] (3066) LO state: 'Lock Acquisition' to 'Frequency Locked'    Event: 'LO frequency locked'.  
	RE::SyncAnalysis: 2025-09-24 13:04:58 420743133 ns [3, Supervisor] (3066) LO state: 'Frequency Locked' to 'Time Locked'    Event: 'LO time locked'.  
	ptp4l[1576.245]: port 1 (eth1): UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
	ptp4l[1576.870]: master offset        -38 s2 freq      -6 path delay       173
	ptp4l[1578.871]: master offset        -22 s2 freq      +8 path delay       172
	ptp4l[1580.872]: master offset        -30 s2 freq      -4 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:05:03 108240235 ns [4, S0.Tracker#0 *] (3240) offset: -30.5 ns    delay: 171.5 ns  
	ptp4l[1582.873]: master offset        -33 s2 freq      -1 path delay       172
	ptp4l[1584.874]: master offset        -36 s2 freq      -1 path delay       170
	RE::SyncAnalysis: 2025-09-24 13:05:08 112244023 ns [4, S0.Tracker#0 *] (3240) offset: -30.0 ns    delay: 171.0 ns  
	ptp4l[1586.874]: master offset        -41 s2 freq      -2 path delay       174
	ptp4l[1588.875]: master offset        -44 s2 freq      -1 path delay       172
	ptp4l[1590.876]: master offset        -33 s2 freq      +5 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:05:13 112235331 ns [4, S0.Tracker#0 *] (3240) offset: -33.5 ns    delay: 171.5 ns  
	ptp4l[1592.877]: master offset        -32 s2 freq      +1 path delay       173
	ptp4l[1594.877]: master offset        -35 s2 freq      -2 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:05:18 116241959 ns [4, S0.Tracker#0 *] (3240) offset: -36.5 ns    delay: 171.5 ns  
	ptp4l[1596.878]: master offset        -44 s2 freq      -4 path delay       172
	ptp4l[1598.879]: master offset        -19 s2 freq     +13 path delay       171
	ptp4l[1600.880]: master offset        -25 s2 freq      -3 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:05:23 116233586 ns [4, S0.Tracker#0 *] (3240) offset: -25.5 ns    delay: 172.5 ns  
	ptp4l[1602.880]: master offset        -38 s2 freq      -6 path delay       173
	ptp4l[1604.881]: master offset        -33 s2 freq      +1 path delay       170
	RE::SyncAnalysis: 2025-09-24 13:05:28 120239564 ns [4, S0.Tracker#0 *] (3240) offset: -37.0 ns    delay: 171.0 ns  
	ptp4l[1606.882]: master offset        -37 s2 freq      -2 path delay       171
	ptp4l[1608.883]: master offset        -38 s2 freq      +0 path delay       173
	ptp4l[1610.884]: master offset        -27 s2 freq      +4 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:05:33 120237622 ns [4, S0.Tracker#0 *] (3240) offset: -27.5 ns    delay: 171.5 ns  
	ptp4l[1612.884]: master offset        -33 s2 freq      -3 path delay       171
	ptp4l[1614.885]: master offset        -35 s2 freq      -0 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:05:38 124244940 ns [4, S0.Tracker#0 *] (3240) offset: -40.0 ns    delay: 171.0 ns  
	ptp4l[1616.886]: master offset        -32 s2 freq      +2 path delay       172
	ptp4l[1618.887]: master offset        -26 s2 freq      +3 path delay       173
	ptp4l[1620.887]: master offset        -21 s2 freq      +1 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:05:43 124256168 ns [4, S0.Tracker#0 *] (3240) offset: -21.0 ns    delay: 171.0 ns  
	ptp4l[1622.888]: master offset        -28 s2 freq      -3 path delay       172
	ptp4l[1624.889]: master offset        -32 s2 freq      -1 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:05:48 128242205 ns [4, S0.Tracker#0 *] (3240) offset: -36.0 ns    delay: 171.0 ns  
	ptp4l[1626.890]: master offset        -40 s2 freq      -5 path delay       171
	ptp4l[1628.890]: master offset        -27 s2 freq      +6 path delay       171
	ptp4l[1630.891]: master offset        -19 s2 freq      +5 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:05:53 128243653 ns [4, S0.Tracker#0 *] (3240) offset: -19.0 ns    delay: 173.0 ns  
	ptp4l[1632.892]: master offset        -15 s2 freq      +1 path delay       173
	ptp4l[1634.893]: master offset        -17 s2 freq      -1 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:05:58 132246201 ns [4, S0.Tracker#0 *] (3240) offset: -22.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:05:58 508212201 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Statistics Collecting' to 'Tracking'     3163.  
	ptp4l[1636.893]: master offset        -21 s2 freq      -2 path delay       171
	ptp4l[1638.894]: master offset        -32 s2 freq      -4 path delay       173
	ptp4l[1640.895]: master offset        -14 s2 freq      +8 path delay       171
	ptp4l[1642.896]: master offset        -11 s2 freq      +1 path delay       171
	ptp4l[1644.896]: master offset        -11 s2 freq      +0 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:06:08 136247197 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 172.0 ns  
	ptp4l[1646.897]: master offset        -23 s2 freq      -5 path delay       173
	ptp4l[1648.898]: master offset        -21 s2 freq      +0 path delay       171
	ptp4l[1650.899]: master offset         -8 s2 freq      +6 path delay       171
	ptp4l[1652.899]: master offset         -7 s2 freq      +1 path delay       173
	ptp4l[1654.900]: master offset        -23 s2 freq      -8 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:06:18 140245992 ns [4, S0.Tracker#0 *] (3240) offset: -16.5 ns    delay: 172.5 ns  
	ptp4l[1656.901]: master offset        -27 s2 freq      -3 path delay       171
	ptp4l[1658.902]: master offset        -35 s2 freq      -3 path delay       172
	ptp4l[1660.902]: master offset        -22 s2 freq      +6 path delay       172
	ptp4l[1662.903]: master offset        -16 s2 freq      +3 path delay       173
	ptp4l[1664.904]: master offset        -10 s2 freq      +3 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:06:28 144248708 ns [4, S0.Tracker#0 *] (3240) offset: -14.0 ns    delay: 171.0 ns  
	ptp4l[1666.905]: master offset        -24 s2 freq      -8 path delay       171
	ptp4l[1668.906]: master offset        -35 s2 freq      -4 path delay       172
	ptp4l[1670.906]: master offset        -22 s2 freq      +6 path delay       172
	ptp4l[1672.907]: master offset         -6 s2 freq      +8 path delay       174
	ptp4l[1674.908]: master offset        -18 s2 freq      -7 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:06:38 148248813 ns [4, S0.Tracker#0 *] (3240) offset: -19.5 ns    delay: 172.5 ns  
	ptp4l[1676.909]: master offset        -22 s2 freq      -1 path delay       172
	ptp4l[1678.909]: master offset        -25 s2 freq      -2 path delay       172
	ptp4l[1680.910]: master offset        -18 s2 freq      +3 path delay       171
	ptp4l[1682.911]: master offset        -16 s2 freq      +2 path delay       173
	ptp4l[1684.912]: master offset        -16 s2 freq      +0 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:06:48 148248519 ns [4, S0.Tracker#0 *] (3240) offset: -19.0 ns    delay: 173.0 ns  
	ptp4l[1686.912]: master offset        -23 s2 freq      -3 path delay       172
	ptp4l[1688.913]: master offset        -27 s2 freq      -3 path delay       173
	ptp4l[1690.914]: master offset        -26 s2 freq      +1 path delay       173
	ptp4l[1692.915]: master offset        -14 s2 freq      +5 path delay       171
	ptp4l[1694.915]: master offset        -19 s2 freq      -1 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:06:58 152245045 ns [4, S0.Tracker#0 *] (3240) offset: -10.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:06:58 528229885 ns [4, S0.Tracker#0 *] (3203) 	numberOfCorrection: 1957, mean: -21.6 ns, std: 8.4 ns.  
	ptp4l[1696.916]: master offset         -7 s2 freq      +6 path delay       173
	ptp4l[1698.917]: master offset        -13 s2 freq      -5 path delay       171
	ptp4l[1700.918]: master offset        -21 s2 freq      -3 path delay       171
	ptp4l[1702.918]: master offset        -17 s2 freq      +2 path delay       171
	ptp4l[1704.919]: master offset        -15 s2 freq      +1 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:07:08 156237480 ns [4, S0.Tracker#0 *] (3240) offset: -14.5 ns    delay: 171.5 ns  
	ptp4l[1706.920]: master offset        -19 s2 freq      -1 path delay       171
	ptp4l[1708.921]: master offset        -11 s2 freq      +3 path delay       171
	ptp4l[1710.922]: master offset         -6 s2 freq      +3 path delay       171
	ptp4l[1712.922]: master offset        -19 s2 freq      -6 path delay       173
	ptp4l[1714.923]: master offset        -16 s2 freq      +1 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:07:18 160244286 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 173.0 ns  
	ptp4l[1716.924]: master offset        -16 s2 freq      +0 path delay       172
	ptp4l[1718.925]: master offset         -1 s2 freq      +6 path delay       170
	ptp4l[1720.925]: master offset        -19 s2 freq      -8 path delay       172
	ptp4l[1722.926]: master offset         -8 s2 freq      +4 path delay       171
	ptp4l[1724.927]: master offset        -19 s2 freq      -5 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:07:28 164247481 ns [4, S0.Tracker#0 *] (3240) offset: -28.5 ns    delay: 172.5 ns  
	ptp4l[1726.928]: master offset        -30 s2 freq      -6 path delay       170
	ptp4l[1728.928]: master offset        -14 s2 freq      +8 path delay       170
	ptp4l[1730.929]: master offset         -6 s2 freq      +5 path delay       173
	ptp4l[1732.930]: master offset        -14 s2 freq      -5 path delay       170
	ptp4l[1734.931]: master offset          2 s2 freq      +8 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:07:38 168250897 ns [4, S0.Tracker#0 *] (3240) offset: -3.5 ns    delay: 172.5 ns  
	ptp4l[1736.931]: master offset          0 s2 freq      +0 path delay       173
	ptp4l[1738.932]: master offset        -10 s2 freq      -5 path delay       173
	ptp4l[1740.933]: master offset        -21 s2 freq      -6 path delay       171
	ptp4l[1742.934]: master offset        -29 s2 freq      -3 path delay       173
	ptp4l[1744.934]: master offset        -14 s2 freq      +6 path delay       170
	RE::SyncAnalysis: 2025-09-24 13:07:48 172245113 ns [4, S0.Tracker#0 *] (3240) offset: 0.0 ns    delay: 173.0 ns  
	ptp4l[1746.935]: master offset         -1 s2 freq      +6 path delay       170
	ptp4l[1748.936]: master offset        -14 s2 freq      -6 path delay       171
	ptp4l[1750.937]: master offset        -19 s2 freq      -2 path delay       172
	ptp4l[1752.938]: master offset         -3 s2 freq      +8 path delay       172
	ptp4l[1754.938]: master offset         -9 s2 freq      -3 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:07:58 176247178 ns [4, S0.Tracker#0 *] (3240) offset: -8.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:07:58 552228189 ns [4, S0.Tracker#0 *] (3203) 	numberOfCorrection: 2917, mean: -13.7 ns, std: 8.3 ns.  
	ptp4l[1756.939]: master offset        -11 s2 freq      -1 path delay       171
	ptp4l[1758.940]: master offset          2 s2 freq      +6 path delay       171
	ptp4l[1760.941]: master offset         -9 s2 freq      -5 path delay       172
	ptp4l[1762.941]: master offset        -19 s2 freq      -4 path delay       172
	ptp4l[1764.942]: master offset         -6 s2 freq      +6 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:08:08 180244804 ns [4, S0.Tracker#0 *] (3240) offset: -6.0 ns    delay: 173.0 ns  
	ptp4l[1766.943]: master offset        -13 s2 freq      -3 path delay       173
	ptp4l[1768.944]: master offset         -4 s2 freq      +3 path delay       171
	ptp4l[1770.944]: master offset        -10 s2 freq      -2 path delay       171
	ptp4l[1772.945]: master offset         -8 s2 freq      +0 path delay       172
	ptp4l[1774.946]: master offset         -2 s2 freq      +3 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:08:18 184245699 ns [4, S0.Tracker#0 *] (3240) offset: -8.0 ns    delay: 171.0 ns  
	ptp4l[1776.947]: master offset         -3 s2 freq      +0 path delay       171
	ptp4l[1778.947]: master offset         -3 s2 freq      -0 path delay       173
</details>

>* **Note:** *`LO state: 'Frequency Locked' to 'Time Locked'    Event: 'LO time locked'`* in pcm4l log indicates both the frequency and phase of the local oscillator are aligned with the reference clock.

#### Unicast Mode:

**Master:**
* Run ts2phc between Renesas ClockMatrix PHC and AMD Timer-Syncer PHC in background:

``` 
Board-1 > ts2phc -mqf /usr/bin/zcu670_ts2phc.cfg &
``` 

* Run ptp4l using G.8275.2 configuration on master board:

``` 
Board -1 > ptp4l -i <interface-name> -m -f /usr/local/etc/ptp4l/zcu670_unicast_master.cfg
 ``` 
**ptp4l master side log**:
``` 
xilinx-zcu670-20241:/home/petalinux# ptp4l -i eth1 -m -f /usr/local/etc/ptp4l/zcu670_unicast_master.cfg
option slaveOnly is deprecated, please use clientOnly instead
option masterOnly is deprecated, please use serverOnly instead
ptp4l[163.349]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[163.349]: selected /dev/ptp1 as PTP clock
ptp4l[163.351]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[163.351]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[163.352]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[168.197]: port 1 (eth1): LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[168.198]: selected local clock d67918.fffe.344d1e as best master
ptp4l[168.198]: port 1 (eth1): assuming the grand master role
``` 
**Slave:**

* Run ptp4l enabling external servo on slave board:
```
Board -2 > ptp4l -mqf /usr/local/etc/ptp4l/zcu670_externServo_unicast_1port.cfg -p /dev/ptp0 &
```
> * **Note:**  Before running ptp4l on the slave board, add the master’s UDPv4 IP to unicast_master_table in the `zcu670_externServo_unicast_1port.cfg` config file. Also, update the default interface eth1 if using a different one.

**ptp4l slave side log**:
```
xilinx-zcu670-20241:/home/petalinux# ptp4l -mqf /usr/local/etc/ptp4l/zcu670_externServo_unicast_1port.cfg -p /dev/ptp0 &
[1] 657
option slaveOnly is deprecated, please use clientOnly instead
xilinx-zcu670-20241:/home/petalinux# option masterOnly is deprecated, please use serverOnly instead
ptp4l[206.572]: ioctl SIOCETHTOOL failed: Operation not supported
ptp4l[206.573]: port 1 (eth1): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[206.574]: port 0 (/var/run/ptp4l): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[206.574]: port 0 (/var/run/ptp4lro): INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[208.157]: port 1 (eth1): new foreign master d67918.fffe.344d1e-1
ptp4l[212.157]: selected best master clock d67918.fffe.344d1e
ptp4l[212.157]: port 1 (eth1): LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[214.201]: master offset 1758720559867632709 s0 freq     +12 path delay       171
ptp4l[216.202]: master offset 1758720559867632749 s0 freq     +20 path delay       171
ptp4l[218.203]: master offset 1758720559867632787 s0 freq     +19 path delay       171
ptp4l[220.204]: master offset 1758720559867632834 s0 freq     +22 path delay       171
ptp4l[222.204]: master offset 1758720559867632870 s0 freq     +19 path delay       173
ptp4l[224.205]: master offset 1758720559867632908 s0 freq     +18 path delay       171
ptp4l[226.206]: master offset 1758720559867632941 s0 freq     +17 path delay       173
ptp4l[228.207]: master offset 1758720559867632992 s0 freq     +25 path delay       171
ptp4l[230.207]: master offset 1758720559867633050 s0 freq     +28 path delay       171
ptp4l[232.208]: master offset 1758720559867633098 s0 freq     +24 path delay       171

```  
> * **Note:** PTP clock servo state remains in unlocked state (s0), expecting pcm4l to control the servo.

* Run pcm4l:
```
Board -2 > pcm4l -f /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
```

**pcm4l log**:

>* **Note:** Before running `pcm4l` kill all instance of ts2phc running background.

The pcm4l log is given below.

<details>
<summary>Click to expand </summary>

	xilinx-zcu670-20241:/home/petalinux# pcm4l -f /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
	The file is /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
	JSON file: /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json
	Initialize default configuration values for linux Extern
	Start Logger
	RE::SyncAnalysis: 2025-09-24 13:33:55 311055692 ns [0, Main] (3561) RE PTP Software Release ID = 4.3.4.518632, Commit ID = 07229d8c4548eebfbdb068ff4fef304398b817ba    Jul 31 2025  12:40:52  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311124812 ns [0, Main] (3561) Configuration file: /usr/local/etc/pcm4l/zcu670_reConfigPCM_G8273_2.json  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311150233 ns [0, Main] (3561) {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311170873 ns [0, Main] (3561)   "versionId": "4.3",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311191473 ns [0, Main] (3561)   "testModeEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311220983 ns [0, Main] (3561)   "referenceTrackerType": "WritePhase",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311246654 ns [0, Main] (3561)   "remoteUdsAddress": "/var/run/ptp4l",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311272624 ns [0, Main] (3561)   "localUdsAddress": "/var/run/pcm4l",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311295544 ns [0, Main] (3561)   "mngApiTimeoutMilliseconds": 100,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311317874 ns [0, Main] (3561)   "stepWindowSeconds": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311342965 ns [0, Main] (3561)   "phc4lConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311363785 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311383335 ns [0, Main] (3561)       "dcoDevice": "/dev/ptp0",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311403495 ns [0, Main] (3561)       "tsDevice":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311423905 ns [0, Main] (3561)       [  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311443486 ns [0, Main] (3561)           {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311464666 ns [0, Main] (3561)               "tsDeviceName": "/dev/ptp1",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311486176 ns [0, Main] (3561)               "tsDevicePinIndex": -1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311506716 ns [0, Main] (3561)               "tsDeviceExttsChannel": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311527957 ns [0, Main] (3561)               "tsDeviceExttsCorrectionNs": -434  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311548557 ns [0, Main] (3561)           }  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311568127 ns [0, Main] (3561)       ],  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311587387 ns [0, Main] (3561)       "charDevice": "/dev/rsmu0",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311608097 ns [0, Main] (3561)       "phaseSnapDelaySeconds": 3,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311628878 ns [0, Main] (3561)       "tsCalibrationEnable": 0  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311648938 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311668328 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:33:55 311688738 ns [0, Main] (3561)   "deviceConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311708398 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311727409 ns [0, Main] (3561)       "oscillatorType": "Tcxo",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311747589 ns [0, Main] (3561)       "dpll1588Instance": 1,  
	
	Starting RE PTP with external Linux stack...
	RE PTP Software Release ID = 4.3.4.518632, Commit ID = 07229d8c4548eebfbdb068ff4fef304398b817ba
	RE::SyncAnalysis: 2025-09-24 13:33:55 311771089 ns [0, Main] (3561)       "tsDeviceAlignmentDisable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311838310 ns [0, Main] (3561)       "holdover":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311868750 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311890160 ns [0, Main] (3561)           "holdoverType": "HardwareEnhanced",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311910660 ns [0, Main] (3561)           "holdoverLossPhysicalOosEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311931371 ns [0, Main] (3561)           "holdoverTimeoutSeconds": 1000,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311952371 ns [0, Main] (3561)           "holdoverQualificationSeconds": 100,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 311973021 ns [0, Main] (3561)           "unqualifiedTimeoutSeconds": 10000,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 312000681 ns [0, Main] (3561)           "outOfSpecUserDefinedFrequencyOffsetEnable": 0,  
	ptp4l[246.214]: master offset 1758720559867633424 s0 freq     +29 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:33:55 645320335 ns [0, Main] (3561)           "outOfSpecUserDefinedFrequencyOffsetPpb": 0  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645351375 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645372095 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645391976 ns [0, Main] (3561)   "profileConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645412456 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645432206 ns [0, Main] (3561)       "physicalPllClockCategory": 4,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645453016 ns [0, Main] (3561)       "physicalPllClockCategoryThreshold": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645473477 ns [0, Main] (3561)       "physicalPllInstance": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645493987 ns [0, Main] (3561)       "physicalPllWaitToRestoreTimeoutValue": 10  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645515087 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645534797 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:33:55 645554397 ns [0, Main] (3561)   "loggerConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645573888 ns [0, Main] (3561)   {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645593058 ns [0, Main] (3561)       "stdoutLog":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645613458 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645633218 ns [0, Main] (3561)           "enable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645653108 ns [0, Main] (3561)           "selectionMask": "0000000000011111",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645673819 ns [0, Main] (3561)           "_description_": "        | ||||||___ 0: Sync error                ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645696209 ns [0, Main] (3561)           "_description_": "        | |||||____ 1: Sync warning              ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645718899 ns [0, Main] (3561)           "_description_": "        | ||||_____ 2: Sync analysis             ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645740679 ns [0, Main] (3561)           "_description_": "        | |||______ 3: Error                     ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645762449 ns [0, Main] (3561)           "_description_": "        | ||_______ 4: Warning                   ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645784740 ns [0, Main] (3561)           "_description_": "        | |________ 5: Debug                     ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645806730 ns [0, Main] (3561)           "_description_": "        |__________ 7: Timestamp                 "  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645828780 ns [0, Main] (3561)       },  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645848480 ns [0, Main] (3561)         
	RE::SyncAnalysis: 2025-09-24 13:33:55 645868250 ns [0, Main] (3561)       "externalFdLog":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645888121 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645907301 ns [0, Main] (3561)           "enable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645927201 ns [0, Main] (3561)           "selectionMask": "0000000000011111",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645948121 ns [0, Main] (3561)           "_description_": "        | ||||||___ 0: Sync error                ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645970921 ns [0, Main] (3561)           "_description_": "        | |||||____ 1: Sync warning              ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 645992982 ns [0, Main] (3561)           "_description_": "        | ||||_____ 2: Sync analysis             ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 646014912 ns [0, Main] (3561)           "_description_": "        | |||______ 3: Error                     ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979319425 ns [0, Main] (3561)           "_description_": "        | ||_______ 4: Warning                   ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979344996 ns [0, Main] (3561)           "_description_": "        | |________ 5: Debug                     ",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979368676 ns [0, Main] (3561)           "_description_": "        |__________ 7: Timestamp                 "  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979390836 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979410786 ns [0, Main] (3561)   },  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979429837 ns [0, Main] (3561)     
	RE::SyncAnalysis: 2025-09-24 13:33:55 979449827 ns [0, Main] (3561)   "instanceConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979469937 ns [0, Main] (3561)   [  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979489847 ns [0, Main] (3561)       {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979509637 ns [0, Main] (3561)           "correctionFieldEnable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979530898 ns [0, Main] (3561)           "lostMasterTimeoutMilliseconds": 2000,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979552478 ns [0, Main] (3561)           "manageClockClassEnable": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979573238 ns [0, Main] (3561)           "manageClockClassExtendedEnable": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979594498 ns [0, Main] (3561)           "ptpDomainNumber": -1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979614818 ns [0, Main] (3561)           "numberOfTrackerInstances": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979635839 ns [0, Main] (3561)             
	RE::SyncAnalysis: 2025-09-24 13:33:55 979655599 ns [0, Main] (3561)           "trackerConfig":  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979675679 ns [0, Main] (3561)           {  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979695289 ns [0, Main] (3561)             "delayAsymmetryNanoseconds": 0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979716369 ns [0, Main] (3561)             "phaseSnapThresholdSeconds": 0.00001,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979737550 ns [0, Main] (3561)             "floorDelayEstimateSeconds": -1.0,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979758280 ns [0, Main] (3561)             "__timeLockThresholdNanoseconds": "Set to 200 to meet enhanced SyncE limits",  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979780610 ns [0, Main] (3561)             "timeLockThresholdNanoseconds": 580,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979801820 ns [0, Main] (3561)             "willCorrectFrequencyAtFirstSnap": 1,  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979822721 ns [0, Main] (3561)             "frequencyLockThresholdPpb": 16.0,   
	RE::SyncAnalysis: 2025-09-24 13:33:55 979843421 ns [0, Main] (3561)             "lockFilterWindowLengthSeconds": 1.0  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979864011 ns [0, Main] (3561)           }  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979884031 ns [0, Main] (3561)       }  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979903331 ns [0, Main] (3561)   ]  
	RE::SyncAnalysis: 2025-09-24 13:33:55 979922292 ns [0, Main] (3561) }  
	RE::Warning: 2025-09-24 13:33:55 979941292 ns [0, Main] (5060) ** Alert - the following values are non default:  
	RE::Warning: 2025-09-24 13:33:55 979961842 ns [0, Main] (5060) ** referenceTrackerType = 2 **  
	RE::Warning: 2025-09-24 13:33:55 979982342 ns [0, Main] (5060) ** phc4lConfig.dcoDevice = /dev/ptp0 **  
	RE::Warning: 2025-09-24 13:33:55 980002752 ns [0, Main] (5060) ** phc4lConfig.phaseSnapDelaySeconds = 3 **  
	RE::Warning: 2025-09-24 13:33:55 980023503 ns [0, Main] (5060) ** deviceConfig.oscillatorType = 0 **  
	RE::Warning: 2025-09-24 13:33:55 980044053 ns [0, Main] (5060) ** deviceConfig.dpll1588Instance = 1 **  
	RE::Warning: 2025-09-24 13:33:56 313414317 ns [0, Main] (5060) ** phc4lConfig.tsDevice[0] = /dev/ptp1 **  
	RE::Warning: 2025-09-24 13:33:56 313438717 ns [0, Main] (5060) ** phc4lConfig.tsDeviceExttsCorrectionNs[0] = -434 **  
	RE::Warning: 2025-09-24 13:33:56 313461157 ns [0, Main] (5060) ** deviceConfig.holdoverConfig.holdoverType = 2 **  
	RE::Warning: 2025-09-24 13:33:56 313482358 ns [0, Main] (5060) ** deviceConfig.holdoverConfig.holdoverTimeoutSeconds = 1000 **  
	RE::Warning: 2025-09-24 13:33:56 313503748 ns [0, Main] (5060) ** profileConfig.physicalPllClockCategory = 4 **  
	RE::Warning: 2025-09-24 13:33:56 313524828 ns [0, Main] (5060) ** profileConfig.physicalPllInstance = 0 **  
	RE::Warning: 2025-09-24 13:33:56 313545618 ns [0, Main] (5060) ** The following non default reference tracker parameters are for stack instance 0 (each reference tracker configuration is identical) **  
	RE::Warning: 2025-09-24 13:33:56 313569789 ns [0, Main] (5060) ** instanceConfig.trackerConfig.willCorrectFrequencyAtFirstSnap = 1 **  
	RE::Warning: 2025-09-24 13:33:56 313591559 ns [0, Main] (5060) ** instanceConfig.trackerConfig.frequencyLockThresholdPpb = 16.000000 **  
	RE::Warning: 2025-09-24 13:33:56 313613429 ns [0, Main] (5060) ** instanceConfig.trackerConfig.timeLockThresholdNanoseconds = 580.000000 **  
	RE::SyncWarning: 2025-09-24 13:33:56 313646429 ns [0, Main] (2114) Stack instance 0, port 1 not enabled, skip profile checking  
	RE::SyncAnalysis: 2025-09-24 13:33:56 313682540 ns [0, Main] (3102) Configuring IDT Phc4l timestamper (/dev/ptp1).
	
	RE::SyncAnalysis: 2025-09-24 13:33:56 313712440 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> Start.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 313733640 ns [0, Main] (3579) QR: Qualified reference is not supported  
	RE::SyncAnalysis: 2025-09-24 13:33:56 313754300 ns [0, Main] (3004) RE PTP Software Release ID: 4.3.4.518632 & Commit ID: 07229d8c4548eebfbdb068ff4fef304398b817ba.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 313796841 ns [3, Supervisor] (3101) Configuring Phc4l device driver (/dev/ptp0).  
	RE::SyncAnalysis: 2025-09-24 13:33:56 313817851 ns [3, Supervisor] (3236) phc4l initialization: set initial FFO value to 0 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 918842382 ns [3, Supervisor] (3220) HW device configuration complete.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 918902363 ns [3, Supervisor] (3153) Clock category changed:  E_CATEGORY_INVALID (6) -> E_CATEGORY4 (4).  
	RE::SyncAnalysis: 2025-09-24 13:33:56 919312647 ns [3, Supervisor] (3562) Set combo mode Hold/Freeze  
	RE::SyncAnalysis: 2025-09-24 13:33:56 920221596 ns [3, Supervisor] (3521) Sync-e Supervisor state: Unqualified  
	RE::SyncAnalysis: 2025-09-24 13:33:56 920250226 ns [3, Supervisor] (3520) Sync-e Supervisor is started.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 920363667 ns [3, Supervisor] (3066) LO state: 'Initial' to 'Free Run'    Event: 'LO initialized'.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 920582150 ns [0, Main] (3252) Tracker run mode: 'Snapping'     3165.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 920865572 ns [3, Supervisor] (3225) Register tracker S0.Tracker#0: stack instance number 0; reference tracker instance number 0  
	RE::SyncAnalysis: 2025-09-24 13:33:56 921068244 ns [5, MngIf] (3049) Listening on IP Address 127.0.0.1 on port 2400.  
	RE::SyncAnalysis: 2025-09-24 13:33:56 923081635 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestDefaultDataSet.  
	
	Stack instance 0 Default data set received:
		twoStep:     1
		clockId:     b2:92:11:ff:fe:bc:20:f1
		ports:       1
		clkClass:    255
		clkAccur:    254
		clkScldVar:  65535
		prio1:       128
		prio2:       255
		domain:      44
		slaveOnly:   1
	RE::SyncAnalysis: 2025-09-24 13:33:57 035174806 ns [0, Main] (3279) CCM: disabled    (Initial clockClass: 255, JSON: manageClockClassEnable 1, manageClockClassExtendedEnable 0)  
	RE::SyncAnalysis: 2025-09-24 13:33:57 038943543 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestParentDataSet.  
	
	Stack instance 0 Parent data set received:
		parentPortId: d6:79:18:ff:fe:34:4d:1e.1
		parentStats:   0
		oposlv:        65535
		opcpcr:        2147483647
		gmPriority1:   128
		gmPriority2:   255
		clkClass:      248
		clkAccur:      254
		clkScldVar:    65535
		gmClockId:     d6:79:18:ff:fe:34:4d:1e
	RE::SyncAnalysis: 2025-09-24 13:33:57 050942033 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestTimePropertiesDataSet.  
	
	Stack instance 0 Time Properties data set received:
		curUtcOffs:     37
		tmSrc:          160
		leap_61:        0
		leap_59:        0
		curUtcOffsVal:  0
		ptpTmScale:     1
		timeTraceable:  0
		freqTraceable:  0
	RE::SyncAnalysis: 2025-09-24 13:33:57 062941363 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> RequestClockDescription.  
	
	Stack instance 0 Clock Description 0 received:
		clockType:           OC   
		phyLayerProtocol:    IEEE 802.3
		phyAddress:          B2: 92: 11: BC: 20: F1: 
		protocolAddress:     IPv4:  192.168.1.100
		manufacturer id:     000000
		productDescription:  ;;
		revision:            ;;
		userDescription:     
		profile id:          0019a7020102
	RE::SyncAnalysis: 2025-09-24 13:33:57 075285077 ns [0, Main] (3221) Timestamper device eth1 is used by external Linux stack  
	RE::SyncAnalysis: 2025-09-24 13:33:57 075334827 ns [0, Main] (3222) Instance 0: stack adaptor state transition --> Running.  
	RE::SyncAnalysis: 2025-09-24 13:33:57 078974704 ns [3, Supervisor] (3280) Notified frequency traceability for stack instance 0: 0  
	RE::SyncAnalysis: 2025-09-24 13:33:57 079021464 ns [0, Main] (3283) Inserted master information list node: actual d6:79:18:ff:fe:34:4d:1e.1; local stack b2:92:11:ff:fe:bc:20:f1.0  
	RE::SyncAnalysis: 2025-09-24 13:33:57 079046214 ns [0, Main] (3268) Instance 0: d6:79:18:ff:fe:34:4d:1e.1 state transition --> WaitGetPortDataSet  
	RE::Warning: 2025-09-24 13:33:57 142975984 ns [3, Supervisor] (5073) Target port number = 0, override to 1 - check PTP stack is sending non-zero port number when sending timestsamps  
	RE::SyncAnalysis: 2025-09-24 13:33:57 147008894 ns [2, LinuxExtern] (3268) Instance 0: d6:79:18:ff:fe:34:4d:1e.1 state transition --> WaitTimestamps  
	ptp4l[248.214]: master offset -37997937793 s0 freq +1000000001 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:33:57 920483880 ns [0, Main] (3524) Sync-e Supervisor: physical clock category changed to 4  
	RE::SyncAnalysis: 2025-09-24 13:33:57 920546901 ns [0, Main] (3525) Sync-e Supervisor: physical clock category threshold changed to 1  
	RE::SyncWarning: 2025-09-24 13:33:57 920571951 ns [0, Main] (2190) Sync-e Supervisor: physical clock category (4) does not meet the threshold (1)  
	ptp4l[250.215]: master offset -37997937745 s0 freq     +24 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:34:01 270988500 ns [0, Main] (3268) Instance 0: d6:79:18:ff:fe:34:4d:1e.1 state transition --> UpdateMasterInfo  
	RE::SyncAnalysis: 2025-09-24 13:34:01 274950410 ns [0, Main] (3301) Set master timeout to 2000 ms for d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 274998951 ns [0, Main] (3275) Single path active: 0.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 275020511 ns [0, Main] (3223) Measured sync interval is 62500 us for master d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 275043481 ns [0, Main] (3224) Measured delay request interval is 62500 us for master d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 275065901 ns [0, Main] (3268) Instance 0: d6:79:18:ff:fe:34:4d:1e.1 state transition --> Running  
	RE::SyncAnalysis: 2025-09-24 13:34:01 327022631 ns [3, Supervisor] (3258) Stack instance 0: Attempt to register new master d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 327071121 ns [3, Supervisor] (3260) Stack instance 0, tracker instance 0: Allocated new tracker S0.Tracker#0.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 327093882 ns [3, Supervisor] (3125) Assign tracker S0.Tracker#0 to track d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 327123212 ns [3, Supervisor] (3126) S0.Tracker#0: New registered master d6:79:18:ff:fe:34:4d:1e.1 has clock class 0.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 327156742 ns [4, S0.Tracker#0] (3276) processSinglePathInfo: Single path active = 0.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 347059201 ns [0, Main] (3285) Best master changed from 00:00:00:00:00:00:00:00.0 to d6:79:18:ff:fe:34:4d:1e.1  
	RE::SyncAnalysis: 2025-09-24 13:34:01 347102582 ns [3, Supervisor] (3123) 1588 reference acquired, S0.Tracker#0 is the chosen tracker (d6:79:18:ff:fe:34:4d:1e.1)  
	RE::SyncAnalysis: 2025-09-24 13:34:01 347126552 ns [3, Supervisor] (3066) LO state: 'Free Run' to 'Lock Acquisition'    Event: 'LO reference acquired'.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 349222213 ns [4, S0.Tracker#0 *] (3252) Tracker run mode: 'Snapping'     3164.  
	ptp4l[252.216]: master offset -37997937692 s0 freq     +25 path delay       170
	RE::SyncAnalysis: 2025-09-24 13:34:01 643833399 ns [3, Supervisor] (3109) Corrected: 0.000000 ppb from S0.Tracker#0    Total Aged: 0.000000 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 645840720 ns [4, S0.Tracker#0 *] (3204) snapSubStage: 'Initial' to 'Frequency Measurements'.  
	RE::SyncAnalysis: 2025-09-24 13:34:01 645875650 ns [4, S0.Tracker#0 *] (3240) offset: -37997937686.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:01 706994191 ns [4, S0.Tracker#0 *] (3240) offset: -37997937686.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:01 770993871 ns [4, S0.Tracker#0 *] (3240) offset: -37997937683.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:01 830992421 ns [4, S0.Tracker#0 *] (3240) offset: -37997937680.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:01 895006222 ns [4, S0.Tracker#0 *] (3240) offset: -37997937678.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:01 958994432 ns [4, S0.Tracker#0 *] (3240) offset: -37997937677.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 018996172 ns [4, S0.Tracker#0 *] (3240) offset: -37997937675.0 ns    delay: 175.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 082992642 ns [4, S0.Tracker#0 *] (3240) offset: -37997937672.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 142995182 ns [4, S0.Tracker#0 *] (3240) offset: -37997937670.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 206996012 ns [4, S0.Tracker#0 *] (3240) offset: -37997937667.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 270993792 ns [4, S0.Tracker#0 *] (3240) offset: -37997937664.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 330995062 ns [4, S0.Tracker#0 *] (3240) offset: -37997937662.0 ns    delay: 175.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 394994742 ns [4, S0.Tracker#0 *] (3240) offset: -37997937661.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 458996252 ns [4, S0.Tracker#0 *] (3240) offset: -37997937659.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 518994942 ns [4, S0.Tracker#0 *] (3240) offset: -37997937654.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 582995103 ns [4, S0.Tracker#0 *] (3240) offset: -37997937652.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 642994943 ns [4, S0.Tracker#0 *] (3240) offset: -37997937651.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 706995713 ns [4, S0.Tracker#0 *] (3240) offset: -37997937649.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 770996853 ns [4, S0.Tracker#0 *] (3240) offset: -37997937648.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 830995963 ns [4, S0.Tracker#0 *] (3240) offset: -37997937646.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 894995873 ns [4, S0.Tracker#0 *] (3240) offset: -37997937644.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:02 958998093 ns [4, S0.Tracker#0 *] (3240) offset: -37997937641.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 018995883 ns [4, S0.Tracker#0 *] (3240) offset: -37997937639.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 082994483 ns [4, S0.Tracker#0 *] (3240) offset: -37997937637.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 146994133 ns [4, S0.Tracker#0 *] (3240) offset: -37997937636.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 206994664 ns [4, S0.Tracker#0 *] (3240) offset: -37997937635.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 270996264 ns [4, S0.Tracker#0 *] (3240) offset: -37997937635.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 330995214 ns [4, S0.Tracker#0 *] (3240) offset: -37997937635.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 394994834 ns [4, S0.Tracker#0 *] (3240) offset: -37997937633.5 ns    delay: 174.5 ns  
	ptp4l[254.217]: master offset -37997937632 s0 freq     +30 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:03 458996654 ns [4, S0.Tracker#0 *] (3240) offset: -37997937632.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 518994784 ns [4, S0.Tracker#0 *] (3240) offset: -37997937632.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 582996264 ns [4, S0.Tracker#0 *] (3240) offset: -37997937630.0 ns    delay: 175.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 646995104 ns [4, S0.Tracker#0 *] (3240) offset: -37997937630.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 706996324 ns [4, S0.Tracker#0 *] (3240) offset: -37997937626.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 770994514 ns [4, S0.Tracker#0 *] (3240) offset: -37997937625.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 830993124 ns [4, S0.Tracker#0 *] (3240) offset: -37997937623.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 894995025 ns [4, S0.Tracker#0 *] (3240) offset: -37997937622.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:03 958997915 ns [4, S0.Tracker#0 *] (3240) offset: -37997937619.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 018994625 ns [4, S0.Tracker#0 *] (3240) offset: -37997937617.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 083009165 ns [4, S0.Tracker#0 *] (3240) offset: -37997937617.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 146995065 ns [4, S0.Tracker#0 *] (3240) offset: -37997937614.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 206996095 ns [4, S0.Tracker#0 *] (3240) offset: -37997937609.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 270996035 ns [4, S0.Tracker#0 *] (3240) offset: -37997937607.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 331021706 ns [4, S0.Tracker#0 *] (3240) offset: -37997937606.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 394995305 ns [4, S0.Tracker#0 *] (3240) offset: -37997937605.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 458994345 ns [4, S0.Tracker#0 *] (3240) offset: -37997937602.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 518994346 ns [4, S0.Tracker#0 *] (3240) offset: -37997937601.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 582995826 ns [4, S0.Tracker#0 *] (3240) offset: -37997937598.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 646995876 ns [4, S0.Tracker#0 *] (3240) offset: -37997937597.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 706995096 ns [4, S0.Tracker#0 *] (3240) offset: -37997937593.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 770993816 ns [4, S0.Tracker#0 *] (3240) offset: -37997937591.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 834995206 ns [4, S0.Tracker#0 *] (3240) offset: -37997937590.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 894994616 ns [4, S0.Tracker#0 *] (3240) offset: -37997937587.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:04 958995976 ns [4, S0.Tracker#0 *] (3240) offset: -37997937585.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 018995036 ns [4, S0.Tracker#0 *] (3240) offset: -37997937582.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 082993776 ns [4, S0.Tracker#0 *] (3240) offset: -37997937582.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 146995597 ns [4, S0.Tracker#0 *] (3240) offset: -37997937581.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 207014627 ns [4, S0.Tracker#0 *] (3240) offset: -37997937577.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 270996767 ns [4, S0.Tracker#0 *] (3240) offset: -37997937576.0 ns    delay: 174.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 334994177 ns [4, S0.Tracker#0 *] (3240) offset: -37997937574.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 394993197 ns [4, S0.Tracker#0 *] (3240) offset: -37997937571.0 ns    delay: 173.0 ns  
	ptp4l[256.218]: master offset -37997937570 s0 freq     +30 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:34:05 458998497 ns [4, S0.Tracker#0 *] (3240) offset: -37997937570.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 518995367 ns [4, S0.Tracker#0 *] (3240) offset: -37997937568.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 582996197 ns [4, S0.Tracker#0 *] (3240) offset: -37997937568.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 646995087 ns [4, S0.Tracker#0 *] (3240) offset: -37997937568.0 ns    delay: 172.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 706995197 ns [4, S0.Tracker#0 *] (3240) offset: -37997937565.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 770995878 ns [4, S0.Tracker#0 *] (3240) offset: -37997937565.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 834994838 ns [4, S0.Tracker#0 *] (3240) offset: -37997937561.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 894994708 ns [4, S0.Tracker#0 *] (3240) offset: -37997937559.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:05 959014068 ns [4, S0.Tracker#0 *] (3240) offset: -37997937558.0 ns    delay: 176.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 022997378 ns [4, S0.Tracker#0 *] (3240) offset: -37997937555.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 082996118 ns [4, S0.Tracker#0 *] (3240) offset: -37997937553.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 146995218 ns [4, S0.Tracker#0 *] (3240) offset: -37997937552.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 206994038 ns [4, S0.Tracker#0 *] (3240) offset: -37997937552.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 270996368 ns [4, S0.Tracker#0 *] (3240) offset: -37997937550.5 ns    delay: 174.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 335010539 ns [4, S0.Tracker#0 *] (3240) offset: -37997937548.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 394994378 ns [4, S0.Tracker#0 *] (3240) offset: -37997937547.0 ns    delay: 175.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 458995949 ns [4, S0.Tracker#0 *] (3240) offset: -37997937546.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 522993789 ns [4, S0.Tracker#0 *] (3240) offset: -37997937545.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 582995509 ns [4, S0.Tracker#0 *] (3240) offset: -37997937542.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:06 646988319 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 4.94 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:34:06 647916558 ns [3, Supervisor] (3109) Corrected: -29.066569 ppb from S0.Tracker#0    Total Aged: -29.066569 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:34:06 649964359 ns [3, Supervisor] (3213) Sync time of day: +37.997937537 s  
	ptp4l[258.218]: master offset        -29 s0 freq +949978997 path delay       174
	ptp4l[260.219]: master offset        -31 s0 freq      -1 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:10 053614480 ns [3, Supervisor] (3121) Corrected: +37.997937537 s from S0.Tracker#0    Max FFO req/gnt: -1.000000 / -1.000000 ppb.  
	RE::SyncAnalysis: 2025-09-24 13:34:11 147016686 ns [4, S0.Tracker#0 *] (3240) offset: -30.5 ns    delay: 171.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:11 210988136 ns [4, S0.Tracker#0 *] (3240) offset: -32.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:11 274985786 ns [4, S0.Tracker#0 *] (3240) offset: -35.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:11 334990176 ns [4, S0.Tracker#0 *] (3240) offset: -35.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:11 398985366 ns [4, S0.Tracker#0 *] (3240) offset: -35.0 ns    delay: 173.0 ns  
	ptp4l[262.220]: master offset        -35 s0 freq      -2 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:11 458984766 ns [4, S0.Tracker#0 *] (3240) offset: -35.5 ns    delay: 172.5 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:11 522992746 ns [4, S0.Tracker#0 *] (3205) Frequency and ToD estimation finished. Estimation time: 0.38 seconds.  
	RE::SyncAnalysis: 2025-09-24 13:34:11 523055787 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Snapping' to 'Converging'     3160.  
	RE::SyncAnalysis: 2025-09-24 13:34:12 463018498 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 173.0 ns  
	ptp4l[264.221]: master offset        -16 s0 freq     +10 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:13 463014780 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 173.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:34:13 775002210 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Converging' to 'Statistics Collecting'     3159.  
	RE::SyncAnalysis: 2025-09-24 13:34:13 775406264 ns [3, Supervisor] (3066) LO state: 'Lock Acquisition' to 'Frequency Locked'    Event: 'LO frequency locked'.  
	RE::SyncAnalysis: 2025-09-24 13:34:13 775519665 ns [3, Supervisor] (3066) LO state: 'Frequency Locked' to 'Time Locked'    Event: 'LO time locked'.  
	ptp4l[264.596]: port 1 (eth1): UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
	ptp4l[266.221]: master offset        -19 s2 freq      -1 path delay       171
	ptp4l[268.222]: master offset        -24 s2 freq      -3 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:18 463037268 ns [4, S0.Tracker#0 *] (3240) offset: -22.0 ns    delay: 173.0 ns  
	ptp4l[270.223]: master offset        -30 s2 freq      -3 path delay       171
	ptp4l[272.224]: master offset        -26 s2 freq      +3 path delay       173
	ptp4l[274.225]: master offset         -3 s2 freq     +11 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:23 467012985 ns [4, S0.Tracker#0 *] (3240) offset: -3.5 ns    delay: 173.5 ns  
	ptp4l[276.225]: master offset          0 s2 freq      +1 path delay       173
	ptp4l[278.226]: master offset        -22 s2 freq     -11 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:34:28 467022603 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 173.0 ns  
	ptp4l[280.227]: master offset        -13 s2 freq      +5 path delay       173
	ptp4l[282.228]: master offset          0 s2 freq      +6 path delay       173
	ptp4l[284.228]: master offset         12 s2 freq      +5 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:34:33 471016931 ns [4, S0.Tracker#0 *] (3240) offset: 11.5 ns    delay: 171.5 ns  
	ptp4l[286.229]: master offset          4 s2 freq      -3 path delay       171
	ptp4l[288.230]: master offset          5 s2 freq      +0 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:34:38 471044019 ns [4, S0.Tracker#0 *] (3240) offset: 0.0 ns    delay: 172.0 ns  
	ptp4l[290.231]: master offset        -17 s2 freq     -11 path delay       173
	ptp4l[292.232]: master offset         -7 s2 freq      +6 path delay       173
	ptp4l[294.233]: master offset         -6 s2 freq      +0 path delay       174
	RE::SyncAnalysis: 2025-09-24 13:34:43 475018367 ns [4, S0.Tracker#0 *] (3240) offset: -6.5 ns    delay: 172.5 ns  
	ptp4l[296.234]: master offset         -3 s2 freq      +2 path delay       173
	ptp4l[298.234]: master offset         -6 s2 freq      -1 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:48 475027604 ns [4, S0.Tracker#0 *] (3240) offset: -24.0 ns    delay: 171.0 ns  
	ptp4l[300.235]: master offset        -24 s2 freq     -10 path delay       171
	ptp4l[302.236]: master offset        -22 s2 freq      +2 path delay       173
	ptp4l[304.237]: master offset        -16 s2 freq      +3 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:34:53 479014212 ns [4, S0.Tracker#0 *] (3240) offset: -16.0 ns    delay: 173.0 ns  
	ptp4l[306.238]: master offset        -17 s2 freq      -1 path delay       171
	ptp4l[308.238]: master offset         -2 s2 freq      +7 path delay       171
	RE::SyncAnalysis: 2025-09-24 13:34:58 479022670 ns [4, S0.Tracker#0 *] (3240) offset: -1.5 ns    delay: 171.5 ns  
	ptp4l[310.239]: master offset        -15 s2 freq      -6 path delay       174
	ptp4l[312.240]: master offset        -19 s2 freq      -1 path delay       173
	ptp4l[314.241]: master offset         -6 s2 freq      +6 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:35:03 483013998 ns [4, S0.Tracker#0 *] (3240) offset: -6.5 ns    delay: 172.5 ns  
	ptp4l[316.242]: master offset        -19 s2 freq      -6 path delay       172
	ptp4l[318.242]: master offset        -11 s2 freq      +3 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:35:08 483020236 ns [4, S0.Tracker#0 *] (3240) offset: -21.0 ns    delay: 174.0 ns  
	ptp4l[320.243]: master offset         -9 s2 freq      +2 path delay       173
	ptp4l[322.244]: master offset        -10 s2 freq      -0 path delay       171
	ptp4l[324.245]: master offset         -8 s2 freq      +0 path delay       173
	RE::SyncAnalysis: 2025-09-24 13:35:13 487014473 ns [4, S0.Tracker#0 *] (3240) offset: -8.0 ns    delay: 171.0 ns  
	RE::SyncAnalysis: 2025-09-24 13:35:13 858987444 ns [4, S0.Tracker#0 *] (3253) Tracker run mode: 'Statistics Collecting' to 'Tracking'     3163.  
	ptp4l[326.245]: master offset        -12 s2 freq      -1 path delay       171
	ptp4l[328.246]: master offset         -7 s2 freq      +3 path delay       172
	ptp4l[330.247]: master offset         -4 s2 freq      +0 path delay       171
	ptp4l[332.248]: master offset        -19 s2 freq      -6 path delay       173
	ptp4l[334.249]: master offset        -17 s2 freq      +1 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:35:23 491015549 ns [4, S0.Tracker#0 *] (3240) offset: -17.5 ns    delay: 174.5 ns  
	ptp4l[336.249]: master offset         -6 s2 freq      +5 path delay       172
	ptp4l[338.250]: master offset        -13 s2 freq      -3 path delay       173
	ptp4l[340.251]: master offset        -16 s2 freq      -1 path delay       173
	ptp4l[342.252]: master offset        -25 s2 freq      -5 path delay       172
	ptp4l[344.252]: master offset          2 s2 freq     +14 path delay       174
	RE::SyncAnalysis: 2025-09-24 13:35:33 495020725 ns [4, S0.Tracker#0 *] (3240) offset: 1.5 ns    delay: 174.5 ns  
	ptp4l[346.253]: master offset         13 s2 freq      +4 path delay       172
	ptp4l[348.254]: master offset          8 s2 freq      -3 path delay       173
	ptp4l[350.255]: master offset         -3 s2 freq      -4 path delay       172
	ptp4l[352.256]: master offset          6 s2 freq      +4 path delay       173
	ptp4l[354.256]: master offset          0 s2 freq      -3 path delay       172
	RE::SyncAnalysis: 2025-09-24 13:35:43 499019220 ns [4, S0.Tracker#0 *] (3240) offset: 0.0 ns    delay: 173.0 ns  
</details>

>* **Note:** *`LO state: 'Frequency Locked' to 'Time Locked'    Event: 'LO time locked'`* in pcm4l log indicates both the frequency and phase of the local oscillator are aligned with the reference clock.

### Frequency Synchronization

>* **Note:** Before running frequency syncronization kill all instance of ts2phc running background.

* Run ptp4l in master mode:
``` 
Board -1 > ptp4l -i <interface-name> -m
or vice versa
``` 
**ptp4l master side log**:
```
ptp4l[6195.490]: selected /dev/ptp1 as PTP clock
ptp4l[6195.491]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[6195.492]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[6203.369]: port 1: LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[6203.370]: selected local clock 9a11bc.fffe.62d209 as best master
ptp4l[6203.370]: port 1: assuming the grand master role
```
* Run ptp4l in slave mode:
```
Board -2 > ptp4l -i <interface_name> -m -s
or vice versa
```
**ptp4l frequency synchronization slave side log**:
```
ptp4l[6276.202]: selected /dev/ptp1 as PTP clock
ptp4l[6276.203]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[6276.204]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[6277.829]: port 1: new foreign master 9a11bc.fffe.62d209-1
ptp4l[6281.829]: selected best master clock 9a11bc.fffe.62d209
ptp4l[6281.829]: port 1: LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[6284.829]: master offset    -429840 s0 freq      +0 path delay       101
ptp4l[6285.829]: master offset    -430012 s1 freq    -172 path delay       119
ptp4l[6286.829]: master offset         20 s2 freq    -152 path delay       119
ptp4l[6286.829]: port 1: UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
ptp4l[6287.829]: master offset         36 s2 freq    -130 path delay       101
ptp4l[6288.829]: master offset         37 s2 freq    -118 path delay        77
ptp4l[6289.829]: master offset         -3 s2 freq    -147 path delay        82
ptp4l[6290.829]: master offset         -4 s2 freq    -149 path delay        77
ptp4l[6291.829]: master offset         -8 s2 freq    -154 path delay        77
ptp4l[6292.829]: master offset         -5 s2 freq    -154 path delay        76
ptp4l[6293.829]: master offset         -4 s2 freq    -154 path delay        75
ptp4l[6294.829]: master offset         -3 s2 freq    -154 path delay        74
ptp4l[6295.829]: master offset         -1 s2 freq    -153 path delay        73
```
> * **Note:** For more details refer [Linux PTP Project source files and Documentation](https://linuxptp.sourceforge.net/)


## Iperf Commands

> * **Note:** Make sure to apply taskset to appropriate CPU core while running iperf traffic as per the CPU loads.

> * While running iperf traffic and ptp4l simultaneously, run either of the one in background.


**TCP TX** 
* Looking at ethernet /proc/interrupts
``` 	
xilinx-zcu670-20241:~$: cat /proc/interrupts | grep <interface-name>
 ``` 
   
> * **Note:** The above command lists the transmit side interrupt number (tx-irq-no) followed by the receive side interrupt number (rx-irq-no) and associated cores to process the interrupt. 


* Sender:
``` 	
echo 2 > /proc/irq/<tx-irq-no>/smp_affinity 
taskset -c 2 iperf3 -c <Link partner IP> -T s1 -p 5301 -t 60 -i 60 -b 2000M &
``` 
* Receiver:
```
iperf3 -s -p 5301 &  
      
echo 2 > /proc/irq/<rx-irq-no>/smp_affinity
echo 32768 > /proc/sys/net/core/rps_sock_flow_entries
echo 2048 > /sys/class/net/<interface-name>/queues/rx-0/rps_flow_cnt   
```  
**UDP TX** 

* Sender:
``` 	
echo 2 > /proc/irq/<tx-irq-no>/smp_affinity 
taskset -c 0 iperf3 -u -c <Link partner IP> -T s1 -p 5301 -t 60 -i 60 -b 450M &
taskset -c 1 iperf3 -u -c <Link partner IP> -T s2 -p 5302 -t 60 -i 60 -b 450M &
taskset -c 2 iperf3 -u -c <Link partner IP> -T s3 -p 5303 -t 60 -i 60 -b 450M &
taskset -c 3 iperf3 -u -c <Link partner IP> -T s4 -p 5304 -t 60 -i 60 -b 450M &
```
* Receiver:
``` 
iperf3 -s -p 5301 &  
iperf3 -s -p 5302 &
iperf3 -s -p 5303 &  
iperf3 -s -p 5304 &
   
echo 2 > /proc/irq/<rx-irq-no>/smp_affinity
echo 32768 > /proc/sys/net/core/rps_sock_flow_entries
echo 2048 > /sys/class/net/<interface-name>/queues/rx-0/rps_flow_cnt   
```
**TCP RX** 

* Sender:
``` 	
echo 2 > /proc/irq/<tx-irq-no>/smp_affinity 
taskset -c 2 iperf3 -c <Link partner IP> -P 2 -T s1 -p 5301 -t 60 -i 60 -b 1000M &
``` 
* Receiver:
``` 
taskset -c 2 iperf3 -s -p 5301 &  
      
echo 2 > /proc/irq/<rx-irq-no>/smp_affinity
echo 32768 > /proc/sys/net/core/rps_sock_flow_entries
echo 2048 > /sys/class/net/<interface-name>/queues/rx-0/rps_flow_cnt
```
 
**UDP RX** 
* Sender:
```
echo 2 > /proc/irq/<tx-irq-no>/smp_affinity 
taskset -c 2 iperf3 -c <Link partner IP> -u -P 2 -T s1 -p 5301 -t 60 -i 60 -b 2500M -l 1448 &
taskset -c 3 iperf3 -c <Link partner IP> -u -P 2 -T s2 -p 5302 -t 60 -i 60 -b 2500M -l 1448 &
```    
* Receiver:
``` 
taskset -c 2 iperf3 -s -p 5301 &  
taskset -c 3 iperf3 -s -p 5302 &
   
echo 2 > /proc/irq/<rx-irq-no>/smp_affinity
echo 32768 > /proc/sys/net/core/rps_sock_flow_entries
echo 2048 > /sys/class/net/<interface-name>/queues/rx-0/rps_flow_cnt
```  

### Next Steps

* [Building the TRD source Files](build_vivado_design.md)
* Go back to the [zcu670 Targeted Reference Designs start page](../platform_landing.md)

**References**

* ZYNQ ULTRASCALE+ ZCU670 Quick Start Guide ([ZCU670](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1887797340/ZCU670+Quick+Start+Guide))

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center"> Copyright © 2024 Advanced Micro Devices, Inc </p>

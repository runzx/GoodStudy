## 低负载 dtb 编译

1. 反编译固件自带的 dtb 文件
   `dtc -I dtb -O dts -o n1.dts /boot/dtb/amlogic/meson-gxl-s905d-phicomm-n1.dtb`
2. n1.dts 文件进行编辑
   200 行左右

```js
		bus@c1100000 {
			compatible = "simple-bus";
			reg = <0x0 0xc1100000 0x0 0x100000>;
			#address-cells = <0x2>;
			#size-cells = <0x2>;
			ranges = <0x0 0x0 0x0 0xc1100000 0x0 0x100000>;

			interrupt-controller@9880 {
				compatible = "amlogic,meson-gpio-intc", "amlogic,meson-gxl-gpio-intc";
				reg = <0x0 0x9880 0x0 0x10>;
				interrupt-controller;
				#interrupt-cells = <0x2>;
				amlogic,channel-interrupts = <0x40 0x41 0x42 0x43 0x44 0x45 0x46 0x47>;
				status = "okay";
				#phandle = <0x22>;
			};
```

3. 编译修改后的 dtb 文件
   `dtc -I dts -O dtb -o n1.dtb n1.dts`
4. backup
   `sudo mv /boot/dtb/amlogic/meson-gxl-s905d-phicomm-n1.dtb /boot/dtb/amlogic/meson-gxl-s905d-phicomm-n1.dtb.bak`
5. cp
   `cp n1.dtb /boot/dtb/amlogic/meson-gxl-s905d-phicomm-n1.dtb`
6. reboot

从 2 降到 0.06 ！！
top - 09:56:13 up 21 min, 1 user, load average: 2.03, 2.03, 1.58  
top - 10:03:23 up 5 min, 1 user, load average: 0.04, 0.03, 0.00

## old

\$ ssh zhaixiang@aml
_ \_\_ \_\_ _ \_**\_ \_**
/ \ | \/ | | / **_|/ _ \_\_ \_\_** \_**\_ **
/ _ \ | |\/| | | \_**\_\_** \ (_) \ \/ /\ \/ /\ \/ /
/ **\_ \| | | | |**|**\_**|**) \__, |> < > < > <
/_/ \_\_| |\_|\_\_\_**| |\__\_\_/ /_//_/\_\/_/\_\/\_/\_\

Welcome to Armbian Bionic with Linux 5.5.0-rc6-aml-s9xxx

System load: 2.10 1.87 1.08 Up time: 10 min
Memory usage: 9 % of 1741MB IP: 192.168.3.245
CPU temp: 47°C
Usage of /: 31% of 6.3G

### new

\$ ssh zhaixiang@aml
The authenticity of host 'aml (192.168.3.245)' can't be established.
ECDSA key fingerprint is SHA256:cLBRW+aEk0uP2ihXwNcB1GV9vVPI8d7b14Za4qIWKz4.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'aml,192.168.3.245' (ECDSA) to the list of known hosts.
_ \_\_ \_\_ _ \_**\_ \_**
/ \ | \/ | | / **_|/ _ \_\_ \_\_** \_**\_ **
/ _ \ | |\/| | | \_**\_\_** \ (_) \ \/ /\ \/ /\ \/ /
/ **\_ \| | | | |**|**\_**|**) \__, |> < > < > <
/_/ \_\_| |\_|\_\_\_**| |\__\_\_/ /_//_/\_\/_/\_\/\_/\_\

Welcome to Armbian Bionic with Linux 5.5.0-rc6-aml-s9xxx

System load: 0.10 0.03 0.01 Up time: 0 min
Memory usage: 9 % of 1741MB IP: 192.168.3.245
CPU temp: 50°C
Usage of /: 32% of 6.3G

Last login: Wed Jul 1 10:02:26 2020 from 192.168.3.58

## old

Using username "zhaixiang".
_ \_\_ \_\_ _ \_**\_ \_ \_\_**
/ \ | \/ | | / **_/ |_** \
 / _ \ | |\/| | | | | _| | **) |
/ \_** \| | | | |**| |\_| | |/ **/
/_/ \_\_| |_|**\_**\_**_|_|\_\_\_**|

Welcome to Debian Buster with Armbian Linux 5.3.0-aml-g12
System load: 2.08 0.76 0.27 Up time: 1 min
Memory usage: 7 % of 1805MB IP: 192.168.3.245
CPU temp: 47°C
Usage of /: 3% of 57G storage/: 56% of 128M

[ General system configuration (beta): armbian-config ]

###

`dtc -I dtb -O dts -o n1.dts /boot/dtb/meson-gxl-s905d-phicomm-n1.dtb`  
line:212  
`#phandle = < 0x21 >;`

`sudo mv /boot/dtb/meson-gxl-s905d-phicomm-n1.dtb /boot/dtb/meson-gxl-s905d-phicomm-n1.dtb.bak`
`cp n1.dtb /boot/dtb/meson-gxl-s905d-phicomm-n1.dtb`

### new

    _    __  __ _     ____ _ ____

/ \ | \/ | | / **_/ |_** \
 / _ \ | |\/| | | | | _| | **) |
/ \_** \| | | | |**| |\_| | |/ **/
/_/ \_\_| |_|**\_**\_**_|_|\_\_\_**|

Welcome to Debian Buster with Armbian Linux 5.3.0-aml-g12
System load: 0.31 0.21 0.08 Up time: 1 min
Memory usage: 7 % of 1805MB IP: 192.168.3.245
CPU temp: 49°C
Usage of /: 3% of 57G storage/: 56% of 128M

Last login: Wed Jul 1 02:12:41 2020 from 192.168.3.58

runzx@B450 MINGW64 ~
\$ ssh zhaixiang@aml
_ \_\_ \_\_ _ \_**\_ \_ \_\_**
/ \ | \/ | | / **_/ |_** \
 / _ \ | |\/| | | | | _| | **) |
/ \_** \| | | | |**| |\_| | |/ **/
/_/ \_\_| |_|**\_**\_**_|_|\_\_\_**|

Welcome to Debian Buster with Armbian Linux 5.3.0-aml-g12
System load: 0.01 0.32 0.39 Up time: 22 min
Memory usage: 7 % of 1805MB IP: 192.168.3.245
CPU temp: 50°C
Usage of /: 3% of 57G storage/: 56% of 128M

Last login: Wed Jul 1 02:38:13 2020 from 192.168.3.58

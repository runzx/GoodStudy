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
				# phandle = <0x22>;
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
top - 09:56:13 up 21 min,  1 user,  load average: 2.03, 2.03, 1.58  
top - 10:03:23 up 5 min,  1 user,  load average: 0.04, 0.03, 0.00  
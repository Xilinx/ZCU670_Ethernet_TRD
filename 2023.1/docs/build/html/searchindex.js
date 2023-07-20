Search.setIndex({"docnames": ["docs/platform/docs/app_deployment", "docs/platform/docs/build_vivado_design", "docs/platform/docs/hw_arch_platform", "docs/platform/docs/hw_arch_ptp_pkt_proc", "docs/platform/docs/introduction", "docs/platform/docs/issue_sc", "docs/platform/docs/revision_history", "docs/platform/docs/sw_arch_platform", "docs/platform/docs/trd_packaging", "docs/platform/platform_landing", "index"], "filenames": ["docs/platform/docs/app_deployment.md", "docs/platform/docs/build_vivado_design.md", "docs/platform/docs/hw_arch_platform.md", "docs/platform/docs/hw_arch_ptp_pkt_proc.md", "docs/platform/docs/introduction.md", "docs/platform/docs/issue_sc.md", "docs/platform/docs/revision_history.md", "docs/platform/docs/sw_arch_platform.md", "docs/platform/docs/trd_packaging.md", "docs/platform/platform_landing.rst", "index.rst"], "titles": ["Setting up the Board and Application Deployment", "Build Flow", "Hardware Architecture of the Platform", "Hardware Architecture of the PTP Packet Processor", "Design Overview", "Known Issues", "Revision History", "Software Architecture of the Platform", "TRD Package Contents", "ZCU670 Ethernet TRD", "ZCU670 ETHERNET TRD Documentation"], "terms": {"versal": [], "prime": [], "evalu": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "kit": [0, 1, 2, 3, 4, 5, 6, 7, 8], "ethernet": [0, 1, 2, 3, 4, 7, 8], "trd": [0, 2, 3, 4, 7], "tutori": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10], "thi": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "document": 0, "show": [0, 2], "how": 0, "prebuilt": [0, 1, 8], "imag": [0, 8], "design": [0, 1, 2, 3, 6, 7, 8, 9], "packag": [0, 4, 9], "zcu670_ethernet_trd_2022": [], "2": [0, 1, 2, 3, 4, 5, 7, 8, 9], "zip": 0, "file": [0, 1, 2, 3, 4, 5, 6, 7, 9], "power": [0, 4], "cabl": [0, 4], "micro": [0, 4], "usb": [0, 4], "termin": [0, 4], "emul": [0, 4], "exampl": 0, "window": 0, "teraterm": 0, "ug1036": 0, "regard": 0, "tera": 0, "term": 0, "linux": [0, 1, 4, 7], "picocom": 0, "http": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "github": [0, 9], "com": [0, 9], "npat": 0, "efault": 0, "releas": 0, "machin": [], "25g": [0, 4, 7, 9], "capabl": [7, 9], "nic": [], "mellanox": [], "connectx4": [], "mcx4111a": [], "acat": [], "sfp28": [0, 4], "zsfp": [], "copper": [0, 4], "iperf3": 0, "The": [0, 1, 2, 3, 4, 7, 8, 9], "follow": [0, 1, 2, 7, 8], "figur": [0, 2], "jumper": 0, "switch": 0, "one": [0, 4], "time": [0, 1, 4, 7, 9], "should": [0, 3], "have": [0, 8], "been": [0, 8], "deliv": 0, "you": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "default": 0, "howev": 0, "good": 0, "doubl": 0, "check": [0, 3, 7], "first": [0, 6, 7], "when": [0, 3, 5, 7], "get": 0, "sw2": 0, "ON": 0, "off": 0, "from": [0, 1, 2, 3, 7], "bit": [0, 1, 3, 7], "1": [0, 1, 3, 4, 8], "4": 0, "shown": 0, "abov": 0, "pictur": [], "extern": [2, 4, 7], "connect": [0, 2, 4, 9], "port": [0, 2, 3], "todo": [], "sfp": [], "unzip": [0, 8], "save": 0, "your": 0, "comput": 0, "navig": [0, 8], "2022": [], "which": [1, 3, 8], "work": [1, 8], "directori": [1, 8], "prepar": 0, "There": 0, "ar": [0, 2, 5, 6], "mani": 0, "option": 0, "format": [0, 1], "tool": [0, 1], "But": 0, "alwai": 0, "fat32": [0, 1], "us": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "formatt": 0, "go": [0, 1, 2, 3, 4, 5, 7, 8, 9], "fold": [], "copi": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "bin": [0, 1], "ub": [0, 1], "scr": [0, 1], "microsd": 0, "requir": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "configur": [0, 1, 4, 7, 9], "renesa": [0, 7], "idt": [0, 9], "while": [0, 9], "8a34001": [0, 7, 9], "chip": [0, 2], "sourc": [0, 1, 4, 8], "ieee": [0, 9], "1588": [0, 4, 7, 9], "synchron": [7, 9], "sync": [0, 5, 6], "base": [0, 2, 3, 4], "prior": 0, "ftdi": 0, "cdm": 0, "suppli": 0, "j52": 0, "note": [0, 1, 7, 8], "ensur": 0, "serial": 0, "consol": 0, "come": 0, "c": [0, 7], "connector": 0, "jtag": 0, "type": [0, 3], "A": [0, 7], "b": [0, 8], "j83": 0, "pc": 0, "In": [0, 2, 5, 6], "uart0": 0, "enumer": 0, "three": 0, "ps": [0, 2], "uart1": 0, "pl": [0, 2, 4, 9], "system": [0, 1, 4, 7], "control": [0, 2, 3, 7], "start": [0, 1, 2, 3, 4, 7, 8, 10], "program": [], "select": 0, "below": [0, 1, 3, 8], "baud": 0, "rate": [0, 7, 9], "115200": 0, "data": [0, 2, 3, 4, 7], "8": 0, "pariti": 0, "none": 0, "stop": 0, "flow": [0, 2, 9], "after": [0, 1, 2, 8], "success": 0, "shell": 0, "prompt": 0, "appear": 0, "xilin": [], "login": 0, "usernam": 0, "petalinux": [0, 8], "creat": [0, 1, 8], "new": [0, 3], "password": 0, "To": 0, "interfac": [0, 2, 3, 4], "make": [0, 1, 3], "sure": 0, "log": 0, "super": 0, "user": [0, 1, 3, 4, 6, 7], "sudo": 0, "su": 0, "onc": 0, "an": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "ip": [0, 2, 4, 7, 9], "address": [0, 3], "each": [], "link": [0, 2, 4, 9], "establish": 0, "ping": 0, "do": 0, "proce": 0, "until": 0, "abl": 0, "ifconfig": 0, "interface_nam": 0, "down": 0, "By": 0, "valid": 0, "execut": [], "server": [], "s": [0, 7], "p": 0, "_": [0, 3, 6, 7, 8], "i": [0, 3], "60": 0, "client": [3, 7], "traffic": [0, 4, 5, 9], "tcp": [0, 4, 9], "t": 0, "udp": [0, 3, 5, 9], "u": 0, "ptp4l": [0, 5], "name": 0, "m": 0, "partner": [0, 2, 4, 9], "vice": 0, "versa": 0, "ts2phc": [0, 7], "eth1": 0, "dev": 0, "ptp0": 0, "f": 0, "usr": [0, 7], "cfg": 0, "q": 0, "standalone_g": 0, "8275": 0, "linkpartner_g": 0, "back": [0, 1, 2, 3, 4, 7, 8], "page": [0, 1, 2, 3, 4, 7, 8], "under": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "apach": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "version": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "0": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "mai": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "except": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "complianc": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "obtain": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "www": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "org": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "unless": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "law": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "agre": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "write": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "softwar": [0, 1, 2, 3, 4, 5, 6, 8, 9], "distribut": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "AS": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "IS": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "basi": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "without": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "warranti": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "OR": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "condit": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "OF": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "ani": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "kind": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "either": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "express": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "impli": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "see": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "specif": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "languag": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "govern": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "permiss": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "limit": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "copyright": [0, 1, 2, 3, 4, 5, 6, 7, 8], "2023": [0, 1, 2, 3, 4, 5, 7, 8], "xilinx": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10], "rfsoc": [0, 1, 2, 3, 4, 5, 6, 7, 8], "zcu670": [0, 1, 2, 3, 4, 5, 6, 7, 8], "vivado": [1, 8], "suit": [1, 2], "run": [1, 5, 8], "gener": [1, 2, 7], "subsequ": [], "cd": 1, "command": 1, "sdcard": 1, "wic": [], "call": 1, "lower": 1, "level": [1, 2, 8], "take": [0, 1, 2, 7], "coupl": [], "hour": 1, "depend": 1, "ye": [], "alon": [], "applic": [1, 2, 3, 4, 5, 6, 7, 8, 9], "script": [1, 8], "main": [1, 2], "tcl": 1, "popul": 1, "block": 1, "final": [1, 3], "design_xsa": 1, "locat": 1, "working_dir": [], "zcu670_25g_ptp_subsi": 1, "xxv_ptp_subsys_wrapp": 1, "vivado_design": [], "job": [], "n": [], "onli": 0, "need": [3, 7], "chang": [], "open": 1, "gui": [], "open_project": [], "xxv_ptp_subsi": [], "xpr": [], "pane": [], "left": [], "hand": [], "side": 0, "integr": [], "click": [], "becom": [], "visibl": [], "contain": [2, 8], "process": [2, 3, 4], "other": [8, 10], "debug": [], "devic": [1, 2, 7], "pdi": [], "avail": 1, "platform_nam": [], "projec": [], "impl_1": [], "mrmac_subsys_wrapp": [], "export": [], "dialog": [], "box": [], "choos": 7, "includ": [2, 7], "provid": [1, 3, 7], "warn": [], "messag": 0, "modul": [], "ha": [2, 3, 8], "alreadi": 8, "overwrit": [], "exist": [], "displai": [], "finish": [], "section": 2, "given": [3, 8], "config": [], "hw": [1, 2, 4, 7], "descript": 1, "path": [0, 1, 2], "silentconfig": [], "match": [], "previou": [], "compress": [], "dir": [], "folder": [0, 1, 8], "boot": [1, 9], "fsbl": 1, "atf": [], "bitstream": [], "zynqmp_fsbl": [], "elf": [], "pmufw": [], "fpga": 9, "sd": [1, 4], "card": [1, 4], "insert": 1, "slot": 1, "function": [1, 7], "equival": 1, "set": [3, 7, 8, 9], "up": [8, 9], "board": [2, 4, 7, 8, 9], "deploy": [7, 8, 9], "target": [0, 1, 8], "For": [0, 2, 7, 9], "more": [0, 7], "inform": [2, 3, 7, 8], "setup": 9, "viti": [], "unifi": [], "ug1393": [], "guid": [0, 1, 4], "ug1144": 1, "describ": [2, 8], "implement": [2, 7], "top": [2, 8], "refer": [2, 4, 7, 8, 9], "detail": [0, 2, 3, 7, 8], "variou": 2, "compon": 2, "illustr": [], "processor": [2, 9], "subsystem": [2, 4, 9], "present": [2, 7, 9], "high": [2, 4, 5], "perform": [2, 3], "arm": 2, "a53": 2, "On": 2, "cach": 2, "memori": [2, 3, 7], "along": [2, 9], "harden": 2, "commun": 2, "peripher": [2, 4], "can": [0, 2, 7], "access": 2, "2gbyte": 2, "ddr": 2, "ram": 2, "programm": [2, 4, 9], "logic": [2, 4, 6, 9], "multi": 2, "media": 2, "xxv": [2, 4, 6, 7, 9], "mac": [2, 6, 7, 9], "axi": [2, 3, 6, 7, 9], "stream": [2, 3, 7], "transmit": [2, 3, 4, 7], "receiv": [0, 2, 3, 4, 7], "end": 2, "packet": [2, 4, 9], "via": [2, 3, 7], "It": [2, 4, 8], "lite": 2, "quad": [2, 4], "gigabit": 2, "transceiv": 2, "gty": [2, 4], "gt": [2, 4, 6, 9], "world": 2, "also": [2, 3, 7, 8], "outsid": 2, "direct": [2, 4], "mcdma": [2, 3, 4, 7], "standard": [2, 7], "channel": [2, 4, 7], "facilit": 2, "transfer": [2, 4, 7], "tx": [0, 2, 4], "ptp": [2, 4, 5, 9], "master": [0, 2, 4, 7], "transmiss": 2, "detect": 2, "store": [2, 3], "timestamp": [2, 3, 4], "rx": [0, 2, 4, 5], "prepend": [2, 4], "all": [0, 1, 2, 3, 7], "normal": 2, "both": [2, 7], "o": 2, "mm2": [2, 7], "output": [2, 4], "onto": 2, "send": 2, "s2mm": [2, 7], "between": [0, 2], "further": [2, 3], "found": 2, "next": [2, 3, 4, 7], "step": [2, 3, 4, 7, 9], "licens": [2, 3, 4, 5, 6, 7, 8, 10], "vck190": [], "architectur": [1, 10], "necessari": [3, 7, 8], "app": [3, 7], "field": [3, 7], "captur": 3, "where": [3, 7], "sw": [3, 7], "flag": 3, "valu": 3, "drive": 3, "1588op": 3, "mrmac": 3, "oper": [3, 4], "tabl": 3, "tx_ptp_1588op_in": 3, "b00": 3, "No": [0, 3], "taken": 3, "frame": 3, "modifi": 3, "b10": 3, "return": 3, "addit": 3, "itself": 3, "b11": 3, "reserv": 3, "support": [0, 3, 4, 6, 7, 10], "mode": 3, "10": 3, "initi": [0, 3, 7], "written": 3, "noc": 3, "qualifi": [3, 7], "indic": 3, "complet": [3, 7], "helper": [], "doe": [0, 7], "incom": [], "modif": [], "pars": 3, "header": 3, "help": 3, "upper": [3, 7], "layer": [3, 7], "peer": [], "ii": [], "two": [3, 9], "64": 3, "dataword": 3, "128": 3, "80": 3, "statu": 3, "word": 3, "content": [3, 4, 9, 10], "dw": 3, "63": [0, 3], "15": 3, "79": 3, "29": [], "16": [0, 3, 7], "reserved30": [], "bit31": [], "bit63": 3, "32": 3, "featur": [3, 10], "over": [3, 9], "ieeee": 3, "802": [3, 9], "3": [0, 3, 9], "ipv4": [3, 9], "whenev": 3, "multicast": 3, "destin": [3, 7], "carri": 3, "out": [3, 5], "dw1": [], "31": 3, "30": [0, 3], "platform": [3, 4, 8, 9], "showcas": 4, "precis": [4, 9], "protocol": [4, 9], "solut": 4, "consist": 4, "movement": [], "through": 4, "hardwar": [4, 8, 9], "x86": [], "host": [], "x2522": [], "filter": 4, "auxiliari": 4, "i2c": 4, "uart": 4, "apu": 4, "smp": 4, "kernel": [4, 7], "stack": 4, "speed": 4, "4x25g": [], "ug1532": 4, "product": [], "sheet": 4, "ds883": 4, "10g": 4, "v4": 4, "pg314": 4, "give": [], "error": [], "cpu": [0, 5], "load": [], "wait": [], "If": 0, "within": [], "specifi": [], "timeout": [], "iperf": 5, "expect": [], "slightli": [], "throughput": [], "dhcp": [], "broadcast": [], "mtu": [], "9000": [], "case": [0, 7, 9], "slave": 0, "might": [], "fluctuat": [], "known": [6, 9], "issu": [6, 9], "plain": [], "upgrad": [], "driver": [7, 9], "refclk": [], "dynam": 0, "ad": 6, "four": [], "lane": 7, "descriptor": 7, "enabl": [1, 6, 7], "them": 7, "interrupt": 7, "dma": [6, 7], "pleas": 7, "wiki": [], "atlassian": [], "net": 0, "space": 7, "18842485": [], "timer": [0, 7, 9], "syncer": [0, 7, 9], "adjust": [0, 7], "same": 7, "whe": [], "linuxptp": 7, "share": 7, "band": 7, "metadata": [7, 8], "per": 7, "queu": 7, "app2": 7, "upon": 7, "correspond": 7, "action": 7, "pass": 7, "ts": 7, "higher": 7, "extract": [7, 8], "byte": 7, "datastream": 7, "discard": 7, "dummi": 7, "precursor": 7, "non": 7, "read": 7, "binari": 8, "build": [0, 8, 9], "separ": 8, "skip": 8, "clone": 8, "repositori": 8, "makefil": 8, "entir": 8, "recip": 8, "import": 8, "notic": 8, "concern": 8, "third": 8, "parti": 8, "about": 8, "ieee1588": 9, "demonstr": 9, "frequenc": [5, 9], "phase": [5, 7, 9], "physic": 9, "clock": [6, 7, 9], "phc": [0, 9], "network": 9, "inlin": 9, "guarante": 9, "serv": 9, "upd": 9, "telecom": [], "profil": [], "itu": [], "g": [], "l2": [], "test": 9, "zcu": 9, "670": 9, "connectx5": [], "overview": 9, "acchitectur": [], "revis": 9, "histori": 9, "track": 9, "request": 9, "bug": 9, "question": 9, "forum": 9, "quick": [0, 7, 10], "v3": [], "9": 0, "zynq": [0, 4], "ultrascal": [0, 4], "dfe": 4, "anoth": 9, "board2": 9, "v": 0, "repeat": 0, "5": 0, "second": 0, "linkpartn": [], "explain": 1, "project": [0, 1], "bsp": 1, "compris": 1, "uboot": 1, "pmu": 1, "firmwar": 1, "spec": 1, "app_deploymentdesign": [], "ug901": 1, "1x25g": 4, "sink": 4, "sender": 0, "echo": 0, "proc": 0, "irq": 0, "smp_affin": 0, "taskset": 0, "s1": 0, "5301": 0, "1850m": 0, "s2": 0, "5302": 0, "450m": 0, "s3": 0, "5303": 0, "s4": 0, "5304": 0, "500m": 0, "32768": 0, "sy": 0, "core": 0, "rps_sock_flow_entri": 0, "2048": 0, "class": 0, "queue": 0, "rps_flow_cnt": 0, "rps_flow_cn": [], "2500m": 0, "l": 0, "1448": 0, "affin": [], "rp": [], "sock": [], "entri": [], "cnt": [], "cn": [], "syncron": 0, "appli": 0, "appropri": 0, "422": 0, "355": 0, "ptp1": 0, "20222": [], "home": 0, "392": 0, "listen": 0, "init_complet": 0, "817": 0, "announce_receipt_timeout_expir": 0, "local": 0, "9a11bc": 0, "fffe": 0, "62d209": 0, "best": 0, "assum": 0, "grand": [0, 7], "role": 0, "background": 0, "ptp_pin_setfunc2": 0, "fail": 0, "invalid": 0, "argument": 0, "521": 0, "912": 0, "pin": 0, "continu": 0, "brave": 0, "ignor": 0, "setfunc": 0, "530": 0, "543": 0, "546": 0, "line": [0, 9], "attach": 0, "588": 0, "673": 0, "foreign": 0, "923": 0, "uncalibr": 0, "rs_slave": 0, "531": 0, "303": 0, "master_clock_select": 0, "990": 0, "rm": 0, "937470829990502912": 0, "max": 0, "1676998802225530368": 0, "freq": 0, "63277": 0, "delai": 0, "59892814365198016": 0, "215946613225567776": 0, "532": 0, "991": 0, "2629": 0, "3787": 0, "5008": 0, "3793": 0, "167": 0, "94": 0, "533": 0, "3208": 0, "3803": 0, "2030": 0, "660": 0, "52": 0, "19": 0, "534": 0, "1209": 0, "2025": 0, "1957": 0, "389": 0, "17": 0, "535": 0, "169": 0, "270": 0, "687": 0, "290": 0, "66": 0, "6": 0, "536": 0, "992": 0, "226": 0, "255": 0, "112": 0, "74": 0, "537": 0, "99": 0, "159": 0, "78": 0, "23": 0, "75": 0, "538": 0, "13": 0, "166": 0, "22": 0, "539": 0, "993": 0, "18": 0, "211": 0, "73": 0, "540": 0, "12": 0, "217": 0, "541": 0, "51": 0, "ptp_pin_setfunc": [], "6195": 0, "490": 0, "491": 0, "492": 0, "6203": 0, "369": 0, "370": 0, "6276": 0, "202": 0, "203": 0, "204": 0, "6277": 0, "829": 0, "6281": 0, "6284": 0, "offset": 0, "429840": 0, "s0": 0, "101": 0, "6285": 0, "430012": 0, "172": 0, "119": 0, "6286": 0, "20": 0, "152": 0, "6287": 0, "36": 0, "130": 0, "6288": 0, "37": 0, "118": 0, "77": 0, "6289": 0, "147": 0, "82": 0, "6290": 0, "149": 0, "6291": 0, "154": 0, "6292": 0, "76": 0, "6293": 0, "6294": 0, "6295": 0, "153": 0, "befor": 0, "kill": 0, "instanc": 0, "paral": [], "usecas": 5, "1pp": 7, "input": 7, "tod": [], "bu": [], "snapshot": 7, "signal": [], "These": [], "pp": [], "event": 7, "report": [], "stamper": [], "manual": [0, 7], "regist": [6, 7], "its": [], "becaus": 0, "clockmatrix": 0, "so": 7, "handler": 7, "manag": 4, "dw_0": 3, "dw_1": 3, "reserved31": 3, "due": 5, "util": [5, 6], "simultan": [0, 5], "en": [], "ma": [], "vivado_init": 1, "add": 1, "enable_beta_devic": 1, "beta": 1, "zcu670_ethernet_trd_2023": 0, "reset": 6, "qpll": 6, "sycn": [], "singl": [], "20231": 0, "recov": 6, "hier": 6, "rxd": 6, "fifo": 6, "txd": 6, "depth": 6, "reduc": 6, "8k": 6, "minim": 6, "resourc": 6, "graph": 6, "updat": 6, "1x25ge": 9}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"set": 0, "up": 0, "board": 0, "applic": 0, "deploy": 0, "introduct": [0, 2, 4, 7], "prerequisit": [0, 1], "setup": 0, "flash": 0, "sd": 0, "card": 0, "gt": 0, "refer": [0, 1], "clock": 0, "uart": 0, "driver": 0, "instal": 0, "boot": 0, "mode": 0, "run": 0, "host": [], "zcu670": [9, 10], "iperf": 0, "command": 0, "ptp": [0, 3, 7], "freqyenc": [], "syncron": [], "two": [], "step": [0, 1, 8], "phase": 0, "next": [0, 1, 8], "licens": [0, 1, 9], "build": 1, "flow": 1, "To": 1, "trd": [1, 8, 9, 10], "packag": [1, 8], "top": 1, "makefil": 1, "hardwar": [1, 2, 3], "platform": [1, 2, 7], "xsa": 1, "modifi": [], "design": 4, "creat": [], "new": [], "petalinux": 1, "imag": 1, "configur": [], "project": [], "manual": [], "architectur": [2, 3, 7, 9], "resourc": 2, "util": 2, "acchitectur": [], "packet": [3, 7], "processor": 3, "tx": 3, "hw": 3, "master": 3, "ip": 3, "rx": 3, "detect": 3, "logic": 3, "overview": 4, "compon": 4, "known": 5, "issu": 5, "revis": 6, "histori": 6, "2022": 6, "2": 6, "releas": 6, "1": 6, "2021": [], "softwar": 7, "timestamp": 7, "handl": 7, "pl": 7, "base": 7, "process": 7, "solut": 7, "content": 8, "download": 8, "link": 8, "file": 8, "structur": 8, "ethernet": [9, 10], "featur": 9, "quick": 9, "start": 9, "tutori": 9, "document": [9, 10], "other": 9, "xilinx": 9, "support": 9, "synchron": 0, "frequenc": 0, "prepend": 3, "2023": 6}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx.ext.todo": 2, "sphinx.ext.viewcode": 1, "sphinx": 56}})
let v2 = {
  StreamConfig: {},
  State: {
    Running: false,
    Paused: false,
    Restarting: false,
    OOMKilled: false,
    RemovalInProgress: false,
    Dead: false,
    Pid: 0,
    ExitCode: 0,
    Error: '',
    StartedAt: '2019-07-10T17:04:06.545943114Z',
    FinishedAt: '2019-07-10T18:08:39.269863977Z',
    Health: null
  },
  ID: '34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438',
  Created: '2019-07-10T17:04:02.602572477Z',
  Managed: false,
  Path: 'docker-entrypoint.sh',
  Args: ['redis-server'],
  Config: {
    Hostname: '34ff3ce71622',
    Domainname: '',
    User: '',
    AttachStdin: false,
    AttachStdout: false,
    AttachStderr: false,
    ExposedPorts: {
      '6379/tcp': {
        HostIp: '',
        HostPort: '6379'
      }
    },
    Tty: false,
    OpenStdin: false,
    StdinOnce: false,
    Env: [
      'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      'GOSU_VERSION=1.10',
      'REDIS_VERSION=5.0.5',
      'REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.5.tar.gz',
      'REDIS_DOWNLOAD_SHA=2139009799d21d8ff94fc40b7f36ac46699b9e1254086299f8d3b223ca54a375'
    ],
    Cmd: ['redis-server'],
    ArgsEscaped: true,
    Image: 'redis',
    Volumes: { '/data': {} },
    WorkingDir: '/data',
    Entrypoint: ['docker-entrypoint.sh'],
    OnBuild: null,
    Labels: {}
  },
  Image:
    'sha256:bb0ab8a99fe694e832e56e15567c83dee4dcfdd321d0ad8ab9bd64d82d6a6bfb',
  NetworkSettings: {
    Bridge: '',
    SandboxID:
      'e56d1ff36708597474b4f1d3c1248a4af0afbe49172516eb9a3f55048053f733',
    HairpinMode: false,
    LinkLocalIPv6Address: '',
    LinkLocalIPv6PrefixLen: 0,
    Networks: {
      bridge: {
        IPAMConfig: null,
        Links: null,
        Aliases: null,
        NetworkID:
          '8e5325dcb32443f4f73a7dcb26de2bd4d7da8c76dc7892fa1acede6effb46b12',
        EndpointID: '',
        Gateway: '',
        IPAddress: '',
        IPPrefixLen: 0,
        IPv6Gateway: '',
        GlobalIPv6Address: '',
        GlobalIPv6PrefixLen: 0,
        MacAddress: '',
        DriverOpts: null,
        IPAMOperational: false
      }
    },
    Service: null,
    Ports: {
      '6379/tcp': {
        HostIp: '',
        HostPort: '6379'
      }
    },
    SandboxKey: '/var/run/docker/netns/e56d1ff36708',
    SecondaryIPAddresses: null,
    SecondaryIPv6Addresses: null,
    IsAnonymousEndpoint: false,
    HasSwarmEndpoint: false
  },
  LogPath:
    '/var/lib/docker/containers/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438-json.log',
  Name: '/some-redis',
  Driver: 'overlay2',
  OS: 'linux',
  MountLabel: '',
  ProcessLabel: '',
  RestartCount: 0,
  HasBeenStartedBefore: true,
  HasBeenManuallyStopped: false,
  MountPoints: {
    '/data': {
      Source: '',
      Destination: '/data',
      RW: true,
      Name: 'a165e400d7cd50c80897eecd712de9ed6c92a32abeacd0562c1726ee87ec95af',
      Driver: 'local',
      Type: 'volume',
      Spec: {},
      SkipMountpointCreation: false
    }
  },
  SecretReferences: null,
  ConfigReferences: null,
  AppArmorProfile: '',
  HostnamePath:
    '/var/lib/docker/containers/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438/hostname',
  HostsPath:
    '/var/lib/docker/containers/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438/hosts',
  ShmPath:
    '/var/lib/docker/containers/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438/mounts/shm',
  ResolvConfPath:
    '/var/lib/docker/containers/34ff3ce71622d4b05ab4dca0b910ee79bb1f6f127065bc2fb572c2b34fd7b438/resolv.conf',
  SeccompProfile: '',
  NoNewPrivileges: false
}

// "PortBindings":{"6379/tcp":[{"HostIp":"","HostPort":"6379"}]},

let host = {
  Binds: null,
  ContainerIDFile: '',
  LogConfig: { Type: 'json-file', Config: {} },
  NetworkMode: 'default',
  PortBindings: {
    '6379/tcp': [{
      HostIp: '',
      HostPort: '6379'
    }]
  },
  RestartPolicy: { Name: 'no', MaximumRetryCount: 0 },
  AutoRemove: false,
  VolumeDriver: '',
  VolumesFrom: null,
  CapAdd: null,
  CapDrop: null,
  Dns: [],
  DnsOptions: [],
  DnsSearch: [],
  ExtraHosts: null,
  GroupAdd: null,
  IpcMode: 'shareable',
  Cgroup: '',
  Links: null,
  OomScoreAdj: 0,
  PidMode: '',
  Privileged: false,
  PublishAllPorts: false,
  ReadonlyRootfs: false,
  SecurityOpt: null,
  UTSMode: '',
  UsernsMode: '',
  ShmSize: 67108864,
  Runtime: 'runc',
  ConsoleSize: [0, 0],
  Isolation: '',
  CpuShares: 0,
  Memory: 0,
  NanoCpus: 0,
  CgroupParent: '',
  BlkioWeight: 0,
  BlkioWeightDevice: [],
  BlkioDeviceReadBps: null,
  BlkioDeviceWriteBps: null,
  BlkioDeviceReadIOps: null,
  BlkioDeviceWriteIOps: null,
  CpuPeriod: 0,
  CpuQuota: 0,
  CpuRealtimePeriod: 0,
  CpuRealtimeRuntime: 0,
  CpusetCpus: '',
  CpusetMems: '',
  Devices: [],
  DeviceCgroupRules: null,
  DiskQuota: 0,
  KernelMemory: 0,
  MemoryReservation: 0,
  MemorySwap: 0,
  MemorySwappiness: null,
  OomKillDisable: false,
  PidsLimit: 0,
  Ulimits: null,
  CpuCount: 0,
  CpuPercent: 0,
  IOMaximumIOps: 0,
  IOMaximumBandwidth: 0,
  MaskedPaths: [
    '/proc/asound',
    '/proc/acpi',
    '/proc/kcore',
    '/proc/keys',
    '/proc/latency_stats',
    '/proc/timer_list',
    '/proc/timer_stats',
    '/proc/sched_debug',
    '/proc/scsi',
    '/sys/firmware'
  ],
  ReadonlyPaths: [
    '/proc/bus',
    '/proc/fs',
    '/proc/irq',
    '/proc/sys',
    '/proc/sysrq-trigger'
  ]
}

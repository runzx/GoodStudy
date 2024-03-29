Install MongoDB Community Edition on Red Hat Enterprise or CentOS Linux

1. 	vi /etc/yum.repos.d/mongodb-org-4.0.repo
		[mongodb-org-4.0]
		name=MongoDB Repository
		baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
		gpgcheck=1
		enabled=1
		gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc

	sudo yum install -y mongodb-org

2. setup mongodb 3.6
`vi /etc/yum.repos.d/mongodb-org-3.6.repo`
```
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```
sudo yum install -y mongodb-org

3. 配置
	/etc/mongod.conf configuration file supplied by the packages have 
		bind_ip set to 127.0.0.1	# 默认 改0.0.0.0 才可能在外部访问
4。centos 7 默认防火墙
	service firewalld stop

5. 实录
	1。 安装后，系统自建目录 
		/sys/fs/cgroup/memory
		...
		vi /etc/cgconfig.conf
			group limitmem{
				memory {
					memory.limit_in_bytes = 256M;
				}
			}
		service cfconfig start		// 挂载已存在的子系统
		好象/etc/cgrules.conf 没用
		cgexec -g memeory:limitmem mongod --config /etc/mongod.conf
		可以限制内存使用！

		查看子系统 lssubsys -am 
		重新挂载		cgconfigparser -l /etc/cgconfig.conf
		停止cgconfig,卸载cgroup目录	cfclear 或 service cgconfig stop
		开机自启动 	chkconfig cgconfig on/off

	vim /etc/cgrules.conf
		# user:process                         subsystems        group
		root:mongod                             memory       limitmem
		deploy:mongod                           memory       limitmem
	启动# 在root用户下执行
		cgrulesengd

/etc/cgrules.conf文件中的 条目可以包含以下额外的表示法：
@ - 表示组而不是单个用户。例如，@admins该admins组中的所有用户。
* - 代表“所有”。例如，*该subsystem字段表示所有已安装的子系统。
% - 表示与上面一行中的项目相同的项目。

Cgred是一种服务（启动cgrulesengd服务），它根据/etc/cgrules.conf文件中设置的参数将任务移动到cgroup中。/etc/cgrules.conf文件中的条目可以采用以下两种形式之一：
	user subsystems control_group
	user:command subsystems control_group
	
	*:mongod memeory limitmem			# zx 所有用户启动的mongod 都限制内存

sudo service cgred start
sudo chkconfig cgred on // 启动自运行

6. 故障
	启动不了。日志： Permission denied
	chown mongod:mongod -R /var/lib/mongo 	// v4.0.2

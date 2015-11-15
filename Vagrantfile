# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.88.10"

  config.vm.provider "virtualbox" do |vcpu|
    vcpu.memory = 2048
    vcpu.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL

     sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password password'
     sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password password'
     sudo apt-get update
     sudo apt-get install -y apache2 2> /dev/null
     sudo apt-get install -y mysql-server libapache2-mod-auth-mysql 2> /dev/null
     sudo apt-get install -y php5-cgi php5-cli php5-gd php5-curl php5-mysql php5-intl php5-xdebug php5-mcrypt libapache2-mod-php5 2> /dev/null

     sudo sed -i -e 's/upload_max_filesize = 2M/upload_max_filesize = 16M/g' /etc/php5/apache2/php.ini
     sudo sed -i -e 's/post_max_size = 8M/post_max_size = 16M/g' /etc/php5/apache2/php.ini
     sudo wget -O /etc/php5/apache2/browscap.ini http://browscap.org/stream?q=Full_PHP_BrowsCapINI > /dev/null 2>&1
     sudo sed -i -e 's:;browscap = extra/browscap.ini:browscap = /etc/php5/apache2/browscap.ini:g' /etc/php5/apache2/php.ini

     sudo echo "
       zend_extension=xdebug.so
       xdebug.remote_autostart = on
       xdebug.remote_enable = on
       xdebug.remote_host = 127.0.0.1
       xdebug.remote_connect_back = on
       xdebug.idekey = vagrant
     " > /etc/php5/apache2/conf.d/20-xdebug.ini

     sudo a2enmod rewrite
     sudo a2enmod alias
     sudo php5enmod mcrypt
     sudo service apache2 restart

     sudo sed -i -e 's/bind-address/#bind-address/g' /etc/mysql/my.cnf
     sudo service mysql restart

  SHELL

  config.vm.synced_folder '.', '/var/www/html', owner: "www-data", group: "www-data"
end

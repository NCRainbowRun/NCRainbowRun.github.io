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
     sudo apt-get update
     sudo apt-get install -y apache2 2> /dev/null
     sudo a2enmod rewrite
     sudo a2enmod alias
     sudo service apache2 restart
  SHELL

  config.vm.synced_folder '.', '/var/www/html', owner: "www-data", group: "www-data"
end

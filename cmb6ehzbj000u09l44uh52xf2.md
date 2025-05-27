---
title: "Advanced Ansible in Action: Playbooks, Ad-hoc Commands & Vault Usage"
datePublished: Tue May 27 2025 10:56:06 GMT+0000 (Coordinated Universal Time)
cuid: cmb6ehzbj000u09l44uh52xf2
slug: advanced-ansible-in-action-playbooks-ad-hoc-commands-and-vault-usage
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748270478694/97e60a6c-92db-496f-95a5-78ef5cec586e.jpeg

---

In this blog, we explore advanced concepts in Ansible to help you elevate your automation skills. You’ll learn how to design and implement sophisticated playbooks that are modular, reusable, and maintainable. We also cover the practical use of Ansible ad-hoc commands for quick, efficient task execution across your infrastructure. Additionally, the blog dives into Ansible Vault, demonstrating how to securely handle sensitive information like passwords and keys within your automation workflows. By combining these powerful techniques, you’ll be able to automate complex tasks securely and efficiently, making your infrastructure management more robust and streamlined.

Advanced Ansible playbooks enable automation of complex IT tasks such as installing web servers (e.g., Apache or Nginx), setting up Tomcat application servers, and applying conditional logic using `when` statements to control task execution based on variable values or system facts. These playbooks are often modular and reusable, allowing efficient configuration management across multiple environments.

### **Advanced YAML File Playbooks**

1. ### **Playbook for deploying a Website Using Web Server (HTTPD) :**
    

```yaml
---
- hosts: dev
  connection: ssh
  tasks:
    - name: install webserver
      yum: name=httpd state=present
    - name: start webserver
      yum: name=httpd state=started
    - name: create a file
      file:
        path: "var/www/html/index.html"
        state: touch
    - name: enter data into a file
      copy:
        dest: "var/www/html/index.html"
        content: |
           <h1> This is webapplication deploying using ansible playbooks </h1>
...
```

2. ### **Playbook for Using WHEN Conditions:**
    

```yaml
---
- hosts: dev
  connection: ssh
  tasks:
    - name: installing httpd on REDHAT
      yum: name=httpd state=present
      when: ansible_os_family == "RedHat"
    - name: installing httpd on Ubuntu
      apt: name=apache2 state=present
      when: ansible_os_family == "Ubuntu"
...
```

3. ### **Playbook To Setup Tomcat :**
    
    First create a folder appserver and inside the appserver folder create tomcat.sh file and copy the below commands inside the tomcat.sh file.
    

```basic
amazon-linux-extras install java-openjdk11 -y
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.102/bin/apache-tomcat-9.0.102.tar.gz
tar -zxvf apache-tomcat-9.0.102.tar.gz
sed -i '56  a\<role rolename="manager-gui"/>' apache-tomcat-9.0.102/conf/tomcat-users.xml
sed -i '57  a\<role rolename="manager-script"/>' apache-tomcat-9.0.102/conf/tomcat-users.xml
sed -i '58  a\<user username="tomcat" password="admin@123" roles="manager-gui, manager-script"/>' apache-tomcat-9.0.102/conf/tomcat-users.xml
sed -i '59  a\</tomcat-users>' apache-tomcat-9.0.102/conf/tomcat-users.xml
sed -i '56d' apache-tomcat-9.0.102/conf/tomcat-users.xml
sed -i '21d' apache-tomcat-9.0.102/webapps/manager/META-INF/context.xml
sed -i '22d'  apache-tomcat-9.0.102/webapps/manager/META-INF/context.xml
sh apache-tomcat-9.0.102/bin/startup.sh
```

```yaml
---
- hosts: dev
  connection: ssh
  tasks:
    - name: copy Script
      copy:
        src: "root/appserver/tomcat.sh"
        dest: "/root/"
    - name: allow permissions
      command: chmod +x /root/tomcat.sh
    - name: run the script
      shell: nohup /root/tomcat.sh
...
```

4. ### **Playbook for getting a code from github repo for particular branch**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: Getting code from git
      git:
        repo: "https://github.com/SaiPraveen63018/my-project.git"
        dest: "/home/myrepo/"
        version: master
...
```

### **ANSIBLE VAULT:**

To ensure secure management of sensitive data like passwords and API keys, **Ansible Vault** is used to encrypt variables and files within playbooks, maintaining security while enabling seamless automation workflows.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748341618350/c8715945-8b4f-4034-9de5-251c6fd35847.webp align="center")

Ansible Vault is a feature of the Ansible automation tool that is used to securely encrypt sensitive data, such as passwords, API keys, and other secrets, so that they can be safely stored and shared within Ansible playbooks and roles.

### **USE CASES:**

1. Encryption
    
2. Secure Storage
    
3. Password Prompt
    
4. Automation
    
5. Secrets Management
    

### **COMMANDS:**

* **ansible-vault create vault.yml** : creating a new encrypted playbook.
    
* **ansible-vault edit vault.ym**l : Edit the encrypted playbook.
    
* **ansible-vault rekey vault.yml** : To edit the password.
    
* **ansible-vault view vault.yml** : To view the playbook without decrypt.
    
* **ansible-vault encrypt vault.yml** : To encrypt the existing playbook.
    
* **ansible-vault decrypt vault.yml** : To decrypt the encrypted playbook
    

## **AD-HOC COMMANDS:**

For quick, one-off tasks, Ansible ad-hoc commands offer a powerful way to perform actions like installing packages, restarting services, or managing users without writing full playbooks.

Ansible ad hoc commands are CLI commands used for simple and one-time tasks. One-time tasks include checking whether the nodes are reachable over SSH, shutting down all nodes, and so on. They can easily be run at scale and even concurrently on several hosts at the same time with a single command. 

Ansible ad-hoc commands are quick, one-time instructions you give to Ansible on the command line to perform simple tasks on remote servers. These commands are not part of Ansible's usual automation playbook and are typically used for tasks like running a single command, checking server status, or making minor changes without writing full automation scripts. Ad-hoc commands are handy for immediate, one-off tasks.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748342280690/62006fbc-ee27-4ed5-b426-6b3d887ab173.png align="center")

### **IMPORTANT AD-HOC COMMANDS:**

* **ansible dev -a “touch praveen”** : Creating a file in dev host group
    
* **ansible dev -a “ls”** : to see all the files and folders in dev host group
    
* **ansible dev\_server\_privateIP -a “df -h”** : to see the cpu utilization for dev group
    
* **ansible dev\_server\_privateIP -a “free -m”:** to see the memory for dev host group
    
* **ansible test -m yum -a “pkg=git state=present”:** to install git in test host group
    
* **ansible test -a “git -v”:** to see the git version in test host group.
    

## CONCLUSION:

Mastering advanced Ansible concepts such as modular playbook design, conditional task execution, secure secrets management with Ansible Vault, and efficient use of ad-hoc commands empowers IT professionals to automate complex infrastructure tasks with greater control, security, and scalability. By leveraging these capabilities, you can streamline operations, enhance consistency across environments, and respond swiftly to dynamic infrastructure needs—all while maintaining a high level of security and maintainability in your automation workflows.
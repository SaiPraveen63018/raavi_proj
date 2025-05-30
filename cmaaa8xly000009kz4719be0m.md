---
title: "Writing Your First Ansible Playbook: A Beginner-Friendly Guide"
datePublished: Sun May 04 2025 23:28:28 GMT+0000 (Coordinated Universal Time)
cuid: cmaaa8xly000009kz4719be0m
slug: writing-your-first-ansible-playbook-a-beginner-friendly-guide
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745825347228/93ddcab2-ff3d-466e-8076-df6f58a4abc7.webp

---

Ansible is one of the most powerful automation tools in the DevOps ecosystem. Its simplicity, agentless architecture, and YAML-based playbooks make it a favorite for configuration management, application deployment, and infrastructure automation.

In this blog, we’ll dive deep into **Ansible playbooks**—covering core concepts, best practices, and real-world examples to help you automate like a pro.

---

## **What is an Ansible Playbook?**

An Ansible playbook is a **YAML file** that defines a series of tasks to be executed on remote hosts. Playbooks allow you to:

* **Configure systems** (install packages, manage services, update configs)
    
* **Deploy applications** (containers, VMs, cloud resources)
    
* **Orchestrate multi-tier workflows** (conditional execution, error handling)
    

Unlike ad-hoc commands, playbooks are **reusable, version-controlled, and idempotent**—meaning they can be safely run multiple times without unintended side effects.

Ansible playbooks are a way to send commands to remote computers in a scripted way. Instead of using Ansible commands individually to remotely configure computers from the command line, you can configure entire complex environments by passing a script to one or more systems.

## PLAYBOOKS:

* Playbooks in ansible are written in YAML language.
    
* It is human readable & serialization language commonly used for configuration files.
    
* You can write codes consists of vars, tasks, handlers, files, templates and roles.
    
* Each playbook is composed of one or more modules in a list.
    
* Playbooks are mainly divided into sections like
    
* **TARGET SECTION:** Defines host against which playbooks task has to be executed.
    
* **VARIABLE SECTION**: Defines variables.
    
* **TASK SECTION**: action you are perfomed.
    
    ### **YAML File Playbooks**
    
    1. ### **Playbook for install git in dev group :**
        

```yaml
---
- hosts: dev
  connection: ssh
  tasks:
    - name: installing git in dev server
      yum: name=git state=present
...
```

**Executing ansible playbook** `command:` **<mark>ansible-playbook playbook name</mark>**

2. ### **Playbook for install git in all groups :**
    

```yaml
---
- hosts: all  
  connection: ssh
  tasks:
    - name: installing git in dev server
      yum: name=git state=present
...
```

3. ### **Playbook for install git in dev group using variables:**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  vars:
    abc: git
    xyz: present
  tasks:
    - name: installing git in dev server
      yum: name={{abc}} state={{xyz}}
...
```

4. ### **Playbook for install git in dev group using variables but variables are not created inside the var section but declared in tasks section:**
    

```yaml
---
- hosts: dev     # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: installing git in dev server
      yum: name={{abc}} state={{xyz}}
...
```

If variables are not created inside the vars section but we have declared inside the tasks section.It will shown an error while running the playbook.

**Command**: **<mark>ansible-playbook playbook name --extras-vars=”abc=git xyz=present”</mark>**

5. ### **Playbook for creating a file inside the dev group :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a file in dev server
      file:
        path: "/root/jenkins.txt"   #path of the file and file name 
        state: touch
...
```

6. ### **Playbook for creating a folder inside the dev group :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a folder in dev server
      file:
        path: "/root/praveen"   #path of the folder and folder name 
        state: directory
...
```

7. ### **Playbook for creating a folder inside the dev group :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a folder in dev server
      file:
        path: "/root/{{item}}"   #path of the folder and folder name 
        state: directory
      with_items:
        - praveen
        - akbar
        - purna
...
```

8. ### **Playbook for creating a file inside the folder in dev group :**
    

```yaml
------
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a file inside the folder in dev server
      file:
        path: "/root/praveen/sai.txt"   #path of the folder and folder name 
        state: touch  
...
```

8. ### **Playbook for copy content to a file in dev group :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: copy content to a file
      copy:
        dest: "/root/jenkins.txt"   #path of the file and file name 
        content: |  # new line
           welcome to ansible class
           we are learning ansible playbooks today
           Thanks for Learning!
...
```

9. ### **Playbook for copy content to a file in dev group :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: copying a file from ansible server to slave server
      copy:
        src: "/root/jenkins.txt"   #path of the file and file name 
        dest: "root/praveen/jenkins.txt"
...
```

10. ### **Playbook for creating a user in dev group :**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a user
      user: name=praveen state=present  # for removing an user state=absent
...
```

11. ### **Playbook for creating a multiple users in dev group :**
    

```yaml
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a user
      user: name={{item}} state=present  # for removing an user state=absent
      with_items:
        - ansible
        - jenkins
        - devops
        - linux
...
```

12. ### **Playbook for creating a user in dev group :**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a group
      group: name=jenkins state=present  # for removing an user state=absent
...
```

13. ### **Playbook for creating a multiple group in dev group :**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a group
      group: name={{item}} state=present  # for removing an group state=absent
      with_items:
        - jenkins
        - ansible
        - docker
...
```

14. ### **Playbook To Install Web Server & Start the WebServer :**
    

```yaml
---
- hosts: all     
  connection: ssh
  tasks:
    - name: installing webserver in all slaves
      yum: name=httpd state=present

    - name: start the webserver
      service: name=httpd state=started

...
```

15. ### **Playbook For using Tags :**
    

```yaml
---
- hosts: dev    # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: creating a folder in dev server
      file:
        path: "/root/praveen"   #path of the folder and folder name 
        state: directory
        tags: amazon

    - name: installing a tool Git
      yum: name=git state=present
      tags: praveen

    - name: creating a folder
      file:
        path: "root/mydocker"
        state: directory

    - name: installing a tool Tree
      yum: name=tree state=present
   
...
```

TO EXECUTE A SINGLE TASK : **<mark>ansible-playbook abc.yml --tags tagname</mark>**

TO EXECUTE A MULTIPLE TASK: **<mark>ansible-playbook abc.yml --tags tagname1,tagname2</mark>**

TO SKIP A TASK: **<mark>ansible-playbook abc.yml --skip-tags “amazon”</mark>**

16. ### **Playbook To get a code from GITHUB (Public-Repo) :**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: Getting code from git
      git:
        repo: "https://github.com/SaiPraveen63018/my-project.git"
        dest: "/home/myrepo/"
...
```

17. ### **Playbook To get a code from GITHUB (Private-Repo) :**
    

```yaml
---
- hosts: dev   # for all servers replace dev with all
  connection: ssh
  tasks:
    - name: Getting code from git
      git:
        repo: "https://2454256sgfdgsfgsdgfjdgsvkdf@github.com/SaiPraveen63018/my-project.git"
        dest: "/home/myrepo/"
...
```

SYNTAX: [**<mark>token@github.com</mark>**](mailto:token@github.com)**<mark>/username/</mark>**[**<mark>repo.gi</mark>**](http://repo.gi)**<mark>t</mark>**

### Conclusion:

Ansible Playbooks are the cornerstone of automation, enabling you to define infrastructure as code in simple, readable YAML. By breaking down tasks into plays, modules, and handlers, playbooks ensure idempotent and repeatable deployments. With features like variables, conditionals, loops, and Jinja2 templating, you can dynamically manage configurations while keeping playbooks clean and maintainable. Whether you're provisioning servers, deploying applications, or orchestrating multi-tier environments, Ansible Playbooks streamline complex workflows with ease. Start with basic tasks, leverage handlers for triggered actions, and gradually adopt roles for scalable automation—soon, you'll be managing your entire infrastructure with efficiency and confidence. Ready to automate? The possibilities are endless!

If my blogs spark your curiosity and support your growth, I’d be [**honored to have you subscribe for more insights. If this article brought you value, your support**](https://hashnode.com/@SaiPraveen63)—only if it’s comfortable for you—would truly mean a lot. Let’s keep the conversation [**going on LinkedIn. Thanks so much for reading**](https://www.linkedin.com/in/donthamsetti-purna-durga-sai-praveen-2670b6260/) 💕💞💕
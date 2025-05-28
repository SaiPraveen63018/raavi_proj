---
title: "Deep Automation with Ansible: Roles, 
Handlers & Setup Module Mastery"
datePublished: Wed May 28 2025 12:25:10 GMT+0000 (Coordinated Universal Time)
cuid: cmb7x4duj001d09jo34ld9l7c
slug: deep-automation-with-ansible-roles-handlers-and-setup-module-mastery
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748355698757/e662ac79-dbf4-4d09-875c-205a33fdef99.png

---

**In this blog**, we explore three foundational components of effective Ansible automation: **Handlers**, **Roles**, and the **Setup Module**. Whether you're managing a few servers or orchestrating complex infrastructure, mastering these features can significantly enhance the modularity, efficiency, and intelligence of your Ansible playbooks. **Handlers** provide a clean, reactive way to trigger actions only when changes occur — ideal for restarting services or reloading configurations. **Roles** offer a structured method to organize tasks, variables, files, and templates into reusable units, promoting clean and scalable playbook architecture. Meanwhile, the **Setup Module** (used automatically at the beginning of most playbook runs) gathers crucial system facts that inform conditional logic and dynamic configurations. By the end of this guide, you'll understand how these tools work together to create powerful, maintainable, and dynamic automation workflows in Ansible.

## ANSIBLE HANDLERS:

Handlers are a special type of task in Ansible that helps manage tasks that need to occur conditionally in Ansible playbooks. They don’t run unless ‘notified’ by other tasks in the sequence, for example, restarting a service after a configuration file has been modified.

Handlers differ from regular tasks in a couple of ways. First, they are not part of the sequential execution and are only executed towards the end of the playbook if notified.

Furthermore, when you trigger multiple handlers, they execute only once during the run. This ensures that these special operations are performed efficiently, without repetition, resulting in more streamlined and predictable playbook execution.

```yaml
---
- hosts: dev
  connection: ssh
  tasks:
    - name: install webserver
      yum: name=httpd state=present
      notify: start webserver
  handlers:
    - name: start webserver
      service: name=httpd state=started
```

In the example above, we used the `notify` attribute to notify the corresponding handler by its name. When the task is executed, it notifies the handler to execute its configuration. If not, the handler is not executed.

## How to trigger multiple handlers

In certain situations, you may need to execute more than one handler. For multiple Ansible handlers, define each handler in the `handlers` section, specifying unique names for each, and use `notify` or `listen` to trigger them from tasks. Multiple handlers can be notified from a single task, and they will run in the order they are defined if triggered by the same play.

```yaml
---
- name: Single handler demo
  hosts: all
  become: yes
  tasks:
    - name: Example task
      apt:
        name: package_name
        state: present
      notify:
        - Handler 1
        - Handler 2
  handlers:
    - name: Handler 1
      shell: <command>
      args:
        creates: /test/test1.txt

    - name: Handler 2
      shell: <command>
      args:
        creates: /test/test2.txt
```

Here the `notify` attribute specifies handler names to be called upon successful execution of the Example task.

## ANSIBLE ROLES:

Ansible roles are a way to organize and structure your Ansible playbooks in a more modular and reusable manner. They provide a means to group related tasks, variables, and files together, making your playbooks more organized and easier to manage. Roles can be thought of as a collection of tasks, templates, and variables that are designed for a specific purpose or function, such as setting up a web server, configuring a database, or managing a specific application

```plaintext
.
└── Praveen
    ├── Anish
    │   └── tasks
    │       └── main.yml
    ├── Bhavani
    │   └── tasks
    │       └── main.yml
    ├── main.yml
    ├── Rajesh
    │   └── tasks
    │       └── main.yml
    └── Sushma
        └── tasks
            └── main.yml
```

Based on your directory structure with the roles `Anish`, `Bhavani`, `Rajesh`, and `Sushma`, and a top-level `main.yml` file to include them, here's how you can structure each `main.yml` file:

### `Praveen/main.yml` — Playbook to include all roles

```yaml
- name: Run all custom roles
  hosts: all
  become: yes
  roles:
    - Anish
    - Bhavani
    - Rajesh
    - Sushma
```

### `Anish/tasks/main.yml`

```yaml
- name: Install Nginx
  yum: name=nginx state=present
```

### `Bhavani/tasks/main.yml`

```yaml
- name: Create a user called bhavani
  user:
    name: bhavani
    state: present
```

### `Rajesh/tasks/main.yml`

```yaml
- name: creating a file inside the folder in dev server
    file:
      path: "/root/praveen/sai.txt"    
      state: touch
```

### `Sushma/tasks/main.yml`

```yaml
- name: Start and enable SSH service
  service:
    name: ssh
    state: started
    enabled: yes
```

**To execute all the roles defined in the Ansible project**, we simply run the top-level `main.yml` playbook located in the `Praveen` directory. This playbook is designed to sequentially apply the tasks from each modular role—`Anish`, `Bhavani`, `Rajesh`, and `Sushma`—across the target hosts. Each role encapsulates a specific set of actions, such as installing packages, managing users, configuring hostnames, or ensuring services are running. By organizing automation into roles and invoking them through a single entry point (`main.yml`), the playbook remains clean, readable, and easy to maintain. To run the playbook, use the command `ansible-playbook main.yml`.

## ANSIBLE SET-UP MODULES

Ansible comes with a vast library of modules that cover a wide range of tasks. Here are some common modules you might encounter:

* **apt/yum**: These modules allow you to manage packages on Linux systems. You can install, update, or remove packages easily.
    
* **copy/template**: These modules let you manage files. You can copy files to remote servers or use templates to generate configuration files dynamically.
    
* **user/group**: These modules help you manage user accounts and groups on target systems.
    
* **service/systemd**: These modules allow you to control services. You can start, stop, restart, or enable/disable services as needed.
    
* **shell/command**: While Ansible promotes idempotent actions, these modules let you execute arbitrary shell commands when necessary.
    

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: install pip
      yum: name=python-pip state=present
    - name: install numpy
      pip: name=NumPy
```

**DEBUG MODULE**: It is used to print the messages while executing the playbooks

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: using debug module
      debug:
        msg: the slave server os is {{ansible_os_family}}
```

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: using debug module
      debug:
        msg: the slave server os is {{ansible_kernel}}
```

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: getting git version
      command: git -v
      register: abc  #register will store the output
    - name: using debug module
      debug:
        msg: the slave server get version is {{abc.stdout}} #register output is used in std.out
```

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: using debug module
      debug:
        msg: the slave server os is {{ansible_kernel}}
```

```yaml
---
- hosts: dev
  connaection: ssh
  tasks:
    - name: installing git
      yum: name=git state=present
    - name: installing tree
      command: amazon-linux-extras install ansible2 -y
```

In Ansible, the `yum` module is specifically designed for managing packages on **RHEL-based systems** like CentOS, Red Hat Enterprise Linux, and Amazon Linux. It provides an **idempotent** way to install, remove, or update software packages by interacting directly with the system's YUM package manager. This means you can safely run the same task multiple times without causing duplicate installations or unnecessary changes. Use the `yum` module when your goal is to manage software packages — for example, installing `nginx`, updating `httpd`, or removing unused tools. It also supports additional options like enabling repositories and installing packages from remote `.rpm` files.

In ansible **command module** in systems automation tools like Ansible is used to execute commands directly on remote hosts. It is especially useful for tasks such as installing software packages or configuring services when no specific Ansible module exists for the job. For example, using the Ansible `command` or `shell` module, you can run commands to install Java 11, set up Ansible version 2, or configure a database like MySQL or PostgreSQL. These modules allow you to automate routine administrative tasks efficiently across multiple servers. However, for better idempotence and error handling, it's generally recommended to use dedicated Ansible modules (e.g., `yum`, `apt`, or `postgresql_db`) instead of the raw `command` module whenever possible.

## CONCLUSION:

mastering Ansible’s core features—**Handlers**, **Roles**, and the **Setup Module**—is essential for building scalable, reliable, and maintainable automation workflows. Handlers ensure that tasks like restarting services occur only when necessary, minimizing system disruptions. Roles bring structure and reusability to your playbooks, making it easier to manage complex deployments across environments. The Setup Module, by gathering critical system facts, empowers dynamic decision-making within tasks. When used together, these components transform your Ansible playbooks into intelligent automation systems that are both efficient and adaptable, laying a strong foundation for modern IT infrastructure management.
---
title: "Mastering Ansible From Scratch : Introduction and Installation Tutorial"
datePublished: Sun Apr 27 2025 17:52:06 GMT+0000 (Coordinated Universal Time)
cuid: cm9zy5eni000309ju8tn96gij
slug: mastering-ansible-from-scratch-introduction-and-installation-tutorial
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745772792274/8da5d590-f207-4999-a9c4-d6317289d7de.png

---

## **Introduction**

As a DevOps engineer, automation is a critical part of your workflow. **Ansible**, an open-source automation tool, simplifies configuration management, application deployment, and task automation. Unlike other tools, Ansible is **agentless**, meaning it doesn’t require any software to be installed on managed nodes, making it lightweight and easy to use.

In this article, we’ll dive into the key features, benefits and installation of Ansible in modern software development. We’ll also explore how it plays a crucial role in DevOps practices.

## **What is Ansible?**

> Ansible is an open source software that automates software provisioning, configuration management, and application deployment.

Ansible is commonly used for tasks like software installation, configuration, and system updates across multiple servers or devices in a network.

Orchestration, Security and compliance.

Uses YAML Scripting language which works on KEY-VALUE PAIR

Ansible GUI is called as Ansible Tower. It was just Drag and Drop.

It helps reduce manual work, improve consistency, and save time in managing complex environments

Ansible is an **automation engine** that helps in:

* **Configuration Management** (e.g., managing server setups)
    
* **Application Deployment** (e.g., deploying apps across servers)
    
* **Orchestration** (e.g., managing multi-tier deployments)
    
* **Continuous Delivery** (e.g., CI/CD pipelines)
    

It uses **YAML** for playbooks (automation scripts), making it human-readable and easy to write.

## **Key Features of Ansible**

1. **Agentless** – Uses SSH (Linux) or WinRM (Windows) to connect to nodes.
    
2. **Idempotent** – Ensures the same playbook can be run multiple times without side effects.
    
3. **Extensible** – Supports custom modules and plugins.
    
4. **Large Community** – Thousands of pre-built roles in **Ansible Galaxy**.
    
5. **Agentless** -There is no software or agent to be installed on the client that communicates back to the server.
    
6. **Simple and extensible**: Ansible is written in Python and uses YAML for playbook language, both of which are considered relatively easy to learn.
    

## **Why Ansible?**

While managing the multiple servers it’s hard to keep their configuration identical. If you have multiple servers which needs to configure the same setup in all. while doing the one to one server their might be a chances to miss some configuration steps in some servers. That’s why automation tools come into play! The automation tools like Ansible, Chef, Puppet and SaltStack all are based on a same principle.

**ANSIBLE VS CHEF VS PUPPET**

| **Feature** | **Puppet** | **Chef** | **Ansible** |
| --- | --- | --- | --- |
| **Agent** | ✅ Yes (Puppet Agent) | ✅ Yes (Chef Client) | ❌ No (Agentless, uses SSH/WinRM) |
| **Language** | Puppet DSL (Declarative) | Ruby-based DSL (Imperative) | YAML (Declarative) |
| **Architecture** | Pull-based (Client-Server) | Pull-based (Client-Server) | Push-based (No central server) |
| **Ease of Use** | Moderate (DSL learning curve) | Hard (Requires Ruby knowledge) | Easy (YAML, minimal setup) |
| **Scalability** | Excellent (Large enterprises) | Good (Dynamic environments) | Good (Best for mid-scale/cloud) |
| **Speed** | Slower (Poll-based) | Slower (Poll-based) | Faster (Push-based) |
| **Use Cases** | Compliance, static infra | Custom scripting, cloud | Ad-hoc tasks, orchestration |
| **Community** | Strong (Puppet Enterprise) | Moderate (Chef Automate) | Very strong (Red Hat-backed) |
| **Best For** | Enterprises, strict compliance | Developers, complex workflows | DevOps, cloud automation |

## **Master-Slave Concept**

**STEP-1:** LAUNCH 5 INSTANCE (1-MASTER, 4-SLAVE)

**STEP-2:** INSTALL ANSIBLE, PYTHON AND PIP ON MASTER SERVER

**<mark>amazon-linux-extras install ansible2 -y</mark>**

**<mark>yum install python-pip -y</mark>**

**STEP-3**: ENABLE ANSIBLE INVENTORY AND SUDO USER FROM MASTER SERVER

(**<mark>vi /etc/ansible/ansible.cfg</mark>**)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745775606718/7f0505be-521b-4ee2-9568-415e5032e91c.png align="center")

save & quit from the file

**STEP-4**: ADD INVENTORIES (**<mark>vi /etc/ansible/hosts</mark>**)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745775702682/50c03253-ca7b-46f0-b724-f0007649d0d1.png align="center")

HERE dev & test is the group names

save & quit from the file

**STEP-5**: GENERATE A KEY IN ANSIBLE USER ON MASTER SERVER (**<mark>ssh-keygen</mark>**)

It will generate 2 keys (public & private)

## **DO ALL THESE STEPS ON ALL SLAVE SERVERS**

**STEP-6**: SET A PASSWORD TO USER IN ROOT SERVER (passwd root)

**STEP-7**: NOW WE HAVE TO SAY YES TO PASSWORD AUTHENTICATION

**<mark>vi /etc/ssh/sshd_config ----&gt; 63 line (63gg)</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745775200046/b22c1cd4-84a8-4567-b0d6-8bda9594324d.png align="center")

change the password authentication from no to yes

line number 38 : remove **#**

**STEP-7**: RESTART SSHD (**<mark>systemctl restart sshd</mark>**)

## **OPEN MASTER SERVER AGAIN AND COPY THE PUBLIC KEY**:

**STEP-8:** COPY THE PUBLIC KEY TO ALL SLAVE SERVERS (**<mark>ssh-copy-id root@slave_ip</mark>**)

**STEP-9**: TO CHECK WITH SLAVE SERVER CONNECTION

to check the connection : **<mark>ansible all --list-host</mark>**

## C**onclusion**

Ansible revolutionizes DevOps automation with its agentless, YAML-driven approach, offering simplicity and efficiency where tools like Puppet and Chef add complexity. Its push-based model ensures rapid deployments, while idempotency guarantees reliable configurations across servers. Perfect for cloud environments and CI/CD pipelines, Ansible reduces manual effort while maintaining consistency at scale. For modern infrastructure automation, Ansible stands as the most accessible and powerful choice.

If my blogs spark your curiosity and support your growth, I’d be [**honored to have you subscribe for more insights. If this article brought you value, your support**](https://hashnode.com/@SaiPraveen63)—only if it’s comfortable for you—would truly mean a lot. Let’s keep the conversation [**going on LinkedIn. Thanks so much for reading**](https://www.linkedin.com/in/donthamsetti-purna-durga-sai-praveen-2670b6260/) 💕💞💕




gfdsksdosdgdsjgigkskfpsdi;fmcowyymmewyo
dshfkjhghfdghfhdghfdhgfdhgkdf

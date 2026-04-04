layout: amazon
title: Amazon_EMR_SSH_Setting
date: 2017-01-10 22:54:35
tags: work
---

# Amazon EMR SSH Setting

## Tips:

1. When creating cluster, the following rules have to add full access to EMR: ElasticMapReduce:*

 * the EC2 instance profile
 * EMR role:EMR_DefaultRole
 * Auto Scaling role:

2. Remember to generate a prirate key for ssh connection.

3. For SSH connection:

 * In security group, Each group, Inbound/Edit, add ssh

 * SSH connection to the master node is simple, following the steps shown on the pages.

  * SSH for the webinterfaces:

  * For windows:

    * Links Option 2 [Links Option 2](http://docs.aws.amazon.com//emr/latest/ManagementGuide/emr-ssh-tunnel.html)

    * use puttygen convert the private key, save as private key

    * Need a Chrome Extention, search **FoxyProxy** and install standard version
    * follow the link [Option2Part2](http://docs.aws.amazon.com//emr/latest/ManagementGuide/emr-connect-master-node-proxy.html)

  * For Linux still has some problems

Test and it works good.

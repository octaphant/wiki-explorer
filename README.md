# Google Code-in Wikipedia Explorer
* [Task](#task)
* [Installing](#ins)
* [Making contribution](#contr)

## <a id="task"></a>Task Description:
Design a page to search on Wikipedia articles using title. Make use of wikipedia API endpoint https://en.wikipedia.org/w/api.php followed by actions and callback.

## <a id="ins"></a>Installation
* [Installing Docker](#ins_docker)
* [Installing Docker-compose](#ins_docker-compose)
* [Load the configuration file](#ins_load_conf)
* [Configure the site](#ins_conf_site)

### <a id="ins_docker"></a>Installing Docker
On the official Docker website, you can download the software for any operating system. However, if you want to work on Windows, be prepared for the fact that the Docker starts services in this virtual environment (for example, via VirtualBox), which affects performance.
```bash
sudo  apt-get update
sudo  apt-get install apt-transport-https ca-certificates
sudo  apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys  58118  E89F3A912897C070ADBF76221572C52609D
```
```bash
sudo  apt-get update
sudo  apt-get install docker-engine
sudo  service docker start
```
### <a id="ins_docker-compose"></a>Installing Docker-compose
```bash
curl -L "https://github.com/docker/compose/releases/download/1.8.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose  
docker-compose --version
```
### <a id="ins_load_conf"></a>Load the configuration file
After we installed Docker, you need to download the configs prepared by our team in advance. To do this, use Git and clone the repository. You need to execute these commands from the directory where you want to store all the files of our site.
```bash
git clone git@github.com:codex-team/docker.git codex-docker
cd codex-docker
```
Next, execute the commands that load all the necessary packages and collect the container.
```bash
docker-compose build
docker-compose up
```
Now you have a container ready to work with any sites that use Nginx, PHP, etc. Do not close the current console (it will run docker-compose).
In the www directory, you can now start creating a site or clone the repository and work on it.
### <a id="ins_conf_site"></a>Configure the site
Let's move on to the direct configuration site. Open a new terminal window. The first step is to download the source code to the www folder.
```bash
 git clone https://github.com/jboss-outreach/wiki-explorer.git www
```
In your docker folder there is a www directory where all the necessary files are located. This folder will be "shared", that is, it will be used simultaneously and virtual containers and your local operating system.
Run the docker ps command to find out the name of the container.
To make the site available at http://wiki-explorer.dev:8081/ from your local machine, add it to the hosts file.
```bash
echo "127.0.0.1 codex.dev" >> /etc/hosts
```
Now you can go to the site at http://localhost:8081/ or http://wiki-explorer.dev:8081/.

## <a id="contr"></a>Making contribution
* [Fork](#contr_fork)
* [Configuring Git](#contr_git_conf)
* [Configuring Git](#contr_code)
* [Coding](#contr_pull)
* [Sending Pull Request](#contr_pull_rec)
* [Recycle Pull Request](#contr_get_out)


The first thing to do is create an account on GitHub (if you do not have one yet). Then you should read the rules of participation in the development for the project you selected. These rules are usually found in a file CONTRIBUTING.md in the root of the repository. This repository doesn't have it.

Usually, there are several ways to participate in the development of a project, the main ones are sending a message about some error or desired improvement (Submitting Issue) or directly creating a Pull Request with your correction or improvement (Code Contributing). You can also participate in the improvement of documentation, answers to questions that have arisen from other developers, and much more.

### <a id="contr_fork"></a>Fork
We go to the project page and click the button "Fork". This command will create your own copy of the project's repository.

![fork](https://habrastorage.org/files/22d/147/828/22d147828b834ba3b3995df947d6cc3d.png)

Next, you need to bend your copy of the repository.
```bash
cd ~/work/git #folder in which there will be a code
git clone https://github.com/jboss-outreach/wiki-explorer.git #clone repository
```
### <a id="contr_git_conf"></a>Configuring Git
Next, you need to make a small adjustment of your Git, so that when you send commits, your correct name will be displayed.
For this it is enough to execute these commands:
```bash
git config --global user.name "Your name"
git config --global user.email you@example.com
```

### <a id="contr_code"></a>Coding

Starting to work on your fix, you must first create the corresponding Git branch, based on the current code from the base repository.

Choose a clear and concise name for the branch, which would reflect the essence of the changes.
It is considered a good practice to include the number of the GitHub issue in the branch name.
```bash
git fetch upstream
git checkout -b <your-name-branch> upstream/master #exemple
```

Now you can easily start working on the code.
While working, remember the following rules:
* Follow the coding standards (usually PSR standards);
* Write unit tests to prove that the bug is fixed, or that the new function actually works;
* Try not to violate backward compatibility without extreme necessity;
* Use simple and logical whole commits;
* Write clear, clear, complete messages when you commit changes.

### <a id="contr_pull"></a>Sending Pull Request

While you were working on the code, other changes could be made to the main branch of the project. Therefore, before submitting your changes, you need to rebase your branch.
This is done like this:
```bash
git checkout <your-name-branch>
git fetch upstream
git rebase upstream/master
```

Now you can send your changes.
```bash
git push origin <your-name-branch>
```

After that, we go to your project clone repository, in which you participate and click the button "New Pull Request".
And we see the following form:

![New Pull Request](https://habrastorage.org/files/191/d14/269/191d14269eae48e29d2179e32cf4fb2c.png)
On the left, you must select the branch in which you want to kill the changes (this is usually the master, well, in general, this is the branch you rebase to).
On the right is a branch with your changes.
Next, you will see a message from GitHub about whether it is possible to automatically change the changes or not.
In most cases, you will see Able to merge.
If there are conflicts, you will most likely need to review your changes.
Then click the button - Create Pull Request.
When filling out the name and description of your Pull Request it is considered good practice to specify the Issue number for which your Pull Request is created.
After creating the Pull Request, it will run the tests, perhaps some tools for metrics and so on. The results of his work you will see in your Pull Request as shown below:

![results](https://habrastorage.org/files/46c/e42/a41/46ce42a41ef24141a5c74d76cdb71f13.png)

In case the tests are not passed or the build is not compiled, you will see a red error message and by clicking the Details link you will see what is wrong. In most cases, you will need to fix your Pull Request so that all checks are successful.

### <a id="contr_pull_rec"></a>Recycle Pull Request

If everything is good with your Pull Request, then soon it will be killed by someone from the team.
But often it happens that the developers will ask you to make some changes.
To do this, simply return to step 6 and after making the changes and commit we perform the following commands:
```bash
git checkout <your-name-branch>
git fetch upstream
git rebase upstream/master
git push origin <your-name-branch>
```
### <a id="contr_get_out"></a>Get out after yourself

After your Pull Request has been accepted or rejected, you need to delete the branch with your changes.
This is done simply
```bash
git checkout master
git branch -D <your-name-branch>
git push origin --delete <your-name-branch>
```
Instead of the last command, you can also run
```bash
git push origin :<your-name-branch>
```


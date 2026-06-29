## GIT Tutorial 
Link 1: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/1-setting-up/#__tabbed_1_2
Link 2: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/2-branching-out/
Link 3: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/3-rewriting-history/
Link 4: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/4-remote-git-github/


### Shortcut:
Terminal CMD+J

### Staging Area
A place of change.
git add glossary.md

### Commit
git commit -m "<YOUR MESSAGE HERE>"

### Merge
git merge feature/add-glossary-entries

### Reset
Undo latest change without trace
git reset --soft HEAD~1 or git reset --soft <intended_commit_id>

### Revert
Undo last change with commit history
git revert <COMMIT_ID>

### Cherry-Pick
Allows you to pick selected commits from other branches
git cherry-pick <COMMIT_HASH>

### Git rebase (advanced)

### Git Status
tells me my current branch and what to do.

## Git Remote
Online repository for projects

### Git
Weird Stuff

### Git Fetch
Asking the server whether there are any changes in the history

### Git Pull
Download changes on the remote repository and merge with local files

### Git Push
Push to upload your changes

### Git Fork
copy repot to create new copy if repository on your own account


## Python Environment
Link 1: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/2-virtualenv/4-python-environments/
Link 2: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/2-virtualenv/5-reproducible-dependencies/

Maybe checkout https://pypi.org/project/pip-tools/

Important: Add a .gitignore feature from now on: Create a .gitignore file, add .venv/ to the file and save it.

### Create Env
python -m venv .venv
source .venv/bin/activate

### Deactivate Env
deactivate

### Create & update Requirements
pip freeze > requirements.txt

### Install from Requirements
pip install -r requirements.txt

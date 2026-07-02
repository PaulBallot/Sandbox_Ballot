# Day I: Git & Dependencies

Main learnings:
Run python code in scripts and pip install  and create virtual environments and stuff like that in the Terminal


## GIT Tutorial 
Link 1: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/1-setting-up/#__tabbed_1_2
Link 2: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/2-branching-out/
Link 3: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/3-rewriting-history/
Link 4: https://centrefordigitalhumanities.github.io/research-software-summer-school/day-1/1-git/4-remote-git-github/

# ALWAYS initalize
git init

#Clone
git clone <link>

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

### Python in Terminal
Enter: python
Exit: exit()

# Day II: Reproduceable Research
If in doubt about anything on research software: https://zenodo.org/records/15213042
Turwing Way Handbood for reproducable research

### Readme Files
Answers 3 Questions: Why should I use the software, how do I use it and how can I install it?

#### Structure: 
- Descriptive Title
- Motivation, Setup
- Copy-paastable quick start code example
- links or instructions on how to contribute
- License
- recommended citation (see also CITATION.cff)


#### DocStrings
Documentation withing function that automatically creates documentation and help text; preferred over simple comments (Roxygen for R!)

"""
Description Text
Paramterers
___________
variable : Datatype
    Description of Variable

Returns
___________
Datatype
    Description of Output
"""

#### Online Documentation
- Create documentation automatically (e.g. via Sphinx or Rxygen)

### Coding Conventions
- Formatting: Formatter as a tool to clean up data; pip install ruff; "ruff format" to format every available python file; mention file after the command to only apply to one file 
- Linters: Check for errirs, complexity, unused code or performance bottlenecks; they can fix most issues; ruff check (and if you want it to act with --fix)
- Naming Conventions: Follow style of your language; Variables and Classes are nouns, functions are very; Be overly specific rather than too general! 
- Git pre-commit hooks: https://carpentries-incubator.github.io/reproducible-research-through-reusable-code-in-1-day/good-code.html#optional-git-pre-commit-hooks (Allow to check your code automatically before every commit and adapt is based on a self-set styleguide)
- functions are written with lower case and _ between words

#### Modular Coding
As many small functions as possible

#### License
You need to give your project a license so others can work on it! 

# Day III: 

#### gitignore
Files with a periode (.vscode) are not supposed to be public on github, they are only for our version, so add them to gitignore!

# Day IV: Scrappers & API

### API
HTTP requestos: GET, POST, PUT; DELETE
GET: Just ask Questions
Post: Provide additional information with request

Status Codes:
- 2xx: Success
- 4xx: Client Error 
- 5xx: Server Error (valid request but the system fails)

Request: Headers
Settings for GTTP requests and responses

Command on MacOs: cutl <url>
":variable" in documentation code indicates that you need to input a specific variable

In Python:
requests package

import request
response = requests.get("https://fruityvice.com/api/fruit/banana")
response.content
response.text (return string of content)
response.status_code
data = response.json()
data["nutritions"]["sugar"]
requests.get(url, params=parameters) (creates parameters)


### Pracitcal Approach to Web Scraping


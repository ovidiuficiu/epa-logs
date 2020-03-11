# Description
Parse and analyse EPA logs from 1995.

# Get Started
To get started run **php ImportDataCommand.php** from inside **Backend** folder. Afterwards open **epa.html** from the **Template** folder and you should be good to go.

# This is a common technical interview exercise
The task is usually to parse the EPA logs file from 1995. There are quite a few irregular requests in there which make the processing of data tricky. 

# Code description
There's a CLI command written as a PHP script which is used to parse any given files, streams or URL's. A new file is outputted with the data parsed and formatted nicely which is then picked up by the frontend and displayed in using C3 charts. 

# How to use
Run **Backend/ImportDataCommand.php** with the file location as an argument. If no argument is provided the default setting is the current EPA logs file location, **epa-http.txt** from the root directory. The result is a **result.json** file which is then loaded in a JS file. To visualise the data analysis using various charts open **Template/epa.html**.

# Requirements
* PHP CLI 7.x
* Any browser

# Issues or questions
For any problems or questions open an issue ticket on this repo and I'll respond as soon as possible.

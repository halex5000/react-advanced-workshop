# Guide for workshop
How this workshop works. You should start with Step 1 by checking out the `workshop-step-1` branch. Once you complete each step, you should run a `git stash` to save your changes locally and then proceed by checking out the next branch (ex: when you complete step 1, stash and then check out step 2).

## Step 0: Get set up with LaunchDarkly
Before we dive into the code, we need to get our LaunchDarkly account configured. To complete this step you need to perform the following:
* Sign up/Log into your LaunchDarkly account
* Retrieve the Client-side SDK key for your project
* Save that key as a variable in your `.env` file.

Once you've completed these steps, we can move to the next. 

## Step 1: Initialize the React SDK 
Now that you've got LaunchDarkly set up, we need to initialize it in order to start using our flags. Go to the `main.jsx` file and add in the necessary code. We've given you some `TODO` fields with some hints. 

One key note, because we are using Vite to build this application, you have to name the variable for your Client Key `VITE_LD_CLIENT_KEY`. If you do not name it this, you will run into issues with future steps.

 **Important note** Please use the [asynWithLDProvider](https://docs.launchdarkly.com/sdk/client-side/react/react-web#initializing-using-asyncwithldprovider) method to initialize the SDK.

## Step 2: Enable the login feature 
To get started with flags, we're going to add a simple `boolean` example. In the `components` folder, we have a file called `top-toolbar.jsx` this is for the top nav bar of our demo application. Inside this file, we have disabled the tool bar so it doesn't show on our application in its current state. Your task is to complete the following:
* Enable this feature by creating a flag called `toolBar` in LaunchDarkly. 
* Update the `top-toolbar.jsx` file to retrieve flag values from LaunchDarkly.

**Important note** Make sure that you select the `SDKs using Client-side ID` option when you are creating this flag and all the others in steps 2-4. 

## Step 3a: Add targeting rules <-- YOU ARE HERE
Now that we have added our tool bar feature, we can have some fun with targeting flags. One of the major benefits of LaunchDarkly is that you can control which groups or users have access to certain features or can see variations of your application. To demonstrate this we're going to have you complete the following tasks:
* Create a [Segment](https://docs.launchdarkly.com/home/users/segments) in LaunchDarkly called `dev-team`. 
* Add 3 users to that segment (ex: you can add users `Jess`,`Peter`, and `Alex`)
* Create a `boolean` flag called `newGallery`
* Create a targeting rule that users of the `dev-team` group can see the variations of this flag, make sure to the `Default rule` to false, otherwise it will show to everyone. 
* Modify our application to send the `username` value to LaunchDarkly. To do this, we will need to modify the `App.jsx` file using the `useEffect` function. A couple of key points on this: First, you will need to make sure that the `useEffect` function only triggers if a User Name is detected. Second, you will need to make sure that you specify that the `useEffect` function is subscribed to changes in the `userName` array.  
* Finally, add your new flag to the new gallery code in `image-masonry.jsx` and enable the new view.

## Step 3b: Use multivariate flag
Up to this point we've only done `boolean` flags, but LaunchDarkly offers many types. Now that we have our new gallery in place, let's play around with the columns. Complete the following tasks:
* Create a new multi-variant flag using the `numbers` flag type called `columns` with values of 2, 3, 4, and 5.  
* Set up targeting rules for each of the users you added to the `dev-team` so they all see a different number of columns.

**Important Note:** Are you not seeing your variations? Are your flags turned on?    

## Step 4: Expand your application 
We've just scratched the surface about what feature flags can do for your application. To get a greater understanding, we need to add more functionality to this application. We're going to add another `boolean` flag here to test out some new code. In the component file, you'll see a few new files `todo-list.jsx`, `to-do-input.jsx` and `to-do-page.jsx`. This is going to enable a new To Do list in our application and add it to the navigation menu to appear when the flag is enabled. In order to complete this task, you'll need to create a new flag called `todoList` in your LaunchDarkly account and add import it into the `top-toolbar.jsx` file. For an extra step, add a targeting rule so only your `dev-team` segment can see it! 

## Step 5: Getting familiar with server side flags 
You likely noticed that when you enabled the new To Do list, that there wasn't a To Do list when you clicked on the link... This To-Do list relies on an API call to a postgres database for inputting our locations. To finish this final step, you will need to add a `boolean`flag called `apiFlag` to your LaunchDarkly dashboard and enable it. Depending on how comfortable you feel, you can follow a few different paths: 

### Create the flag only
In this branch we've added an API folder. This folder contains a Docker compose file that will spin up the node server and create a postgres database where we'll store our to-do tasks. This file is already coded to detect the value of a flag named `apiFlag` and will enable/disable the API based on the value of that flag. In order to use this method, you will need to add your LaunchDarkly SDK key to the `docker-compose.yml` file. This is the easiest of the three options to complete this you will need to do the following:
* Install Docker Desktop if you have not already 
* Change to the `/api` directory 
* Open the `docker-compose.yml` file and add your LaunchDarkly Server SDK key
* run `docker compose up` in your terminal

### Use our template 
If you would prefer to try editing the server file to work with LaunchDarkly, we've include a base template in teh `/api` folder. You do not have to use Docker, instead you can run the following bash script to create the postgres database locally. If you haven't installed postgres, you'll need to do that first before you can use this script: https://www.postgresql.org/download/
```
set -e

createdb demo

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d demo <<-EOSQL
	\c demo;
		CREATE TABLE todos (
  		todo_id SERIAL PRIMARY KEY, 
  		description VARCHAR(255)
	);
EOSQL
```
Couple of notes, you will need to specify the admin user as an environment variable using `export POSTGRES_USER='your_admin_username'` and you will need to manually launch the node server. Again, you can find the base code for the node server in the `index.js`file in the `/api` directory.

### Build from scratch 
You also have the option to build your own database and/or API from the ground up. If you choose this option, just make sure you set the server to be running on Port 5000 and the routes resolve at `/api`.

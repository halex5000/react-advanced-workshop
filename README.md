# Workshop Guide



## How this workshop works. 

- Start with Step 1 by checking out the `workshop-step-1` branch. 

- As you complete each step in the guide you should run
  ````bash
  git add .
  git commit -m '<your message here>'
  # this way you'll have your progress saved locally as you progress and you can come back to each branch later
  ````

- When you're ready to move to Step 2, make sure your changes are all added and committed (see above :eyes:)

- Then run:
  ```bash
  git checkout workshop-step-2
  # this checkouts the next workshop branch which is all setup for you start the next step! 
  ```

  :information_desk_person: <small>we've setup the workshop so that you checkout a new branch for each new step to be sure that even if you fall a little behind or get a little mixed up, you can get a fresh start on the next step!</small>



## Step 0: Get set up with LaunchDarkly 👈 YOU ARE HERE 📍

Before we dive into the code, we need to get our LaunchDarkly account configured. To complete this step you need to perform the following:
* [Sign up](https://launchdarkly.com/pricing/)/[Log into](https://app.launchdarkly.com/) your LaunchDarkly account
* Retrieve the Client-side SDK key for your project
  :information_source: pro-tip: go to [the LaunchDarkly portal](https://app.launchdarkly.com/) and click `CMD + K` to get your key the easy way
* Make a copy of  `.env.example` and rename it `.env`, then replace the example key with your own!

:rocket: You're ready to start dark launching!



## Step 1: Initialize the React SDK

Now that you've got LaunchDarkly set up, we need to initialize it in order to start using our flags. 
Go to the `main.jsx` file and add in the necessary code. We've given you some `TODO` fields with some hints. 

Because we are using Vite to build this application, you have to name the variable for your Client Key `VITE_LD_CLIENT_KEY`

:warning: If you do not name the environment variable correctly, it won't work because [Vite won't surface the environment variable](https://vitejs.dev/config/#environment-variables).
:information_desk_person: **Important note** Please use the [asynWithLDProvider](https://docs.launchdarkly.com/sdk/client-side/react/react-web#initializing-using-asyncwithldprovider) method to initialize the SDK.



## Step 2: Enable the login feature :shipit:

To get started with flags, we're going to add a simple `boolean` example. 
In the `components` folder, we have a file called `top-toolbar.jsx` this is for the top nav bar of our demo application. 
Inside this file, we have disabled the tool bar so it doesn't show on our application in its current state. 

Your task is to complete the following:

* Enable this feature by creating a flag called `toolBar` in LaunchDarkly and turning it on
* Update the `top-toolbar.jsx` file to retrieve flag values from LaunchDarkly using the `useFlags` hook .
  :information_source: [LaunchDarkly `useFlags` docs](https://docs.launchdarkly.com/sdk/client-side/react/react-web#hooks)

:information_desk_person: **Important note** Make sure that you select the `SDKs using Client-side ID` option when you are creating this flag and all the others in steps 2-4. 



## Step 3a: Add targeting rules 🎯

Now that we have added our tool bar feature, we can have some fun with targeting flags! :tada:
One of the superpowers of LaunchDarkly is that you can control which groups or users have access to certain features. 

To demonstrate this we're going to have you complete the following tasks:

* Create a [Segment](https://docs.launchdarkly.com/home/users/segments) in LaunchDarkly called `dev-team`. 
* Add :three: users to that segment (ex: you can add users `Jess`,`Peter`, and `Alex`)
* Create a `boolean` flag called `newGallery`
* [Create a targeting rule](https://docs.launchdarkly.com/home/flags/targeting-rules) that users of the `dev-team` group can see the `true` variation of this flag
  :information_source: Make sure to the `Default rule` to false, otherwise it will show to everyone :hushed: 
* Modify our application to send the `userName` value to LaunchDarkly. 

  * To do this, we will need to modify the `App.jsx` file using the `useEffect` function. 
  * A couple of key points on this: 

    * Make sure that the `useEffect` function only triggers if  `userName` is defined. 
    * Make sure that you specify that the `useEffect` function is subscribed to changes to `userName` 
      Example:

      ```javascript
      import {useEffect, useState} from 'react'
      // count is declared in state
      const count = useState(0);
      
      // other code
      
      // useEffect listens for state changes to react to
      useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]); // Only re-run the effect if count changes
      ```

      :information_desk_person: [more reading on `useEffect`](https://reactjs.org/docs/hooks-effect.html)(not required)

* Finally, add your new flag to the new gallery code in `image-masonry.jsx` and enable the new view.



## Step 3b: Beyond the Boolean: Use a multivariate flag 🤯

Up to this point we've only done `boolean` flags, but LaunchDarkly offers many types. 
Now that we have our new gallery in place, checkout how you can use flags and targeting to show different users different layouts 

Complete the following tasks:

* Create a new multivariate flag called `columns` using the  `Number` flag type with values of 2, 3, 4, and 5.  
* Set up a targeting rule for each of the users you added to the `dev-team` so they all see a different number of columns.

:information_desk_person: **Important Note:** Are you not seeing your variations? Are your flags turned on?    



## Step 4:  Expand your application 📈

We've just scratched the surface about what feature flags can do for your application. 
To get a greater understanding, we need to add more functionality to this application. 

We're going to add another `boolean` flag here to test out some new code. 

- After you checkout the `workshop-step-4` branch, in the components folder, you'll see a few new files 
  - `todo-list.jsx`
  - `to-do-input.jsx` 
  - `to-do-page.jsx`. 
- This is going to enable a new To Do list page in our application **and** add it to the navigation menu to appear when the flag is enabled. :two: for :one: :exclamation:
- Create a new flag called `todoList` in your LaunchDarkly account
- Use `useFlags` to bring it into the `top-toolbar.jsx` file. 
  😎For an extra step, add a targeting rule so only your `dev-team` segment can see it! 



## Step 5: Getting familiar with server side flags :back::end:

You likely noticed that when you enabled the new To Do list, that there wasn't a To Do list when you clicked on the link... :scream:

This To-Do list relies on an API call to a server and a postgres database for capturing our ToDos. 

To finish this final step: 

- You will need to add a `boolean` flag called `apiFlag` to your LaunchDarkly dashboard and enable it. 

- Depending on how comfortable you feel, you can follow a few different paths: 

  - ### Create the flag only :hot_pepper:

    In this branch we've added an API folder. This folder contains a Docker compose file that will spin up the node server and create a postgres database where we'll store our to-do tasks. This file is already coded to detect the value of a flag named `apiFlag` and will enable/disable the API based on the value of that flag. In order to use this method, you will need to add your LaunchDarkly SDK key to the `docker-compose.yml` file. This is the easiest of the three options to complete this you will need to do the following:

    * Install Docker Desktop if you have not already 
    * Change to the `/api` directory 
    * Open the `docker-compose.yml` file and add your LaunchDarkly Server SDK key
    * run `docker compose up` in your terminal

  - ### Use our template :hot_pepper::hot_pepper:

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

  - ### Build from scratch :hot_pepper::hot_pepper::hot_pepper:

    You also have the option to build your own database and/or API from the ground up. If you choose this option, just make sure you set the server to be running on Port 5000 and the routes resolve at `/api`.

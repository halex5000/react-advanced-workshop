# How to run the app

```shell
npm install

npm run dev
```

App should be running on local host at port 5173

Links to check out:

https://mui.com/material-ui/getting-started/overview/

Jump over to the components list and start playing!


# Guide for workshop

## Step 1: Get set up with LaunchDarkly 
Before we dive into the code, we need to get our LaunchDarkly account configured. To complete this step you need to perform the following:
* Sign up/Log into your LaunchDarkly account
* Retrieve the Client-side SDK key for your project
* Save that key as a variable in your `.env` file.

Once you've completed these steps, we can move to the next. 

## Step 2: Initialize the React SDK 
Now that you've got LaunchDarkly set up, we need to initialize it in order to start using our flags. Go to the `main.jsx` file and add in the necessary code. We've given you some `TODO` fields with some hints. 

## Step 3: Enable the login feature
To get started with flags, we're going to add a simple `boolean` example. In the `components` folder, we have a file called `top-toolbar.jsx` this is for the top nav bar of our demo application. Inside this file, we have disabled the tool bar so it doesn't show on our application in its current state. You're task is to enable this feature by creating a flag called `tool_bar` in LaunchDarkly and enabling it. For this step you will need to update the file to retrieve flag values from LaunchDarkly first.  

## Step 4: Add targeting rules
Now that we have set up the login feature, we can have some fun with targeting flags. One of the major benefits of LaunchDarkly is that you can control which groups or users have access to certain features or can see variations of your application. To demonstrate this we're going to have you complete two tasks:
* Create a flag called `new_gallery` and create a targeting rule that users of the `dev` group can see the variations of this flag
* Add your new flag to the new gallery code in `image-masonry.jsx` and enable the new view.

## Step 5: Expand your application
We've just scratched the surface about what feature flags can do for your application. To get a greater understanding, we need to add more functionality to this application. We're going to add another `boolean` flag here to test out some new code. In the component file, you'll see a `todo-list.jsx` file. This is going to enable a new To Do list in our application, add it to the navigation menu to appear when the flag is enabled. For an extra step, add a targeting rule so only your `dev` users can see it! 

## Step 6: Getting familiar with server side flags
You likely noticed that when you enabled the new To Do list, that there wasn't a To Do list when you clicked on the link... This To-Do list relies on an API call to a postgres database for inputting our locations. To finish this final step, you'll need to do the following:
* TBD
# Ledger_RN

In this post I'm just sharing the process of me creating an app using React Native framework. I have very little prior knowledge in programming, only in C, C++ and some bit of python. I will sound really dumb in this post so please bear with me. My app has a very simple function: Ledger. Basically recording down transactions. The reason I am doing this is because I suck at doing records so. 



This isn't supposed to be public, I'm writing all this down as a journal for some self exploration purposes so if you have no interest please do kindly leave. But I'll share this any how just to seek some friendly advice I supposed.



I'm gonna design the app, as a draft, using Figma. 



<img src="https://i.imgur.com/DR1zgNG.png"> 



Only 2 pages. First page consists of two clickable icons. The dollar sign icon is to add payments/ transaction, and the second icon is to access to records page. On the second/ records page, the number (1 to 12) tab is swipe-able to other years, and the names are clickable to edit or pay, and the plus sign is to add new entry. NOTE : Dollar sign can only be used when there is at least one entry.



I have sort of planned what should I learn in order to build this app in the quickest way possible. Although I tried learning the whole Javascript language from scratch, but I don't think that method suits me. I learn more from doing projects. I will only learn stuff that I need to apply in the project, and try to venture to other things throughout the process. Don't have much time till uni starts so. I have listed down what I have to learn (for now):



1. Navigation between two pages. (React Navigation)

2. Rendering a list shown as above, with the swipe-able "month" tab.  (FlatList)

3. Popup dialog (Modal?)

4. CRUD with FlatList.

5. Storage, local and hopefully cloud (Async and Firebase)

6. COMPILE EVERYTHING



This post will be updated every time when there's an update (hopefully.)



1. Navigation between two pages

I used this link //https://reactnavigation.org/docs/en/navigating.html  for navigation. It's pretty simple and straightfoward.

2. FlatList (CRUD) 
I'll be referring to this repo https://github.com/Rajnish23/Contact-App my Flatlist part. This is a very well-built app, the codes are really simple yet functionable. 

5:37pm 16/8/2019
For now I have done the main page and also record page for flatlist user entry. 
This is the mainpage:
<a href="https://ibb.co/SRBFm8s"><img src="https://i.ibb.co/0hrH9SD/Screenshot-1565948124.png" alt="Screenshot-1565948124" border="0"></a>

By pressing the 'records' word, it will navigate to the second page:

<a href="https://ibb.co/bbcbq9C"><img src="https://i.ibb.co/Hh5h18b/Screenshot-1565948133.png" alt="Screenshot-1565948133" border="0"></a>

Then by pressing 'Add', it will navigate to the 'add' page:

<a href="https://ibb.co/W6JS0r2"><img src="https://i.ibb.co/L874rTZ/Screenshot-1565948220.png" alt="Screenshot-1565948220" border="0"></a>

By tapping'save!', the records will be shown in the records page


The data are alreaddy stored locally using asyncstorage, next I want to add 'edit' and 'delete' function. And the edit function will be added on main page, while the delete function might be swiping the record tabs or onpress delete, still thinking. However, I will need to learn how to access each data so that I can program the colored numbers. Pretty slow progress but I think I am slowly getting the hang of it. 

For now my idea is:
For adding new entry, I will record: NAME, CATEGORY, STARTING MONTH & YEAR (number) & ENDING MONTH & YEAR (number). 
For editing entry, I think I'll just record the DURATION (number) so that it'll pay from wherever it's paid until at the previous time.
And that's pretty much it. I have to learn how to link calendar to my database somehow... We'll see.


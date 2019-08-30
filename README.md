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
1/8/2019


1. Navigation between two pages

I used this link //https://reactnavigation.org/docs/en/navigating.html  for navigation. It's pretty simple and straightfoward.

2. AsyncStorage

5/8/2019
I have been able to write, store, read and delete data. Credits to https://github.com/Rajnish23/Contact-App which I have used as reference. This is how it looks like : 

<a href="https://ibb.co/9gbkMBY"><img src="https://i.ibb.co/tKqTdnC/1.png" alt="1" border="0"></a>

<a href="https://ibb.co/QNB0crw"><img src="https://i.ibb.co/Wy9C3gJ/2.png" alt="2" border="0"></a>

16/8/2019
For now I will step into presumably the hardest part of the project -- numbers and colors! I'll have to learn it step by step though. 
There are two lists actually. I list inside another list. The first list is the month, which is number 1 to 12. The second list is the year, which is 2019 to how many year there is. The month tabs are presented in rows along with the user 'credentials' while the year tabs are presented in columns where users can either swipe or tap to view other years. There will not be any transition for the numbers beside changes in color. For now I'll have to learn how to change color of text based on certain inputs, then I'll see what's next.

3. Checklist for numbers

30/8/2019
Now I can make the selected number range to turn green. Frankly it's pretty simple, if you're familiar javascript. Took me some days to figure out how to play with states and pass arguments. What I programmed is that when you tap an entry, which is an array of number, the key which that entry is stored with will be retrieved. That way I can access to the information in that array, i.e the color state of each number. The states (information) will be put into a temporal state of array first, then it'll go through a for loop to be changed if there are changes in color. After that, the states (information) will be merged with the previous states according to the key retrieved.

It's something like this: 

<a href="https://ibb.co/x5VmVww"><img src="https://i.ibb.co/j47V7qq/gh.png" alt="gh" border="0"></a>
 
In the first picture, it shows a new entry, the line of numbers which are all gray in color. The second shows the duration being keyed in, which is 5 to 11, then the third picture shows the color change from number 5 to 11. Don't mind the white color numbers at the bottom of the screen, they are there for me to debug problems and check whether certain arguments are passed.

The next thing I will do is putting this whole list into another list, which is the year list. Now there is only 12 months for each entry. It's usable already, it's serving its most fundamental purpose. However since I still have some time on hand, I might as well just add more things. You can refer to the first image (design of app) for what I plan to do: Adding a year selection. By pressing the arrows beside the "year" allow user to navigate between years. But here's the catch, I don't want no navigation. I don't want more than 2 pages. I want to make this as minimalistic as possible. When the user pressed the arrow, only the color of the numbers will change while everything remains intact. For now I still don't know how to do this, might need some time to figure it out.

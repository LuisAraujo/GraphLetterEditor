# GraphLetterEditor

This is a editor of latter that translate pixels in Graph for Letter Recognition using Graphs Similarity

### Editor

This editor enable draw letters in canvas and generate graphs by this pixels.

![alt text](https://github.com/LuisAraujo/GraphLetterEditor/blob/master/printscreen01.png)

### Storage

The data are stored in localstorage (browser) and input in a text file (dataset.txt). We save prints (as png) of letters and graphs in "dataset/images" folder

![alt text](https://github.com/LuisAraujo/GraphLetterEditor/blob/master/printscreen2.png)

### Data

The data have the follow pattern: "x:x1,x2,x3,x4 ... x10,y1,y2,y3,y4 ... y1-0,z0-0,z0-1,z0-2 .. z10-10;y:Label"

- xn is the position x of egde n
- yn is the position y of egde n
- znn is data of adjacent matix
- Label is a lable of letter (A,a,E,e,I,i,O,o,U,u).

![alt text](https://github.com/LuisAraujo/GraphLetterEditor/blob/master/printscreen03.png)

# VueJS Data-Greed

Still on developpement the purpose it to have a DataTable that handle Ajax calls. I hope final version should be available soon.

**Tips and tricks:**

You can do a single order, just click on the header column, and if you want multi ordering press shift key with click.

**Demo :**

[Fully working demo](https://codepen.io/shaan1974/pen/MWeKXye)

**Configuration :**

DataGreed.

Configuration are split into 5 sections : "options", "labels", "css" , "columns" and "buttons".

```
- Options:
    - "customParameters" => Custom parameters than you can send to the ressources page that generate the Json.
    - "recordsPerPage" => Number of records visibles per page.
    - "perPageOptions" => Values put in the selectbox per page.
    - "dataSourceUrl" => Url to get data.
    - "displayEmptyLines" => If return records are below records per page, it display blank row in the table.
    - "horizontalScroll" => Horizontal scroll if needed
    - "verticalScroll" => Vertical scroll if needed ( related to css )
    - "responsive": true => If responsive on small devices
    - "globaSearchMinLength" => Min chars for global search
    - "globalSearch" => If global seach is visible or not
    - "header" => Definition for global header upper columns names
    - "visualFilterForOrderedColumns" => Show different color for ordered columns
    - "jumpPage" => Jump to page selectbox visible or not.
    - "entriesInfo" => Entries infos visible or not.
    - "outSideButtons" => if action buttons should be inside cell or outside
    - "displayUnswitchColumnsAsExtraInfos" => If true columns with "visibility" eq "false" and "switchVisibility" eq "false" could be display into an extra block activated with a button.
    - "highlight" : Hightlight or not found occurences.
    - "pagerNoNumber" : Indicate if pager should contain Number or just "First", "Prev", "Next" and "Last".
- Labels ( i expect you know what it's related )
- Css
    - "Table"
    - "Pager position"
- Columns
    - "name" => reference.
    - "fctTransform" => To be able to do transformation on colums.
    - "class" => Defined class.
    - "visibility" => or not
    - "orderVisibility" => if ordering is visible.
    - "orderMode" => Ordering base value (none,"asc","desc")
    - "search" => Defined or not if no search
        - "type" => "input", "select".
        - "dictionnary" => For select.
        - "css" => Dedicate css.
        - "value" =>
        - "minLength" => min char for searching ( input only )
    - "switchVisibility" => Indicate if column visibility could be switch or not.    
- Buttons
    - Struct "Action", "Label", "Css" , "Mode".
```

For button action take a look into the debug console.

DataGreedFilter

Configuration are split into 2 sections : "labels", "form".

The example contains all type of input available for the search.

- A1 - Single - Text
- A2 - Multiple - Text
- B1 - Single - Selectbox (EQ,NEQ,STARTSWITH,ENDSWITH, CONTAINS)  + Text
- B2 - Multiple - Selectbox (EQ,NEQ,STARTSWITH,ENDSWITH, CONTAINS)  + Text
- C1 - Single - Selectbox (EQ,NEQ,GTE,GTE,LTE,LTE,RANGE)  + Number
- C2 - Multiple - Selectbox (EQ,NEQ,GTE,GTE,LTE,LTE,RANGE)  + Number
- D1 - Single - Selectbox attach to a dictionnary
- D2 - Multiple - Selectbox attach to a dictionnary
- E1 - Single - Selectbox (EQ,NEQ,GTE,GTE,LTE,LTE,RANGE)  + Date
- E2 - Multiple - Selectbox (EQ,NEQ,GTE,GTE,LTE,LTE,RANGE)  + Date

**Dependecies :**

Right now no dependencies except : Boostrap 4 (for the look and fell) ,Axios.

For the demo example we use also "momentjs" and "accouting.js" for the formating of data.

**Warning :**

If you use "displayUnswitchColumnsAsExtraInfos" feature avoid with boostrap 4 to use table-striped for "table" css in config.

For "customParameters" i prove an example but fell free to create you own structure for that variable. I'v create one to be able to present you the functionnality but feel free to create you own data structure and update the ressource Php file to suit to your need.

**To do:**

- Templates for others css Framework like Material, Bulma... 
- Save status ( page, order, ect...)
- position option for ( Jump to page, per page, from/to - Total)
- Documentation ( more detail ).
- Languages support.
- Dedicate column in the footer that do a sum of a numeric column.
- Save multiple filters ( Save in localstorage )

**Versions :**

2.3 - ( Ultra Instinct )

- Refactoring
- Update example
IW - Custom datepicker

2.2 - ( AOA - Oh Boy )

- Component Filter - backDrop for Filter ( set as option )
- Update Favico

2.1  ( Womanizer  - Britney Spears )

- Add reset for some element of the filter component.
- Add a google font.
- Add highlight on found occurence for search coming from Filter Component. ( Done for contains, Startswith and Endswith )
- In rest file in query dynamic query field names
- Interface Filter - Base/extended.
- Input type date in component filter, it use the basic input type='date'
- Example move to codepen.io

2.0 ( Battlestar Galactica 2003 )

- Correct bug with label of columns names into visibility dropdown.
- Additional component for filtering.
- Rewrite way of building query. Same way for all call, Global, single or from Filter component.
- Example and build javascript file not yet updated.

1.9 ( Freestyler - Bomfunk MC's )

- Css fixes.
- Pagination : Mode: "simple" (next,first,last,next) , "full" With numbers.
- Add custom var during the ajax call. With with functionnalities you can create you own filtering. An example is provided. With this functionnality you can create you own filtering data with a from and send all you request to the php page that generate the json.
- Bug corrected with "Jump to Page" select box.

1.8a 
- Quick fix.

1.8 ( Kame Ha Me Ha )

- Css review.
- Create dedicate container for toolbar not any more into the table.
- Move jump page to top toolbar.
- Columns with "visibility" eq "false" and "switchVisibility" eq "false" could be display into an extra block activated with a button.
    - Saw also hidden column that could be seen with switcher visibility in Extra if they are hidden.
- Hightlight found occurences : true, false.

1.7 ( Jack to the sound of the underground - Hit House )

- Code refactoring.
- Change defer part when filter is reset with cross button.
- Buttons return also index position of element into the table.
- Introduce custom css class in config for pager "Next", "Prev", "Fist" and "Last".
- Centralize all labels into labels section, like for columns names.
- Jsfiddle updated.

1.6 ( Rebel Yell - Billy Idol )

- Code refactoring.
- Forgot to remove "YY" for empty cells
- Columns visibility switcher ( introduce new parameter in column to define if column could be switch or not).
- Set class on button and pager if someone want to create additionnal classes to put icons in place of text.

1.5 ( Du Hast - Rammstein )

- Code refactoring.
- Implementation of configurable buttons. That can emit Event to parent.

Component call:
```
<data-greed ref="main-data-greed" v-bind:config="dataGreedConfig" v-on:callback="getBtnCall"></data-greed>
```

getBtnCall should recieve two arguments. "Action" (edit), "Data": the clicked row.

```
    methods:
    {
        getBtnCall: function(a,d)
        {
            console.log("CALL FROM CHILD TO PARENT.");
            console.log(arguments);
        }
    }
```

In model config. Two way for "Mode":
- "mode" with value "Emit" to send event to parent.
- "mode" with function call the defined code.

```
    buttons: [
    {
        "action": "edit_",
        "label": "edit",
        "css": "btn-primary",
        "mode": "emit"
    },
    {
        "action": "remove_",
        "label": "remove",
        "css": "btn-danger",
        "mode": function(d)
        {
            console.log("INTERNAL FUNCTION CALL [DATA]");
            console.log(d);
        }
    }]
```

1.4 ( DMT - Do Ma Thang - 3YE )

- If nothing has been found bottom tool ( pager...) are not shown.
- Missing label "Page" for jump to page.
- Correct bug for highlight in search by column mode.
- Update rest return json
- Global search Highlight found occurence.
- Php builder to create min file. ( build that include all even the css, and a build without the css)
- Update page to avoid to have buttons First,Prev if current page is below 3.
- Add ccs for filter on input.
- Update JsFiddle Ex.

1.3c

- Update Readme.

1.3b

- Update Readme.

1.3a
- Jump to page.
- Options to show/hide : "Entries position", "Dropdown Page".
- Change color of column when it ordered.
- If only one page max should not be the by page, but the max rows.

1.3 ( Paradise city version)

- Hightlight switch
- Display total with entries.
- Create options object.
- Header over columns name to be able to group columns by categories.
- Remove useless codes.
- min version of the package.
- Ex on Jsfiddle.

1.2

- Global Search. Set visibility and min length for search.
- Correct entries from/to
- Set parm to rest call to define the search mode: empty,"GLOBAL","MULTI".
- Set icon erase for search input text element
- Set Highlight but not yet correct at 100%

1.1a

Update ReadMe.

1.1

Add search function. Rest ressource is done in php but with basic code fell free to rewrite it.
// App._context.app._component.data()
var App;

var DataGreed = {
    data: function()
    {
        return {
            "lg": "fr",
            "dataGreedFilter":
            {
                "labels":
                {
                    "title": "Custom Filters",
                    "btn_reset": "Reset",
                    "btn_filters": "Apply filters",
                    "filter_classic": "Classic",
                    "filter_extended": "Extended",
                },
                "sidebarFilter": false,
                "sidebarForm":
                {
                    "mode": "classic",
                    /* full, classic, extended */
                    "form": [
                        /* INPUT-TEXT - SINGLE */
                        {
                            "column_ref": 1,
                            "type": "input-text",
                            "format": "STRING",
                            "value": "",
                            "fmode": "classic"
                        },
                        /* INPUT-TEXT - MULTI */
                        {
                            "column_ref": 1,
                            "type": "input-text",
                            "format": "STRING",
                            "values": [],
                            "fmode": "extended"
                        },
                        /* DD-INPUT-TEXT - SINGLE */
                        {
                            "column_ref": 2,
                            "type": "dd-input-text",
                            "format": "STRING",
                            "dic": "dd_list_1",
                            "op": "",
                            "value": "",
                            "fmode": "classic"
                        },
                        /* DD-INPUT-TEXT - MULTI */
                        {
                            "column_ref": 2,
                            "type": "dd-input-text",
                            "format": "STRING",
                            "dic": "dd_list_1",
                            "op": [],
                            "values": [],
                            "fmode": "extended"
                        },
                        /* DD-INPUT-NUMBER - SINGLE */
                        {
                            "column_ref": 4,
                            "type": "dd-input-number",
                            "format": "NUMBER",
                            "dic": "dd_list_2",
                            "op": "",
                            "value1": "",
                            "value2": "",
                            "fmode": "classic"
                        },
                        /* DD-INPUT-NUMBER - MULTI */
                        {
                            "column_ref": 4,
                            "type": "dd-input-number",
                            "format": "NUMBER",
                            "dic": "dd_list_2",
                            "op": [],
                            "values1": [],
                            "values2": [],
                            "fmode": "extended"
                        },
                        /* DICTIONNARY - SINGLE */
                        {
                            "column_ref": 7,
                            "type": "dictionnary",
                            "format": "STRING",
                            "dic": "dd_list_3",
                            "value": "",
                            "fmode": "classic"
                        },
                        /* DICTIONNARY - MULTI */
                        {
                            "column_ref": 7,
                            "type": "dictionnary",
                            "format": "STRING",
                            "dic": "dd_list_3",
                            "values": [],
                            "fmode": "extended"
                        },
                        /*  DD-INPUT-DATE - SINGLE */
                        {
                            "column_ref": 3,
                            "type": "dd-input-date",
                            "format": "DATE",
                            "dic": "dd_list_2",
                            "op": "",
                            "value1": "",
                            "value2": "",
                            "fmode": "classic"
                        },
                        /* DD-INPUT-DATE - MULTI */
                        {
                            "column_ref": 3,
                            "type": "dd-input-date",
                            "format": "DATE",
                            "dic": "dd_list_2",
                            "op": [],
                            "values1": [],
                            "values2": [],
                            "fmode": "extended"
                        }
                    ],
                    "dropdown":
                    {
                        "dd_list_1": [
                        {
                            "t": "",
                            "v": ""
                        },
                        {
                            "t": "Eq",
                            "v": "EQ"
                        },
                        {
                            "t": "Neq",
                            "v": "NEQ"
                        },
                        {
                            "t": "Contains",
                            "v": "LK"
                        },
                        {
                            "t": "Startswith",
                            "v": "SW"
                        },
                        {
                            "t": "Endswith",
                            "v": "EW"
                        }],
                        "dd_list_2": [
                        {
                            "t": "",
                            "v": ""
                        },
                        {
                            "t": "Range",
                            "v": "RANGE"
                        },
                        {
                            "t": "Gt",
                            "v": "GT"
                        },
                        {
                            "t": "Gte",
                            "v": "GTE"
                        },
                        {
                            "t": "Lt",
                            "v": "LT"
                        },
                        {
                            "t": "Lte",
                            "v": "LTE"
                        },
                        {
                            "t": "Eq",
                            "v": "EQ"
                        },
                        {
                            "t": "Neq",
                            "v": "NEQ"
                        }],
                        "dd_list_3": [
                        {
                            "t": "",
                            "v": ""
                        },
                        {
                            "t": "Male",
                            "v": "M"
                        },
                        {
                            "t": "Female",
                            "v": "F"
                        }]
                    }
                }
            },
            "dataGreedConfig":
            {
                "customParameters": "",
                "options":
                {
                    "recordsPerPage": 5,
                    "perPageOptions": [3, 5, 10],
                    "dataSourceUrl": "dynamic/rest.php",
                    "xdataSourceUrl": "https://www.retroplayers.be/rest/rest.php",
                    "displayEmptyLines": true,
                    "horizontalScroll": true,
                    "verticalScroll": false,
                    "responsive": true,
                    "globaSearchMinLength": 3,
                    "globalSearch": true,
                    "header": [3, 5],
                    "visualFilterForOrderedColumns": true,
                    "jumpPage": true,
                    'entriesInfo': true,
                    "outSideButtons": true,
                    "displayUnswitchColumnsAsExtraInfos": true,
                    "highlight": true,
                    "pagerNoNumber": true
                },
                "labels":
                {
                    "first": "First",
                    "next": "Next",
                    "previous": "Prev",
                    "last": "Last",
                    "pageSelect":
                    {
                        "show": "Show",
                        "entries": "entries"
                    },
                    "range":
                    {
                        "from": "From",
                        "to": "to"
                    },
                    "globalSearch": "Global Search",
                    "resetSearch": "Reset Search",
                    "noRecordsFound": "No records founds",
                    "total": "Total",
                    "header": [
                        "Group #1",
                        "Group #2"
                    ],
                    "page": "Page:",
                    "buttons":
                    {
                        "edit": "E",
                        "remove": "R"
                    },
                    "visibility": "Visibility",
                    "columns": [
                        "A..", "B..", "C..", "D..", "E..", "F..", "G..", "H..", "I.."
                    ]
                },
                "css":
                {
                    "table": "table-bordered",
                    "pagerPosition": "float-right",
                    "pager":
                    {
                        "first": "",
                        "prev": "",
                        "next": "",
                        "last": ""
                    }
                },
                "columns": [
                {
                    "name": "COLUMN_A",
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "asc",
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_B",
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 3
                    },
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_C",
                    "fctTransform": function(s, t)
                    {
                        return s + "66<u>é</u>6";
                    },
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 3
                    },
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_D",
                    "fctTransform": function(s, t)
                    {
                        return moment("" + s + "", "YYYY-MM-DD").format("DD-MM-YYYY");
                    },
                    "class": "",
                    "visibility": true,
                    "orderVisibility": false,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 3
                    },
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_E",
                    "fctTransform": function(s, t)
                    {
                        var a = moment("" + t[3] + "", "YYYY-MM-DD");
                        var b = moment.now();
                        var d = (a.diff(b, "year")) * -1;

                        return "" + s + " > (" + d + ")";
                    },
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 1
                    },
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_F",
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 3
                    },
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_G",
                    "fctTransform": function(s, t)
                    {
                        var options = {
                            symbol: "€",
                            decimal: ",",
                            thousand: ".",
                            precision: 2,
                            format: "%v %s"
                        };

                        return accounting.formatMoney("" + s + "", options);
                    },
                    "class": "text-right text-success",
                    "visibility": false,
                    "orderVisibility": true,
                    "orderMode": "",
                    "switchVisibility": true
                },
                {
                    "name": "COLUMN_H",
                    "class": "",
                    "visibility": false,
                    "orderVisibility": false,
                    "orderMode": "",
                    "search":
                    {
                        "type": "select",
                        "dictionnary": [
                        {
                            "text": "Male",
                            "value": "M"
                        },
                        {
                            "text": "Female",
                            "value": "F"
                        }],
                        "css": "mw75px pl-1 pr-0",
                        "value": ""
                    },
                    "switchVisibility": true /*false*/
                },
                {
                    "name": "COLUMN_I",
                    "fctTransform": function(s, t)
                    {
                        return moment("" + s + "", "YYYY-MM-DD").format("DD-MM-YYYY");
                    },
                    "class": "",
                    "visibility": false,
                    "orderVisibility": false,
                    "orderMode": "",
                    "search":
                    {
                        "type": "input",
                        "value": "",
                        "minLength": 3
                    },
                    "switchVisibility": false
                }, ],
                "buttons": [
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
                    "mode": function(d, ndx)
                    {
                        console.log("*********************************");
                        console.log("INTERNAL FUNCTION CALL [DATA]");
                        console.log(d);
                        console.log(ndx);
                        alert("I'm doing nothing except call a function defined into the model of the component data");
                    }
                }]
            }
        };
    },
    computed:
    {},
    watch:
    {},
    mounted: function()
    {
        // console.log(this);
        // this.$refs["main-data-greed"].globalSearch="12"
    },
    methods:
    {
        /*
            CALL FROM EMIT
        */
        getBtnCall: function(a, d, ndx)
        {
            console.log("*********************************");
            console.log("CALL FROM CHILD TO PARENT.");
            console.log(arguments);
            alert("I'm doing nothing but i'm calling a method inside the parent element");
        }
    }
};

App = Vue.createApp(DataGreed);

initDataGreedComponent(App);
initDataGreedFilterComponent(App);
App.mount('#app');
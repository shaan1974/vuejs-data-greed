// App._context.app._component.data()
var App;

var DataGreed = {
    data: function()
    {
        return {
            "lg": "fr",
            "dataGreedConfig":
            {
                "customParameters": [],
                "options":
                {
                    "recordsPerPage": 10,
                    "perPageOptions": [3, 5, 10],
                    "dataSourceUrl": "dynamic/rest.php",
                    "xdataSourceUrl": "https://www.retroplayers.be/rest/rest.php",
                    "displayEmptyLines": true,
                    "horizontalScroll": true,
                    "verticalScroll": false,
                    "responsive": true,
                    "globaSearchMinLength": 4,
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
                        "A..", "B..", "C..", "D..", "E..", "F..", "G..", "H.."
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
                    "switchVisibility": false
                }],
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
App.mount('#app');
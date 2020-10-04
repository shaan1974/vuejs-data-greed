var App;

var DataGreed = {
    data: function()
    {
        return {
            "lg": "fr",
            "dataGreedConfig":
            {
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
                    'entriesInfo': true
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
                    "visibility": "Visibility"
                },
                "css":
                {
                    "table": "table-striped table-bordered",
                    "pagerPosition": "float-right"
                },
                "columns": [
                {
                    "name": "C #A",
                    "class": "",
                    "visibility": true,
                    "orderVisibility": true,
                    "orderMode": "asc",
                    "switchVisibility": true
                },
                {
                    "name": "C #B",
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
                    "name": "C #C",
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
                    "name": "C #D",
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
                    "name": "C #E",
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
                        "minLength": 3
                    },
                    "switchVisibility": true
                },
                {
                    "name": "C #F",
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
                    "name": "C #G",
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
                    "name": "C #H",
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
                    "mode": function(d)
                    {
                        console.log("*********************************");
                        console.log("INTERNAL FUNCTION CALL [DATA]");
                        console.log(d);
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
        getBtnCall: function(a, d)
        {
            console.log("*********************************");
            console.log("CALL FROM CHILD TO PARENT.");
            console.log(arguments);
        }
    }
};

App = Vue.createApp(DataGreed);
initDataGreedComponent(App);
App.mount('#app');
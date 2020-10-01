var App;

function init_vue()
{
    console.log("app vuejs 3.0");

    var DataGreed = {
        data: function()
        {
            return {
                "lg": "fr",
                "dataGreedConfig":
                {
                    "recordsPerPage": 10,
                    "perPageOptions": [3, 5, 10],
                    "dataSourceUrl": "dynamic/rest.php",
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
                        "noRecordsFound": "No records founds"
                    },
                    "css":
                    {
                        "table": "table-striped table-bordered",
                        "pagerPosition": "float-right"
                    },
                    "displayEmptyLines": true,
                    "horizontalScroll": true,
                    "verticalScroll": false,
                    "columns": [
                    {
                        "name": "C #A",
                        "class": "",
                        "visibility": true,
                        "orderVisibility": true,
                        "orderMode": "asc"
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
                        }
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
                        }
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
                        }
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
                        }
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
                        }
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
                        "visibility": true,
                        "orderVisibility": true,
                        "orderMode": ""
                    },
                    {
                        "name": "C #H",
                        "class": "",
                        "visibility": true,
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
                        }
                    }],
                    "responsive": true,
                    "globaSearchMinLength": 4,
                    "globalSearch": true
                }
            };
        },
        computed:
        {},
        watch:
        {},
        mounted: function() {},
        methods:
        {}
    };

    // App = Vue.createApp(DataGreed).mount('#app');
    App = Vue.createApp(DataGreed);
    initComponent(App);
    App.mount('#app');
}
/*jshint esversion: 6 */

function initComponent(app)
{
    app.component(
        'data-greed',
        {
            data: function()
            {
                return {
                    "records": [],
                    "pageno": 1,
                    "pagination": [],
                    "totalPages": "",
                    "totalRows": "",
                    "loading": false,
                    "order": [],
                    "config_recordsPerPage": 0,
                    "globalSearch": "",
                    "columnnSearch": [],
                    "previousSearch": "",
                    "lastFocusField": ""
                };
            },
            props: ['config'],
            template: '' + templateDataGreed + '',
            mounted: function()
            {
                this.config_recordsPerPage = this.config.recordsPerPage;

                console.log("COMPONENT MOUNTED.");

                //  BUILD ORDER
                //
                for (var i = 0; i < this.config.columns.length; i++)
                {
                    if (this.config.columns[i].orderMode !== "")
                    {
                        this.order.push(
                        {
                            "p": i,
                            "o": this.config.columns[i].orderMode
                        });
                    }
                }

                //  LOAD DATA FOR FIRST TIME
                //
                this._loadData();

                //  BUIKD FILTERS
                //
                this._searchFilter();
            },
            /*watch:
            {
                ["columnnSearch"]: function(cVal, oVal)
                {
                    console.log("C CHANGE");

                    if (typeof cVal === "string" && typeof oVal === "object")
                    {
                        // init
                        console.log("INIT");
                    }
                    else if (typeof cVal === "string" && typeof oVal === "string")
                    {
                        console.log("SEARCH");
                        console.log("CURRENT " + cVal);
                        console.log("OLD : " + oVal);

                    }
                }
            },*/
            computed:
            {
                "dataFrom": function()
                {
                    return ((this.pageno - 1) * this.config_recordsPerPage) + 1;
                },
                "datatTo": function()
                {
                    return ((this.pageno - 1) * this.config_recordsPerPage) + this.config_recordsPerPage;
                },
                /*
                    BUILD CLASS FOR HEADER TH TO DISPLAY A CLASS TO INDICATE IF FILTER IS TAKEN IN COUNT OR NOT
                */
                "classColumn": function()
                {
                    return this.config.columns.map(function(o)
                    {
                        if (typeof o.search !== "undefined")
                        {
                            if (o.search.type === "select" && o.search.value != "")
                            {
                                return "columnFilterAccepted";
                            }
                            else if (o.search.type === "input" && (o.search.value !== "" && o.search.value.length >= o.search.minLength))
                            {
                                return "columnFilterAccepted";
                            }
                            else
                            {
                                return "";
                            }
                        }
                        else
                        {
                            return "";
                        }
                    });
                }
            },
            methods:
            {
                _resetSearch: function()
                {
                    this.previousSearch = "";
                    this.globalSearch = "";

                    for (var i = 0; i < this.config.columns.length; i++)
                    {
                        if (typeof this.config.columns[i].search !== "undefined")
                        {
                            this.config.columns[i].search.value = "";
                        }

                        this.columnnSearch[i] = "";
                    }

                    this.$nextTick(() =>
                    {
                        this._navigate(1);
                    });
                },
                /*
                    "COLUMNS" - WHEN GLOBAL SEARCH FOCUS WE RESET COLUMNS FILTERS VALUES
                    "GLOBAL"  - WHEN COLUMNS IS FOCUS,CLICK GLOBAL SEACH IS SET EMPTY
                */
                _resetFilter: function(m)
                {
                    if (m === "COLUMNS")
                    {
                        console.log("reset columns filters");

                        for (var i = 0; i < this.config.columns.length; i++)
                        {
                            if (typeof this.config.columns[i].search !== "undefined")
                            {
                                this.config.columns[i].search.value = "";
                            }
                        }
                    }
                    else
                    {
                        this.globalSearch = "";
                    }
                },
                /*
                    BUILD FILTER FOR EACH COLUMNS
                */
                _searchFilter: debounce(function(e)
                {
                    //  IF FILTER IS CALLED BY AN INPUT WE SET THIS INPUT INTO TEMP VAR
                    //                    
                    if (typeof e !== "undefined")
                    {
                        this.lastFocusField = e.target;
                    }

                    var filterSearch = [];
                    var update = false;

                    for (var i = 0; i < this.config.columns.length; i++)
                    {
                        filterSearch.push("");

                        if (typeof this.config.columns[i].search !== "undefined")
                        {
                            if (this.config.columns[i].search.type === "input")
                            {
                                if (this.config.columns[i].search.value !== "" && this.config.columns[i].search.value.length >= this.config.columns[i].search.minLength)
                                {
                                    filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                                    update = true;
                                }
                            }

                            if (this.config.columns[i].search.type === "select")
                            {
                                if (this.config.columns[i].search.value !== "")
                                {
                                    filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                                    update = true;
                                }
                            }
                        }
                    }

                    if (typeof this.previousSearch === "object")
                    {
                        if (JSON.stringify(this.previousSearch) === JSON.stringify(filterSearch))
                        {
                            return true;
                        }
                    }

                    // console.log(filterSearch);
                    // console.log(update);
                    // console.log(JSON.stringify(filterSearch));

                    // this.columnnSearch = JSON.stringify(filterSearch);
                    this.columnnSearch = filterSearch;

                    if (update === true)
                    {
                        this._navigate(1);
                        this.previousSearch = filterSearch;
                    }

                }, 500),
                /*
                    LOAD DATA
                */
                _loadData: function()
                {
                    //  SET LOADER ACTIVE
                    //
                    this.loading = true;

                    //  BUILD SEARCH PARAMETER
                    //
                    var searchParm = "[]";
                    if (this.globalSearch !== "")
                    {
                        searchParm = '["' + this.globalSearch + '"]';
                    }
                    else if (this.columnnSearch.filter(function(o)
                        {
                            if (o !== "") return o;
                        }).length !== 0)
                    {
                        searchParm = JSON.stringify(this.columnnSearch);
                    }

                    //  AJAX CALL
                    //
                    axios(
                        {
                            method: 'post',
                            data:
                            {
                                pageno: this.pageno,
                                per_page: this.config_recordsPerPage,
                                order: JSON.stringify(this.order),
                                search: searchParm
                            },
                            url: this.config.dataSourceUrl,
                            responseType: 'stream',
                        })
                        .then(this._getData);
                },
                /*
                    GET DATA
                */
                _getData: function(response)
                {
                    //	REMOVE FOCUS ON FOCUSED ELEMENT
                    //
                    document.activeElement.blur();

                    // console.log(response.data);
                    this.records = response.data.records;
                    this.totalPages = response.data.totalPages;
                    this.totalRows = response.data.totalRows;

                    this._buildPager();

                    var that = this;

                    //  REMOVE LOADER
                    //                    
                    setTimeout(
                        function(t)
                        {
                            that.loading = false;

                            //  IF LAST FOCUS ELEMENT FOCUS IS DEFINED WE SET THE FOCUS BACK AGAIN
                            //
                            if (that.lastFocusField !== "")
                            {
                                that.lastFocusField.focus();
                                that.lastFocusField = "";
                            }
                        }, 500, that
                    );
                    /*
                    this.$nextTick(() =>
                    {
                        this.loading = false;

                        //  IF LAST FOCUS ELEMENT FOCUS IS DEFINED WE SET THE FOCUS BACK AGAIN
                        //
                        if (this.lastFocusField !== "")
                        {
                            this.lastFocusField.focus();
                            this.lastFocusField = "";
                        }

                    });*/
                },
                /*
                    NAVIGATE, CLICK ON PAGER
                */
                _navigate: function(page)
                {
                    this.pageno = page;
                    this._loadData();
                },
                /*
                    BUILD INTERNAL DATA FOR PAGER
                */
                _buildPush: function(o, a, b, c)
                {
                    o.push(
                    {
                        "lbl": "" + a + "",
                        "v": "" + b + "",
                        "active": c
                    });
                    return o;
                },
                /*
                    BUILD PAGER
                */
                _buildPager: function()
                {
                    var pagination = [];
                    var current_page = parseInt(this.pageno);
                    var total_pages = parseInt(this.totalPages);

                    if (total_pages > 0 && total_pages != 1 && current_page <= total_pages)
                    {
                        right_links = current_page + 3;
                        previous = current_page - 1;
                        next = current_page + 1;
                        first_link = true;

                        if (current_page > 1)
                        {
                            previous_link = (previous == 0) ? 1 : previous;

                            pagination = this._buildPush(pagination, "" + this.config.labels.first + "", "1", false);
                            pagination = this._buildPush(pagination, "" + this.config.labels.previous + "", "" + previous_link + "", false);

                            for (i = (current_page - 2); i < current_page; i++)
                            {
                                if (i > 0)
                                {
                                    pagination = this._buildPush(pagination, "" + i + "", "" + i + "", (i === current_page) ? true : false);
                                }
                            }
                            first_link = false;
                        }

                        if (first_link)
                        {
                            pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", true);
                        }
                        else if (current_page == total_pages)
                        {
                            pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", true);
                        }
                        else
                        {
                            pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", (parseInt(pagination[pagination.length - 1].v) + 1 === current_page ? true : false));
                        }

                        for (i = current_page + 1; i < right_links; i++)
                        {
                            if (i <= total_pages)
                            {
                                pagination = this._buildPush(pagination, "" + i + "", "" + i + "", false);
                            }
                        }

                        //	NEXT - LAST 
                        //
                        if (current_page < total_pages)
                        {
                            next_link = (i > total_pages) ? total_pages : i;

                            pagination = this._buildPush(pagination, this.config.labels.next, (current_page + 1), false);
                            pagination = this._buildPush(pagination, this.config.labels.last, total_pages, false);
                        }

                        this.pagination = pagination;
                    }
                    else
                    {
                        console.log("HERE BUILD PAGER");
                        this.pagination = [];
                    }
                },
                /*
                    WHEN PER PAGE IS CHANGE WITH DROPDOWN
                */
                _changePerPage: function(e)
                {
                    this.config_recordsPerPage = parseInt(e.target.value);
                    this._navigate(1);
                },
                /*
                    RESET ORDER VAR
                */
                _resetOrderMode: function()
                {
                    for (i = 0; i < this.config.columns.length; i++)
                    {
                        this.config.columns[i].orderMode = "";
                    }
                },
                /*                
                    SET ORDER SIMPLE OR MULTI IF USER PRESS SHIFT ALSO
                */
                _setOrder: function(e, ndx)
                {
                    var cElm = this.config.columns[ndx];

                    if (cElm.orderVisibility === false)
                    {
                        return false;
                    }

                    var i;

                    if (e.shiftKey === false)
                    {
                        if ( /*cElm.orderVisibility === true &&*/ (cElm.orderMode === "" || cElm.orderMode === "desc"))
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'asc';
                        }
                        else if ( /*cElm.orderVisibility === true &&*/ cElm.orderMode === "asc")
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'desc';
                        }
                        /*
                        if (cElm.orderVisibility === true && cElm.orderMode === "")
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'asc';
                        }
                        else if (cElm.orderVisibility === true && cElm.orderMode === "asc")
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'desc';
                        }
                        else if (cElm.orderVisibility === true && cElm.orderMode === "desc")
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'asc';
                        }
                        */

                        this.order = [];
                        this.order.push(
                        {
                            "p": ndx,
                            "o": cElm.orderMode
                        });
                    }
                    else if (e.shiftKey === true)
                    {
                        //  IF NO ORDER HAS BEEN DEFINED YET
                        //
                        if ( /*cElm.orderVisibility === true &&*/ cElm.orderMode === "")
                        {
                            cElm.orderMode = 'asc';

                            this.order.push(
                            {
                                "p": ndx,
                                "o": cElm.orderMode
                            });
                        }
                        //  IF ORDER EXIST WE HAVE TO CHANGE IT IN EXISTING ARRAY
                        //
                        else if ( /*cElm.orderVisibility === true &&*/ (cElm.orderMode === "asc" || cElm.orderMode === "desc"))
                        {
                            cElm.orderMode = (cElm.orderMode === "asc") ? "desc" : "asc";

                            for (i = 0; i < this.order.length; i++)
                            {
                                if (this.order[i].p === ndx)
                                {
                                    this.order[i].o = (this.order[i].o === "asc") ? "desc" : "asc";
                                }
                            }
                        }
                        /*
                        updateOrder = true;
                        if (cElm.orderVisibility === true && cElm.orderMode === "")
                        {
                            cElm.orderMode = 'asc';
                            updateOrder = false;
                        }
                        else if (cElm.orderVisibility === true && cElm.orderMode === "asc")
                        {
                            cElm.orderMode = 'desc';
                        }
                        else if (cElm.orderVisibility === true && cElm.orderMode === "desc")
                        {
                            cElm.orderMode = 'asc';
                        }

                        if (updateOrder === false)
                        {
                            this.order.push(
                            {
                                "p": ndx,
                                "o": cElm.orderMode
                            });
                        }
                        else
                        {
                            for (i = 0; i < this.order.length; i++)
                            {
                                if (this.order[i].p === ndx)
                                {
                                    this.order[i].o = (this.order[i].o === "asc") ? "desc" : "asc";
                                }
                            }
                        }
                        */
                    }

                    this._loadData();
                }
            }
        }
    );
}
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
                    "globalSearch": ""
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
            },
            computed:
            {
                "dataFrom": function()
                {
                    return ((this.pageno - 1) * this.config_recordsPerPage) + 1;
                },
                "datatTo": function()
                {
                    return ((this.pageno - 1) * this.config_recordsPerPage) + this.config_recordsPerPage;
                }
            },
            /*,
                        watch:
                        {
                            ["globalSearch"]: function(val)
                            {
                                console.log("CHANGE... GS");
                            }
                        },*/
            methods:
            {
                /*
                    WHEN GLOBAL SEARCH FOCUS WE RESET COLUMNS FILTERS VALUES ( COLUMNS)
                    WHEN COLUMNS IS FOCUS,CLICK GLOBAL SEACH IS SET EMPTY (GLOBAL)
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
                _searchFilter: debounce(function()
                {
                    var filterSearch = [];

                    for (var i = 0; i < this.config.columns.length; i++)
                    {
                        filterSearch.push("");

                        if (typeof this.config.columns[i].search !== "undefined")
                        {
                            if (this.config.columns[i].search.value !== "")
                            {
                                filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                            }
                        }
                    }

                    console.log(filterSearch);
                    console.log(JSON.stringify(filterSearch));

                }, 500),
                /*
                    LOAD DATA
                */
                _loadData: function()
                {
                    this.loading = true;

                    axios(
                        {
                            method: 'post',
                            data:
                            {
                                pageno: this.pageno,
                                per_page: this.config_recordsPerPage,
                                order: JSON.stringify(this.order)
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
                        }, 500, that
                    );
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
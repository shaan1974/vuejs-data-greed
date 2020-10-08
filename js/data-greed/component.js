/*jshint esversion: 6 */
function initDataGreedComponent(vapp)
{
    //  ADDITIONAL FUNCTION
    //
    window.___debounce = function(func)
    {
        var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

        var timeout = void 0;
        return function()
        {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++)
            {
                args[_key] = arguments[_key];
            }

            clearTimeout(timeout);
            timeout = setTimeout(function()
            {
                func.apply(_this, args);
            }, wait);
        };
    };

    //  COMPONENT
    //
    vapp.component(
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
                    "lastFocusField": "",
                    "searchMode": "",
                    "btnColumnsVisibility": false,
                    "extra": []
                };
            },
            emits: ['callback'],
            props: ['config'],
            template: '' + templateDataGreed + '',
            mounted: function()
            {
                //  SET TO DATA VAR
                //
                this.config_recordsPerPage = this.config.options.recordsPerPage;

                //  BUILD ORDER
                //
                /*for (var i = 0; i < this.config.columns.length; i++)
                {
                    if (this.config.columns[i].orderMode !== "")
                    {
                        this.order.push(
                        {
                            "p": i,
                            "o": this.config.columns[i].orderMode
                        });
                    }
                }*/

                var fct = function(filtered, o, i)
                {
                    if (o.orderMode !== "")
                    {
                        filtered.push(
                        {
                            "p": i,
                            "o": o.orderMode
                        });
                    }

                    return filtered;
                };

                this.order = this.config.columns.reduce(fct, []);
                // console.log(JSON.stringify(this.order));

                //  LOAD DATA FOR FIRST TIME
                //
                this._loadData();

                //  BUILD FILTERS
                //
                this._searchFilter();
            },
            computed:
            {
                "dataFrom": function()
                {
                    return ((this.pageno - 1) * parseInt(this.config_recordsPerPage)) + 1;
                },
                "datatTo": function()
                {
                    var recordsPerPage = parseInt(this.config_recordsPerPage);

                    //  IN CASE OF TOTAL ROWS ARE BELOW RECORD PAGES
                    //
                    if (this.totalRows < recordsPerPage)
                    {
                        return this.totalRows;
                    }

                    if (((this.pageno - 1) * recordsPerPage) + 1 < ((this.pageno - 1) * recordsPerPage) + 1 + recordsPerPage && (this.totalPages === parseInt(this.pageno)))
                    {
                        return this.totalRows;
                    }
                    return ((this.pageno - 1) * recordsPerPage) + recordsPerPage;
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
                },
                "visibleColumsLen": function()
                {
                    return this.config.columns.filter(function(o)
                    {
                        if (o.visibility === true) return o;
                    }).length;
                },
                "isUnswitchColumns": function()
                {
                    var l = this.config.columns.filter(function(o)
                    {
                        if (o.visibility === false && o.switchVisibility == false) return o;
                    }).length;

                    return (l === 0) ? false : true;
                }
            },
            watch:
            {
                ["config.customParameters"]: function()
                {
                    // console.log("customParameters change.");
                    this._navigate(1);
                }
            },
            methods:
            {
                /*
                    RESET SEARCH
                */
                _resetSearch: function()
                {
                    this.previousSearch = "";
                    this.globalSearch = "";

                    /*
                    for (var i = 0; i < this.config.columns.length; i++)
                    {
                        if (typeof this.config.columns[i].search !== "undefined")
                        {
                            this.config.columns[i].search.value = "";
                        }

                        this.columnnSearch[i] = "";
                    }
                    */

                    /*
                    var loop = function(t, item)
                    {
                        if (typeof item.search !== "undefined")
                        {
                            item.search.value = "";
                        }
                        t.columnnSearch[i] = "";
                    };
                        
                    var that = this;
                    this.config.columns.forEach(loop.bind(null, that));
                    */

                    this._resetFilter("COLUMNS");
                    this.columnnSearch = this.columnnSearch.map(function()
                    {
                        return "";
                    });

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
                _searchFilter: ___debounce(function(e, ndx)
                {
                    //  IF FILTER IS CALLED BY AN INPUT WE SET THIS INPUT INTO TEMP VAR
                    //          
                    var keyMode = "";

                    if (typeof e !== "undefined")
                    {
                        if (typeof e === "object")
                        {
                            this.lastFocusField = e.target;
                            keyMode = e.inputType;
                        }
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
                                if (keyMode !== "deleteContentBackward")
                                {
                                    if (this.config.columns[i].search.value !== "" && this.config.columns[i].search.value.length >= this.config.columns[i].search.minLength)
                                    {
                                        filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                                        update = true;
                                    }
                                }
                                else
                                {
                                    if (this.config.columns[i].search.value.length >= this.config.columns[i].search.minLength)
                                    {
                                        filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                                        update = true;
                                    }
                                    //  IN CASE OF SEARCH LENGHT IS BELOW WE SET THE VALUE TO EMPTY
                                    else
                                    {
                                        filterSearch[filterSearch.length - 1] = "";
                                        update = true;
                                    }
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

                    //  RESET 
                    //
                    this.searchMode = "";
                    var __searchMode = "";

                    //  BUILD SEARCH PARAMETER
                    //                    
                    var searchParm = "";
                    if (this.globalSearch !== "")
                    {
                        searchParm = this.globalSearch;
                        __searchMode = "GLOBAL";
                    }
                    else if (this.columnnSearch.filter(function(o)
                        {
                            if (o !== "") return o;
                        }).length !== 0)
                    {
                        searchParm = JSON.stringify(this.columnnSearch);
                        __searchMode = "MULTI";
                    }

                    //  CUSTOM PARAMETERS                    
                    //
                    var customParameters = JSON.stringify(this.config.customParameters);
                    customParameters = (customParameters === "[]") ? "" : customParameters;

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
                                search: searchParm,
                                search_mode: __searchMode,
                                customParameters: customParameters
                            },
                            url: this.config.options.dataSourceUrl,
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

                    /*
                    this.records = response.data.records;
                    this.totalPages = response.data.totalPages;
                    this.totalRows = response.data.totalRows;
                    this.searchMode = response.data.searchMode;
                    */
                    Object.assign(this, response.data);

                    //  BUILD FOR EXTRA
                    //
                    this.extra = this.records.map(function(o)
                    {
                        return false;
                    });

                    this._buildPager();

                    //  REMOVE LOADER
                    //
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
                    });
                },
                /*
                    DEFER NAVIGATION
                */
                _deferNavigate: function(e, page)
                {
                    e.target.previousElementSibling.value = "";

                    var event = document.createEvent("Event");
                    event.initEvent("input", false, true);
                    event.inputType = "deleteContentBackward";
                    e.target.previousElementSibling.dispatchEvent(event);

                    /*
                    this.records = [];
                    this.previousSearch = "";
                    this._searchFilter();

                    var that = this;
                    setTimeout(
                        function(t)
                        {
                            that._navigate(page);
                        }, 501, that
                    );
                    */
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
                _buildPush: function(o, a, b, c, ac)
                {
                    ac = (typeof ac === "undefined") ? "" : ac;

                    o.push(
                    {
                        "lbl": "" + a + "",
                        "v": "" + b + "",
                        "active": c,
                        "aclass": ac,
                        "isPage": ac.includes('p-page')
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

                    // if (total_pages > 0 && total_pages != 1 && current_page <= total_pages)
                    if (total_pages !== 0)
                    {
                        right_links = current_page + 3;
                        previous = current_page - 1;
                        next = current_page + 1;
                        first_link = true;

                        if (current_page > 1)
                        {
                            previous_link = (previous == 0) ? 1 : previous;

                            if (current_page > 3)
                            {
                                pagination = this._buildPush(pagination, this.config.labels.first, 1, false, "p-first " + this.config.css.pager.first);
                                pagination = this._buildPush(pagination, this.config.labels.previous, previous_link, false, "p-prev " + this.config.css.pager.prev);
                            }

                            for (i = (current_page - 2); i < current_page; i++)
                            {
                                if (i > 0)
                                {
                                    pagination = this._buildPush(pagination, i, i, (i === current_page) ? true : false, 'p-page');
                                }
                            }
                            first_link = false;
                        }

                        if (first_link)
                        {
                            pagination = this._buildPush(pagination, current_page, current_page, true, 'p-page');
                        }
                        else if (current_page == total_pages)
                        {
                            pagination = this._buildPush(pagination, current_page, current_page, true, 'p-page');
                        }
                        else
                        {
                            pagination = this._buildPush(pagination, current_page, current_page, (parseInt(pagination[pagination.length - 1].v) + 1 === current_page ? true : false), 'p-page');
                        }

                        for (i = current_page + 1; i < right_links; i++)
                        {
                            if (i <= total_pages)
                            {
                                pagination = this._buildPush(pagination, i, i, false, 'p-page');
                            }
                        }

                        //	NEXT - LAST 
                        //
                        if (current_page < total_pages)
                        {
                            next_link = (i > total_pages) ? total_pages : i;

                            pagination = this._buildPush(pagination, this.config.labels.next, (current_page + 1), false, "p-next " + this.config.css.pager.next);
                            pagination = this._buildPush(pagination, this.config.labels.last, total_pages, false, "p-last " + this.config.css.pager.last);
                        }
                    }

                    this.pagination = pagination;
                },
                /*
                    WHEN PER PAGE IS CHANGE WITH DROPDOWN
                */
                _changePerPage: function(e)
                {
                    this.config_recordsPerPage = e.target.value;
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
                        if ((cElm.orderMode === "" || cElm.orderMode === "desc"))
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'asc';
                        }
                        else if (cElm.orderMode === "asc")
                        {
                            this._resetOrderMode();
                            cElm.orderMode = 'desc';
                        }

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
                        if (cElm.orderMode === "")
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
                        else if ((cElm.orderMode === "asc" || cElm.orderMode === "desc"))
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
                    }

                    this._loadData();
                },
                _highlight: function(v, ndx)
                {
                    if (this.searchMode === "") return v;

                    if (typeof this.config.columns[ndx].search === "undefined")
                    {
                        return v;
                    }

                    //  IF HIGHLIGHT SHOULD NOT BE DONE
                    //
                    if (this.config.options.highlight === false)
                    {
                        return v;
                    }

                    var regex, r;

                    if (this.searchMode === "GLOBAL")
                    {
                        if (this.config.columns[ndx].search.type === "input")
                        {
                            regex = new RegExp("" + this.globalSearch + "", "gmi");
                            r = v.match(regex);

                            if (r !== null)
                            {
                                v = v.replace(regex, "<mark class='alert-success'>" + this.globalSearch + "</mark>");
                            }
                        }

                        return v;
                    }

                    if (this.config.columns[ndx].search.value === "")
                    {
                        return v;
                    }

                    if (this.searchMode === "MULTI")
                    {
                        if (this.config.columns[ndx].search.type === "input" && this.config.columns[ndx].search.value.length >= this.config.columns[ndx].search.minLength)
                        {
                            regex = new RegExp("" + this.config.columns[ndx].search.value + "", "gmi");
                            r = v.match(regex);

                            if (r !== null)
                            {
                                v = v.replace(regex, "<mark class='alert-success'>" + this.config.columns[ndx].search.value + "</mark>");
                            }
                        }

                        return v;
                    }
                },
                /*
                    IF BUTTONS ARE DEFINED ACTIONS ARE TREATHED HERE
                */
                _buttons: function(b, d, ndx)
                {
                    //  REMOVE BLUR ON BUTTON
                    //
                    document.activeElement.blur();

                    //  GET REAL ARRAY OBJECT
                    //
                    d = JSON.parse(JSON.stringify(d));

                    //  IF FUNCTION RUN IT OR EMIT EVENT TO PARENT
                    //
                    if (typeof b.mode === "function")
                    {
                        b.mode(d, ndx);
                    }
                    else
                    {
                        this.$emit(this.$options.emits[0], b.action, d, ndx);
                    }
                }
            }
        }
    );
}
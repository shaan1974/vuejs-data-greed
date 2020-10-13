/*jshint esversion: 6 */
function initDataGreedFilterComponent(vapp)
{
    //  COMPONENT
    //
    vapp.component(
        'data-greed-filter',
        {
            data: function()
            {
                return {
                    "expressions": []
                };
            },
            props: ['config', 'filter'],
            template: '' + templateDataGreedFilter.replace(/<!--.*?-->/gm, '') + '',
            setup: function()
            {
                // console.log('SETUP.');
            },
            mounted: function()
            {
                //  BUILD FILTER STRING
                /*this.build_filter = this.filter.sidebarForm.form.map(function()
                {
                    return "";
                });*/

                //  DEFINE WATCH
                // this.filter.sidebarForm.form[0].value
                /*Vue.watchEffect(() =>
                {
                    console.log(this.filter.sidebarForm.form);
                });*/

                //  FOR MULTI DICTIONNARY WE NEED TO ADD AN EXTRA PARAMETERS ON THE FLY TO USE A TMP VALUE
                //
                var ci;
                for (var i = 0; i < this.filter.sidebarForm.form.length; i++)
                {
                    ci = this.filter.sidebarForm.form[i];
                    if (ci.type === "dictionnary" && typeof ci.values != "undefined")
                    {
                        ci.tmp_value = "";
                    }
                }
            },
            computed:
            {
                expression: function()
                {
                    var that = this;

                    return this.filter.sidebarForm.form.map(function(o, i)
                    {
                        //  A1 : TYPE : INPUT-TEXT , MODE SINGLE
                        //                    
                        if (o.type === "input-text" && typeof o.value !== "undefined")
                        {
                            return that.build_A1(o);
                        }
                        //  A2 : TYPE : INPUT-TEXT , MODE MULTI
                        //                    
                        else if (o.type === "input-text" && typeof o.values !== "undefined")
                        {
                            return that.build_A2(o);
                        }
                        //  B1 : TYPE DD-INPUT-TEXT , MODE : SINGLE
                        //
                        else if (o.type === "dd-input-text" && typeof o.value !== "undefined" && /*o.op !== ""*/ typeof o.op !== "undefined")
                        {
                            return that.build_B1(o);
                        }
                        //  B2 : TYPE DD-INPUT-TEXT , MODE : MULTI
                        //
                        else if (o.type === "dd-input-text" && typeof o.values !== "undefined" && /*o.op.length !== 0*/ typeof o.op !== "undefined")
                        {
                            return that.build_B2(o);
                        }
                        // C1 : TYPE DD-INPUT-NUMBER , MODE : SINGLE
                        //
                        else if (o.type === "dd-input-number" && typeof o.value1 !== "undefined" && /*o.op !== ""*/ typeof o.op !== "undefined")
                        {
                            return that.build_C1(o);
                        }
                        // C2 : TYPE DD-INPUT-NUMBER , MODE : MULTI
                        //
                        else if (o.type === "dd-input-number" && typeof o.values1 !== "undefined" && /*o.op.length !== 0*/ typeof o.op !== "undefined")
                        {
                            return that.build_C2(o);
                        }
                        //  D1 : TYPE DICTIONANY , MODE : SINGLE
                        //
                        else if (o.type === "dictionnary" && typeof o.value !== "undefined")
                        {
                            return that.build_D1(o);
                        }
                        //  D2 : TYPE DICTIONANY , MODE : MULTI
                        //
                        else if (o.type === "dictionnary" && typeof o.values !== "undefined")
                        {
                            return that.build_D2(o);
                        }

                        return "[" + i + "]" + o.column_ref + "-" + o.type;
                    });
                }
            },
            watch:
            {
                'filter.sidebarFilter': function(o, ov)
                {
                    console.log(o, ov);
                    if (o === true)
                    {
                        document.querySelector("body").classList.add("sidenavActive");
                    }
                    else
                    {
                        document.querySelector("body").classList.remove("sidenavActive");
                    }
                }
            },
            /*
                        watch:
                        {
                            'filter.sidebarForm.form':
                            {
                                handler: function()
                                {
                                    // console.log(666);
                                    var f = [];

                                    for (var i = 0; i < this.filter.sidebarForm.form.length; i++)
                                    {

                                    }

                                },
                                deep: true
                            }
                        },*/
            methods:
            {
                /*
                    BUILD
                */
                build_A1: function(o)
                {
                    return (o.value != "") ? "( C[" + o.column_ref + "] OP:LK '%" + this.escapeSingleQuotes(o.value) + "%' )" : "";
                },
                build_A2: function(o)
                {
                    var r = [];

                    for (var i = 0; i < o.values.length; i++)
                    {
                        if (o.values[i] !== "")
                        {
                            r.push("( C[" + o.column_ref + "] OP:LK '%" + this.escapeSingleQuotes(o.values[i]) + "%' )");
                        }
                    }

                    return (r.length !== 0) ? "( " + r.join(" OR ") + " ) " : "";
                },
                build_B1: function(o)
                {
                    var v = o.value;
                    v = (o.op === "LK" || o.op === "SW") ? "%" + v : v;
                    v = (o.op === "LK" || o.op === "EW") ? v + "%" : v;

                    return (o.value != "" && o.op != "") ? "( C[" + o.column_ref + "] OP:" + o.op + " '" + this.escapeSingleQuotes(v) + "' )" : "";

                    // return (o.value != "" && o.op != "") ? "( C[" + o.column_ref + "] OP:" + o.op + " '" + this.escapeSingleQuotes(o.value) + "' )" : "";
                },
                build_B2: function(o)
                {
                    var r = [];
                    var v;

                    for (var i = 0; i < o.values.length; i++)
                    {
                        if (o.values[i] !== "" && o.op[i] !== "")
                        {
                            v = o.values[i];
                            v = (o.op[i] === "LK" || o.op[i] === "SW") ? "%" + v : v;
                            v = (o.op[i] === "LK" || o.op[i] === "EW") ? v + "%" : v;
                            r.push("( C[" + o.column_ref + "] OP:" + o.op[i] + " '" + v + "' )");

                            // r.push("( C[" + o.column_ref + "] OP:" + o.op[i] + " '" + o.values[i] + "' )");
                        }
                    }

                    return (r.length !== 0) ? "( " + r.join(" OR ") + " ) " : "";
                },
                build_C1: function(o)
                {
                    if (o.value1 !== "" && o.value2 !== "" && o.op === "RANGE")
                    {
                        return "( C[" + o.column_ref + "] OP:GT " + o.value1 + " AND C[" + o.column_ref + "] OP:LT " + o.value2 + " )";
                    }
                    else if (o.value1 !== "" && (o.op !== "" && o.op !== "RANGE"))
                    {
                        return "( C[" + o.column_ref + "] OP:" + o.op + " " + o.value1 + " )";
                    }

                    return "";
                },
                build_C2: function(o)
                {
                    var r = [];

                    for (var i = 0; i < o.values1.length; i++)
                    {
                        if (o.values1[i] !== "" && o.values2[i] !== "" && o.op[i] === "RANGE")
                        {
                            r.push("( C[" + o.column_ref + "] OP:GT " + o.values1[i] + " AND C[" + o.column_ref + "] OP:LT " + o.values2[i] + " )");
                        }
                        else if (o.values1[i] !== "" && (o.op[i] !== "" && o.op[i] !== "RANGE"))
                        {
                            r.push("( C[" + o.column_ref + "] OP:" + o.op[i] + " " + o.values1[i] + " )");
                        }
                    }

                    return (r.length !== 0) ? "( " + r.join(" OR ") + " ) " : "";
                },
                build_D1: function(o)
                {
                    return (o.value != "") ? "( C[" + o.column_ref + "] OP:EQ '" + this.escapeSingleQuotes(o.value) + "' )" : "";
                },
                build_D2: function(o)
                {
                    var r = [];

                    for (var i = 0; i < o.values.length; i++)
                    {
                        if (o.values[i] !== "")
                        {
                            r.push("( C[" + o.column_ref + "] OP:EQ '" + o.values[i] + "' )");
                        }
                    }

                    return (r.length !== 0) ? "( " + r.join(" OR ") + " ) " : "";
                },
                /*
                    FILTERS    
                */
                applyFilter: function()
                {
                    var g = this.expression.filter(function(o)
                    {
                        if (o !== "") return o;
                    }).join(" AND ");

                    console.log(g);

                    this.config.customParameters = g;

                    /*this.config.customParameters = [
                    {
                        "c": 4,
                        "o": "LT",
                        "v": "30"
                    }];*/
                },
                resetFilter: function(zz)
                {
                    var o;

                    for (var i = 0; i < zz.length; i++)
                    {
                        o = zz[i];

                        if (typeof o.value !== "undefined")
                        {
                            o.value = "";

                            if (typeof o.op !== "undefined")
                            {
                                o.op = "";
                            }
                        }

                        if (typeof o.values !== "undefined")
                        {
                            o.values = [];

                            if (typeof o.op !== "undefined")
                            {
                                o.op = [];
                            }
                        }

                        if (typeof o.value1 !== "undefined")
                        {
                            o.value1 = "";
                            o.value2 = "";
                            o.op = "";
                        }

                        if (typeof o.values1 !== "undefined")
                        {
                            o.values1 = [];
                            o.values2 = [];
                            o.op = [];
                        }

                        if (typeof o.tmp_value !== "undefined")
                        {
                            o.tmp_value = "";
                        }
                    }
                },
                /*
                    GET TEXT VALUE FROM A DICTIONNARY RELATED TO IT VALUE
                */
                getTextFromDictionary: function(dic, v)
                {
                    return dic.filter(function(o)
                    {
                        if (o.v === v) return o;
                    })[0].t;
                },
                /*
                    ESCAPE SINGLE QUOTE
                */
                escapeSingleQuotes: function(s)
                {
                    return s.replace(/'/g, "\\'");
                },
                /*
                    REPEATER - ADD
                */
                repeaterAdd: function(pe)
                {
                    for (var i = 0; i < pe.length; i++)
                    {
                        pe[i].push("");
                    }

                    document.activeElement.blur();
                },
                log: function(x)
                {
                    console.log(x);
                }
            }
        }
    );
}
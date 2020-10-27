/*jshint esversion: 6 */

var templateDataGreedConfig = `

    <button class="btn btn-sm btn-secondary" type="button" v-on:click="sw=!sw">Config Maker </button>
    <div v-if="sw" class="config-part">

        <br/>
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-link" :class="[tabs[0] ? 'active' : '']" v-on:click.prevent="tabs=[true,false,false,false,false]" id="nav-tab-1" data-toggle="tab" href="#nav-1" role="tab" aria-controls="nav-1" aria-selected="true">Config</a>
                <a class="nav-link" :class="[tabs[1] ? 'active' : '']" v-on:click.prevent="tabs=[false,true,false,false,false]" id="nav-tab-2" data-toggle="tab" href="#nav-2" role="tab" aria-controls="nav-2" aria-selected="false">Header</a>
                <a class="nav-link" :class="[tabs[2] ? 'active' : '']" v-on:click.prevent="tabs=[false,false,true,false,false]" id="nav-tab-3" data-toggle="tab" href="#nav-3" role="tab" aria-controls="nav-3" aria-selected="false">Labels</a>
                <a class="nav-link" :class="[tabs[3] ? 'active' : '']" v-on:click.prevent="tabs=[false,false,false,true,false]" id="nav-tab-4" data-toggle="tab" href="#nav-4" role="tab" aria-controls="nav-3" aria-selected="false">Css</a>
                <a class="nav-link" :class="[tabs[4] ? 'active' : '']" v-on:click.prevent="tabs=[false,false,false,false,true]" id="nav-tab-5" data-toggle="tab" href="#nav-5" role="tab" aria-controls="nav-3" aria-selected="false">Columns</a>
            </div>
        </nav>
  
        <div class="tab-content tab-border" id="nav-tabContent">
            
            <!-- CONFIG -->
            <div class="tab-pane fade p-3" :class="[tabs[0] ? 'show active' : '']" id="nav-home" role="tabpanel" aria-labelledby="nav-1">

                <form>
                              
                    <template v-for="(e,k) in this.config.options">
                        
                        <!-- CUSTOM #1 -->
                        <div class="form-group row" v-if="k ==='recordsPerPage' ">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-3">
                                <select v-model="this.config.options.recordsPerPage" class="form-control form-control-sm">
                                    <option v-for="d in this.config.options.perPageOptions">{{d}}</option>
                                </select>                                        
                            </div>
                        </div>            
                        <!-- /CUSTOM #1 -->      

                        <!-- CUSTOM #2 -->
                        <div class="form-group row" v-if="k ==='perPageOptions' ">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">
                                <button type="button" class="btn btn-sl btn-success float-left pl-1 pr-1 pt-0 pb-0" v-on:click="this.config.options.perPageOptions.push( parseInt(this.config.options.perPageOptions[this.config.options.perPageOptions.length-1])+1 ) ">+</button>
                                <div v-for="(d,index) in this.config.options.perPageOptions" class="float-left pl-1 pb-1">
                                    <span v-if="false" class="badge badge-secondary font-weight-normal">{{d}}</span>
                                    <input type="text" v-model="this.config.options.perPageOptions[index]" class="form-control form-control-sm float-left  w75p" size="4">
                                    <button type="button" class="btn btn-sl btn-danger pl-1 pr-1 pt-0 pb-0 lh14px float-left" v-on:click="this.config.options.perPageOptions.splice(index, 1);">&times;</button>
                                </div>
                            </div>
                        </div>
                        <!-- /CUSTOM #2 -->

                        <div class="form-group row" v-if="typeof e ==='string' ">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="this.config.options[k]" class="form-control form-control-sm">
                            </div>
                        </div>    
                        
                        <div class="form-group row" v-if="typeof e ==='boolean' ">
                        <label class="col-sm-3 col-form-label fs14px">{{k}}</label>
                        <div class="col-sm-3">
                            <select v-model="this.config.options[k]" class="form-control form-control-sm">
                                <option :value="true">True</option>
                                <option :value="false">False</option>
                            </select>                                        
                        </div>
                    </div>                         
                    
                    </template>

                </form>

            </div>
            <!-- /CONFIG -->

            <!-- HEADERS -->
            <div class="tab-pane fade p-3" :class="[tabs[1] ? 'show active' : '']" id="nav-2" role="tabpanel" aria-labelledby="nav-2">

                <form>
                                    
                    <!-- HEADER -->
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label fs14px">Columns Span</label>
                        <div class="col-sm-9">

                            <button type="button" class="btn btn-sl btn-success float-left pl-1 pr-1 pt-0 pb-0" v-on:click="this.config.options.header.push( 1 ) ">+</button>
                            <br/>
                            <br/>

                            <table class="table">
                            <tr v-for="(d,index) in this.config.options.header">
                                <td>
                                    <span v-if="false" class="badge badge-secondary font-weight-normal">{{d}}</span>
                                </td>
                                <td>
                                    <input type="number" v-model="this.config.options.header[index]" class="form-control form-control-sm" size="4">
                                </td>
                                <td>
                                    <input type="text" v-model="this.config.labels.header[index]" class="form-control form-control-sm">
                                </td>
                                <td>
                                    <button type="button" class="btn btn-sl btn-danger pl-1 pr-1 pt-0 pb-0 lh14px" v-on:click="this.config.options.header.splice(index, 1);">&times;</button>
                                </td>
                            </tr>
                            </table>
                        </div>
                    </div>
                    <!-- /HEADER -->  
                
                </form>

            </div>
            <!-- /HEADERS -->

            <!-- LABELS -->
            <div class="tab-pane fade p-3" :class="[tabs[2] ? 'show active' : '']" id="nav-3" role="tabpanel" aria-labelledby="nav-3">

                <form>
                    
                    <template v-for="(d,k) in this.config.labels">

                        <!-- STRING -->
                        <div class="form-group row" v-if="typeof d === 'string'">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="this.config.labels[k]" class="form-control form-control-sm">
                            </div>
                        </div>         
                        <!-- /STRING -->

                        <!-- OBJECT -->
                        <div class="form-group row" v-if="typeof d === 'object'">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">

                                <template v-for="(d2,k2) in d">

                                    <div class="form-group row">
                                        <label class="col-sm-1 col-form-label fs14px" v-if="typeof k2 ==='number'">#{{k2+1}}</label>
                                        <label class="col-sm-3 col-form-label fs14px text-capitalize" v-else>{{k2}}</label>
                                        <div class="col-sm-9">
                                            <input type="text" v-model="this.config.labels[k][k2]" class="form-control form-control-sm">
                                        </div>
                                    </div>         
    
                                </template>

                            </div>
                        </div>
                        <!-- /OBJECT -->


                    </template>

                </form>
            
            </div>
            <!-- /LABELS -->

            <!-- CSS -->
            <div class="tab-pane fade p-3" :class="[tabs[3] ? 'show active' : '']" id="nav-4" role="tabpanel" aria-labelledby="nav-4">

                <form>
                        
                    <template v-for="(d,k) in this.config.css">

                        <!-- STRING -->
                        <div class="form-group row" v-if="typeof d === 'string'">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="this.config.css[k]" class="form-control form-control-sm">
                            </div>
                        </div>         
                        <!-- /STRING -->

                        <!-- OBJECT -->
                        <div class="form-group row" v-if="typeof d === 'object'">
                            <label class="col-sm-3 col-form-label fs14px text-capitalize">{{k}}</label>
                            <div class="col-sm-9">

                                <template v-for="(d2,k2) in d">

                                    <div class="form-group row">
                                        <label class="col-sm-1 col-form-label fs14px" v-if="typeof k2 ==='number'">#{{k2+1}}</label>
                                        <label class="col-sm-3 col-form-label fs14px text-capitalize" v-else>{{k2}}</label>
                                        <div class="col-sm-9">
                                            <input type="text" v-model="this.config.css[k][k2]" class="form-control form-control-sm">
                                        </div>
                                    </div>         

                                </template>

                            </div>
                        </div>
                        <!-- /OBJECT -->

                    </template>

                </form>

            </div>
            <!-- /CSS -->

            <!-- COLUMNS -->
            <div class="tab-pane fade p-3" :class="[tabs[4] ? 'show active' : '']" id="nav-5" role="tabpanel" aria-labelledby="nav-5">
                
                <form>
                    
                    <ul class="list-group">
                    <template v-for="(d,k) in this.config.columns">

                        <li class="list-group-item">
                            
                            <!-- NAME -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px text-capitalize">Name</label>
                                <div class="col-sm-9">
                                    <input type="text" v-model="this.config.columns[k].name" class="form-control form-control-sm">
                                </div>
                            </div>   
                            <!-- /NAME -->

                            <!-- CLASS -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px text-capitalize">Class</label>
                                <div class="col-sm-9">
                                    <input type="text" v-model="this.config.columns[k].class" class="form-control form-control-sm">
                                </div>
                            </div>   
                            <!-- /CLASS -->
                            
                            <!-- VISIBILITY, SWITCH VISIBILITY -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px">Visibility</label>
                                <div class="col-sm-3">
                                    <select v-model="this.config.columns[k].visibility" class="form-control form-control-sm">
                                        <option :value="true">True</option>
                                        <option :value="false">False</option>
                                    </select>                                        
                                </div>  
                                <label class="col-sm-3 col-form-label fs14px">Switch Visibility</label>
                                <div class="col-sm-3">
                                    <select v-model="this.config.columns[k].switchVisibility" class="form-control form-control-sm">
                                        <option :value="true">True</option>
                                        <option :value="false">False</option>
                                    </select>                                        
                                </div> 
                            </div>
                            <!-- /VISIBILITY, SWITCH VISIBILITY -->

                            <!-- ORDER VISIBILITY, MODE -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px">Order Visibility</label>
                                <div class="col-sm-3">
                                    <select v-model="this.config.columns[k].orderVisibility" class="form-control form-control-sm">
                                        <option :value="true">True</option>
                                        <option :value="false">False</option>
                                    </select>                                        
                                </div>                            
                                <label class="col-sm-3 col-form-label fs14px">Order Mode</label>
                                <div class="col-sm-3">
                                    <select v-model="this.config.columns[k].orderMode" class="form-control form-control-sm">
                                        <option value="">None</option>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>                                        
                                </div>                            
                            </div>
                            <!-- /ORDER VISIBILITY, MODE -->

                            <!-- EXTRA -->

                            <!-- SEARCH ( COULD BE NOT DEFINED ) -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px text-capitalize">
                                    Search
                                    <button type="button" v-if="typeof this.config.columns[k].search!=='undefined' " class="btn btn-sm btn-danger float-right" v-on:click="delete this.config.columns[k].search">&times;</button>
                                    <button type="button" v-if="typeof this.config.columns[k].search==='undefined' " class="btn btn-sm btn-success float-right" v-on:click="this.config.columns[k].search={'type': 'input', 'value': '', 'minLength': 3}">+</button>
                                </label>
                                <div class="col-sm-9" v-if="typeof this.config.columns[k].search!=='undefined' ">
                                <div class="card">
                                <div class="card-body">
    
                                    <template v-for="(d2,k2) in this.config.columns[k].search">
    
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label fs14px text-capitalize">
                                                {{k2}}
                                            </label>
                                            <div class="col-sm-9">
                                                
                                                <!-- DEDICATE CASE FOR TYPE -->
                                                <div v-if="k2==='type'">
                                                    <select v-model="this.config.columns[k].search[k2]" class="form-control form-control-sm" v-on:change="testDictionnary(this.config.columns[k].search)">
                                                        <option value="input">Input</option>
                                                        <option value="select">select</option>
                                                    </select>                                                      
                                                </div>
                                                <!-- /DEDICATE CASE FOR TYPE -->

                                                <!-- STRING -->
                                                <input type="text" v-model="this.config.columns[k].search[k2]" class="form-control form-control-sm" v-else-if="typeof this.config.columns[k].search[k2] === 'string' ">
                                                <!-- /STRING -->

                                                <!-- NUMBER -->
                                                <input type="text" v-model="this.config.columns[k].search[k2]" class="form-control form-control-sm" v-else-if="typeof this.config.columns[k].search[k2] === 'number' ">
                                                <!-- /NUMBER -->

                                                <!-- OBJECT -->
                                                <div v-else>                                                        
                                                    <table class="table table-bordered">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                            <th>Value</th>
                                                            <th></th>
                                                        </tr>
                                                    <template v-for="(d3,k3) in this.config.columns[k].search[k2]">                                                    
                                                        <tr>
                                                            <td>{{k3+1}}</td>
                                                            <td><input type="text" v-model="this.config.columns[k].search[k2][k3].text" class="form-control form-control-sm"></td>
                                                            <td><input type="text" v-model="this.config.columns[k].search[k2][k3].value" class="form-control form-control-sm"></td>
                                                            <td>
                                                                <button type="button" class="btn btn-sl btn-danger pl-1 pr-1 pt-0 pb-0 lh14px" v-on:click="this.config.columns[k].search[k2].splice(k3, 1);">&times;</button>
                                                            </td>                
                                                        </tr>
                                                    </template>
                                                        <tr>
                                                            <td colspan="4">
                                                                <button type="button" class="btn btn-sm btn-success float-right pl-1 pr-1 pt-0 pb-0 lh14px" v-on:click="this.config.columns[k].search[k2].push( {'text':'','value':''} ) ">+</button>                                                    
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <!-- /OBJECT -->

                                            </div>
                                        </div>         
    
                                    </template>

                                </div>
                                </div>
                                </div>

                                <div v-else></div>
                                
                            </div>
                            <!-- /SEARCH -->                            

                            <!-- FCT TRANSFORM -->
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label fs14px text-capitalize">
                                    Fct Transform
                                </label>

                                <div class="col-sm-9" v-if="typeof this.config.columns[k].fctTransform!=='undefined' ">
                                    function(s, t)<br/>
                                    {<br/>
                                    <textarea class="form-control form-control-sm">{{this.config.columns[k].fctTransform.toString().trim().replace('function(s, t)','').trim().slice(1,-1).trim()}}</textarea>
                                    }<br/>
                                    <button type="button" class="btn btn-sm btn-secondary" v-on:click="udpateFctTransform($event,this.config.columns[k]);">Update</button>
                                    &#160;<button type="button" class="btn btn-sm btn-danger" v-on:click="delete this.config.columns[k].fctTransform;">Remove</button>
                                </div>

                                <div class="col-sm-9" v-else>
                                    FCT NOT EXIST - <button type="button" class="btn btn-sm btn-success" v-on:click="this.config.columns[k].fctTransform= function(s, t) { return s; } ">Add function</button>                                                    
                                </div>

                            </div>
                            <!-- /FCT TRANSFORM -->

                        </li>  

                    </template>
                    </ul>

                </form>

            </div>
            <!-- /COLUMNS -->


        </div>

    </div>    
`;
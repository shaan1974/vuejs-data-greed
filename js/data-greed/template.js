/*jshint esversion: 6 */

var templateDataGreed = `

    <div class="dataGreed" :class="{ 'table-responsive horizontal-scrollable' : config.options.horizontalScroll }" v-on:selectstart.prevent.stop="">
        
        <div v-if="this.config.options.globalSearch">

            <!-- SEARCH -->
            <form class="form-inline">

                <div class="form-group p2 mr-auto">
                    <button class="btn btn-sm btn-primary mb-2" v-html="config.labels.resetSearch" v-on:click.prevent="this._resetSearch()"></button>
                </div>

                <!-- GLOBAL SEARCH -->
                <div class="form-group p2 ml-auto">
                    <input class="form-control form-control-sm mb-2 mr-2" type="text" placeholder="..." v-model="this.globalSearch" v-on:focus="this._resetFilter('COLUMNS')">
                    <button class="btn btn-sm btn-primary mb-2" v-html="config.labels.globalSearch" v-on:click.prevent="this._navigate(1)" :disabled="this.globalSearch.length<this.config.options.globaSearchMinLength"></button>
                </div>
                <!-- /GLOBAL SEARCH -->

            </form>
            <!-- /SEARCH -->

        </div>
        <table class='table' :class="[ config.css.table ? ''+config.css.table+'' : '' , config.options.verticalScroll ? 'scrollTableVertical' : '' , config.options.responsive ? 'rr' : '' ]">
            
            <thead>
                
                <!-- HEADER -->
                <tr v-if="config.options.header">

                    <template v-for="(d,index) in config.options.header">
                                        
                        <th :colspan="config.columns.filter( function(o,i) { if ( (i>=((typeof config.options.header[index-1] === 'undefined' ) ? 0 : config.options.header[index-1]) && i<(((typeof config.options.header[index-1] === 'undefined' ) ? 0 : config.options.header[index-1])+config.options.header[index])) && o.visibility===true) return o;} ).length" v-html="config.labels.header[index]"></th>

                    </template>

                </tr>
                <!-- /HEADER -->

                <!-- COLUMNS NAME -->
                <tr>
                    <template v-for="(d,index) in config.columns">
                        
                        <th scope="col"  
                            class="position-relative pl-3" 
                            :class="[ config.columns[index].orderVisibility ? 'order' : '' , config.columns[index].orderMode ]" 
                            v-on:click="this._setOrder($event,index)" 
                            v-if="config.columns[index].visibility" v-html="d.name">
                        </th>
                        
                    </template>
                </tr>
                <!-- /COLUMNS NAME -->

                <!-- SEARCH ON COLUMNS -->
                <tr v-if="this.config.columns.filter( function(o) { if (o.search!==undefined) return o;} ).length!==0">
                
                    <template v-for="(d,index) in config.columns">

                        <th scope="col"  
                            class="position-relative pl-3" :class="classColumn[index]" 
                            v-if="config.columns[index].visibility">
                            
                            <template v-if="d.search">

                                <template v-if="d.search.type === 'input'">
                                    <input class="form-control form-control-sm search-box" type="text" placeholder="..." v-model="d.search.value" v-on:input="this._searchFilter($event,index)" v-on:focus="this._resetFilter('GLOBAL')">
                                    <span v-if="d.search.value.length>=d.search.minLength" v-on:click="d.search.value='';this._deferNavigate($event,1);" class="eraseIcon">&times;</span>
                                </template>

                                <template v-else-if="d.search.type === 'select'">
                                    <select id="inputState" class="form-control form-control-sm" :class="[d.search.css]" v-model="d.search.value" v-on:change="this._searchFilter($event,index)" v-on:focus="this._resetFilter('GLOBAL')">
                                        <option></option>
                                        <option v-for="(l,index) in d.search.dictionnary" :value="l.value">{{l.text}}</option>
                                    </select>
                                </template>

                            </template>

                        </th>

                    </template>

                </tr>
                <!-- /SEARCH ON COLUMNS -->

            </thead>
            
            <tbody>
                
                <div :class="[ this.loading ? 'dynamicTableLoader' : 'noDynamicTableLoader' ]"></div>
                
                <!-- RECORDS -->
                <tr v-for="(d,main_index) in records">

                    <template v-for="(e,index) in d">
                                            
                        <td v-if="config.columns[index].visibility" :class="[config.columns[index].class , this.order.filter( function(o) { if(o.p===index) return o;} ).length === 1 && this.config.options.visualFilterForOrderedColumns ? 'activeSorting' : '' ]" :data-label="this.config.columns[index].name">
                            
                            <span v-if="typeof this.config.columns[index].fctTransform ==='undefined'" v-html="this._highlight(e,index)"></span>
                            <span v-else v-html="this.config.columns[index].fctTransform(e,records[main_index])"></span>
    
                        </td>

                    </template>

                </tr>
                <!-- /RECORDS -->

                <!-- NO RECORDS -->
                <tr v-if="records.length===0">
                    <td class="text-center" :colspan="this.config.columns.filter( function(o) { if (o.visibility===true) return o;} ).length" v-html="config.labels.noRecordsFound"></td>
                </tr>
                <!-- /NO RECORDS -->

                <template v-if="parseInt(records.length)!=parseInt(this.config_recordsPerPage) && this.config.options.displayEmptyLines">
                
                    <tr v-for="n in ( parseInt(this.config_recordsPerPage)-this.records.length)">

                        <template v-for="n in (this.config.columns.length)">
                            <td v-if="config.columns[n-1].visibility">&#160;</td>
                        </template>

                    </tr>

                </template>

            </tbody>

        </table>

    </div>

    <nav aria-label="Page navigation example" class="dataGreedPagination">

        <span class="jump_page" v-if="this.config.options.jumpPage">
            <span>Page:</span>
            <select class="form-control form-control-sm" v-on:change="this._navigate($event.target.value)">
                <option v-for="p in totalPages" :selected="p===parseInt(this.pageno)">{{p}}</option>
            </select>
        </span>

        <ul class="pagination pagination-sm" :class="this.config.css.pagerPosition">        
            <li v-for="p in pagination" class="page-item" :class="[ p.active ? 'active' : '' ]">
                <a class="page-link" href="" v-on:click.prevent="this._navigate(p.v)">{{p.lbl}}</a>
            </li>
        </ul>
        
        <div class="entries">
            <span v-html="config.labels.pageSelect.show"></span>
            <select class="form-control form-control-sm" v-on:change="this._changePerPage($event);">
                <option v-for="p in this.config.options.perPageOptions" :selected="p===this.config_recordsPerPage">{{p}}</option>
            </select>
            <span v-html="config.labels.pageSelect.entries"></span>
        </div>       

        <div v-if="this.config.options.entriesInfo">
            &dash;&#160;<span v-html="config.labels.range.from"></span>&#160;{{dataFrom}}&#160;<span v-html="config.labels.range.to"></span>&#160;{{datatTo}} &#160;&dash;&#160;<span v-html="config.labels.total"></span> : {{this.totalRows}}
        </div>

    </nav>
    
`;
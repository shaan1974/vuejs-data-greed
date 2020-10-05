/*jshint esversion: 6 */

var templateDataGreed = `

    <div class="dataGreed" :class="{ 'table-responsive horizontal-scrollable' : config.options.horizontalScroll }" v-on:selectstart.prevent.stop="">
        
        <div>

            <!-- TOP TOOLBAR -->
            <form class="form-inline">

                <div class="form-group p2 mr-auto" v-if="this.config.options.globalSearch">
                    <button class="btn-reset-search btn btn-sm btn-primary mb-2" v-html="config.labels.resetSearch" v-on:click.prevent="this._resetSearch()"></button>
                </div>

                <!-- GLOBAL SEARCH -->
                <div class="form-group p2 ml-auto" v-if="this.config.options.globalSearch">
                    <input class="form-control form-control-sm mb-2 mr-2" type="text" placeholder="..." v-model="this.globalSearch" v-on:focus="this._resetFilter('COLUMNS')">
                    <button class="btn-global-search btn btn-sm btn-primary mb-2" v-html="config.labels.globalSearch" v-on:click.prevent="this._navigate(1)" :disabled="this.globalSearch.length<this.config.options.globaSearchMinLength"></button>
                </div>
                <!-- /GLOBAL SEARCH -->

                <!-- COLUMNS VISIBILITY -->
                <div class="form-group p2" :class="this.config.options.globalSearch ? '' : 'ml-auto'">
                    <div class="dropdown dropdown-cvisibility" :class="[ this.btnColumnsVisibility ? 'show' : '' ]">
                        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on:click="this.btnColumnsVisibility=!this.btnColumnsVisibility" v-html="config.labels.visibility"></button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" :class="[ this.btnColumnsVisibility ? 'show' : '' ]">
                            
                            <template v-for="(d,index) in config.columns">
                            
                                <div class="form-check" v-if="d.switchVisibility">
                                    <input class="form-check-input" type="checkbox" value="" :id="'defaultCheck'+index+''" :checked="d.visibility" v-on:change="d.visibility=!d.visibility">
                                    <label class="form-check-label" :for="'defaultCheck'+index+''">{{d.name}}</label>
                                </div>    

                                <div class="clearfix" v-if="d.switchVisibility"></div>
                            
                            </template>

                        </div>
                    </div>                
                </div>
                <!-- /COLUMNS VISIBILITY -->

            </form>
            <!-- /TOP TOOLBAR -->

        </div>
        <table class='table' :class="[ config.css.table ? ''+config.css.table+'' : '' , config.options.verticalScroll ? 'scrollTableVertical' : '' , config.options.responsive ? 'rr' : '' ]">
            
            <thead>
                
                <!-- HEADER -->
                <tr v-if="config.options.header">

                    <template v-for="(d,index) in config.options.header">
                                        
                        <th :colspan="config.columns.filter( function(o,i) { if ( (i>=((typeof config.options.header[index-1] === 'undefined' ) ? 0 : config.options.header[index-1]) && i<(((typeof config.options.header[index-1] === 'undefined' ) ? 0 : config.options.header[index-1])+config.options.header[index])) && o.visibility===true) return o;} ).length" v-html="config.labels.header[index]"></th>

                    </template>

                    <th v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">&#160;</th>

                </tr>
                <!-- /HEADER -->

                <!-- COLUMNS NAME -->
                <tr>
                    <template v-for="(d,index) in config.columns">
                        
                        <th scope="col"  
                            class="position-relative pl-3" 
                            :class="[ config.columns[index].orderVisibility ? 'order' : '' , config.columns[index].orderMode ]" 
                            v-on:click="this._setOrder($event,index)" 
                            v-if="config.columns[index].visibility" xv-html="d.name" v-html="config.labels.columns[index]">
                        </th>                        
                        
                    </template>

                    <th v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">&#160;</th>

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
                                    <input class="form-control form-control-sm search-box" :class="[d.search.css]" type="text" placeholder="..." v-model="d.search.value" v-on:input="this._searchFilter($event,index)" v-on:focus="this._resetFilter('GLOBAL')">
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

                    <th v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">&#160;</th>

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
                            <span v-else v-html="this._highlight(this.config.columns[index].fctTransform(e,records[main_index]),index)"></span>
    
                        </td>

                    </template>

                    <td v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">

                        <div :class="config.options.outSideButtons ? 'btn-container': ''">
                            <template v-for="(e,index) in config.buttons">
                                <button type="button" class="btn btn-sm mr-1" :class="e.css" v-on:click="this._buttons(e,d,main_index);" v-html="config.labels.buttons[e.label]"></button>
                            </template>
                        </div>

                    </td>

                </tr>
                <!-- /RECORDS -->

                <!-- NO RECORDS -->
                <tr v-if="records.length===0">
                    <td class="text-center" :colspan="this.config.columns.filter( function(o) { if (o.visibility===true) return o;} ).length" v-html="config.labels.noRecordsFound"></td>
                    <td v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">&#160;</td>
                </tr>
                <!-- /NO RECORDS -->

                <template v-if="parseInt(records.length)!=parseInt(this.config_recordsPerPage) && this.config.options.displayEmptyLines">
                
                    <tr v-for="n in ( parseInt(this.config_recordsPerPage)-this.records.length)">

                        <template v-for="n in (this.config.columns.length)">
                            <td v-if="config.columns[n-1].visibility">&#160;</td>
                        </template>

                        <td v-if="config.buttons.length!==0" :class="config.options.outSideButtons ? 'btns-cell': ''">&#160;</td>

                    </tr>

                </template>

            </tbody>

        </table>

    </div>

    <nav aria-label="Page navigation" class="dataGreedPagination" v-if="records.length!==0">

        <span class="jump_page" v-if="this.config.options.jumpPage">
            <span v-html="config.labels.page"></span>
            <select class="form-control form-control-sm" v-on:change="this._navigate($event.target.value)">
                <option v-for="p in totalPages" :selected="p===parseInt(this.pageno)">{{p}}</option>
            </select>
        </span>

        <ul class="pagination pagination-sm" :class="this.config.css.pagerPosition">        
            <li v-for="p in pagination" class="page-item" :class="[ p.active ? 'active' : '' ]">
                <a class="page-link" :class="p.aclass" href="" v-on:click.prevent="this._navigate(p.v)">{{p.lbl}}</a>
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

    <template v-if="false">
    <hr/>
    <button v-on:click="this.$emit('callback' , { 'a' : '421' , 'b' : '666' } )">TEST</button>
    <hr/>
    </template>
    
`;
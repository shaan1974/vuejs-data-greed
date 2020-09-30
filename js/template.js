/*jshint esversion: 6 */

var templateDataGreed = `

    <div class="dataGreed" :class="{ 'table-responsive horizontal-scrollable' : config.horizontalScroll }" v-on:selectstart.prevent.stop="">
        
        <div v-if="this.config.globalSearch">

            <!-- GLOBAL SEARCH -->
            <form class="form-inline">
                <div class="form-group p2 ml-auto">
                    <input class="form-control form-control-sm mb-2 mr-2" type="text" placeholder="..." v-model="this.globalSearch" v-on:focus="this._resetFilter('COLUMNS')">
                    <button class="btn btn-sm btn-primary mb-2" v-html="config.labels.search"></button>
                </div>
            </form>
            <!-- /GLOBAL SEARCH -->

        </div>
        <table class='table' :class="[ config.css.table ? ''+config.css.table+'' : '' , config.verticalScroll ? 'scrollTableVertical' : '' , config.responsive ? 'rr' : '' ]">
            
            <thead>

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
                            class="position-relative pl-3"                             
                            v-if="config.columns[index].visibility">
                            
                            <template v-if="d.search">

                                <template v-if="d.search.type === 'input'">
                                    <input class="form-control form-control-sm" type="text" placeholder="..." v-model="d.search.value" v-on:input="this._searchFilter()" v-on:focus="this._resetFilter('GLOBAL')">
                                </template>

                                <template v-else-if="d.search.type === 'select'">
                                    <select id="inputState" class="form-control form-control-sm" :class="d.search.css" v-model="d.search.value" v-on:change="this._searchFilter()" v-on:focus="this._resetFilter('GLOBAL')">
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

                <tr v-for="(d,main_index) in records">

                    <template v-for="(e,index) in d">
                        
                        <td v-if="config.columns[index].visibility" :class="config.columns[index].class" :data-label="this.config.columns[index].name">

                            <span v-if="typeof this.config.columns[index].fctTransform ==='undefined'" v-html="e"></span>
                            <span v-else v-html="this.config.columns[index].fctTransform(e,records[main_index])"></span>
    
                        </td>

                    </template>

                </tr>

                <template v-if="records.length!=this.config_recordsPerPage && this.config.displayEmptyLines ">
                
                    <tr v-for="n in (this.config_recordsPerPage.length)">

                        <template v-for="n in (this.config.columns.length)">
                            <td v-if="config.columns[n-1].visibility">&#160;</td>
                        </template>

                    </tr>

                </template>
            </tbody>

        </table>

    </div>

    <nav aria-label="Page navigation example" class="dataGreedPagination">
        
        <ul class="pagination pagination-sm" :class="this.config.css.pagerPosition">        
            <li v-for="p in pagination" class="page-item" :class="[ p.active ? 'active' : '' ]">
                <a class="page-link" href="" v-on:click.prevent="this._navigate(p.v)">{{p.lbl}}</a>
            </li>
        </ul>

        <div class="entries">
            <span v-html="config.labels.pageSelect.show"></span>
            <select class="form-control form-control-sm" v-on:change="this._changePerPage($event);">
                <option v-for="p in this.config.perPageOptions" :selected="p===this.config_recordsPerPage">{{p}}</option>
            </select>
            <span v-html="config.labels.pageSelect.entries"></span>
        </div>       

        <div>
            &#160;&dash;&#160;<span v-html="config.labels.range.from"></span>&#160;{{dataFrom}}&#160;<span v-html="config.labels.range.to"></span>&#160;{{datatTo}}
        </div>

    </nav>
    
`;
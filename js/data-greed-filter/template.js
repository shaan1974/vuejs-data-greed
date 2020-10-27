/*jshint esversion: 6 */

var templateDataGreedFilter = `

    <!-- EXAMPLE SIDEBAR CUSTOM FILTER -->
    <div class="sidenav" :class="[this.filter.sidebarFilter ? 'on' : '']">
        
        <a class="closebtn cursor" v-on:click.prevent="this.filter.sidebarFilter=false;">&times;</a>

        <form>

            <pre style="background-color:pink;" v-if="false">
            {{filter.sidebarForm.form}}
            </pre>

            <!-- TITLE -->
            <div class="form-group input_sep pb-2">
                <label><u v-html="filter.labels.title"></u>:</label>
                <div v-if="filter.sidebarForm.mode!='full'">

                    <select class="form-control form-control-sm pl-1 pr-1" v-model="this.filter.sidebarForm.mode" v-on:change="this.resetFilter(this.filter.sidebarForm.form);">
                        <option value="classic">{{filter.labels.filter_classic}}</option>
                        <option value="extended">{{filter.labels.filter_extended}}</option>
                    </select>                

                </div>
            </div>
            <!-- /TITLE -->
            
            <template v-for="(d,form_index) in filter.sidebarForm.form">
            <template v-if="filter.sidebarForm.mode==='full' || (filter.sidebarForm.mode==='classic' && d.fmode==='classic') || (filter.sidebarForm.mode==='extended' && d.fmode==='extended') ">

                <!-- A -->
                <template v-if="d.type==='input-text'">

                    <!-- A1 : TYPE : INPUT-TEXT , MODE SINGLE -->                    
                    <div class="form-group input_sep pb-2" v-if="typeof d.value !== 'undefined' ">
                        
                        <div class="w-100">
                            <label>{{config.labels.columns[d.column_ref]}}</label>
                        </div>

                        <input type="text" class="form-control form-control-sm" placeholder="..." v-model="d.value">

                    </div>                    
                    <!-- /A1 -->
                
                    <!-- A2 : TYPE : INPUT-TEXT , MODE REPEATER -->                    
                    <div class="form-group input_sep pb-2" v-if="typeof d.values !== 'undefined' ">
                        
                        <div class="w-100 pb-2">
                            <label>{{config.labels.columns[d.column_ref]}}</label> 
                            <button type="button" class="btn btn-sm btn-success float-right ml-2" v-on:click="this.repeaterAdd([d.values])">+</button>
                            <button type="button" class="btn btn-sm btn-secondary float-right" v-on:click="this.resetFilter([d])" v-if="d.values.length!==0">/</button>
                        </div>
                        
                        <div class="row pb-2" v-for="(e,inside_index) in d.values">
                            <div class="col-10">
                                <input type="text" class="form-control form-control-sm" placeholder="..." v-model="d.values[inside_index]">
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-sm btn-danger mr-1" v-on:click="d.values.splice(inside_index, 1);">-</button>
                            </div>
                        </div>                    

                    </div>                         
                    <!-- /A2 -->                   

                </template>
                <!-- A -->

                <!-- B -->
                <template v-if="d.type==='dd-input-text'">
                    
                    <!-- B1 : TYPE DD-INPUT-TEXT , MODE : SINGLE -->
                    <div class="form-row input_sep mb-2" v-if="typeof d.value !== 'undefined' ">

                        <div class="form-group col-md-5">
                            <label>{{config.labels.columns[d.column_ref]}}</label>
                            <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op">
                                <option v-for="e in this.filter.sidebarForm.dropdown[d.dic]" :value="e.v">{{e.t}}</option>
                            </select>
                        </div>

                        <div class="form-group col-md-7">
                            <label class="w-100">&#160;<span class="float-right badge badge-secondary span_clear" v-on:click="this.resetFilter([d])" v-if="d.op!=''">/</span></label>
                            <input type="text" class="form-control form-control-sm" v-model="d.value" v-if="d.op!==''">
                        </div>      

                    </div>
                    <!-- /B1 -->  
                    
                    <!-- B2 : TYPE DD-INPUT-TEXT , MODE : MULTI -->
                    <div class="form-row input_sep mb-2" v-if="typeof d.values !== 'undefined' ">
                        
                        <div class="col-12 pb-2">
                            <label>{{config.labels.columns[d.column_ref]}}</label>                            
                            <button type="button" class="btn btn-sm btn-success float-right ml-2" v-on:click="this.repeaterAdd([d.values,d.op])">+</button>
                            <button type="button" class="btn btn-sm btn-secondary float-right" v-on:click="this.resetFilter([d])" v-if="d.values.length!==0">/</button>
                        </div>
                        
                        <template v-for="(e,inside_index) in d.values">
                            
                            <div class="form-group col-md-4">
                                <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op[inside_index]">
                                    <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                                </select>
                            </div>

                            <div class="form-group col-md-6">
                                <input type="text" class="form-control form-control-sm" v-model="d.values[inside_index]" v-if="d.op!==''">
                            </div>    
                            
                            <div class="col-2">
                                <button type="button" class="btn btn-sm btn-danger float-right" v-on:click="d.values.splice(inside_index, 1);d.op.splice(inside_index, 1)">-</button>
                            </div>                        
                        
                        </template>

                    </div>            
                    <!-- /B2 -->   

                </template>    
                <!-- /B -->
                
                <!-- C -->
                <template v-if="d.type==='dd-input-number'">

                    <!-- C1 : TYPE DD-INPUT-NUMBER , MODE : SINGLE -->

                    <div class="form-row input_sep mb-2" v-if="typeof d.value1 !== 'undefined' ">
                        
                        <div class="form-group col-md-4">
                            <label>[C1]{{config.labels.columns[d.column_ref]}}</label>
                            <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op">
                                <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                            </select>
                        </div>

                        <div class="form-group col-md-4">
                            <label>&#160;</label>
                            <input type="number" class="form-control form-control-sm" v-model="d.value1" v-if="d.op!==''">
                        </div>
                        <div class="form-group col-md-4">
                            <label class="w-100">&#160;<span class="float-right badge badge-secondary span_clear" v-on:click="this.resetFilter([d])" v-if="d.op!=''">/</span></label>
                            <input type="number" class="form-control form-control-sm" v-model="d.value2" v-if="d.op==='RANGE'">
                        </div>                

                    </div>
                    <!-- /C1 -->

                    <!-- C2 : TYPE DD-INPUT-NUMBER , MODE : MULTI -->
                    <div class="form-row input_sep mb-2" v-if="typeof d.values1 !== 'undefined' ">
                        
                        <div class="col-12 pb-2">
                            <label>{{config.labels.columns[d.column_ref]}}</label>                            
                            <button type="button" class="btn btn-sm btn-success float-right ml-2" v-on:click="this.repeaterAdd([d.values1,d.values2,d.op])">+</button>
                            <button type="button" class="btn btn-sm btn-secondary float-right" v-on:click="this.resetFilter([d])" v-if="d.values1.length!==0">/</button>
                        </div>

                        <template v-for="(e,inside_index) in d.values1">

                            <div class="form-group col-md-4">
                                <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op[inside_index]">
                                    <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                                </select>
                            </div>
                                                    
                            <div class="form-group col-md-3">
                                <input type="number" class="form-control form-control-sm" v-model="d.values1[inside_index]" v-if="d.op[inside_index]!==''">
                            </div>
                            
                            <div class="form-group col-md-3">
                                <input type="number" class="form-control form-control-sm" v-model="d.values2[inside_index]" v-if="d.op[inside_index]==='RANGE'">
                            </div>      
                            
                            <div class="form-group col-md-2">
                                <button type="button" class="btn btn-sm btn-danger float-right" v-on:click="d.values1.splice(inside_index, 1);d.values2.splice(inside_index, 1);d.op.splice(inside_index, 1)">-</button>
                            </div>
                                                
                        </template>                    

                    </div>
                    <!-- /C2 -->

                </template>
                <!-- /C -->

                <!-- D -->
                <template v-if="d.type==='dictionnary'">

                    <!-- D1 : TYPE DICTIONANY , MODE : SINGLE -->
                    <div class="form-group input_sep pb-2" v-if="typeof d.value !== 'undefined' ">
                    
                        <label>{{config.labels.columns[d.column_ref]}}</label>
                        <select class="form-control form-control-sm pl-1 pr-1" v-model="d.value">
                            <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                        </select>

                    </div>
                    <!-- /D1 -->

                    <!-- D2 : TYPE DICTIONANY , MODE : MULTI -->
                    <div class="form-row input_sep mb-2" v-if="typeof d.values !== 'undefined' ">

                        <div class="col-12 pb-2"><label>{{config.labels.columns[d.column_ref]}}</label></div>

                        <div class="col-9 mb-2">
                            <select class="form-control form-control-sm pl-1 pr-1" v-model="d.tmp_value">
                                <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v" :disabled="d.values.indexOf(f.v)!==-1">{{f.t}}</option>
                            </select>
                        </div>

                        <div class="col-3 mb-2">
                            <button type="button" class="btn btn-sm btn-success float-right ml-2" :disabled="d.tmp_value===''" :class="[d.tmp_value==='' ? 'disabled' : '']" v-on:click="d.values.push(d.tmp_value);d.tmp_value='';">+</button>
                            <button type="button" class="btn btn-sm btn-secondary float-right" v-on:click="this.resetFilter([d])" v-if="d.values.length!==0">/</button>
                        </div>

                        <div class="col-md-12 mb-1">
                            <template v-for="(e,inside_index) in d.values">

                                <h6 class="bbadge float-left pr-2 pb-2">
                                    <span class="badge badge-light font-weight-normal">{{this.getTextFromDictionary(filter.sidebarForm.dropdown[d.dic],d.values[inside_index])}}</span>
                                    <span class="badge-icon" v-on:click="d.values.splice(inside_index, 1);">&times;</span>
                                </h6>

                            </template>
                        </div>

                    </div>
                    <!-- /D2 -->                
                
                </template>
                <!-- /D -->

                <!-- E -->
                <template v-if="d.type==='dd-input-date'">

                    <!-- E1 : TYPE DD-INPUT-DATE , MODE : SINGLE -->

                    <div class="form-row input_sep mb-2" v-if="typeof d.value1 !== 'undefined' ">
                        
                        <div class="form-group col-md-4">
                            <label>[E1]{{config.labels.columns[d.column_ref]}}</label>
                            <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op">
                                <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                            </select>
                        </div>

                        <div class="form-group col-md-8">
                            <label class="w-100">&#160;<span class="float-right badge badge-secondary span_clear" v-on:click="this.resetFilter([d])" v-if="d.op!=''">/</span></label>
                            <div>
                                <input type="date" class="form-control form-control-sm mb-2" v-model="d.value1" v-if="d.op!==''">
                                <input type="date" class="form-control form-control-sm" v-model="d.value2" v-if="d.op==='RANGE'">
                            </div>
                        </div>
                        <!--
                        <div class="form-group col-md-4">
                            <label>&#160;</label>
                            <input type="date" class="form-control form-control-sm" v-model="d.value1" v-if="d.op!==''">
                        </div>
                        <div class="form-group col-md-4">
                            <label class="w-100">&#160;<span class="float-right badge badge-secondary span_clear" v-on:click="this.resetFilter([d])" v-if="d.op!=''">/</span></label>
                            <input type="date" class="form-control form-control-sm" v-model="d.value2" v-if="d.op==='RANGE'">
                        </div>                
                        -->

                    </div>
                    <!-- /E1 -->

                    <!-- E2 : TYPE DD-INPUT-DATE , MODE : MULTI -->
                    <div class="form-row input_sep mb-2" v-if="typeof d.values1 !== 'undefined' ">
                        
                        <div class="col-12 pb-2">
                            <label>{{config.labels.columns[d.column_ref]}}</label>                            
                            <button type="button" class="btn btn-sm btn-success float-right ml-2" v-on:click="this.repeaterAdd([d.values1,d.values2,d.op])">+</button>
                            <button type="button" class="btn btn-sm btn-secondary float-right" v-on:click="this.resetFilter([d])" v-if="d.values1.length!==0">/</button>
                        </div>

                        <template v-for="(e,inside_index) in d.values1">

                            <div class="form-group col-md-4">
                                <select class="form-control form-control-sm pl-1 pr-1" v-model="d.op[inside_index]">
                                    <option v-for="f in this.filter.sidebarForm.dropdown[d.dic]" :value="f.v">{{f.t}}</option>
                                </select>
                            </div>
                                                    
                            <div class="form-group col-md-3">
                                <input type="date" class="form-control form-control-sm" v-model="d.values1[inside_index]" v-if="d.op[inside_index]!==''">
                            </div>
                            
                            <div class="form-group col-md-3">
                                <input type="date" class="form-control form-control-sm" v-model="d.values2[inside_index]" v-if="d.op[inside_index]==='RANGE'">
                            </div>      
                            
                            <div class="form-group col-md-2">
                                <button type="button" class="btn btn-sm btn-danger float-right" v-on:click="d.values1.splice(inside_index, 1);d.values2.splice(inside_index, 1);d.op.splice(inside_index, 1)">-</button>
                            </div>
                                                
                        </template>                    

                    </div>
                    <!-- /E2 -->

                </template>              
                <!-- E -->  

            </template>
            </template>

            <div class="clearfix pt-1"></div>

            <button type="button" class="btn btn-secondary btn-sm float-left" v-on:click="this.resetFilter(this.filter.sidebarForm.form,'full')" v-html="filter.labels.btn_reset"></button>
            <button type="button" class="btn btn-primary btn-sm float-right" v-on:click="this.applyFilter()" v-html="filter.labels.btn_filters"></button>

            <br/>

        </form>

    </div>

    <!-- /EXAMPLE SIDEBAR CUSTOM FILTER -->

    <teleport to="body">
        <div v-if="backDrop" class="modal-backdrop fade show"></div>
    </teleport> 

`;
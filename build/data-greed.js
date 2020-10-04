/*
 Copyright 2020 Liuzzi Stéphane
 Original sources are available at https://github.com/shaan1974/vuejs-data-greed/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

var styles = '.dataGreed{font-size:14px}.dataGreedPagination{color:#000;background-color:#eaeaea;font-size:14px}.dataGreedPagination div.entries select{width:70px;cursor:pointer;text-align-last:right}.dataGreedPagination div.entries select option{direction:rtl}.dataGreedPagination div{display:inline-flex}.dataGreedPagination div.entries span{display:inline-block;padding:5px;padding-left:10px;padding-right:10px}.scrollTableVertical tbody{display:block;max-height:200px;overflow-y:auto}.scrollTableVertical thead, .scrollTableVertical tbody tr{display:table;width:100%;table-layout:fixed}.scrollTableVertical thead{width:calc( 100% - 1em)}.horizontal-scrollable{overflow-x:auto;white-space:nowrap}.horizontal-scrollable>table{float:none}.dataGreed .noDynamicTableLoader{position:absolute;top:-1px;left:0px;width:100%;height:1px}.dataGreed .dynamicTableLoader{position:absolute;background-color:#eaeaea;width:100%;height:100%;z-index:5;top:-1px;left:0px;opacity:0.5}.dataGreed .order{cursor:pointer}.dataGreed .order:before{position:absolute;bottom:13px;right:4px;content:"";display:inline-block;width:0;height:0;border-style:solid;border-width:8px 6px 0 6px;border-color:#868686 transparent transparent transparent}.dataGreed .order:after{position:absolute;right:4px;top:13px;content:"";display:inline-block;width:0;height:0;border-style:solid;border-width:0 6px 8px 6px;border-color:transparent transparent #868686 transparent}.dataGreed .order.asc, .dataGreed .order.desc{background-color:#343a40;color:#fff}.dataGreed .order.asc:before{_content:"∨";border-color:#fff transparent transparent transparent}.dataGreed .order.desc:after{_content:"∧";border-color:transparent transparent #fff transparent}.dataGreed *{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media screen and (max-width:600px){table.rr{border:0}table.rr caption{_font-size:1.3em;font-size:14px}table.rr thead{border:none;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}table.rr tr{border-bottom:3px solid #ddd;display:block;margin-bottom:.625em}table.rr td{border-bottom:1px solid #ddd;display:block;_font-size:.8em;font-size:14px;text-align:right}table.rr td::before{content:attr(data-label);float:left;font-weight:bold;text-transform:uppercase}table.rr td:last-child{border-bottom:0}}.dataGreed textarea::-webkit-input-placeholder, .dataGreed input::-webkit-input-placeholder{color:#ababab!important}.dataGreed textarea::-moz-placeholder, .dataGreed input::-moz-placeholder{color:#ababab!important}.dataGreed textarea:-ms-input-placeholder, .dataGreed input:-ms-input-placeholder{color:#ababab!important}.dataGreed textarea:-moz-placeholder, .dataGreed input:-moz-placeholder{color:#ababab!important}.dataGreed textarea::placeholder, .dataGreed input::placeholder{color:#ababab!important}.dataGreed .form-control:focus, .dataGreed input[type=\'text\']:focus, .dataGreed input[type=\'range\']:focus{-moz-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(187, 227, 17, 0.6);-webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(187, 227, 17, 0.6);box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(187, 227, 17, 0.6);border-color:#8EC9F7;background-color:#F7F9FB}.dataGreed .form-control:focus, .dataGreed input[type=\'text\']:focus, .dataGreed input[type=\'range\']:focus{-webkit-box-shadow:none;box-shadow:none;outline:none}.dataGreed .form-control, .dataGreed [contenteditable="true"]{transition:border 0.2s;-webkit-transition:border 0.2s;transition:background-color 0.2s;-webkit-transition:background-color 0.2s}.dataGreed select:focus{border-bottom-left-radius:0px;border-bottom-right-radius:0px}.dataGreed .columnFilterAccepted{background-color:#d4edda}.dataGreed .filtered{backdrop-filter:brightness(95%)}.dataGreed .table thead th{padding-right:20px}.dataGreed .mw75px{min-width:75px}.dataGreed .eraseIcon{position:absolute;top:2px;right:2px;background-color:#aaa;color:#fff;border-radius:100%;width:15px;height:15px;text-align:center;line-height:12px;font-size:12px;font-weight:normal;cursor:pointer}.dataGreed mark{border-width:1px;border-style:solid}.dataGreed .activeSorting{backdrop-filter:brightness(95%)}.dataGreedPagination .jump_page{float:left;display:inline-flex}.dataGreedPagination .jump_page span{display:inline-block;padding:5px;padding-left:10px;padding-right:10px}.dataGreedPagination .jump_page select{cursor:pointer;width:65px;text-align-last:right}.dataGreedPagination .jump_page select option{direction:rtl}.dataGreed .dropdown-cvisibility{margin-bottom:8px;margin-left:4px}.dataGreed .dropdown-cvisibility .form-check{width:100%;background-color:transparent;padding-left:10px}.dataGreed .dropdown-cvisibility .form-check label{width:100%;background-color:transparent;text-align:left;display:block;padding-left:5px;cursor:pointer}.dataGreed .dropdown-cvisibility .form-check:hover{background-color:#007bff}.dataGreed .dropdown-cvisibility .form-check:hover label{background-color:#007bff;color:#fff}.dataGreed th[colspan=\'0\']{display:none}';

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

var templateDataGreed = decodeURIComponent("%3Cdiv%20class%3D%22dataGreed%22%20%3Aclass%3D%22%7B%20'table-responsive%20horizontal-scrollable'%20%3A%20config.options.horizontalScroll%20%7D%22%20v-on%3Aselectstart.prevent.stop%3D%22%22%3E%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20TOP%20TOOLBAR%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cform%20class%3D%22form-inline%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%20mr-auto%22%20v-if%3D%22this.config.options.globalSearch%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn-reset-search%20btn%20btn-sm%20btn-primary%20mb-2%22%20v-html%3D%22config.labels.resetSearch%22%20v-on%3Aclick.prevent%3D%22this._resetSearch()%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20GLOBAL%20SEARCH%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%20ml-auto%22%20v-if%3D%22this.config.options.globalSearch%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-control%20form-control-sm%20mb-2%20mr-2%22%20type%3D%22text%22%20placeholder%3D%22...%22%20v-model%3D%22this.globalSearch%22%20v-on%3Afocus%3D%22this._resetFilter('COLUMNS')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn-global-search%20btn%20btn-sm%20btn-primary%20mb-2%22%20v-html%3D%22config.labels.globalSearch%22%20v-on%3Aclick.prevent%3D%22this._navigate(1)%22%20%3Adisabled%3D%22this.globalSearch.length%3Cthis.config.options.globaSearchMinLength%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FGLOBAL%20SEARCH%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20COLUMNS%20VISIBILITY%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%22%20%3Aclass%3D%22this.config.options.globalSearch%20%3F%20''%20%3A%20'ml-auto'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22dropdown%20dropdown-cvisibility%22%20%3Aclass%3D%22%5B%20this.btnColumnsVisibility%20%3F%20'show'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn%20btn-sm%20btn-secondary%20dropdown-toggle%22%20type%3D%22button%22%20id%3D%22dropdownMenuButton%22%20data-toggle%3D%22dropdown%22%20aria-haspopup%3D%22true%22%20aria-expanded%3D%22false%22%20v-on%3Aclick%3D%22this.btnColumnsVisibility%3D!this.btnColumnsVisibility%22%20v-html%3D%22config.labels.visibility%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22dropdown-menu%20dropdown-menu-right%22%20aria-labelledby%3D%22dropdownMenuButton%22%20%3Aclass%3D%22%5B%20this.btnColumnsVisibility%20%3F%20'show'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-check%22%20v-if%3D%22d.switchVisibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-check-input%22%20type%3D%22checkbox%22%20value%3D%22%22%20%3Aid%3D%22'defaultCheck'%2Bindex%2B''%22%20%3Achecked%3D%22d.visibility%22%20v-on%3Achange%3D%22d.visibility%3D!d.visibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Clabel%20class%3D%22form-check-label%22%20%3Afor%3D%22'defaultCheck'%2Bindex%2B''%22%3E%7B%7Bd.name%7D%7D%3C%2Flabel%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22clearfix%22%20v-if%3D%22d.switchVisibility%22%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FCOLUMNS%20VISIBILITY%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fform%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FTOP%20TOOLBAR%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3Ctable%20class%3D'table'%20%3Aclass%3D%22%5B%20config.css.table%20%3F%20''%2Bconfig.css.table%2B''%20%3A%20''%20%2C%20config.options.verticalScroll%20%3F%20'scrollTableVertical'%20%3A%20''%20%2C%20config.options.responsive%20%3F%20'rr'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cthead%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20HEADER%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22config.options.header%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.options.header%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20%3Acolspan%3D%22config.columns.filter(%20function(o%2Ci)%20%7B%20if%20(%20(i%3E%3D((typeof%20config.options.header%5Bindex-1%5D%20%3D%3D%3D%20'undefined'%20)%20%3F%200%20%3A%20config.options.header%5Bindex-1%5D)%20%26%26%20i%3C(((typeof%20config.options.header%5Bindex-1%5D%20%3D%3D%3D%20'undefined'%20)%20%3F%200%20%3A%20config.options.header%5Bindex-1%5D)%2Bconfig.options.header%5Bindex%5D))%20%26%26%20o.visibility%3D%3D%3Dtrue)%20return%20o%3B%7D%20).length%22%20v-html%3D%22config.labels.header%5Bindex%5D%22%3E%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FHEADER%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20COLUMNS%20NAME%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20scope%3D%22col%22%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class%3D%22position-relative%20pl-3%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Aclass%3D%22%5B%20config.columns%5Bindex%5D.orderVisibility%20%3F%20'order'%20%3A%20''%20%2C%20config.columns%5Bindex%5D.orderMode%20%5D%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-on%3Aclick%3D%22this._setOrder(%24event%2Cindex)%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%20v-html%3D%22d.name%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fth%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FCOLUMNS%20NAME%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20SEARCH%20ON%20COLUMNS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22this.config.columns.filter(%20function(o)%20%7B%20if%20(o.search!%3D%3Dundefined)%20return%20o%3B%7D%20).length!%3D%3D0%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20scope%3D%22col%22%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class%3D%22position-relative%20pl-3%22%20%3Aclass%3D%22classColumn%5Bindex%5D%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22d.search%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22d.search.type%20%3D%3D%3D%20'input'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-control%20form-control-sm%20search-box%22%20%3Aclass%3D%22%5Bd.search.css%5D%22%20type%3D%22text%22%20placeholder%3D%22...%22%20v-model%3D%22d.search.value%22%20v-on%3Ainput%3D%22this._searchFilter(%24event%2Cindex)%22%20v-on%3Afocus%3D%22this._resetFilter('GLOBAL')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-if%3D%22d.search.value.length%3E%3Dd.search.minLength%22%20v-on%3Aclick%3D%22d.search.value%3D''%3Bthis._deferNavigate(%24event%2C1)%3B%22%20class%3D%22eraseIcon%22%3E%26times%3B%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-else-if%3D%22d.search.type%20%3D%3D%3D%20'select'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20id%3D%22inputState%22%20class%3D%22form-control%20form-control-sm%22%20%3Aclass%3D%22%5Bd.search.css%5D%22%20v-model%3D%22d.search.value%22%20v-on%3Achange%3D%22this._searchFilter(%24event%2Cindex)%22%20v-on%3Afocus%3D%22this._resetFilter('GLOBAL')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%3E%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22(l%2Cindex)%20in%20d.search.dictionnary%22%20%3Avalue%3D%22l.value%22%3E%7B%7Bl.text%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fth%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FSEARCH%20ON%20COLUMNS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fthead%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctbody%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20%3Aclass%3D%22%5B%20this.loading%20%3F%20'dynamicTableLoader'%20%3A%20'noDynamicTableLoader'%20%5D%22%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20RECORDS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-for%3D%22(d%2Cmain_index)%20in%20records%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(e%2Cindex)%20in%20d%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%20%3Aclass%3D%22%5Bconfig.columns%5Bindex%5D.class%20%2C%20this.order.filter(%20function(o)%20%7B%20if(o.p%3D%3D%3Dindex)%20return%20o%3B%7D%20).length%20%3D%3D%3D%201%20%26%26%20this.config.options.visualFilterForOrderedColumns%20%3F%20'activeSorting'%20%3A%20''%20%5D%22%20%3Adata-label%3D%22this.config.columns%5Bindex%5D.name%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-if%3D%22typeof%20this.config.columns%5Bindex%5D.fctTransform%20%3D%3D%3D'undefined'%22%20v-html%3D%22this._highlight(e%2Cindex)%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-else%20v-html%3D%22this._highlight(this.config.columns%5Bindex%5D.fctTransform(e%2Crecords%5Bmain_index%5D)%2Cindex)%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(e%2Cindex)%20in%20config.buttons%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22button%22%20class%3D%22btn%20btn-sm%20mr-1%22%20%3Aclass%3D%22e.css%22%20v-on%3Aclick%3D%22this._buttons(e%2Cd)%3B%22%20v-html%3D%22config.labels.buttons%5Be.label%5D%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FRECORDS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20NO%20RECORDS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22records.length%3D%3D%3D0%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20class%3D%22text-center%22%20%3Acolspan%3D%22this.config.columns.filter(%20function(o)%20%7B%20if%20(o.visibility%3D%3D%3Dtrue)%20return%20o%3B%7D%20).length%22%20v-html%3D%22config.labels.noRecordsFound%22%3E%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%3EJJ%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FNO%20RECORDS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22parseInt(records.length)!%3DparseInt(this.config_recordsPerPage)%20%26%26%20this.config.options.displayEmptyLines%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-for%3D%22n%20in%20(%20parseInt(this.config_recordsPerPage)-this.records.length)%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22n%20in%20(this.config.columns.length)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.columns%5Bn-1%5D.visibility%22%3E%26%23160%3B%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%3E%26%23160%3B%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftbody%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C%2Ftable%3E%0D%0A%0D%0A%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%3Cnav%20aria-label%3D%22Page%20navigation%22%20class%3D%22dataGreedPagination%22%20v-if%3D%22records.length!%3D%3D0%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22jump_page%22%20v-if%3D%22this.config.options.jumpPage%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-html%3D%22config.labels.page%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20class%3D%22form-control%20form-control-sm%22%20v-on%3Achange%3D%22this._navigate(%24event.target.value)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22p%20in%20totalPages%22%20%3Aselected%3D%22p%3D%3D%3DparseInt(this.pageno)%22%3E%7B%7Bp%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fspan%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3Cul%20class%3D%22pagination%20pagination-sm%22%20%3Aclass%3D%22this.config.css.pagerPosition%22%3E%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%20v-for%3D%22p%20in%20pagination%22%20class%3D%22page-item%22%20%3Aclass%3D%22%5B%20p.active%20%3F%20'active'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20class%3D%22page-link%22%20%3Aclass%3D%22p.aclass%22%20href%3D%22%22%20v-on%3Aclick.prevent%3D%22this._navigate(p.v)%22%3E%7B%7Bp.lbl%7D%7D%3C%2Fa%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fli%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ful%3E%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22entries%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-html%3D%22config.labels.pageSelect.show%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20class%3D%22form-control%20form-control-sm%22%20v-on%3Achange%3D%22this._changePerPage(%24event)%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22p%20in%20this.config.options.perPageOptions%22%20%3Aselected%3D%22p%3D%3D%3Dthis.config_recordsPerPage%22%3E%7B%7Bp%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-html%3D%22config.labels.pageSelect.entries%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%20%20%20%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20v-if%3D%22this.config.options.entriesInfo%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%26dash%3B%26%23160%3B%3Cspan%20v-html%3D%22config.labels.range.from%22%3E%3C%2Fspan%3E%26%23160%3B%7B%7BdataFrom%7D%7D%26%23160%3B%3Cspan%20v-html%3D%22config.labels.range.to%22%3E%3C%2Fspan%3E%26%23160%3B%7B%7BdatatTo%7D%7D%20%26%23160%3B%26dash%3B%26%23160%3B%3Cspan%20v-html%3D%22config.labels.total%22%3E%3C%2Fspan%3E%20%3A%20%7B%7Bthis.totalRows%7D%7D%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%3C%2Fnav%3E%0D%0A%0D%0A%20%20%20%20%3Ctemplate%20v-if%3D%22false%22%3E%0D%0A%20%20%20%20%3Chr%2F%3E%0D%0A%20%20%20%20%3Cbutton%20v-on%3Aclick%3D%22this.%24emit('callback'%20%2C%20%7B%20'a'%20%3A%20'421'%20%2C%20'b'%20%3A%20'666'%20%7D%20)%22%3ETEST%3C%2Fbutton%3E%0D%0A%20%20%20%20%3Chr%2F%3E%0D%0A%20%20%20%20%3C%2Ftemplate%3E");


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
                    "btnColumnsVisibility": false
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

                // console.log(this);
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
                }
            },
            methods:
            {
                /*_none: function()
                {
                    console.log("NONE");
                },*/
                /*
                    RESET SEARCH
                */
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
                        // console.log("reset columns filters");

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

                            // console.log("inputType : " + e.inputType);
                            keyMode = e.inputType;
                        }
                    }

                    // deleteContentBackward

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
                                    /*
                                    if (this.config.columns[i].search.value !== "")
                                    {
                                        filterSearch[filterSearch.length - 1] = this.config.columns[i].search.value;
                                        update = true;
                                    }
                                    */
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
                        // this.searchMode = "GLOBAL";
                        __searchMode = "GLOBAL";
                    }
                    else if (this.columnnSearch.filter(function(o)
                        {
                            if (o !== "") return o;
                        }).length !== 0)
                    {
                        searchParm = JSON.stringify(this.columnnSearch);
                        // this.searchMode = "MULTI";
                        __searchMode = "MULTI";
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
                                search: searchParm,
                                /*search_mode: this.searchMode*/
                                search_mode: __searchMode
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

                    // console.log(response.data);
                    /*
                    this.records = response.data.records;
                    this.totalPages = response.data.totalPages;
                    this.totalRows = response.data.totalRows;
                    this.searchMode = response.data.searchMode;
                    */
                    Object.assign(this, response.data);

                    this._buildPager();

                    // var that = this;

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
                    /*      
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
                        }, 101, that
                    );
                    */
                },
                /*
                    DEFER NAVIGATION
                */
                _deferNavigate: function(e, page)
                {
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
                    if (typeof ac === "undefined")
                    {
                        ac = "";
                    }
                    o.push(
                    {
                        "lbl": "" + a + "",
                        "v": "" + b + "",
                        "active": c,
                        "aclass": ac
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

                            if (current_page > 3)
                            {
                                pagination = this._buildPush(pagination, "" + this.config.labels.first + "", "1", false, "p-first");
                                pagination = this._buildPush(pagination, "" + this.config.labels.previous + "", "" + previous_link + "", false, "p-prev");
                            }

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

                            pagination = this._buildPush(pagination, this.config.labels.next, (current_page + 1), false, "p-next");
                            pagination = this._buildPush(pagination, this.config.labels.last, total_pages, false, "p-last");
                        }

                        this.pagination = pagination;
                    }
                    else
                    {
                        // console.log("HERE BUILD PAGER");
                        this.pagination = [];
                    }
                },
                /*
                    WHEN PER PAGE IS CHANGE WITH DROPDOWN
                */
                _changePerPage: function(e)
                {
                    // this.config_recordsPerPage = parseInt(e.target.value);
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
                },
                _highlight: function(v, ndx)
                {
                    if (this.searchMode === "") return v;
                    // console.log("ndx [" + ndx + "] " + v);
                    // return "_<b>zz</b>" + v + "_";
                    // return v;

                    if (typeof this.config.columns[ndx].search === "undefined")
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
                _buttons: function(b, d)
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
                        b.mode(d);
                    }
                    else
                    {
                        this.$emit(this.$options.emits[0], b.action, d);
                    }
                }
            }
        }
    );
}
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


var templateDataGreed = decodeURIComponent("%3Cdiv%20class%3D%22dataGreedToolBar%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C!--%20TOP%20TOOLBAR%20--%3E%0D%0A%20%20%20%20%20%20%20%20%3Cform%20class%3D%22form-inline%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20JUMP%20TO%20PAGE%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%20mr-2%20jump_page%22%20v-if%3D%22this.config.options.jumpPage%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22form-control-sm%20mb-2%22%20v-html%3D%22config.labels.page%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20class%3D%22form-control%20form-control-sm%20mb-2%22%20v-on%3Achange%3D%22this._navigate(%24event.target.value)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22p%20in%20totalPages%22%20%3Aselected%3D%22p%3D%3D%3DparseInt(this.pageno)%22%3E%7B%7Bp%7D%7D%2F%7B%7BtotalPages%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FJUMP%20TO%20PAGE%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%20mr-auto%22%20v-if%3D%22this.config.options.globalSearch%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn-reset-search%20btn%20btn-sm%20btn-primary%20mb-2%22%20v-html%3D%22config.labels.resetSearch%22%20v-on%3Aclick.prevent%3D%22this._resetSearch()%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20GLOBAL%20SEARCH%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%20ml-auto%22%20v-if%3D%22this.config.options.globalSearch%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-control%20form-control-sm%20mb-2%20mr-2%22%20type%3D%22text%22%20placeholder%3D%22...%22%20v-model%3D%22this.globalSearch%22%20v-on%3Afocus%3D%22this._resetFilter('COLUMNS')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn-global-search%20btn%20btn-sm%20btn-primary%20mb-2%22%20v-html%3D%22config.labels.globalSearch%22%20v-on%3Aclick.prevent%3D%22this._navigate(1)%22%20%3Adisabled%3D%22this.globalSearch.length%3Cthis.config.options.globaSearchMinLength%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FGLOBAL%20SEARCH%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20COLUMNS%20VISIBILITY%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-group%20p2%22%20%3Aclass%3D%22this.config.options.globalSearch%20%3F%20''%20%3A%20'ml-auto'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22dropdown%20dropdown-cvisibility%22%20%3Aclass%3D%22%5B%20this.btnColumnsVisibility%20%3F%20'show'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn%20btn-sm%20btn-secondary%20dropdown-toggle%22%20type%3D%22button%22%20id%3D%22dropdownMenuButton%22%20data-toggle%3D%22dropdown%22%20aria-haspopup%3D%22true%22%20aria-expanded%3D%22false%22%20v-on%3Aclick%3D%22this.btnColumnsVisibility%3D!this.btnColumnsVisibility%22%20v-html%3D%22config.labels.visibility%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22dropdown-menu%20dropdown-menu-right%22%20aria-labelledby%3D%22dropdownMenuButton%22%20%3Aclass%3D%22%5B%20this.btnColumnsVisibility%20%3F%20'show'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form-check%20w-100%22%20v-if%3D%22d.switchVisibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-check-input%22%20type%3D%22checkbox%22%20value%3D%22%22%20%3Aid%3D%22'defaultCheck'%2Bindex%2B''%22%20%3Achecked%3D%22d.visibility%22%20v-on%3Achange%3D%22d.visibility%3D!d.visibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Clabel%20class%3D%22form-check-label%20w-100%20pl-1%20d-block%22%20%3Afor%3D%22'defaultCheck'%2Bindex%2B''%22%3E%7B%7Bd.name%7D%7D%3C%2Flabel%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22clearfix%22%20v-if%3D%22d.switchVisibility%22%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FCOLUMNS%20VISIBILITY%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C%2Fform%3E%0D%0A%20%20%20%20%20%20%20%20%3C!--%20%2FTOP%20TOOLBAR%20--%3E%0D%0A%0D%0A%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%3Cdiv%20class%3D%22dataGreed%22%20%3Aclass%3D%22%7B%20'table-responsive%20horizontal-scrollable'%20%3A%20config.options.horizontalScroll%20%7D%22%20v-on%3Aselectstart.prevent.stop%3D%22%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3Ctable%20class%3D'table'%20%3Aclass%3D%22%5B%20config.css.table%20%3F%20''%2Bconfig.css.table%2B''%20%3A%20''%20%2C%20config.options.verticalScroll%20%3F%20'scrollTableVertical'%20%3A%20''%20%2C%20config.options.responsive%20%3F%20'rr'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cthead%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20HEADER%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22config.options.header%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%3C%2Fth%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.options.header%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20%3Acolspan%3D%22config.columns.filter(%20function(o%2Ci)%20%7B%20if%20(%20(i%3E%3D((typeof%20config.options.header%5Bindex-1%5D%20%3D%3D%3D%20'undefined'%20)%20%3F%200%20%3A%20config.options.header%5Bindex-1%5D)%20%26%26%20i%3C(((typeof%20config.options.header%5Bindex-1%5D%20%3D%3D%3D%20'undefined'%20)%20%3F%200%20%3A%20config.options.header%5Bindex-1%5D)%2Bconfig.options.header%5Bindex%5D))%20%26%26%20o.visibility%3D%3D%3Dtrue)%20return%20o%3B%7D%20).length%22%20v-html%3D%22config.labels.header%5Bindex%5D%22%3E%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FHEADER%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20COLUMNS%20NAME%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%3C%2Fth%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20scope%3D%22col%22%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class%3D%22position-relative%20pl-3%20pr-4%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Aclass%3D%22%5B%20config.columns%5Bindex%5D.orderVisibility%20%3F%20'order'%20%3A%20''%20%2C%20config.columns%5Bindex%5D.orderMode%20%5D%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-on%3Aclick%3D%22this._setOrder(%24event%2Cindex)%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%20v-html%3D%22config.labels.columns%5Bindex%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fth%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FCOLUMNS%20NAME%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20SEARCH%20ON%20COLUMNS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22this.config.columns.filter(%20function(o)%20%7B%20if%20(o.search!%3D%3Dundefined)%20return%20o%3B%7D%20).length!%3D%3D0%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%3C%2Fth%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cindex)%20in%20config.columns%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20scope%3D%22col%22%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class%3D%22position-relative%20pl-3%22%20%3Aclass%3D%22classColumn%5Bindex%5D%22%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22d.search%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22d.search.type%20%3D%3D%3D%20'input'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20class%3D%22form-control%20form-control-sm%20search-box%22%20%3Aclass%3D%22%5Bd.search.css%5D%22%20type%3D%22text%22%20placeholder%3D%22...%22%20v-model%3D%22d.search.value%22%20v-on%3Ainput%3D%22this._searchFilter(%24event%2Cindex)%22%20v-on%3Afocus%3D%22this._resetFilter('GLOBAL')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-if%3D%22d.search.value.length%3E%3Dd.search.minLength%22%20v-on%3Aclick%3D%22d.search.value%3D''%3Bthis._deferNavigate(%24event%2C1)%3B%22%20class%3D%22eraseIcon%22%3E%26times%3B%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-else-if%3D%22d.search.type%20%3D%3D%3D%20'select'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20id%3D%22inputState%22%20class%3D%22form-control%20form-control-sm%22%20%3Aclass%3D%22%5Bd.search.css%5D%22%20v-model%3D%22d.search.value%22%20v-on%3Achange%3D%22this._searchFilter(%24event%2Cindex)%22%20v-on%3Afocus%3D%22this._resetFilter('GLOBAL')%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%3E%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22(l%2Cindex)%20in%20d.search.dictionnary%22%20%3Avalue%3D%22l.value%22%3E%7B%7Bl.text%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fth%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cth%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FSEARCH%20ON%20COLUMNS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fthead%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctbody%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22position-absolute%20w-100%22%20%3Aclass%3D%22%5B%20this.loading%20%3F%20'dynamicTableLoader'%20%3A%20'noDynamicTableLoader'%20%5D%22%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20RECORDS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(d%2Cmain_index)%20in%20records%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20DISPLAY%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20%3Aclass%3D%22%5Bmain_index%252%3D%3D%3D0%20%3F%20'odd'%20%3A%20''%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20class%3D%22p-2%22%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22btn%20btn-secondary%20btn-sm%20pl-1%20pr-1%20pt-0%20pb-0%22%20%3Aclass%3D%22this.extra%5Bmain_index%5D%20%3F%20'extraSwicthOn'%20%3A%20'extraSwicthOff'%22%20v-on%3Aclick%3D%22this.extra%5Bmain_index%5D%3D!this.extra%5Bmain_index%5D%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(e%2Cindex)%20in%20d%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.columns%5Bindex%5D.visibility%22%20%3Aclass%3D%22%5Bconfig.columns%5Bindex%5D.class%20%2C%20this.order.filter(%20function(o)%20%7B%20if(o.p%3D%3D%3Dindex)%20return%20o%3B%7D%20).length%20%3D%3D%3D%201%20%26%26%20this.config.options.visualFilterForOrderedColumns%20%3F%20'activeSorting'%20%3A%20''%20%5D%22%20%3Adata-label%3D%22this.config.columns%5Bindex%5D.name%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-if%3D%22typeof%20this.config.columns%5Bindex%5D.fctTransform%20%3D%3D%3D'undefined'%22%20v-html%3D%22this._highlight(e%2Cindex)%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-else%20v-html%3D%22this._highlight(this.config.columns%5Bindex%5D.fctTransform(e%2Crecords%5Bmain_index%5D)%2Cindex)%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btn-container'%3A%20''%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(e%2Cindex)%20in%20config.buttons%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22button%22%20class%3D%22btn%20btn-sm%20mr-1%22%20%3Aclass%3D%22e.css%22%20v-on%3Aclick%3D%22this._buttons(e%2Cd%2Cmain_index)%3B%22%20v-html%3D%22config.labels.buttons%5Be.label%5D%22%3E%3C%2Fbutton%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FDISPLAY%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%20%3Aclass%3D%22extra%5Bmain_index%5D%20%3F%20''%20%3A%20'd-none'%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20class%3D%22extraTd%22%20%3Acolspan%3D%22visibleColumsLen%2B1%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cul%20class%3D%22list-group-flush%20mb-0%20pl-0%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(g%2Cindexextra)%20in%20config.columns%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%20class%3D%22list-group-item%20p-1%22%20v-if%3D%22g.switchVisibility%3D%3D%3Dfalse%20%7C%7C%20(%20g.switchVisibility%3D%3D%3Dtrue%20%26%26%20g.visibility%3D%3D%3Dfalse%20)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22row%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22col-3%22%3E%3Cb%3E%7B%7Bconfig.labels.columns%5Bindexextra%5D%7D%7D%3A%3C%2Fb%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22col-9%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-if%3D%22typeof%20this.config.columns%5Bindexextra%5D.fctTransform%20%3D%3D%3D'undefined'%22%20v-html%3D%22d%5Bindexextra%5D%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20v-else%20v-html%3D%22this.config.columns%5Bindexextra%5D.fctTransform(d%5Bindexextra%5D%2Crecords%5Bmain_index%5D)%22%3E%3C%2Fspan%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fli%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ful%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FEXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FRECORDS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20NO%20RECORDS%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-if%3D%22records.length%3D%3D%3D0%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20class%3D%22text-center%22%20%3Acolspan%3D%22this.config.columns.filter(%20function(o)%20%7B%20if%20(o.visibility%3D%3D%3Dtrue)%20return%20o%3B%7D%20).length%22%20v-html%3D%22config.labels.noRecordsFound%22%3E%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%26%23160%3B%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FNO%20RECORDS%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-if%3D%22parseInt(records.length)!%3DparseInt(this.config_recordsPerPage)%20%26%26%20this.config.options.displayEmptyLines%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%20v-for%3D%22n%20in%20(%20parseInt(this.config_recordsPerPage)-this.records.length)%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20FIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.options.displayUnswitchColumnsAsExtraInfos%20%26%26%20visibleColumsLen!%3D%3D0%20%26%26%20isUnswitchColumns%22%3E%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C!--%20%2FFIRST%20COL%20IF%20EXTRA%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22n%20in%20(this.config.columns.length)%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.columns%5Bn-1%5D.visibility%22%3E%26%23160%3B%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20v-if%3D%22config.buttons.length!%3D%3D0%22%20%3Aclass%3D%22config.options.outSideButtons%20%3F%20'btns-cell'%3A%20''%22%3E%26%23160%3B%3C%2Ftd%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftbody%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C%2Ftable%3E%0D%0A%0D%0A%20%20%20%20%3C%2Fdiv%3E%0D%0A%0D%0A%20%20%20%20%3Cnav%20aria-label%3D%22Page%20navigation%22%20class%3D%22dataGreedPagination%22%20v-if%3D%22records.length!%3D%3D0%22%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C!--%20PAGER%20--%3E%0D%0A%20%20%20%20%20%20%20%20%3Cul%20class%3D%22pagination%20pagination-sm%22%20%3Aclass%3D%22this.config.css.pagerPosition%22%3E%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%20v-for%3D%22p%20in%20pagination%22%20class%3D%22page-item%22%20%3Aclass%3D%22%5B%20p.active%20%3F%20'active'%20%3A%20''%20%5D%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20class%3D%22page-link%22%20%3Aclass%3D%22p.aclass%22%20href%3D%22%22%20v-on%3Aclick.prevent%3D%22this._navigate(p.v)%22%3E%7B%7Bp.lbl%7D%7D%3C%2Fa%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fli%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Ful%3E%0D%0A%20%20%20%20%20%20%20%20%3C!--%20%2FPAGER%20--%3E%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%3C!--%20ENTRIES%20SELECT%20BOX%20--%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22entries%20d-inline-flex%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22form-control-sm%22%20v-html%3D%22config.labels.pageSelect.show%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cselect%20class%3D%22form-control%20form-control-sm%22%20v-on%3Achange%3D%22this._changePerPage(%24event)%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Coption%20v-for%3D%22p%20in%20this.config.options.perPageOptions%22%20%3Aselected%3D%22p%3D%3D%3Dthis.config_recordsPerPage%22%3E%7B%7Bp%7D%7D%3C%2Foption%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22form-control-sm%22%20v-html%3D%22config.labels.pageSelect.entries%22%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%3C!--%20%2FENTRIES%20SELECT%20BOX%20--%3E%0D%0A%0D%0A%20%20%20%20%20%20%20%20%3C!--%20ENTRIES%20FROM-TO%20--%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20v-if%3D%22this.config.options.entriesInfo%22%20class%3D%22d-inline-flex%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%26dash%3B%26%23160%3B%3Cspan%20v-html%3D%22config.labels.range.from%22%3E%3C%2Fspan%3E%26%23160%3B%7B%7BdataFrom%7D%7D%26%23160%3B%3Cspan%20v-html%3D%22config.labels.range.to%22%3E%3C%2Fspan%3E%26%23160%3B%7B%7BdatatTo%7D%7D%20%26%23160%3B%26dash%3B%26%23160%3B%3Cspan%20v-html%3D%22config.labels.total%22%3E%3C%2Fspan%3E%20%3A%20%7B%7Bthis.totalRows%7D%7D%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3C!--%20%2FENTRIES%20FROM-TO%20--%3E%0D%0A%0D%0A%20%20%20%20%3C%2Fnav%3E%0D%0A%0D%0A%20%20%20%20%3Ctemplate%20v-if%3D%22false%22%3E%0D%0A%20%20%20%20%3Chr%2F%3E%0D%0A%20%20%20%20%3Cbutton%20v-on%3Aclick%3D%22this.%24emit('callback'%20%2C%20%7B%20'a'%20%3A%20'421'%20%2C%20'b'%20%3A%20'666'%20%7D%20)%22%3ETEST%3C%2Fbutton%3E%0D%0A%20%20%20%20%3Chr%2F%3E%0D%0A%20%20%20%20%3C%2Ftemplate%3E");


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
                    })

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
                    o.push(
                    {
                        "lbl": "" + a + "",
                        "v": "" + b + "",
                        "active": c,
                        "aclass": (typeof ac === "undefined") ? "" : ac
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
                                // pagination = this._buildPush(pagination, "" + this.config.labels.first + "", "1", false, "p-first");
                                pagination = this._buildPush(pagination, this.config.labels.first, 1, false, "p-first " + this.config.css.pager.first);
                                // pagination = this._buildPush(pagination, "" + this.config.labels.previous + "", "" + previous_link + "", false, "p-prev");
                                pagination = this._buildPush(pagination, this.config.labels.previous, previous_link, false, "p-prev " + this.config.css.pager.prev);
                            }

                            for (i = (current_page - 2); i < current_page; i++)
                            {
                                if (i > 0)
                                {
                                    // pagination = this._buildPush(pagination, "" + i + "", "" + i + "", (i === current_page) ? true : false);
                                    pagination = this._buildPush(pagination, i, i, (i === current_page) ? true : false);
                                }
                            }
                            first_link = false;
                        }

                        if (first_link)
                        {
                            // pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", true);
                            pagination = this._buildPush(pagination, current_page, current_page, true);
                        }
                        else if (current_page == total_pages)
                        {
                            // pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", true);
                            pagination = this._buildPush(pagination, current_page, current_page, true);
                        }
                        else
                        {
                            // pagination = this._buildPush(pagination, "" + current_page + "", "" + current_page + "", (parseInt(pagination[pagination.length - 1].v) + 1 === current_page ? true : false));
                            pagination = this._buildPush(pagination, current_page, current_page, (parseInt(pagination[pagination.length - 1].v) + 1 === current_page ? true : false));
                        }

                        for (i = current_page + 1; i < right_links; i++)
                        {
                            if (i <= total_pages)
                            {
                                // pagination = this._buildPush(pagination, "" + i + "", "" + i + "", false);
                                pagination = this._buildPush(pagination, i, i, false);
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

                        // this.pagination = pagination;
                    }
                    /*else
                    {
                        this.pagination = [];
                    }*/

                    this.pagination = pagination;
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
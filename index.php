<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="">
    <meta name="description" content="">

    <title>VueJs - DataGreed</title>

    <link rel="icon" type="image/png" href="images/favico/favicon.png">
    <link rel="shortcut icon" href="images/favico/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">


    <script src="https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.js" integrity="sha512-6RWHKAjNRW4uoX23LCu8SKj5oee59nx95FPkHXMNq8F3n3FT/9TIIE79Keouo0QCjHlc6W8VPB07ABN/KCwwlA==" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js" integrity="sha512-Izh34nqeeR7/nwthfeE0SI3c8uhFSnqxV0sI9TvTcXiFJkMd6fB644O64BRq2P/LA/+7eRvCw4GmLsXksyTHBg==" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/vue@next"></script>

    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/main.css">    

</head>

<body>

    <div id="app">

        <data-greed-filter ref="main-data-greed-filter" v-bind:config="dataGreedConfig" v-bind:filter="dataGreedFilter"></data-greed-filter>

        <div class="container mb-4 mt-4"> 
            <div class="card">
                <div class="card-body">  
                    <button class="btn btn-sm btn-secondary" v-on:click="dataGreedConfig.customParameters='';">Reset Custom parameters</button>
                    <br/>
                    {{dataGreedConfig.customParameters}}
                    <hr class="mt-2 mb-2"/>
                    <button class="btn btn-sm btn-secondary" v-on:click="this.dataGreedFilter.sidebarFilter=true;" class="cursor">&#9776; Open Custom filters</button>
                </div>
            </div>
        </div>
        <!-- /EXAMPLE SIDEBAR CUSTOM FILTER -->

        <div class="container"> 
            <div class="card">
                <div class="card-body">  
                
                    <template v-if="false">
                    <button v-on:click="this.$refs['main-data-greed'].globalSearch='12';">WX</button>
                    <hr/>
                    </template>

                    <data-greed ref="main-data-greed" v-bind:config="dataGreedConfig" v-on:callback="getBtnCall"></data-greed>               

                </div>
            </div>
        </div>

        <br/>
        <br/>

    </div>

    <!-- DATA-GREED -->

    <!--
    <script src="build/data-greed.js"></script>    
    -->

    <!--
    <link rel="stylesheet" href="css/datagreed.css">
    <script src="build/data-greed-no-css.js"></script>
    -->

    <link rel="stylesheet" href="css/datagreed.css">
    <script src="js/data-greed/template.js"></script>
    <script src="js/data-greed/component.js"></script>

    <!-- DATA-GREED-FILTER -->

    <!--
    <script src="build/data-greed-filter.js"></script>    
    -->

    <link rel="stylesheet" href="css/datagreedfilter.css">
    <script src="js/data-greed-filter/template.js"></script>
    <script src="js/data-greed-filter/component.js"></script>

    <!-- VUE JS -->
    <script src="js/app.js"></script>

</body>

</html>
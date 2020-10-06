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

    <style>
        body
        {
            overflow-y:scroll;
        }
    </style>
</head>

<body>

    <div id="app">

        <br/>
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

    <!-- VUE JS -->
    <script src="js/app.js"></script>

</body>

</html>
<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="">
    <meta name="description" content="">

    <title>Vue DataGreed</title>

    <link rel="icon" type="image/png" href="images/favico/favicon.png">
    <link rel="shortcut icon" href="images/favico/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.js" integrity="sha512-6RWHKAjNRW4uoX23LCu8SKj5oee59nx95FPkHXMNq8F3n3FT/9TIIE79Keouo0QCjHlc6W8VPB07ABN/KCwwlA==" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js" integrity="sha512-Izh34nqeeR7/nwthfeE0SI3c8uhFSnqxV0sI9TvTcXiFJkMd6fB644O64BRq2P/LA/+7eRvCw4GmLsXksyTHBg==" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/vue@next"></script>

    <link rel="stylesheet" href="css/datagreed.css">
    
</head>

<body>


    <div id="app">

        "{{lg}}"

        <br/>
        <div class="container"> 
            <div class="card">
                <div class="card-body">           
                <data-greed v-bind:config="dataGreedConfig"></data-greed>
                </div>
            </div>
        </div>

    </div>

    <!-- PROTOTYPES -->
    <script src="js/prototypes/event.js"></script>
    <script src="js/prototypes/rhea/array.js"></script>
    <script src="js/prototypes/rhea/element.js"></script>
    <script src="js/prototypes/rhea/nodelist.js"></script>
    <script src="js/prototypes/rhea/object.js"></script>

    <!-- VANILLAJS ICE ICE BABY -->

    <script src="js/vanilla-js/ready.js"></script>
    <script src="js/vanilla-js/debounce.js"></script>
    <script src="js/custom_bs4.js"></script>

    <!-- VUE JS -->
    <script src="js/template.js"></script>
    <script src="js/component.js"></script>
    <script src="js/app.js"></script>

</body>

</html>
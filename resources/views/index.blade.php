<!doctype html>
<html ng-app="app" ng-strict-di>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Peobee</title>

    <meta name="theme-color" content="#0690B7">
    <base href="/app">
    <link rel="manifest" href="manifest.json">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"> -->

    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->

    <style><?php require(public_path("css/critical.css")) ?></style>

    <!-- Main Quill library -->
    <!-- <script src="//cdn.quilljs.com/1.2.4/quill.js"></script> -->
    <script src="//cdn.quilljs.com/1.2.4/quill.min.js"></script>

    <!-- Theme included stylesheets -->
    <link href="//cdn.quilljs.com/1.2.4/quill.snow.css" rel="stylesheet">
    <!-- <link href="//cdn.quilljs.com/1.2.4/quill.bubble.css" rel="stylesheet"> -->

    <!-- Core build with no theme, formatting, non-essential modules -->
    <link href="//cdn.quilljs.com/1.2.4/quill.core.css" rel="stylesheet">
    <script src="//cdn.quilljs.com/1.2.4/quill.core.js"></script>



</head>
<body>
<?php
# @Author: eipex
# @Date:   2017-04-26T09:25:11-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-09T11:06:30-05:00



// use Illuminate\Support\Facades\Auth;
// echo "MAD JAM";
// var_dump(Auth::id());?>
    <app-shell>
        <div id="app-shell-header">
            <!-- <img src="img/icons/logo.svg" width="171" height="41"> -->
        </div>
        <div id="app-shell-content"></div>
    </app-shell>


    <app-root></app-root>


    <script>
    (function(){
        var link = document.createElement("link");
        link.href = "{!! elixir('css/final.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);
    })();
    </script>

    <script src="{!! elixir('js/final.js') !!}" async></script>

</body>
</html>

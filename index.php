<?php
  $tool = str_replace( ['..', '../', '.', './'], '', $_GET['tool'] );
  $style = '';
  $html = '<h1>No tool picked / Tool not found</h1>';
  $script = '';

  $files = [];
  foreach (glob(__DIR__.'/src/{*/*,*/*/*}.html',GLOB_BRACE) as $file) {
    $files[] = str_replace( [__DIR__.'/src/', '/index.html'], '', $file );
  }

  if ($tool && file_exists(__DIR__."/src/{$tool}/index.html")) {
    $style = sprintf('<link rel="stylesheet" href="/src/%s/style.css">', $tool);
    $html = file_get_contents(__DIR__."/src/{$tool}/index.html");
    $script = sprintf('<script src="/src/%s/scripts.js" defer></script>', $tool);
  }
?>

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>STANDALONE TOOLS</title>
    <style>*{box-sizing: border-box;}.cbp-menu{width: 100%; display: flex; align-items: flex-start; flex-wrap: wrap; justify-content: flex-start;gap: 0.5rem; margin-bottom: 1rem;}</style>
    <link id="cbp_tool-style" rel="stylesheet" href="/assets/style.css">
    <?= $style ?>
  </head>
  <body>
    <div class="cbp-menu">
      <?php foreach ($files as $file): echo sprintf('<a href="/?tool=%1$s">%1$s</a>', $file); endforeach ?>
    </div>
    <article><?= $html ?></article>
    <footer>
      <script id="cbp_tool-scripts" src="/assets/scripts.js" defer></script>
      <?= $script ?>
    </footer>
  </body>
</html>

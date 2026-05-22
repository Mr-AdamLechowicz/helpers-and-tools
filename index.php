<?php
  $tool = str_replace(['..', '../', '.', './'], '', $_GET['tool']);
  $style = '';
  $html = '<h1>No tool picked / Tool not found</h1>';
  $script = '';
  $skin = $_GET['skin'] ?: null;

  $files = [];
  foreach (glob(__DIR__.'/src/{*/*,*/*/*}.html', GLOB_BRACE) as $file) {
    $files[] = str_replace([__DIR__.'/src/', '/index.html'], '', $file);
  }

  $skins = [];
  foreach (glob(__DIR__.'/assets/skins/{*}.css', GLOB_BRACE) as $file) {
    $skins[] = str_replace([__DIR__.'/assets/skins/', '.css'], '', $file);
  }

  if ($tool && file_exists(__DIR__."/src/{$tool}/index.html")) {
    $style = sprintf('<link rel="stylesheet" href="/src/%s/style.css">', $tool);
    $html = file_get_contents(__DIR__."/src/{$tool}/index.html");
    $script = sprintf('<script src="/src/%s/scripts.js" defer></script>', $tool);
    $skinUrl = $skin ? sprintf('<link id="cbp_tool-skin" rel="stylesheet" href="/assets/skins/%s.css">', $skin) : '';
  }

  $inlineStyle = '<style>';
  $inlineStyle .= '* {
      box-sizing: border-box;
    }

    .cbp-menu {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;

      button {
        width: fit-content;
      }
    }';
  $inlineStyle .= '</style>';

  $menu_tools = '<div><code>TOOL:</code>';
  foreach ($files as $file) {
    $menu_tools .= sprintf(
      '<label><input type="radio" name="tool" value="%1$s" %2$s>%1$s</label>',
      $file,
      $tool == $file ? 'checked' : ''
    );
  }
  $menu_tools .= '</div>';

  $menu_skins = '<div><code>SKIN:</code>';
  $menu_skins .= '<label><input type="radio" name="skin" value="" checked>Default</label>';
  foreach ($skins as $loadedSkin) {
    $menu_skins .= sprintf(
      '<label><input type="radio" name="skin" value="%1$s" %2$s>%1$s</label>',
      $loadedSkin,
      $_GET['skin'] == $loadedSkin ? 'checked' : ''
    );
  }
  $menu_skins .= '</div>';
?>

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>STANDALONE TOOLS</title>
    <?= $inlineStyle ?>
    <link id="cbp_tool-style" rel="stylesheet" href="/assets/style.css">
    <?= $skinUrl ?>
    <?= $style ?>
  </head>
  <body class="<?= $skin ?>">
    <form class="cbp-menu">
      <?= $menu_tools ?>
      <?= $menu_skins ?>
      <button type="submit">Reload</button>
    </form>
    <article class="cbp-tool"><?= $html ?></article>
    <footer>
      <script id="cbp_tool-scripts" src="/assets/scripts.js" defer></script>
      <?= $script ?>
    </footer>
  </body>
</html>

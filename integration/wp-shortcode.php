<?php
/*
 * Plugin Name: Cyberpack - Tools - Shortcode
 * Description: Tools shortcode for various tools created by Cyberpack.pl team
 * Version: 1.0
 * Author: Cyberpack - Kornel
 * Author: https://cyberpack.pl/
*/

if (!defined('TOOLS')) {
  define('TOOLS', '/wp-content/tools');
}

add_shortcode('cbp_tool', function ($atts) {
  wp_enqueue_style('cbp_tool-style', TOOLS.'/assets/style.css', [], '0.1');
  wp_enqueue_script('cbp_tool-scripts', TOOLS.'/assets/scripts.js', [], '0.1', $footer = true);

  $atts = shortcode_atts([
    'tool' => '',
    'skin' => null,
  ], $atts, 'cbp_tool');

  if ($atts['tool'] == 'all') {
    $files = [];
    $path = ABSPATH.'wp-content/tools/src/';
    foreach (glob($path.'{*/*,*/*/*}.html', GLOB_BRACE) as $file) {
      $files[] = str_replace([$path, '/index.html'], '', $file);
    }
    $html = '<ul>';
    foreach ($files as $file) {
      $html .= "<li>{$file}</li>";
    }
    $html .= '</ul>';
  } else {
    $tool = TOOLS."/src/".$atts['tool']."/";
    $toolPath = ABSPATH.'wp-content/tools/src/'.$atts['tool'].'/index.html';
    $html = "<pre>{$atts['tool']} - NOT FOUND</pre>";

    if (file_exists($toolPath)) {
      wp_enqueue_style("cbp_tool-{$atts['tool']}-style", $tool . 'style.css', [], '1.0.0');
      wp_enqueue_script("cbp_tool-{$atts['tool']}-scripts", $tool . 'scripts.js', [], '1.0.0', true);

      if ($atts['skin']) {
        wp_enqueue_style("cbp_tool-{$atts['skin']}-skin", TOOLS."/assets/skins/{$atts['skin']}.css", ['cbp_tool-style'], '1.0.0');
      }

      $html = sprintf(
        '<div class="cbp-tool %s">%s</div>',
        $atts['skin'] ?: '',
        file_get_contents($toolPath),
      );
    }
  }

  return $html;
});

add_shortcode('cbp_skin', function ($atts) {
  wp_enqueue_style('cbp_tool-style', TOOLS.'/assets/style.css', [], '0.1');
  wp_enqueue_script('cbp_tool-scripts', TOOLS.'/assets/scripts.js', [], '0.1', true);

  $atts = shortcode_atts([
    'skin' => null,
  ], $atts, 'cbp_tool');

  if ($atts['skin']) {
    wp_enqueue_style("cbp_tool-{$atts['skin']}-skin", TOOLS."/assets/skins/{$atts['skin']}.css", ['cbp_tool-style'], '1.0.0');

    add_filter('body_class', function ($classes) use ($atts) {
      $classes[] = $atts['skin'];

      return $classes;
    });
  }
});

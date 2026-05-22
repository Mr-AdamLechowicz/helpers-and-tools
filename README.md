# Helpers and Tools

For everyone interested.

## Info
Each tool NEED to be assigned to specific category, and be placed in corresponding folder. For example. "Count words" goes to "text", "Calculate moon distance" goes go "calculator"

## TOOLS
### Available tools
* `text/word-counter` - Counts words
* `text/text-analyzer` - Counts symbols(with and without space), words, sentences, text standard pages, time to read and button to clear text from HTML elements,fonts,colord,e.t.c
<!-- * `text/text-encryption-tool` - cypher text -->

## INTEGRATION
### Wordpress
1. Copy whole folder to `/wp-content/` and save it as `tools`
2. Create new folder in `/wp-content/plugins`
3. Copy `integration/wp-shortcode.php` inside OR create symbolic link
4. Enable plugin in dashboard/plugins
5. Use Shortcode `[cbp_tool tool="PATH_TO_THE_TOOL"]`

example:
`[cbp_tool tool="text/word-counter"]`

### Standalone
1. Inside of folder run local php server. For example `php -S localhost:8000`.
2. Done. Go to that page in browser.

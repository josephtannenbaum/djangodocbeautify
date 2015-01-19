# djangodocbeautify
A userscript adding some features to the Django documentation website

# Installation
1. Host autocomplete16_data.min.js anywhere (it's a big file of autocomplete links)
2. Add the link to the last @require tag in DjangoDocBeautify.user.js
3. Ensure the settings at the top of DjangoDocBeautify.user.js reflect your needs
4. Add DjangoDocBeautify.user.js to TamperMonkey in Chrome (should also work on Firefox)

# Features
- Add another searchbox toward the bottom of the right sidebar
- Searchbox autocomplete
- Clicking on code example boxes changes them to textareas with the full code highlighted
- In code examples, Python and Django modules such as "`django.db`" or "`urllib`" convert to doc links
- Entire section headers convert to links (rather than just the tiny link icon)
- Hide "Getting Help" and "Download" sidebar sections (with click-to-re-show)
- Stick the right sidebar for scroll with you vertically

# Notes
1. The autocomplete file is called "autocomplete_16" but at the moment the autocompleted items link to whatever DJANGO_VERSION is set to. You can just rename it anyway.

# Relies on the nice work of...
- [leafo](https://github.com/leafo/sticky-kit/)
- The [jQuery UI](http://jqueryui.com/) team

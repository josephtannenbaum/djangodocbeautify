# djangodocbeautify
A userscript adding some features to the Django documentation website

# Installation
1. Host autocomplete16_data.min.js anywhere (it's a big file of autocomplete links)
2. Add the link to the last @require tag in DjangoDocBeautify.user.js
3. Ensure the settings at the top of DjangoDocBeautify.user.js reflect your needs
4. Add DjangoDocBeautify.user.js to TamperMonkey in Chrome (should also work on Firefox)

# Notes
1. The autocomplete file is called "autocomplete_16" but at the moment the autocompleted items link to whatever DJANGO_VERSION is set to. You can just rename it anyway.

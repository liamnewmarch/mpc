default:
	@$(MAKE) build
	@$(MAKE) serve

build:
	@echo 'Generating JS bundle: static/js/app.js'
	@rollup --format=es --output=static/js/bundle.js -- static/js/app.js

serve:
	@cd static && python -m SimpleHTTPServer 4000

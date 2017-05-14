default:
	@$(MAKE) serve

serve:
	cd static && python -m SimpleHTTPServer 4000

# Environment variables for development
export DENO_ENV := development

# Ports
export WEB_CLIENT_PORT := 3001
export WHATSAPP_WEBHOOK_PORT := 3002
export API_COMMON_PORT := 3003

# Directories
export ROOT_DIR := ${PWD}
export API_COMMON_DIR := $(ROOT_DIR)/api-common
export WEB_CLIENT_DIR := $(ROOT_DIR)/apps/web-client
export WHATSAPP_WEBHOOK_DIR := $(ROOT_DIR)/apps/whatsapp-webhook

# Commands
target: dev-api-common dev-web-client dev-whatsapp

.PHONY: dev-start dev-api-common dev-web-client dev-whatsapp clean

dev-start:
	make -j dev-api-common dev-web-client dev-whatsapp

dev-api-common:
	cd $(API_COMMON_DIR) && deno task start

dev-web-client:
	cd $(WEB_CLIENT_DIR) && deno task start

dev-whatsapp:
	cd $(WHATSAPP_WEBHOOK_DIR) && deno task start

clean:
	rm -r build
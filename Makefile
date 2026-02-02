# Variables
SHELL := /bin/bash
MSG ?= "update: minor arcade adjustments"

# --- Development ---
.PHONY: dev
dev: ## Boot up the arcade dev server
	npm run start

.PHONY: cdev
cdev: ## Clear Angular cache and restart (fixes watcher issues)
	rm -rf .angular/cache
	npm run start

# --- Git Workflow ---
.PHONY: save
save: ## Quick save: git add and commit with a default or custom message
	git add .
	git commit -m $(MSG)

.PHONY: push
push: save ## Save and push to remote
	git push

.PHONY: sync
sync: ## Pull latest changes
	git pull

# --- Maintenance ---
.PHONY: prune
prune: ## Remove any lingering .html or .scss files if you've gone full inline
	find src/app -name "*.html" -type f -delete
	find src/app -name "*.scss" -type f -delete
	@echo "🔥 Redundant files purged. Pure TypeScript mode active."

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help


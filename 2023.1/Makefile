# (C) Copyright 2022 Xilinx, Inc.
# SPDX-License-Identifier: Apache-2.0

CP = cp -f

PWD = $(shell readlink -f .)


.PHONY: help
help:
	@echo 'Usage:'
	@echo ''
	@echo '  make docs'
	@echo '    Generate html documentation using sphinx'
	@echo ''

.PHONY: all
all: docs

.PHONY: docs
docs:
	$(MAKE) -C docs html
	


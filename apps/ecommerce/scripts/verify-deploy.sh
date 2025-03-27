#!/bin/bash

# Verificar dependencias
pnpm audit

# Ejecutar tests
pnpm test

# Construir aplicación
pnpm build:production

# Verificar tamaño del bundle
du -sh dist/

# Verificar archivos críticos
if [ ! -f dist/index.html ]; then
    echo "Error: index.html not found"
    exit 1
fi 
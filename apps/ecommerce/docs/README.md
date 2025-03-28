# Guía de Despliegue

## Prerequisitos

1. Cuenta de AWS con acceso a:
   - S3
   - CloudFront
   - IAM

2. AWS CLI instalado y configurado
3. Node.js 18 o superior
4. PNPM instalado

## Configuración Inicial en AWS

1. Crear un bucket S3:
```bash
aws s3api create-bucket --bucket app-ecommerce-test --region us-east-1
```

2. Habilitar el hosting estático en S3:
```bash
aws s3 website s3://app-ecommerce-test/ --index-document index.html --error-document index.html
```

3. Crear una distribución CloudFront:
```bash
aws cloudfront create-distribution --distribution-config file://infrastructure/cloudfront-config.json
```

## Variables de Entorno

Crear los siguientes secrets en GitHub:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`

## Despliegue Manual

```bash
./scripts/deploy.sh
```

## Pipeline CI/CD

El pipeline se ejecuta automáticamente cuando:
1. Se hace push a la rama main
2. Se crea un PR hacia main

Pasos del pipeline:
1. Instalación de dependencias
2. Ejecución de tests
3. Build de producción
4. Despliegue a S3
5. Invalidación de caché CloudFront

## Monitoreo

1. Logs de aplicación: CloudWatch
2. Métricas de CDN: CloudFront console
3. Errores de build: GitHub Actions

## Rollback

Para hacer rollback a una versión anterior:

```bash
aws s3 cp s3://app-ecommerce-test/backup/build-{DATE} s3://app-ecommerce-test/ --recursive
aws cloudfront create-invalidation --distribution-id {DISTRIBUTION_ID} --paths "/*"
```
```

9. Actualiza el `.gitignore`:

```gitignore:apps/ecommerce/.gitignore
# Production
dist/
build/

# Environment
.env
.env.local
.env.*.local

# AWS
infrastructure/terraform.tfstate
infrastructure/.terraform
```

10. Crea un script de verificación pre-deploy:

```bash:apps/ecommerce/scripts/verify-deploy.sh
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
```
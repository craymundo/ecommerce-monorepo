#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Configuración
BUCKET_NAME="app-ecommerce-test"
DISTRIBUTION_ID="E1SYRPK2T69M7T"
PROFILE="default"
REGION="us-east-1"

# Construir la aplicación
echo -e "${GREEN}Building application...${NC}"
pnpm build:production

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Build successful${NC}"
else
    echo -e "${RED}Build failed${NC}"
    exit 1
fi

# Sincronizar con S3
echo -e "${GREEN}Deploying to S3...${NC}"
aws s3 sync dist/ s3://$BUCKET_NAME --delete --profile $PROFILE

# Invalidar cache de CloudFront
echo -e "${GREEN}Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --profile $PROFILE

echo -e "${GREEN}Deployment complete!${NC}" 